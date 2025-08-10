import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { Code, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getToolsByCategory } from "@/lib/conversion-tools";

export default function DeveloperToolsPage() {
  const developerTools = getToolsByCategory("developer-tools");

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
            Developer Tools
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900 mb-6">
            <Code className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tools for developers and engineers — from code formatters to API
            testers, all in one place.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developerTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Use Our Developer Tools?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Code Utilities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautify, minify, and validate code instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Code className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                API & JSON Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Test APIs and format JSON with ease.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Code className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Developer-Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built for speed and productivity, right in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}  
        <div className="mt-16 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            View All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
