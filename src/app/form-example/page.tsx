"use client";

import { useState } from "react";
import FormInput from "@/components/form-input";
import Header from "@/components/Header";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function FormExample() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    birthDate: "",
    salary: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.phone &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("Form data:", formData);
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
          <span className="text-gray-600 dark:text-gray-300">Form Example</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Form Input Component Example
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            See how the FormInput component works in a real-world form
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    placeholder="Enter your first name"
                    leftIcon={User}
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    error={errors.firstName}
                    required
                  />

                  <FormInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    leftIcon={User}
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    error={errors.lastName}
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    leftIcon={Mail}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    required
                  />

                  <FormInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    leftIcon={Phone}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                    helperText="Optional - Include country code if international"
                  />
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Security
                </h3>
                <div className="space-y-4">
                  <FormInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    leftIcon={Lock}
                    rightIcon={showPassword ? EyeOff : Eye}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    error={errors.password}
                    required
                  />

                  <FormInput
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    leftIcon={Lock}
                    rightIcon={showConfirmPassword ? EyeOff : Eye}
                    onRightIconClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    error={errors.confirmPassword}
                    required
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <FormInput
                    label="Address"
                    placeholder="Enter your address"
                    leftIcon={MapPin}
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    fullWidth
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Date of Birth"
                      type="date"
                      leftIcon={Calendar}
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                    />

                    <FormInput
                      label="Annual Salary"
                      type="number"
                      placeholder="Enter your annual salary"
                      leftIcon={DollarSign}
                      value={formData.salary}
                      onChange={(e) =>
                        handleInputChange("salary", e.target.value)
                      }
                    />
                  </div>

                  <FormInput
                    label="Bio"
                    placeholder="Tell us about yourself"
                    leftIcon={FileText}
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    fullWidth
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                      address: "",
                      birthDate: "",
                      salary: "",
                      bio: "",
                    });
                    setErrors({});
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Submit Form</span>
                </button>
              </div>
            </form>
          </div>

          {/* Features Highlight */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
              FormInput Features Used in This Example
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
              <ul className="space-y-2">
                <li>
                  • Different input types (text, email, password, tel, date,
                  number)
                </li>
                <li>• Left and right icons with click handlers</li>
                <li>• Error validation and display</li>
                <li>• Helper text for additional information</li>
                <li>• Required field indicators</li>
              </ul>
              <ul className="space-y-2">
                <li>• Full width option for longer inputs</li>
                <li>• Responsive grid layout</li>
                <li>• Form validation with error handling</li>
                <li>• Dark mode support</li>
                <li>• Accessibility features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
