import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, ShieldCheck, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing...");

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a certificate image");
      return;
    }

    setIsScanning(true);
    setProgress(20);
    setStatusText("Uploading certificate...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(50);
      setStatusText("Running AI forensic analysis...");

      // Use env var or default to localhost:5000 (backend port)
      const apiUrl = import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL.replace('/api', '') // Remove /api if present, as analyze-certificate is at root
        : "http://localhost:5000";

      const response = await fetch(
        `${apiUrl}/analyze-certificate`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Backend verification failed");
      }

      const result = await response.json();

      setProgress(100);
      setStatusText("Analysis complete");

      setTimeout(() => {
        navigate("/result", {
          state: {
            fileName: file.name,
            verdict: result.verdict,
            riskScore: result.risk_score,
            threshold: result.threshold,
            explanation: result.explanation,
          },
        });
      }, 800);
    } catch (err) {
      console.error(err);
      setStatusText("Verification failed. Try again.");
      setTimeout(() => setIsScanning(false), 2000);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  /* ---------------- LOADING / SCANNING UI ---------------- */

  if (isScanning) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gradient-bg">
        <div className="relative w-64 h-64 mb-8">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <ShieldCheck className="w-12 h-12 text-sky-500 mb-2" />
            <span className="text-xl font-bold text-slate-700">
              {progress}%
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {statusText}
        </h2>
        <p className="text-slate-500">
          AI-powered certificate analysis in progress
        </p>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 gradient-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Verify Certificate
          </h1>
          <p className="text-slate-600">
            Upload a certificate image to analyze authenticity
          </p>
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
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-300 hover:border-sky-500 hover:bg-sky-50"
              }`}
            >
              <input {...getInputProps()} />

              {!file ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 bg-sky-100 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-sky-600" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    Drop your certificate here or click to browse
                  </p>
                  <p className="text-sm text-slate-500">
                    Supports PNG, JPG, JPEG
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    {file.name}
                  </p>
                  <p className="text-sm text-emerald-600">
                    File uploaded successfully
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="mt-2 text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify Certificate
            </Button>
          </form>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            AI-assisted verification
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Results in seconds
          </div>
        </div>
      </div>
    </div>
  );
};
