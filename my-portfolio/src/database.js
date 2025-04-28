import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getPortfolio() {
    const [rows] = await pool.query("SELECT p.*, pt.title AS type_title FROM portfolio p LEFT JOIN portfolio_type pt ON p.portfolio_type_id = pt.id")
    return rows
}

export async function getPortfolioById(id) {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE id = ?", [id])
    return rows
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
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [2])
    return rows
}
export async function getAcheivements() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [3])
    return rows
}
export async function getInternships() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [4])
    return rows
}
export async function getActivities() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [5])
    return rows
}
export async function getEducations() {
    const [rows] = await pool.query("SELECT * FROM portfolio WHERE portfolio_type_id = ?", [6])
    return rows
}

export async function createPortfolio(title, contents, event_location, event_date, thumbnail, portfolio_type_id) {
    const [result] = await pool.query("INSERT INTO portfolio (title, contents, event_location, event_date, thumbnail, portfolio_type_id) VALUES (?,?,?,?,?,?)",
        [title, contents, event_location, event_date, thumbnail, portfolio_type_id]
    )
    const id = result.insertId
    return getPortfolioById(id)
}

export async function getPortfolioType() {
    const [rows] = await pool.query("SELECT * FROM portfolio_type")
    return rows
}

export async function updatePortfolioById(title, contents, event_location, event_date, thumbnail, portfolio_type_id, id) {

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
        `,
        [title, contents, event_location, event_date, thumbnail, portfolio_type_id, id]
    )
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

// ABOUT USER

export async function adminLogin(username, password) {
    const [result] = await pool.query("SELECT * FROM admin WHERE username = ? AND password = ?", [username, password])
    return result
}