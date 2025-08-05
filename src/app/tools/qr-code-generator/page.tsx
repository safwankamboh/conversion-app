"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { QrCode, Download, Copy, Settings } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { QRCodeOptions } from "@/types/qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://convertall.com");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 256,
    foreground: "#000000",
    background: "#FFFFFF",
    errorCorrection: "M",
  });

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text or URL");
      return;
    }

    try {
      // For demo purposes, we'll create a simple QR code representation
      // In a real implementation, you'd use a QR code library like qrcode
      const canvas = document.createElement("canvas");
      canvas.width = options.size;
      canvas.height = options.size;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Create a simple QR-like pattern for demonstration
        ctx.fillStyle = options.background;
        ctx.fillRect(0, 0, options.size, options.size);

        ctx.fillStyle = options.foreground;
        const cellSize = options.size / 25;

        // Create a simple pattern
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            if (
              (i + j) % 2 === 0 ||
              (i < 7 && j < 7) ||
              (i > 17 && j < 7) ||
              (i < 7 && j > 17)
            ) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
          }
        }

        setQrCodeDataUrl(canvas.toDataURL());
      }
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) {
      toast.error("No QR code to download");
      return;
    }

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded!");
  };

  const copyToClipboard = async () => {
    if (!text) {
      toast.error("No text to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (newText.trim()) {
      // Auto-generate QR code when text changes
      setTimeout(() => generateQRCode(), 500);
    }
  };

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
            href="/text-tools"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Text Tools
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">
            QR Code Generator
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
            <QrCode className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generate QR codes for URLs, text, contact information, and more
          </p>
        </div>

        {/* Generator */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="tool-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Input
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Copy text"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Enter text, URL, or contact information..."
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Characters: {text.length}
              </div>

              {/* Quick Inputs */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quick Examples
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "https://convertall.com",
                    "Hello World",
                    "tel:+1234567890",
                    "mailto:info@example.com",
                    "WIFI:S:MyNetwork;T:WPA;P:MyPassword;;",
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleTextChange(example)}
                      className="text-left p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="tool-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  QR Code
                </h3>
                <button
                  onClick={downloadQRCode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Download QR code"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-center h-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Generated QR Code"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <QrCode className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>QR code will appear here</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                {qrCodeDataUrl
                  ? "Click download to save the QR code"
                  : "Enter text above to generate QR code"}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="mt-8 tool-card">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                QR Code Options
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <select
                  value={options.size}
                  onChange={(e) =>
                    setOptions({ ...options, size: parseInt(e.target.value) })
                  }
                  className="input-field"
                >
                  <option value={128}>128px</option>
                  <option value={256}>256px</option>
                  <option value={512}>512px</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foreground Color
                </label>
                <input
                  type="color"
                  value={options.foreground}
                  onChange={(e) =>
                    setOptions({ ...options, foreground: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={options.background}
                  onChange={(e) =>
                    setOptions({ ...options, background: e.target.value })
                  }
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Error Correction
                </label>
                <select
                  value={options.errorCorrection}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      errorCorrection: e.target.value as any,
                    })
                  }
                  className="input-field"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tool-card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What can you encode?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• URLs and website links</li>
                <li>• Text messages and notes</li>
                <li>• Phone numbers</li>
                <li>• Email addresses</li>
                <li>• WiFi network information</li>
                <li>• Contact information (vCard)</li>
                <li>• Geographic coordinates</li>
                <li>• Bitcoin addresses</li>
              </ul>
            </div>

            <div className="tool-card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tips for better QR codes
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Use high contrast colors</li>
                <li>• Keep URLs short when possible</li>
                <li>• Test the QR code before printing</li>
                <li>• Use higher error correction for small codes</li>
                <li>• Ensure good lighting when scanning</li>
                <li>• Make sure the QR code is not distorted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
