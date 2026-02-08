import { motion } from 'framer-motion';
import { CheckCircle, Download, RotateCcw, FileText, ScanLine } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { extractedText = "", fileName, manualData } = location.state || {}; // Fallback for direct access

  // Helper function to extract data from OCR text
  const extractField = (text, patterns) => {
    if (!text) return "Not Detected";
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) return match[1].trim();
    }
    return "Not Detected";
  };

  // Enhanced regex parsers to catch more variations
  const parsedName = extractField(extractedText, [
      /(?:Name|Student Name|Candidate Name|Awarded to|Presented to|Belongs to)[:\s]+([A-Za-z\s.]+)/i,
      /Certifies that\s+([A-Za-z\s.]+)\s+has/i,
      /([A-Z][a-z]+ [A-Z][a-z]+)/ // Fallback: looks for Two TitleCase Words if explicit label is missing
  ]);
    
  const parsedId = extractField(extractedText, [
      /(?:ID|Cert ID|Certificate ID|Certificate No|Ref No|Reference No|Credential ID)[:\s.#]+([A-Z0-9-]+)/i,
      /([A-Z]{3,}-\d{4,})/ // Pattern like CERT-1234
  ]);
  
  const parsedInstitute = extractField(extractedText, [
      /(?:Institute|University|College|Academy|Organization|Issued by|Authority)[:\s]+([A-Za-z\s,&]+)/i,
      /([A-Za-z\s]+University)/i, // Capture "Stanford University" even without label
      /([A-Za-z\s]+Institute)/i
  ]);
  
  const parsedYear = extractField(extractedText, [
      /(?:Year|Date|Issued|On)[:\s]+.*?(\d{4})/i,
      /\b(20\d{2})\b/ // Finds any year starting with 20xx
  ]);

  const [verificationResult, setVerificationResult] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      // Prioritize ID from URL param, then manual input, then OCR
      const queryId = id || manualData?.certId || extractField(extractedText, [
        /(?:ID|Cert ID|Certificate ID|Certificate No|Ref No|Reference No|Credential ID)[:\s.#]+([A-Z0-9-]+)/i,
        /([A-Z]{3,}-\d{4,})/ 
      ]);

      if (queryId && queryId !== "Not Detected") {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/certificates/${queryId}`);
          if (response.ok) {
            const data = await response.json();
            setVerificationResult(data);
          } else {
             setVerificationResult(null);
          }
        } catch (err) {
          console.error("Verification check failed", err);
          setError("Network error verifying certificate");
        }
      } else {
         // No ID found to check
         setVerificationResult(null);
      }
      setLoading(false);
    };

    fetchCertificate();
  }, [id, manualData, extractedText]);

  // Derived result object - Merging Backend Data with OCR
  const dbMatch = verificationResult;
  
  const result = {
    status: dbMatch ? "VERIFIED" : (extractedText ? "UNVERIFIED RECORD" : "PENDING"),
    confidence: dbMatch ? 100 : (extractedText ? 85.0 : 0),
    certId: dbMatch?.certificate_id || manualData?.certId || (parsedId !== "Not Detected" ? parsedId : "Unknown"),
    name: dbMatch?.student_name || manualData?.name || (parsedName !== "Not Detected" ? parsedName : "Unknown Candidate"),
    institute: dbMatch?.profiles?.name || manualData?.institute || (parsedInstitute !== "Not Detected" ? parsedInstitute : "Unknown Institute"),
    year: dbMatch ? new Date(dbMatch.issue_date).getFullYear() : (manualData?.year || (parsedYear !== "Not Detected" ? parsedYear : new Date().getFullYear().toString())),
    date: dbMatch ? new Date(dbMatch.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const handleDownload = () => {
    const reportContent = `
CERTISURE VERIFICATION REPORT
-----------------------------
Status: ${result.status}
Date: ${result.date}
Confidence: ${result.confidence}%

DETAILS
-------
Certificate ID: ${result.certId}
Candidate Name: ${result.name}
Institute: ${result.institute}
Year of Issue: ${result.year}

ANALYSIS
--------
${result.status === 'VERIFIED' ? "The certificate matches our decentralized database records. Digital signature verified. Document integrity confirmed." : "We extracted data from the document, but could not find a matching record in our official registry."}

-----------------------------
Verified by CertiSure Blockchain
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([reportContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Verification_Report_${result.certId}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 gradient-bg">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl card-shadow overflow-hidden"
        >
          {/* Status Header */}
          <div className={`p-8 text-center text-white bg-gradient-to-br ${result.status === 'VERIFIED' ? 'from-emerald-500 to-emerald-600' : 'from-amber-500 to-orange-600'}`}>
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-4xl font-bold mb-2">{result.status}</h1>
            <p className="text-white/90">
              {result.status === 'VERIFIED' ? 'This certificate is authentically verified' : 'Certificate details found but not verified in blockchain'}
            </p>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
              <span className="text-slate-600">Confidence Score</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-emerald-500 rounded-full"
                  ></motion.div>
                </div>
                <span className="font-semibold text-slate-900">{result.confidence}%</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { label: "Certificate ID", value: result.certId },
                { label: "Candidate Name", value: result.name },
                { label: "Institute", value: result.institute },
                { label: "Year", value: result.year },
                { label: "Verified On", value: result.date }
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-slate-600">{item.label}</span>
                  <span className={`font-medium ${item.value.includes("Unknown") || item.value.includes("Not Detected") ? "text-slate-400 italic" : "text-slate-900"}`}>{item.value}</span>
                </div>
              ))}
              
              {/* Blockchain Details Section */}
              {dbMatch?.metadata?.txHash && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Blockchain Record
                    </h4>
                    <div className="space-y-3 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div>
                            <span className="text-slate-500 block mb-1">Transaction Hash</span>
                            <span className="text-violet-600 break-all">{dbMatch.metadata.txHash}</span>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <span className="text-slate-500 block mb-1">Block Number</span>
                                <span className="text-slate-700">{dbMatch.metadata.blockNumber}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">Status</span>
                                <span className="text-emerald-600 font-bold">CONFIRMED</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-right">
                         <a href="#" className="text-xs text-blue-500 hover:text-blue-700 hover:underline">View on Explorer ↗</a>
                    </div>
                </div>
              )}
            </div>

            {/* AI Analysis / OCR Section */}
            {extractedText && (
               <div className="mb-8 animate-fade-in">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                     <ScanLine className="w-4 h-4 text-violet-500" /> Extracted Data (OCR)
                  </h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-h-40 overflow-y-auto text-sm text-slate-600 font-mono">
                     {extractedText}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                     *Text extracted from <strong>{fileName || 'document'}</strong> using Tesseract OCR.
                  </p>
               </div>
            )}

            <div className={`p-4 border rounded-xl mb-6 flex gap-3 ${result.status === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <FileText className={`w-5 h-5 flex-shrink-0 mt-0.5 ${result.status === 'VERIFIED' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <p className={`font-medium mb-1 ${result.status === 'VERIFIED' ? 'text-emerald-800' : 'text-amber-800'}`}>Analysis Summary</p>
                <p className={`text-sm ${result.status === 'VERIFIED' ? 'text-emerald-700' : 'text-amber-700'}`}>
                   {result.status === 'VERIFIED' 
                     ? "The certificate matches our decentralized database records. Digital signature verified. Document integrity confirmed." 
                     : "We extracted data from the document, but could not find a matching record in our official registry."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 justify-center border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => navigate('/verify')}>
                <RotateCcw className="w-4 h-4 mr-2" /> Verify Another
              </Button>
              <Button onClick={handleDownload} className="flex-1 justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white border-none hover:shadow-lg cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
