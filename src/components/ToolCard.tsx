"use client";

import Link from "next/link";
import {
  FileText,
  Table,
  Presentation,
  Image,
  Code,
  Scaling,
  Merge,
  Scissors,
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Gauge,
  Clock,
  DollarSign,
  Calculator,
  CreditCard,
  Receipt,
  Type,
  Hash,
  QrCode,
  BarChart3,
  Music,
  Fingerprint,
  Palette,
  GitCompare,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ConversionTool } from "@/lib/conversion-tools";

const iconMap: Record<string, any> = {
  FileText,
  Table,
  Presentation,
  Image,
  Code,
  Scaling,
  Merge,
  Scissors,
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Gauge,
  Clock,
  DollarSign,
  Calculator,
  CreditCard,
  Receipt,
  Type,
  Hash,
  QrCode,
  BarChart3,
  Music,
  Fingerprint,
  Palette,
  GitCompare,
  Terminal,
};

interface ToolCardProps {
  tool: ConversionTool;
  className?: string;
}

export default function ToolCard({ tool, className }: ToolCardProps) {
  const IconComponent = iconMap[tool.icon] || FileText;

  return (
    <Link href={tool.route}>
      <div className={cn("tool-card group cursor-pointer", className)}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              {tool.popular && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                  Popular
                </span>
              )}
              {tool.new && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                  New
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {tool.description}
            </p>

            <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="capitalize">
                {tool.category.replace("-", " ")}
              </span>
              <span className="mx-2">•</span>
              <span>Free tool</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
