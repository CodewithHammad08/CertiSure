const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK(role IN ('admin', 'institution'))
    )`);

        // Certificates Table
        db.run(`CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cert_id TEXT UNIQUE,
      name TEXT,
      institute TEXT,
      year TEXT,
      date_issued TEXT,
      status TEXT CHECK(status IN ('verified', 'fake', 'suspicious'))
    )`);

        // Institutions Table (for Admin Dashboard)
        db.run(`CREATE TABLE IF NOT EXISTS institutions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      plan TEXT,
      date_joined TEXT,
      verifications INTEGER,
      status TEXT
    )`);

        // Seed Data (if empty)
        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (row.count === 0) {
                console.log("Seeding database...");
                const stmt = db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
                stmt.run("admin@certifyguard.com", "admin123", "admin");
                stmt.run("info@iitb.ac.in", "inst123", "institution");
                stmt.finalize();

                const instStmt = db.prepare("INSERT INTO institutions (name, plan, date_joined, verifications, status) VALUES (?, ?, ?, ?, ?)");
                instStmt.run("IIT Bombay", "Lifetime", "Jan 12, 2024", 854, "Active");
                instStmt.run("IIT Delhi", "Annual", "Feb 05, 2024", 620, "Active");
                instStmt.finalize();
            }
        });
    });
}

module.exports = db;
