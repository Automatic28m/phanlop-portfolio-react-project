import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    // ssl: {
    //     ca: fs.readFileSync(path.join(__dirname, 'certs', 'ca.pem')),
    // },
    // waitForConnections: true,
    // connectionLimit: 10,
}).promise()

console.log('Connecting to DB:', {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
});

console.log('✅ MySQL pool created');

export async function getPortfolio() {
    const [rows] = await pool.query("SELECT p.*, pt.title AS type_title FROM portfolio p LEFT JOIN portfolio_type pt ON p.portfolio_type_id = pt.id")
    return rows
}

export async function getPortfolioById(id) {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE id = ?", [id]);
    return rows;
}

export async function getPortfolioByTypeId(id) {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [id])
    return rows
}

export async function getSkills() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [1])
    return rows
}
export async function getProjects() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ? ORDER BY event_date DESC", [2])
    return rows
}
export async function getAcheivements() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ? ORDER BY event_date DESC", [3])
    return rows
}
export async function getInternships() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ? ORDER BY event_date DESC", [4])
    return rows
}
export async function getActivities() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ? ORDER BY event_date DESC", [5])
    return rows
}
export async function getEducations() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ? ORDER BY event_date DESC", [6])
    return rows
}

export async function createPortfolio(title, contents, event_location, event_date, thumbnail_url, portfolio_type_id) {
    const [result] = await pool.query(`
        INSERT INTO portfolio (title, contents, event_location, event_date, thumbnail, portfolio_type_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, [title, contents, event_location, event_date, thumbnail_url, portfolio_type_id]);

    const id = result.insertId;
    return getPortfolioById(id);
}

export async function getPortfolioType() {
    const [rows] = await pool.query("SELECT * FROM portfolio_type")
    return rows
}

export async function updatePortfolioById(title, contents, event_location, event_date, thumbnail, portfolio_type_id, id) {

    if (thumbnail && thumbnail !== 'null') {
        const [rows] = await pool.query(`
            UPDATE portfolio
            SET 
            title = ?, 
            contents = ?, 
            event_location = ?, 
            event_date = ?, 
            thumbnail = ?, 
            portfolio_type_id = ?
            WHERE id = ?
        `, [title, contents, event_location, event_date, thumbnail, portfolio_type_id, id])
        return rows;
    }

    // If thumbnail is null or 'null', we don't update it
    const [rows] = await pool.query(`
        UPDATE portfolio
        SET 
        title = ?, 
        contents = ?, 
        event_location = ?, 
        event_date = ?, 
        portfolio_type_id = ?
        WHERE id = ?
    `, [title, contents, event_location, event_date, portfolio_type_id, id]);

    return rows
}

export async function deletePortfolioById(id) {
    const [rows] = await pool.query(`
            DELETE FROM portfolio
            WHERE id = ?
        `, [id]
    )
    return rows;
}

export async function uploadImageGalleryToPortfolioId(id, imageFilenames) {
    if (!imageFilenames || imageFilenames.length === 0) {
        throw new Error("No images provided.");
    }

    const values = imageFilenames.map(filename => [filename, id]);

    const [result] = await pool.query(`
        INSERT INTO gallery (img, portfolio_id) VALUES ?
    `, [values]);

    return result;
}

export async function getGalleryById(id) {
    const [rows] = await pool.query(`
            SELECT * 
            FROM gallery
            WHERE id = ?
        `, [id])
    return rows
}

export async function getGalleryByPortfolioId(id) {
    const [rows] = await pool.query(`
            SELECT * 
            FROM gallery
            WHERE portfolio_id = ?
        `, [id])
    return rows
}

export async function countGalleryByPortfolioId(id) {
    const [rows] = await pool.query(`
        SELECT COUNT(*) AS count
        FROM gallery
        WHERE portfolio_id = ?
    `, [id]);
    return rows[0].count; // Return just the number
}

export async function deleteGalleryById(id) {
    const [rows] = await pool.query(`
        DELETE FROM gallery
        WHERE id = ?
        `, [id]);
    return rows
}

export async function addSkillType(name, color) {
    const [result] = await pool.query(`
            INSERT INTO skill_type (name, color)
            VALUES (?, ?)
        `, [name, color]);

    const id = result.insertId;
}

export async function getSkillTypes() {
    const [rows] = await pool.query(`
            SELECT * 
            FROM skill_type
        `);
    return rows;
}

export async function getSkillTypeById(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM skill_type
        WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
        throw new Error(`Skill type with id ${id} not found.`);
    }

    return rows[0];
}

export async function updateSkillTypeById(id, name, color) {
    const [result] = await pool.query(`
        UPDATE skill_type
        SET name = ?, color = ?
        WHERE id = ?
    `, [name, color, id]);

    if (result.affectedRows === 0) {
        throw new Error(`Skill type with id ${id} not found.`);
    }

    return getSkillTypeById(id);
}

export async function deleteSkillTypeById(id) {
    const [result] = await pool.query(`
        DELETE FROM skill_type
        WHERE id = ?
    `, [id]);

    if (result.affectedRows === 0) {
        throw new Error(`Skill type with id ${id} not found.`);
    }

    return result;
}

export async function addSkillTypeToPortfolio(portfolio_id, skill_type_id) {
    const [result] = await pool.query(`
        INSERT INTO portfolio_skill_types (portfolio_id, skill_type_id)
        VALUES (?, ?)
    `, [portfolio_id, skill_type_id]);

    return result;
}

export async function getSkillTypesByPortfolioId(id) {
    const [rows] = await pool.query(`
        SELECT st.*
        FROM portfolio_skill_types pst
        JOIN skill_type st ON pst.skill_type_id = st.id
        WHERE pst.portfolio_id = ?
    `, [id]);

    return rows;
}

export async function deleteAllSkillTypesByPortfolioId(portfolio_id) {
    const [result] = await pool.query(`
        DELETE FROM portfolio_skill_types
        WHERE portfolio_id = ?
    `, [portfolio_id]);

    return result;
}

// ABOUT USER

export async function adminLogin(username) {
    const [result] = await pool.query("SELECT * FROM admin WHERE username = ?", [username])
    return result
}

export async function adminRegister(username, encryptedPassword) {
    try {
        const [result] = await pool.query(`
            INSERT INTO admin (username, password)
            VALUE (?,?)
            `, [username, encryptedPassword]);
        const id = result.insertId;
        console.log("New admin created with id:", id);
        return {
            status: 201,
            message: "New admin has been created",
            userId: id
        };
    } catch (error) {
        console.error("Registration failed: ", error.message);
        return {
            status: 500,
            message: "Registration failed",
            error: error.message
        }
    }
}

export async function getAdminFromUsername(username) {
    try {
        const [result] = await pool.query(`
            SELECT * FROM admin
            WHERE username = ?
            `, [username]);
        return result;
    } catch (error) {
        console.error("getAdminFromUsername query error: ", error.message);
        return [];
    }
}