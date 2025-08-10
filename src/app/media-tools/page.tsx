import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { Image, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getToolsByCategory } from "@/lib/conversion-tools";

export default function MediaToolsPage() {
  const mediaTools = getToolsByCategory("media-tools");

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
            Media Tools
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900 mb-6">
            <Image className="h-10 w-10 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Media Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Resize, convert, and optimize images, videos, and audio files with
            ease. Fast, simple, and secure processing.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Use Our Media Tools?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Image className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Multi-Format Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work with PNG, JPG, WebP, MP3, WAV, MP4, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Image className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                High Quality Output
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Preserve clarity and resolution during conversions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Image className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quick Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get results in seconds without installing any software.
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
