"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  FileText,
  Upload,
  Download,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import FileUpload from "@/components/FileUpload";
import FormSelect from "@/components/form-select";
import {
  convertBatchWordToPdf,
  downloadConvertedFile,
  ConversionOptions,
} from "@/lib/services/conversion-api";

export default function WordToPdfConverter() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<
    Array<{
      originalName: string;
      downloadUrl: string;
      fileName: string;
      fileSize: string;
    }>
  >([]);
  const [isConverting, setIsConverting] = useState(false);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: "medium",
    pageSize: "a4",
    orientation: "portrait",
    margins: "normal",
  });

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    setConvertedFiles([]); // Clear previous conversions
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one Word document");
      return;
    }

    setIsConverting(true);
    toast.loading("Converting files...", { id: "converting" });

    try {
      const result = await convertBatchWordToPdf(uploadedFiles, options);

      if (result.success) {
        setConvertedFiles(result.files);
        toast.success("Files converted successfully!", { id: "converting" });
      } else {
        toast.error(result.error || "Conversion failed", { id: "converting" });
      }
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Conversion failed. Please try again.", { id: "converting" });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = async (file: {
    originalName: string;
    downloadUrl: string;
    fileName: string;
  }) => {
    try {
      // Extract file ID from download URL
      const fileId = file.downloadUrl.split("/").pop();
      if (!fileId) {
        toast.error("Invalid download link");
        return;
      }

      const blob = await downloadConvertedFile(fileId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.fileName || `${file.originalName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  const handleDownloadAll = async () => {
    for (const file of convertedFiles) {
      try {
        await handleDownload(file);
        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to download ${file.fileName}:`, error);
      }
    }
    toast.success("All files downloaded!");
  };

  const acceptedFileTypes = [".doc", ".docx"];
  const maxFiles = 5;
  const maxSize = 10 * 1024 * 1024; // 10MB

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link
            href="/file-converters"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            File Converters
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">Word to PDF</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Word to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert Word documents (.doc, .docx) to PDF format with customizable
            options
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="tool-card">
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Upload Files
                  </h3>
                </div>

                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  acceptedFileTypes={acceptedFileTypes}
                  maxFiles={maxFiles}
                  maxSize={maxSize}
                />

                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selected Files ({uploadedFiles.length})
                      </span>
                      <button
                        onClick={() => setUploadedFiles([])}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Conversion Options */}
              <div className="tool-card">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Conversion Options
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Quality"
                    value={options.quality}
                    onChange={(e) =>
                      setOptions({ ...options, quality: e.target.value as any })
                    }
                    leftIcon={Settings}
                    options={[
                      { value: "low", label: "Low (Fast)" },
                      { value: "medium", label: "Medium (Balanced)" },
                      { value: "high", label: "High (Best)" },
                    ]}
                  />

                  <FormSelect
                    label="Page Size"
                    value={options.pageSize}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        pageSize: e.target.value as any,
                      })
                    }
                    leftIcon={FileText}
                    options={[
                      { value: "a4", label: "A4" },
                      { value: "letter", label: "Letter" },
                      { value: "legal", label: "Legal" },
                    ]}
                  />

                  <FormSelect
                    label="Orientation"
                    value={options.orientation}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        orientation: e.target.value as any,
                      })
                    }
                    leftIcon={FileText}
                    options={[
                      { value: "portrait", label: "Portrait" },
                      { value: "landscape", label: "Landscape" },
                    ]}
                  />

                  <FormSelect
                    label="Margins"
                    value={options.margins}
                    onChange={(e) =>
                      setOptions({ ...options, margins: e.target.value as any })
                    }
                    leftIcon={FileText}
                    options={[
                      { value: "normal", label: "Normal" },
                      { value: "wide", label: "Wide" },
                      { value: "narrow", label: "Narrow" },
                    ]}
                  />
                </div>

                <button
                  onClick={handleConvert}
                  disabled={uploadedFiles.length === 0 || isConverting}
                  className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      <span>Convert to PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="tool-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Converted Files
                    </h3>
                  </div>
                  {convertedFiles.length > 0 && (
                    <button
                      onClick={handleDownloadAll}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Download All
                    </button>
                  )}
                </div>

                {convertedFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Converted files will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {convertedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {file.fileName || `${file.originalName}.pdf`}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {file.fileSize}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file)}
                          className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="tool-card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Supported Formats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Microsoft Word (.doc, .docx)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Up to 10MB per file
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Maximum 5 files at once
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 tool-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tips for Best Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Use high quality for important documents</li>
                <li>• Check page size before conversion</li>
                <li>• Ensure fonts are embedded in your Word document</li>
                <li>• Keep file sizes under 10MB for faster processing</li>
              </ul>
              <ul className="space-y-2">
                <li>• Use portrait orientation for most documents</li>
                <li>• Normal margins work best for most content</li>
                <li>• Convert one file at a time for large documents</li>
                <li>• Check the preview before downloading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
