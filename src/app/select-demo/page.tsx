"use client";

import { useState } from "react";
import FormSelect from "@/components/form-select";
import Header from "@/components/Header";
import { 
  Search, 
  Mail, 
  User, 
  Phone, 
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  Globe,
  Flag,
  Building
} from "lucide-react";
import Link from "next/link";

export default function SelectDemo() {
  const [formData, setFormData] = useState({
    country: "",
    currency: "",
    language: "",
    timezone: "",
    category: "",
    priority: "",
    status: "",
    size: "",
  });

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
  ];

  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
  ];

  const timezones = [
    { value: "UTC", label: "UTC - Coordinated Universal Time" },
    { value: "EST", label: "EST - Eastern Standard Time" },
    { value: "PST", label: "PST - Pacific Standard Time" },
    { value: "GMT", label: "GMT - Greenwich Mean Time" },
    { value: "CET", label: "CET - Central European Time" },
    { value: "JST", label: "JST - Japan Standard Time" },
  ];

  const categories = [
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  const statuses = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending Review" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "published", label: "Published" },
  ];

  const sizes = [
    { value: "xs", label: "Extra Small" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

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
          <span className="text-gray-600 dark:text-gray-300">
            Select Demo
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
            <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            FormSelect Component Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A comprehensive, reusable select component with various features and styling options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Examples */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Basic Examples
              </h2>
              
              <div className="space-y-4">
                <FormSelect
                  label="Country"
                  placeholder="Select your country"
                  leftIcon={Globe}
                  value={formData.country}
                  onChange={(e) => handleSelectChange("country", e.target.value)}
                  options={countries}
                />

                <FormSelect
                  label="Currency"
                  placeholder="Choose currency"
                  leftIcon={DollarSign}
                  value={formData.currency}
                  onChange={(e) => handleSelectChange("currency", e.target.value)}
                  options={currencies}
                />

                <FormSelect
                  label="Language"
                  placeholder="Select language"
                  leftIcon={FileText}
                  value={formData.language}
                  onChange={(e) => handleSelectChange("language", e.target.value)}
                  options={languages}
                />
              </div>
            </div>

            {/* Size Variants */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Size Variants
              </h2>
              
              <div className="space-y-4">
                <FormSelect
                  label="Small Size"
                  placeholder="Small select"
                  size="sm"
                  leftIcon={User}
                  options={sizes}
                />

                <FormSelect
                  label="Medium Size (Default)"
                  placeholder="Medium select"
                  size="md"
                  leftIcon={User}
                  options={sizes}
                />

                <FormSelect
                  label="Large Size"
                  placeholder="Large select"
                  size="lg"
                  leftIcon={User}
                  options={sizes}
                />
              </div>
            </div>
          </div>

          {/* Advanced Examples */}
          <div className="space-y-6">
            {/* Variant Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Style Variants
              </h2>
              
              <div className="space-y-4">
                <FormSelect
                  label="Default Variant"
                  placeholder="Default style"
                  variant="default"
                  leftIcon={Settings}
                  options={categories}
                />

                <FormSelect
                  label="Filled Variant"
                  placeholder="Filled style"
                  variant="filled"
                  leftIcon={Settings}
                  options={categories}
                />

                <FormSelect
                  label="Outlined Variant"
                  placeholder="Outlined style"
                  variant="outlined"
                  leftIcon={Settings}
                  options={categories}
                />
              </div>
            </div>

            {/* Validation Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Validation States
              </h2>
              
              <div className="space-y-4">
                <FormSelect
                  label="With Error"
                  placeholder="This select has an error"
                  error="This field is required"
                  leftIcon={Building}
                  options={statuses}
                />

                <FormSelect
                  label="With Helper Text"
                  placeholder="This select has helper text"
                  helperText="This is helpful information about the field"
                  leftIcon={Building}
                  options={statuses}
                />

                <FormSelect
                  label="Required Field"
                  placeholder="This field is required"
                  required
                  leftIcon={Building}
                  options={statuses}
                />

                <FormSelect
                  label="Disabled Select"
                  placeholder="This select is disabled"
                  disabled
                  leftIcon={Building}
                  options={statuses}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Example */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Complete Form Example
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Country"
              placeholder="Select your country"
              leftIcon={Globe}
              value={formData.country}
              onChange={(e) => handleSelectChange("country", e.target.value)}
              options={countries}
              required
            />

            <FormSelect
              label="Currency"
              placeholder="Choose currency"
              leftIcon={DollarSign}
              value={formData.currency}
              onChange={(e) => handleSelectChange("currency", e.target.value)}
              options={currencies}
            />

            <FormSelect
              label="Language"
              placeholder="Select language"
              leftIcon={FileText}
              value={formData.language}
              onChange={(e) => handleSelectChange("language", e.target.value)}
              options={languages}
            />

            <FormSelect
              label="Timezone"
              placeholder="Choose timezone"
              leftIcon={Calendar}
              value={formData.timezone}
              onChange={(e) => handleSelectChange("timezone", e.target.value)}
              options={timezones}
            />

            <FormSelect
              label="Category"
              placeholder="Select category"
              leftIcon={Building}
              value={formData.category}
              onChange={(e) => handleSelectChange("category", e.target.value)}
              options={categories}
            />

            <FormSelect
              label="Priority"
              placeholder="Set priority"
              leftIcon={Settings}
              value={formData.priority}
              onChange={(e) => handleSelectChange("priority", e.target.value)}
              options={priorities}
            />
          </div>
        </div>

        {/* Features Documentation */}
        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
            FormSelect Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800 dark:text-purple-200">
            <ul className="space-y-2">
              <li>• Left icons with proper positioning</li>
              <li>• Three size variants: sm, md, lg</li>
              <li>• Three style variants: default, filled, outlined</li>
              <li>• Error and helper text support</li>
              <li>• Required field indicators</li>
            </ul>
            
            <ul className="space-y-2">
              <li>• Full width option</li>
              <li>• Disabled state</li>
              <li>• Dark mode support</li>
              <li>• Accessibility features (ARIA labels)</li>
              <li>• Custom chevron icon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 