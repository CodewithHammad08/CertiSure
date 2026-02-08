const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');

// Configure Multer
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('certificate'), async (req, res) => {
    const { cert_id, name, institute, year } = req.body;
    const file = req.file;

    let aiResult = { result: 'VERIFIED', confidence: '99.9%', details: 'Manual Verification (No File)' };

    try {
        if (file) {
            // Send file to Python AI Service
            try {
                const formData = new FormData();
                formData.append('image', fs.createReadStream(file.path));

                const aiResponse = await axios.post('http://localhost:5000/predict', formData, {
                    headers: {
                        ...formData.getHeaders()
                    }
                });

                aiResult = aiResponse.data;
            } catch (aiError) {
                console.error('AI Service Error:', aiError.message);
                aiResult = { result: 'ERROR', confidence: '0%', details: 'AI Service Unavailable' };
            } finally {
                // Cleanup uploaded file
                fs.unlink(file.path, () => { });
            }
        } else {
            // Check DB or mock logic if no file
            // For now, keep mock random logic if no file to ensure fallback
            const results = ['VERIFIED', 'FAKE', 'SUSPICIOUS'];
            const result = results[Math.floor(Math.random() * results.length)];
            aiResult = {
                result: result,
                confidence: '95.5%',
                details: 'Simulated verification (No Image)'
            };
        }

        // Insert into DB (Sync)
        const statusMap = { 'VERIFIED': 'verified', 'FAKE': 'fake', 'SUSPICIOUS': 'suspicious' };
        const dbStatus = statusMap[aiResult.result] || 'suspicious';

        const stmt = db.prepare("INSERT INTO certificates (cert_id, name, institute, year, date_issued, status) VALUES (?, ?, ?, ?, ?, ?)");
        stmt.run(cert_id, name, institute, year, new Date().toISOString(), dbStatus, (err) => {
            if (err) console.warn("DB Insert Warning:", err.message);
        });
        stmt.finalize();

        res.json({
            success: true,
            result: aiResult.result.toUpperCase(),
            confidence: aiResult.confidence,
            details: {
                cert_id, name, institute, year,
                ai_analysis: aiResult.details,
                date_verified: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
