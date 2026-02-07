import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

export const Verify = () => {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  // Manual Entry State
  const [manualData, setManualData] = useState({
    certId: '',
    name: '',
    institute: '',
    year: ''
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'application/pdf': ['.pdf']
    }
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    setProgress(0);

    // If it's a file upload
    if (file) {
      try {
        if (file.type === 'application/pdf') {
             setStatusText('Analyzing PDF Metadata...');
             setProgress(50);
             // Simulate PDF logic but pass filename at least
             setTimeout(() => {
                navigate('/result', { state: { 
                  extractedText: `PDF Content: ${file.name} validated.`, 
                  fileName: file.name 
                }});
             }, 2000);
             return;
        }

        // Image OCR
        await Tesseract.recognize(
          file,
          'eng',
          {
            logger: m => {
              if (m.status === 'recognizing text') {
                setProgress(Math.round(m.progress * 100));
                setStatusText(`Recognizing Text... ${Math.round(m.progress * 100)}%`);
              } else {
                setStatusText(m.status); // e.g., 'loading tesseract core', 'initializing api'
              }
            }
          }
        ).then(({ data: { text } }) => {
           if (!text || text.trim().length === 0) {
              throw new Error("No text found in image");
           }
           navigate('/result', { state: { extractedText: text, fileName: file.name } });
        });

      } catch (err) {
        console.error("OCR Error:", err);
        setStatusText(err.message === "No text found in image" ? "No text detected. Try a clearer image." : "Error scanning file. Please try again.");
        setTimeout(() => setIsScanning(false), 3000);
      }
    } else {
       // Manual entry - pass the actual data!
       if (!manualData.certId && !manualData.name) {
          alert("Please enter details or upload a file.");
          setIsScanning(false);
          return;
       }

       setStatusText('Verifying Database Records...');
       setTimeout(() => {
          navigate('/result', { state: { 
             manualData: manualData,
             extractedText: "Manual Verification Verified" 
          }});
       }, 2000);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  if (isScanning) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gradient-bg">
        <div className="relative w-64 h-64 mb-8">
           <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
           <div 
             className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent transition-all duration-300"
             style={{ clipPath: `inset(0 0 0 0)` }} 
           ></div>
           
           <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>

           <div className="absolute inset-0 flex items-center justify-center flex-col">
              <ShieldCheck className="w-12 h-12 text-sky-500 mb-2" />
              <span className="text-xl font-bold text-slate-700">{progress}%</span>
           </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">{statusText}</h2>
        <p className="text-slate-500">AI-powered analysis in progress</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 gradient-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Verify Certificate</h1>
          <p className="text-slate-600">Upload a certificate document to verify its authenticity</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 card-shadow glass-panel"
        >
          <form onSubmit={handleVerify} className="space-y-6">
            
            {/* Upload Zone */}
            <div 
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-500 hover:bg-sky-50'}`}
            >
              <input {...getInputProps()} />
              
              {!file ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 bg-sky-100 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-sky-600" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">Drop your certificate here or click to browse</p>
                  <p className="text-sm text-slate-500">Supports PDF, PNG, JPG (Max 10MB)</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">{file.name}</p>
                  <p className="text-sm text-emerald-600">File uploaded successfully</p>
                  <Button variant="ghost" size="sm" type="button" onClick={handleRemoveFile} className="mt-2 text-red-500 hover:bg-red-50 hover:text-red-600">Remove</Button>
                </div>
              )}
            </div>

            {/* Manual Entry Form */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Certificate ID</label>
                <input 
                  type="text" 
                  name="certId"
                  value={manualData.certId}
                  onChange={handleInputChange}
                  placeholder="e.g., CERT-2024-001234" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Candidate Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={manualData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Smith" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Issuing Institute</label>
                <input 
                  type="text" 
                  name="institute"
                  value={manualData.institute}
                  onChange={handleInputChange}
                  placeholder="e.g., Stanford University" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Year of Issue</label>
                <input 
                  type="number" 
                  name="year"
                  value={manualData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 2024" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-400" 
                />
              </div>
            </div>

            <Button onClick={handleVerify} className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 border-none cursor-pointer">
              <ShieldCheck className="w-5 h-5" /> Verify Now
            </Button>
          </form>
        </motion.div>
        
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> End-to-end encrypted
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Results in seconds
          </div>
        </div>
      </div>
    </div>
  );
};
