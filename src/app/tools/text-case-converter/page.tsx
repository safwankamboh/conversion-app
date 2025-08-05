"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Type, Copy, RotateCcw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface CaseOption {
  name: string;
  description: string;
  convert: (text: string) => string;
}

const caseOptions: CaseOption[] = [
  {
    name: "UPPERCASE",
    description: "Convert all characters to uppercase",
    convert: (text: string) => text.toUpperCase(),
  },
  {
    name: "lowercase",
    description: "Convert all characters to lowercase",
    convert: (text: string) => text.toLowerCase(),
  },
  {
    name: "Title Case",
    description: "Capitalize the first letter of each word",
    convert: (text: string) =>
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
  },
  {
    name: "Sentence case",
    description: "Capitalize the first letter of each sentence",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase()),
  },
  {
    name: "camelCase",
    description: "Convert to camelCase format",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
  },
  {
    name: "PascalCase",
    description: "Convert to PascalCase format",
    convert: (text: string) =>
      text
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
  },
  {
    name: "snake_case",
    description: "Convert to snake_case format",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_|_$/g, ""),
  },
  {
    name: "kebab-case",
    description: "Convert to kebab-case format",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
  },
  {
    name: "UPPER_SNAKE_CASE",
    description: "Convert to UPPER_SNAKE_CASE format",
    convert: (text: string) =>
      text
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "_")
        .replace(/^_|_$/g, ""),
  },
  {
    name: "Alternating Case",
    description: "Alternate between uppercase and lowercase",
    convert: (text: string) =>
      text
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join(""),
  },
  {
    name: "InVeRsE cAsE",
    description: "Invert the case of each character",
    convert: (text: string) =>
      text
        .split("")
        .map((char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join(""),
  },
  {
    name: "dot.case",
    description: "Convert to dot.case format",
    convert: (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, ".")
        .replace(/^\.|\.$/g, ""),
  },
];

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [selectedCase, setSelectedCase] = useState("UPPERCASE");
  const [outputText, setOutputText] = useState("");

  const convertText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    const caseOption = caseOptions.find(
      (option) => option.name === selectedCase
    );
    if (caseOption) {
      setOutputText(caseOption.convert(inputText));
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    if (text.trim()) {
      const caseOption = caseOptions.find(
        (option) => option.name === selectedCase
      );
      if (caseOption) {
        setOutputText(caseOption.convert(text));
      }
    } else {
      setOutputText("");
    }
  };

  const handleCaseChange = (caseName: string) => {
    setSelectedCase(caseName);
    if (inputText.trim()) {
      const caseOption = caseOptions.find((option) => option.name === caseName);
      if (caseOption) {
        setOutputText(caseOption.convert(inputText));
      }
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
            Text Case Converter
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
            <Type className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Text Case Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert text to different cases like UPPERCASE, lowercase,
            camelCase, and more
          </p>
        </div>

        {/* Converter */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="tool-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Input Text
                </h3>
                <button
                  onClick={clearText}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Clear text"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Characters: {inputText.length} | Words:{" "}
                {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}
              </div>
            </div>

            {/* Output Section */}
            <div className="tool-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Converted Text
                </h3>
                <button
                  onClick={() => copyToClipboard(outputText)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <div className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto">
                {outputText || "Converted text will appear here..."}
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Characters: {outputText.length} | Words:{" "}
                {outputText.trim() ? outputText.trim().split(/\s+/).length : 0}
              </div>
            </div>
          </div>

          {/* Case Options */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Case Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleCaseChange(option.name)}
                  className={`p-4 rounded-lg border transition-colors text-left ${
                    selectedCase === option.name
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    {option.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  original: "hello world",
                  cases: ["HELLO WORLD", "hello world", "Hello World"],
                },
                {
                  original: "JavaScript programming",
                  cases: [
                    "JAVASCRIPT PROGRAMMING",
                    "javascript programming",
                    "JavaScript Programming",
                  ],
                },
                {
                  original: "user input field",
                  cases: [
                    "USER INPUT FIELD",
                    "user input field",
                    "User Input Field",
                  ],
                },
              ].map((example, index) => (
                <div key={index} className="tool-card p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Original: "{example.original}"
                  </div>
                  <div className="space-y-1">
                    {example.cases.map((caseText, caseIndex) => (
                      <div key={caseIndex} className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {caseIndex === 0
                            ? "UPPERCASE: "
                            : caseIndex === 1
                            ? "lowercase: "
                            : "Title Case: "}
                        </span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          "{caseText}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
