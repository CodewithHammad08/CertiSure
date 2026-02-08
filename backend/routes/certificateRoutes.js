const express = require('express');
const router = express.Router();
const multer = require('multer');
const { issueCertificate, getCertificate, getInstituteCertificates, verifyPdfCertificate } = require('../controllers/certificateController');
const { requireAuth } = require('../middleware/authMiddleware');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Public route to verify/view a certificate
router.get('/:id', getCertificate);
router.post('/verify-pdf', upload.single('certificate'), verifyPdfCertificate);

// Protected routes (require login)
router.post('/issue', requireAuth, issueCertificate);
router.get('/institute/all', requireAuth, getInstituteCertificates);

module.exports = router;
