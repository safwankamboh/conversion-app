"use client";

import { useState } from "react";
import FormInput from "@/components/form-input";
import {
  Search,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

export default function FormInputDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    amount: "",
    date: "",
    search: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Form Input Component Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A comprehensive, reusable form input component with various features
            and styling options.
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
                <FormInput
                  label="Basic Input"
                  placeholder="Enter your text here"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <FormInput
                  label="With Left Icon"
                  placeholder="Search..."
                  leftIcon={Search}
                  value={formData.search}
                  onChange={(e) => handleInputChange("search", e.target.value)}
                />

                <FormInput
                  label="With Right Icon"
                  placeholder="Enter amount"
                  rightIcon={DollarSign}
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                />

                <FormInput
                  label="With Both Icons"
                  placeholder="Enter your email"
                  leftIcon={Mail}
                  rightIcon={CheckCircle}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* Size Variants */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Size Variants
              </h2>

              <div className="space-y-4">
                <FormInput
                  label="Small Size"
                  placeholder="Small input"
                  size="sm"
                  leftIcon={User}
                />

                <FormInput
                  label="Medium Size (Default)"
                  placeholder="Medium input"
                  size="md"
                  leftIcon={User}
                />

                <FormInput
                  label="Large Size"
                  placeholder="Large input"
                  size="lg"
                  leftIcon={User}
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
                <FormInput
                  label="Default Variant"
                  placeholder="Default style"
                  variant="default"
                  leftIcon={FileText}
                />

                <FormInput
                  label="Filled Variant"
                  placeholder="Filled style"
                  variant="filled"
                  leftIcon={FileText}
                />

                <FormInput
                  label="Outlined Variant"
                  placeholder="Outlined style"
                  variant="outlined"
                  leftIcon={FileText}
                />
              </div>
            </div>

            {/* Validation Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Validation States
              </h2>

              <div className="space-y-4">
                <FormInput
                  label="With Error"
                  placeholder="This input has an error"
                  error="This field is required"
                  leftIcon={AlertCircle}
                />

                <FormInput
                  label="With Helper Text"
                  placeholder="This input has helper text"
                  helperText="This is helpful information about the field"
                  leftIcon={Info}
                />

                <FormInput
                  label="Required Field"
                  placeholder="This field is required"
                  required
                  leftIcon={User}
                />

                <FormInput
                  label="Disabled Input"
                  placeholder="This input is disabled"
                  disabled
                  leftIcon={Lock}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Input Example */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Password Input with Toggle
          </h2>

          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            leftIcon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() => setShowPassword(!showPassword)}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>

        {/* Form Example */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Complete Form Example
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              placeholder="Enter your full name"
              leftIcon={User}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />

            <FormInput
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              leftIcon={Mail}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />

            <FormInput
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              leftIcon={Phone}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />

            <FormInput
              label="Date of Birth"
              type="date"
              leftIcon={Calendar}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />

            <FormInput
              label="Address"
              placeholder="Enter your address"
              leftIcon={MapPin}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              fullWidth
            />

            <FormInput
              label="Amount"
              placeholder="Enter amount"
              type="number"
              leftIcon={DollarSign}
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
            />
          </div>
        </div>

        {/* Features Documentation */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Component Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <ul className="space-y-2">
              <li>
                • Multiple input types (text, email, password, number, etc.)
              </li>
              <li>• Left and right icons with click handlers</li>
              <li>• Three size variants: sm, md, lg</li>
              <li>• Three style variants: default, filled, outlined</li>
              <li>• Error and helper text support</li>
            </ul>

            <ul className="space-y-2">
              <li>• Full width option</li>
              <li>• Required field indicator</li>
              <li>• Disabled state</li>
              <li>• Dark mode support</li>
              <li>• Accessibility features (ARIA labels)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
