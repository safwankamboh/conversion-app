export interface ConversionTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  route: string;
  popular?: boolean;
  new?: boolean;
}

export const conversionTools: ConversionTool[] = [
  // File Converters
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to PDF format",
    icon: "FileText",
    category: "file-converters",
    route: "/tools/word-to-pdf",
    popular: true,
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    icon: "Table",
    category: "file-converters",
    route: "/tools/excel-to-pdf",
  },
  {
    id: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF format",
    icon: "Presentation",
    category: "file-converters",
    route: "/tools/powerpoint-to-pdf",
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF files to editable Word documents",
    icon: "FileText",
    category: "file-converters",
    route: "/tools/pdf-to-word",
    popular: true,
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG images to PDF format",
    icon: "Image",
    category: "file-converters",
    route: "/tools/image-to-pdf",
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description: "Convert PDF pages to JPG, PNG images",
    icon: "Image",
    category: "file-converters",
    route: "/tools/pdf-to-image",
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert HTML web pages to PDF format",
    icon: "Code",
    category: "file-converters",
    route: "/tools/html-to-pdf",
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    icon: "Compress",
    category: "file-converters",
    route: "/tools/pdf-compressor",
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Combine multiple PDF files into one",
    icon: "Merge",
    category: "file-converters",
    route: "/tools/pdf-merger",
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split PDF files into separate pages",
    icon: "Scissors",
    category: "file-converters",
    route: "/tools/pdf-splitter",
  },

  // Unit Converters
  {
    id: "length-converter",
    name: "Length Converter",
    description: "Convert between meters, feet, inches, and more",
    icon: "Ruler",
    category: "unit-converters",
    route: "/tools/length-converter",
    popular: true,
  },
  {
    id: "weight-converter",
    name: "Weight Converter",
    description: "Convert between kg, pounds, ounces, and more",
    icon: "Scale",
    category: "unit-converters",
    route: "/tools/weight-converter",
  },
  {
    id: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: "Thermometer",
    category: "unit-converters",
    route: "/tools/temperature-converter",
  },
  {
    id: "area-converter",
    name: "Area Converter",
    description: "Convert between square meters, square feet, acres",
    icon: "Square",
    category: "unit-converters",
    route: "/tools/area-converter",
  },
  {
    id: "volume-converter",
    name: "Volume Converter",
    description: "Convert between liters, gallons, cubic meters",
    icon: "Cube",
    category: "unit-converters",
    route: "/tools/volume-converter",
  },
  {
    id: "speed-converter",
    name: "Speed Converter",
    description: "Convert between km/h, mph, m/s, and more",
    icon: "Gauge",
    category: "unit-converters",
    route: "/tools/speed-converter",
  },
  {
    id: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert time between different time zones",
    icon: "Clock",
    category: "unit-converters",
    route: "/tools/time-zone-converter",
  },

  // Currency & Finance
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between 170+ world currencies with live rates",
    icon: "DollarSign",
    category: "finance",
    route: "/tools/currency-converter",
    popular: true,
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate EMI, interest, and loan payments",
    icon: "Calculator",
    category: "finance",
    route: "/tools/loan-calculator",
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate Equated Monthly Installments",
    icon: "CreditCard",
    category: "finance",
    route: "/tools/emi-calculator",
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description: "Calculate GST, VAT, and tax amounts",
    icon: "Receipt",
    category: "finance",
    route: "/tools/gst-calculator",
  },

  // Text & Code Tools
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text to UPPERCASE, lowercase, camelCase",
    icon: "Type",
    category: "text-tools",
    route: "/tools/text-case-converter",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    icon: "Code",
    category: "text-tools",
    route: "/tools/json-formatter",
  },
  {
    id: "base64-converter",
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    icon: "Hash",
    category: "text-tools",
    route: "/tools/base64-converter",
  },
  {
    id: "html-encoder",
    name: "HTML Encoder",
    description: "Encode and decode HTML entities",
    icon: "Code",
    category: "text-tools",
    route: "/tools/html-encoder",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    icon: "QrCode",
    category: "text-tools",
    route: "/tools/qr-code-generator",
  },
  {
    id: "barcode-generator",
    name: "Barcode Generator",
    description: "Generate various barcode formats",
    icon: "BarChart3",
    category: "text-tools",
    route: "/tools/barcode-generator",
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design",
    icon: "FileText",
    category: "text-tools",
    route: "/tools/lorem-ipsum-generator",
  },

  // Image & Media Tools
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize and compress images online",
    icon: "Image",
    category: "media-tools",
    route: "/tools/image-resizer",
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert between PNG, JPG, WebP, and more",
    icon: "Image",
    category: "media-tools",
    route: "/tools/image-converter",
  },
  {
    id: "video-to-audio",
    name: "Video to Audio",
    description: "Extract audio from video files",
    icon: "Music",
    category: "media-tools",
    route: "/tools/video-to-audio",
  },
  {
    id: "audio-converter",
    name: "Audio Converter",
    description: "Convert between MP3, WAV, AAC formats",
    icon: "Music",
    category: "media-tools",
    route: "/tools/audio-converter",
  },

  // Developer Tools
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA256, SHA512 hashes",
    icon: "Fingerprint",
    category: "developer-tools",
    route: "/tools/hash-generator",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs and GUIDs",
    icon: "Hash",
    category: "developer-tools",
    route: "/tools/uuid-generator",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and validate regular expressions",
    icon: "Code",
    category: "developer-tools",
    route: "/tools/regex-tester",
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between timestamps and dates",
    icon: "Clock",
    category: "developer-tools",
    route: "/tools/timestamp-converter",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick colors and convert between formats",
    icon: "Palette",
    category: "developer-tools",
    route: "/tools/color-picker",
  },
  {
    id: "json-diff",
    name: "JSON Diff Tool",
    description: "Compare and find differences in JSON files",
    icon: "GitCompare",
    category: "developer-tools",
    route: "/tools/json-diff",
  },
];

export const categories = [
  {
    id: "file-converters",
    name: "File Converters",
    description: "Convert between document formats",
    icon: "FileText",
    color: "blue",
  },
  {
    id: "unit-converters",
    name: "Unit Converters",
    description: "Convert between different units",
    icon: "Ruler",
    color: "green",
  },
  {
    id: "finance",
    name: "Finance Tools",
    description: "Currency and financial calculators",
    icon: "DollarSign",
    color: "yellow",
  },
  {
    id: "text-tools",
    name: "Text & Code Tools",
    description: "Text processing and code utilities",
    icon: "Code",
    color: "purple",
  },
  {
    id: "media-tools",
    name: "Media Tools",
    description: "Image and audio processing",
    icon: "Image",
    color: "pink",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Tools for developers",
    icon: "Terminal",
    color: "gray",
  },
];

export function getToolsByCategory(category: string) {
  return conversionTools.filter((tool) => tool.category === category);
}

export function getPopularTools() {
  return conversionTools.filter((tool) => tool.popular);
}

export function getNewTools() {
  return conversionTools.filter((tool) => tool.new);
}
