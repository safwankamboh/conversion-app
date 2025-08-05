import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { Search, Filter } from "lucide-react";
import {
  conversionTools,
  categories,
  getToolsByCategory,
} from "@/lib/conversion-tools";

export default function AllToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Conversion Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our complete collection of free online conversion tools.
            From file converters to unit calculators, we have everything you
            need.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const tools = getToolsByCategory(category.id);

            return (
              <div key={category.id} className="animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Filter className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {tools.length} tools
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Our Tool Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive suite of conversion tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {conversionTools.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total Tools
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Categories</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Free to Use
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-300">Available</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Need Something Specific?
            </h2>
            <p className="text-blue-100 mb-6">
              Can't find the tool you're looking for? Let us know and we'll add
              it to our collection.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              Request a Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
