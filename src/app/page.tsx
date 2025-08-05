import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Users,
  FileText,
  Ruler,
  DollarSign,
  Code,
  Image,
  Terminal,
} from "lucide-react";
import {
  conversionTools,
  categories,
  getPopularTools,
  getToolsByCategory,
} from "@/lib/conversion-tools";
import Link from "next/link";

export default function HomePage() {
  const popularTools = getPopularTools();
  const fileTools = getToolsByCategory("file-converters").slice(0, 6);
  const unitTools = getToolsByCategory("unit-converters").slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              All-in-One
              <span className="block text-blue-200">Conversion Tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Convert files, units, currencies, and more with our comprehensive
              suite of free online tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/file-converters"
                className="btn-secondary text-lg px-8 py-3 inline-flex items-center"
              >
                File Converters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Most Popular Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our most used conversion tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tool Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Browse tools by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent =
                iconMap[category.icon as keyof typeof iconMap] || FileText;
              const tools = getToolsByCategory(category.id);

              return (
                <Link key={category.id} href={`/${category.id}`}>
                  <div className="tool-card group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {tools.slice(0, 3).map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {tool.name}
                        </div>
                      ))}
                      {tools.length > 3 && (
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          +{tools.length - 3} more tools
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ConvertAll?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We provide the best conversion experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast & Free
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All tools are completely free and process files quickly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your files are processed securely and deleted automatically
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Works Everywhere
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use on any device, no downloads or installations required
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for mobile devices and tablets
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Trusted by Millions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Used by millions of users worldwide every day
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Developer Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                API access and embeddable widgets available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Converting?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust ConvertAll for their conversion
            needs
          </p>
          <Link
            href="/tools"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const iconMap = {
  FileText,
  Ruler,
  DollarSign,
  Code,
  Image,
  Terminal,
};
