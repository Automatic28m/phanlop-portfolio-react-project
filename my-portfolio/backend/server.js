import express, { response } from 'express'
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import the `fileURLToPath` function
import {
    getPortfolio,
    getPortfolioById,
    getEducations,
    createPortfolio,
    getPortfolioByTypeId,
    adminLogin,
    getPortfolioType,
    updatePortfolioById,
    deletePortfolioById,
    getSkills,
    getProjects,
    getAcheivements,
    getInternships,
    getActivities,
    uploadImageGalleryToPortfolioId,
    getGalleryByPortfolioId,
    getAdminFromUsername,
    adminRegister,
    deleteGalleryById,
    getGalleryById,
    countGalleryByPortfolioId,
    addSkillType,
    getSkillTypes,
    deleteSkillTypeById,
    getSkillTypeById,
    updateSkillTypeById,
    addSkillTypeToPortfolio,
    getSkillTypesByPortfolioId,
    deleteAllSkillTypesByPortfolioId
} from './database.js';
import verifyToken from './middleware/auth.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

dotenv.config();

cloudinary.config({
    cloud_name: 'dwnwhonj6',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get the current directory using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get the directory name

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const dateTimeFormat = (dateStr) => {
    const dateObj = new Date(dateStr);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const yearFormat = (dateStr) => {
    const dateObj = new Date(dateStr);
    const yyyy = dateObj.getFullYear();
    // const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    // const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}`;
};

const dateTimeFormatter = (portfolio) => {
    const portfolioFormatted = portfolio.map(item => ({
        ...item,
        event_date: item.event_date ? dateTimeFormat(item.event_date) : null,
        created: item.created ? dateTimeFormat(item.created) : null
    }));
    return portfolioFormatted
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload a buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder, public_id) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, public_id },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

function extractCloudinaryPublicId(url) {
    const match = url.match(/\/v\d+\/(.+?)\./); // Extract path after /v123456/ and before file extension
    return match ? match[1] : null;
}


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({
        message: "This is a protected routed",
        user: req.user
    })
});

app.get("/portfolio", async (req, res) => {
    const portfolio = await getPortfolio();
    const portfolioFormatted = dateTimeFormatter(portfolio)
    console.log('portfolio', portfolioFormatted);
    res.send(portfolioFormatted);
});

app.get("/getPortfolioById/:id", async (req, res) => {
    const id = req.params.id
    const portfolio = await getPortfolioById(id)
    const portfolioFormatted = dateTimeFormatter(portfolio)
    console.log('portfolio', portfolioFormatted);
    res.send(portfolioFormatted);
})

app.get("/getPortfolioByType/:id", async (req, res) => {
    const id = req.params.id
    const portfolio = await getPortfolioByTypeId(id)
    res.send(portfolio)
})

app.get("/getSkills", async (req, res) => {
    const portfolio = await getSkills()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    console.log('portfolio', portfolioFormatted);
    res.send(portfolioFormatted);
})
app.get("/getProjects", async (req, res) => {
    const portfolio = await getProjects()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    console.log('portfolio', portfolioFormatted);
    res.send(portfolioFormatted);
})
app.get("/getAcheivements", async (req, res) => {
    const portfolio = await getAcheivements()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    console.log('portfolio', portfolioFormatted);
    res.send(portfolioFormatted);
})
app.get("/getInternships", async (req, res) => {
    const portfolio = await getInternships()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    res.send(portfolioFormatted);

})
app.get("/getActivities", async (req, res) => {
    const portfolio = await getActivities()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    res.send(portfolioFormatted);
})
app.get("/getEducations", async (req, res) => {
    const portfolio = await getEducations()
    const portfolioFormatted = dateTimeFormatter(portfolio)
    res.send(portfolioFormatted);
})

