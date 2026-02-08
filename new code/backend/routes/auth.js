const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Fix path if needed

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple query (In production use bcrypt and async/await)
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: "Invalid credentials" });

        // Return user info (exclude password)
        res.json({
            success: true,
            user: { id: row.id, email: row.email, role: row.role }
        });
    });
});

module.exports = router;
