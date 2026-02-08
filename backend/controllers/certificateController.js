const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const pdfParse = require('pdf-parse');

const generateCertId = () => {
  return `CERT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
};

const issueCertificate = async (req, res) => {
  try {
    const { candidateName, courseName, issueDate, metadata } = req.body;
    const issuerId = req.user.id;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', issuerId)
      .single();

    if (profileError || profile?.role !== 'institute') {
      return res.status(403).json({ error: 'Only institutes can issue certificates' });
    }

    const certId = generateCertId();
    
    const crypto = require('crypto');
    const dataString = JSON.stringify({ candidateName, courseName, issueDate, certId, issuerId, timestamp: Date.now() });
    const txHash = '0x' + crypto.createHash('sha256').update(dataString).digest('hex');
    
    const { data, error } = await supabase
      .from('certificates')
      .insert([
        {
          candidate_name: candidateName,
          course_name: courseName,
          issue_date: issueDate,
          issuer_id: issuerId,
          certificate_id: certId,
          metadata: { 
            ...(metadata || {}), 
            txHash: txHash,
            blockNumber: Math.floor(15000000 + Math.random() * 1000000)
          }
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'Certificate issued successfully', certificate: data });

  } catch (error) {
    console.error('Issue Cert Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('certificates')
      .select(`
        *,
        profiles:issuer_id (name, email)
      `)
      .eq('certificate_id', id)
      .single();

    if (error) {
        return res.status(404).json({ error: 'Certificate not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInstituteCertificates = async (req, res) => {
    try {
        const issuerId = req.user.id;
        
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('issuer_id', issuerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPdfCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No certificate file uploaded' });
    }

    const buffer = req.file.buffer;
    const data = await pdfParse(buffer);
    const text = data.text;

    // Pattern to match CERT-YYYY-XXXXXX
    const certIdMatch = text.match(/CERT-\d{4}-\d{6}/);
    
    if (!certIdMatch) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Could not find a valid Certificate ID in the uploaded document.' 
      });
    }

    const certId = certIdMatch[0];

    const { data: certData, error } = await supabase
      .from('certificates')
      .select(`
        *,
        profiles:issuer_id (name)
      `)
      .eq('certificate_id', certId)
      .single();

    if (error || !certData) {
      return res.status(404).json({ 
        valid: false, 
        message: `Certificate ID ${certId} found in document but not found in our records.` 
      });
    }

    const instituteName = certData.profiles?.name;
    
    // Normalize text for comparison (remove extra spaces, case insensitive)
    const normalizedText = text.replace(/\s+/g, ' ').toLowerCase();
    const normalizedInstituteName = instituteName ? instituteName.replace(/\s+/g, ' ').toLowerCase() : '';

    if (!normalizedInstituteName || !normalizedText.includes(normalizedInstituteName)) {
        return res.status(200).json({
            valid: false,
            message: `Certificate ID ${certId} is valid, but the Institute Name (${instituteName}) could not be verified in the document.`
        , certificate: certData });
    }

    return res.status(200).json({
      valid: true,
      message: 'Certificate successfully verified.',
      certificate: certData
    });

  } catch (error) {
    console.error('PDF Verification Error:', error);
    res.status(500).json({ error: 'Failed to verify certificate document' });
  }
};

module.exports = {
  issueCertificate,
  getCertificate,
  getInstituteCertificates,
  verifyPdfCertificate
};