app.post('/createPortfolioAndGallery', upload.fields([
    { name: 'thumbnail', maxCount: 1 },  // thumbnail
    { name: 'gallery_images', maxCount: 9 } // gallery images (up to 9)
]), async (req, res) => {
    try {
        // Extract portfolio data from the request body
        const { title, contents, event_location, event_date, portfolio_type_id } = req.body;
        const timestamp = Date.now();

        // Upload thumbnail
        let thumbnailUrl = null;
        if (req.files.thumbnail && req.files.thumbnail[0]) {
            const file = req.files.thumbnail[0];
            const fileName = `thumbnail_${timestamp}`;
            thumbnailUrl = await uploadToCloudinary(file.buffer, 'portfolio_thumbnails', fileName);
        }

        // Upload gallery images
        let galleryImageUrls = [];
        if (req.files.gallery_images) {
            galleryImageUrls = await Promise.all(
                req.files.gallery_images.map((file, index) => {
                    const fileName = `gallery_${index + 1}_${timestamp}`;
                    return uploadToCloudinary(file.buffer, 'portfolio_galleries', fileName);
                })
            );
        }

        // Create the portfolio in the database
        const portfolio = await createPortfolio(title, contents, event_location, event_date, thumbnailUrl, portfolio_type_id);
        const portfolioId = portfolio[0].id;

        // Upload gallery images associated with the portfolio
        await uploadImageGalleryToPortfolioId(portfolioId, galleryImageUrls);

        res.status(200).json({ message: 'Portfolio and gallery images uploaded successfully', portfolioId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating portfolio and uploading gallery images' });
    }
});

app.post("/uploadMultipleGalleryImagesToPortfolioId", upload.array('gallery_images', 9), async (req, res) => {
    try {
        const { portfolio_id } = req.body;
        const files = req.files;

        if (!portfolio_id || !files || files.length === 0) {
            return res.status(400).json({ message: "portfolio_id and at least one image file are required." });
        }

        const timestamp = Date.now();

        // Upload each image to Cloudinary
        const uploadedUrls = await Promise.all(
            files.map((file, index) => {
                const fileName = `gallery_${index + 1}_${timestamp}`;
                return uploadToCloudinary(file.buffer, 'portfolio_galleries', fileName);
            })
        );

        // Save image URLs to DB
        await uploadImageGalleryToPortfolioId(portfolio_id, uploadedUrls);

        res.status(200).json({
            message: "Gallery images uploaded and saved successfully",
            images: uploadedUrls,
        });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ message: "Error uploading gallery images", error: error.message });
    }
});

app.get("/countGalleryByPortfolioId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const count = await countGalleryByPortfolioId(id);
        res.json({ count }); // Return a JSON object
    } catch (err) {
        console.error("Error in /countGalleryByPortfolioId:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/getGalleryByPortfolioId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const gallery = await getGalleryByPortfolioId(id);
        res.send(gallery);
    } catch (error) {
        console.error("Error in /getGalleryByPortfolioId:", err);
    }
})

app.delete("/deleteGalleryById/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "No gallery id" });
        }

        const gallery_img_data = await getGalleryById(id);
        if (!gallery_img_data || gallery_img_data.length === 0) {
            return res.status(404).json({ message: "Gallery image not found" });
        }

        const galleryPublicId = extractCloudinaryPublicId(gallery_img_data[0].img);
        if (galleryPublicId) {
            await cloudinary.uploader.destroy(galleryPublicId);
        }

        await deleteGalleryById(id);
        res.status(200).send(`Delete gallery Id:${id} successful`);

    } catch (error) {
        console.error(`Error deleting gallery Id:${id}:`, error);
        res.status(500).json({ message: `Error deleting gallery ID ${id}`, error: error.message });
    }
})

// app.listen(8080, () => console.log('Server is running on http://localhost:8080'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/updatePortfolioById/:id", upload.single('thumbnail'), async (req, res) => {
    try {
        const id = req.params.id;
        const { title, contents, event_location, event_date, portfolio_type_id } = req.body;

        let thumbnailUrl = null;

        // Only process new thumbnail if provided
        if (req.file) {
            const timestamp = Date.now();
            const fileName = `thumbnail_${timestamp}`;
            thumbnailUrl = await uploadToCloudinary(req.file.buffer, 'portfolio_thumbnails', fileName);
        }

        const portfolio = await updatePortfolioById(
            title,
            contents,
            event_location,
            event_date,
            thumbnailUrl,
            portfolio_type_id,
            id
        );

        res.send(portfolio);
    } catch (err) {
        console.error("Error updating portfolio:", err);
        res.status(500).send({ message: "Update failed" });
    }
});

