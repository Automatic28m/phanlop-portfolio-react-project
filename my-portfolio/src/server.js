import express from 'express'
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // Import the `fileURLToPath` function

// Get the current directory using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get the directory name

import { getPortfolio, getPortfolioById, getEducations, createPortfolio, getPortfolioByTypeId, adminLogin, getPortfolioType, updatePortfolioById, deletePortfolioById, getSkills, getProjects, getAcheivements, getInternships, getActivities } from './database.js'
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

app.post("/createPortfolio", upload.single('thumbnail'), async (req, res) => {
    try {
        const { title, contents, event_location, event_date, portfolio_type_id } = req.body
        let thumbnail = req.file ? req.file.path : null;

        if (thumbnail) {
            thumbnail = thumbnail.replace(/\\/g, '/'); // Normalize the path for consistency
        }

        const portfolio = await createPortfolio(title, contents, event_location, event_date, thumbnail, portfolio_type_id)
        console.log(portfolio);
        res.status(201).send(portfolio)
    } catch (error) {
        console.error("Error creating portfolio:", error);
        res.status(500).send("Sever Error");

    }
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

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await adminLogin(username, password);

        if (login.length > 0) {
            res.status(200).json(login);
        } else {
            res.status(401).json({ error: "Username or password is incorrect!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
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