const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/dashboard', (req, res) => {
    const role = req.query.role || 'institution';

    if (role === 'admin') {
        // Aggregate stats
        const stats = {
            verified: 0,
            fake: 0,
            connected: 0,
            institutions: [] // To be populated
        };

        db.serialize(() => {
            db.all("SELECT * FROM institutions", (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.institutions = rows;
                stats.connected = rows.length;
                stats.verified = rows.reduce((acc, curr) => acc + curr.verifications, 0); // Mock sum
                stats.fake = Math.floor(stats.verified * 0.05); // Mock fake count

                res.json({ success: true, stats });
            });
        });

    } else {
        // Institution stats (Mock for now, or filter by user if we had auth token)
        res.json({
            success: true,
            stats: {
                verified: Math.floor(Math.random() * 150) + 50,
                fake: Math.floor(Math.random() * 10) + 1
            }
        });
    }
});

module.exports = router;