// DELETE /deletePortfolioById/:id
app.delete("/deletePortfolioById/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // 1. Get the full portfolio details (including gallery images)
        const portfolio = await getPortfolioById(id);

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // console.log("must delete thumbnail :", portfolio[0].thumbnail);

        // 2. Delete thumbnail from Cloudinary
        if (portfolio[0].thumbnail) {
            const publicId = extractCloudinaryPublicId(portfolio[0].thumbnail);
            if (publicId) {
                try {
                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log("Cloudinary delete result:", result);
                } catch (err) {
                    console.error("Error deleting thumbnail from Cloudinary:", err);
                }
            }
        }

        const gallery = await getGalleryByPortfolioId(id);
        // 3. Delete gallery images from Cloudinary
        if (gallery && Array.isArray(gallery)) {
            await Promise.all(
                gallery.map(async (img) => {
                    const galleryPublicId = extractCloudinaryPublicId(img.img);
                    if (galleryPublicId) {
                        await cloudinary.uploader.destroy(galleryPublicId);
                    }
                })
            );
        }

        // 4. Delete from DB
        await deletePortfolioById(id);

        res.status(200).json({ message: "Portfolio and images deleted successfully" });
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        res.status(500).send({ message: "Delete failed" });
    }
});

app.post("/addSkillType", async (req, res) => {
    const { name, color } = req.body;
    if (!name || !color) {
        return res.status(400).json({ message: "Name and color are required" });
    }

    try {
        await addSkillType(name, color);
        res.status(200).send(`Skill type ${name}` + " added successfully");
    } catch (error) {
        console.error("Error adding skill type:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get("/getSkillTypes", async (req, res) => {
    try {
        const skillTypes = await getSkillTypes();
        res.status(200).json(skillTypes);
    } catch (error) {
        console.error("Error fetching skill types:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/getSkillTypeById/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "Skill type ID is required" });
    }

    try {
        const skillType = await getSkillTypeById(id);
        res.send(skillType);
    } catch (error) {
        console.error("Error fetching skill type:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.put("/updateSkillTypeById/:id", async (req, res) => {
    const id = req.params.id;
    const { name, color } = req.body;
    if (!id || !name || !color) {
        return res.status(400).send({ message: "Skill type ID, name, and color are required" });
    }
    try {
        await updateSkillTypeById(id, name, color);
        res.status(200).send(`Skill type with ID ${id} updated successfully`);
    } catch (error) {
        console.error("Error updating skill type:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.delete("/deleteSkillTypeById/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "Skill type ID is required" });
    }

    try {
        const result = await deleteSkillTypeById(id);
        res.status(200).send(`Skill type with ID ${id} deleted successfully`);
    } catch (error) {
        console.error("Error deleting skill type:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.get ("/getSkillTypeByPortfolioId/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "Portfolio ID is required" });
    }

    try {
        const skillTypes = await getSkillTypesByPortfolioId(id);
        res.send(skillTypes);
    } catch (error) {
        console.error("Error fetching skill types by portfolio ID:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/addSkillTypeToPortfolio", async (req, res) => {
    const { portfolio_id, skill_type_ids } = req.body;
    if (!portfolio_id || !skill_type_ids || !Array.isArray(skill_type_ids)) {
        return res.status(400).json({ message: "portfolio_id and skill_type_ids (array) are required" });
    }

    try {
        // Loop through each skill_type_id and add to portfolio
        await deleteAllSkillTypesByPortfolioId(portfolio_id); // Delete all existing skill types for the portfolio
        for (const skill_type_id of skill_type_ids) {
            await addSkillTypeToPortfolio(portfolio_id, skill_type_id);
        }
        res.status(200).send(`Skill types [${skill_type_ids.join(', ')}] added to portfolio with ID ${portfolio_id} successfully`);
    } catch (error) {
        console.error("Error adding skill types to portfolio:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username, password)) {
            return res.status(400).json({ message: "All input is required" });
        }

        const existed_user = await getAdminFromUsername(username);
        if (existed_user.length > 0) {
            return res.status(409).json({ message: "This username is already existed" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const registrationResult = await adminRegister(username, encryptedPassword);

        if (registrationResult.status !== 201) {
            return res.status(500).json({ message: registrationResult.message });
        }

        // Create JWT
        const token = jwt.sign(
            { user_id: registrationResult.userId, username },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        )

        return res.status(201).json({
            message: registrationResult.message,
            userId: registrationResult.userId,
            token
        });
    } catch (error) {
        console.error("Registration error: ", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send('All input is required');
        }

        const rows = await adminLogin(username);

        if (rows.length === 0) {
            return res.status(401).send('Invalid username');
        }

        const user = rows[0];

        console.log("Plain password:", password);
        console.log("Hashed from DB:", user.password);


        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        )

        return res.status(200).json({
            message: "Login successful",
            userId: user.user_id,
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get("/getPortfolioType", async (req, res) => {
    const portfolioType = await getPortfolioType()
    res.send(portfolioType)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})