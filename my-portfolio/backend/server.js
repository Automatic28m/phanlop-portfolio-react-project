import express, { response } from 'express'
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import the `fileURLToPath` function
import { getPortfolio, getPortfolioById, getEducations, createPortfolio, getPortfolioByTypeId, adminLogin, getPortfolioType, updatePortfolioById, deletePortfolioById, getSkills, getProjects, getAcheivements, getInternships, getActivities, uploadImageGalleryToPortfolioId, getGalleryByPortfolioId, getAdminFromUsername, adminRegister } from './database.js'
import verifyToken from './middleware/auth.js';

dotenv.config();

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); //Generate Unique file name
    }
});

const upload = multer({ storage });

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
    { name: 'gallery_images', maxCount: 10 } // gallery images (up to 10)
]), async (req, res) => {
    try {
        // Extract portfolio data from the request body
        const { title, contents, event_location, event_date, portfolio_type_id } = req.body;

        // Normalize thumbnail path
        const thumbnail = req.files.thumbnail
            ? req.files.thumbnail[0].path.replace(/\\/g, '/')
            : null;

        // Normalize gallery image paths
        const galleryImages = req.files.gallery_images
            ? req.files.gallery_images.map(file => file.path.replace(/\\/g, '/'))
            : [];


        // Create the portfolio in the database
        const portfolio = await createPortfolio(title, contents, event_location, event_date, thumbnail, portfolio_type_id);
        const portfolioId = portfolio[0].id;

        // Upload gallery images associated with the portfolio
        await uploadImageGalleryToPortfolioId(portfolioId, galleryImages);

        res.status(200).json({ message: 'Portfolio and gallery images uploaded successfully', portfolioId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating portfolio and uploading gallery images' });
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

// app.listen(8080, () => console.log('Server is running on http://localhost:8080'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/updatePortfolioById/:id", upload.single('thumbnail'), async (req, res) => {
    try {
        const id = req.params.id;
        const { title, contents, event_location, event_date, portfolio_type_id } = req.body
        let thumbnail = req.file ? req.file.path : null;
        if (thumbnail) {
            thumbnail = thumbnail.replace(/\\/g, '/'); // Normalize the path for consistency
        }
        const portfolio = await updatePortfolioById(title, contents, event_location, event_date, thumbnail, portfolio_type_id, id);
        res.send(portfolio);
    } catch (err) {
        console.error("Error updating portfolio:", err);
        res.status(500).send({ message: "Update failed" });
    }
})

app.delete("/deletePortfolioById/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const portfolio = await deletePortfolioById(id);
        res.send(portfolio);
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        res.status(500).send({ message: "Delete failed" });
    }
})

// app.post('/upload-gallery/:portfolioId', upload.array('images', 10), async (req, res) => {
//     const { portfolioId } = req.params;
//     const imageFilenames = req.files.map(file => file.filename); // multer adds this

//     try {
//         const result = await uploadImageGalleryToPortfolioId(portfolioId, imageFilenames);
//         res.json({ success: true, inserted: result.affectedRows });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

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