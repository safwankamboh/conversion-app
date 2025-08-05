"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, CheckCircle } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import toast from "react-hot-toast";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // in bytes
  className?: string;
}

export default function FileUpload({
  onFilesSelected,
  acceptedFileTypes = ["*"],
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB default
  className = "",
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error: any) => {
            if (error.code === "file-too-large") {
              toast.error(
                `${file.name} is too large. Max size is ${formatFileSize(
                  maxSize
                )}`
              );
            } else if (error.code === "file-invalid-type") {
              toast.error(`${file.name} has an invalid file type`);
            } else if (error.code === "too-many-files") {
              toast.error(`Too many files. Max is ${maxFiles}`);
            } else {
              toast.error(`${file.name} was rejected`);
            }
          });
        });
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const newFiles = [...uploadedFiles, ...acceptedFiles].slice(
          0,
          maxFiles
        );
        setUploadedFiles(newFiles);
        onFilesSelected(newFiles);
        toast.success(`${acceptedFiles.length} file(s) uploaded successfully`);
      }
    },
    [uploadedFiles, onFilesSelected, maxFiles, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      if (type === "*") {
        return { ...acc, "*": [] };
      }
      return { ...acc, [type]: [] };
    }, {}),
    maxFiles,
    maxSize,
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
    onFilesSelected([]);
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              or click to browse files
            </p>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Max file size: {formatFileSize(maxSize)}</p>
            <p>Max files: {maxFiles}</p>
            {acceptedFileTypes.length > 0 && acceptedFileTypes[0] !== "*" && (
              <p>Accepted types: {acceptedFileTypes.join(", ")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <button
              onClick={clearAllFiles}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
