"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Ruler, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { lengthUnits } from "@/common-imports/length-units";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";

export default function LengthConverter() {
  const [fromValue, setFromValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [result, setResult] = useState("");

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setResult("");
      return;
    }

    const fromUnitData = lengthUnits.find((unit) => unit.symbol === fromUnit);
    const toUnitData = lengthUnits.find((unit) => unit.symbol === toUnit);

    if (fromUnitData && toUnitData) {
      // Convert to meters first, then to target unit
      const meters = value * fromUnitData.toMeters;
      const converted = meters / toUnitData.toMeters;
      setResult(converted.toFixed(6));
    }
  };

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
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
            href="/unit-converters"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Unit Converters
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">
            Length Converter
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Ruler className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Length Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert between different length units quickly and easily
          </p>
        </div>

        {/* Converter */}
        <div className="max-w-2xl mx-auto">
          <div className="tool-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* From */}
              <div>
                <FormInput
                  label="From"
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Enter value"
                  leftIcon={Ruler}
                  variant="outlined"
                />
              </div>

              {/* Unit Selector */}
              <div>
                <FormSelect
                  label="Unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  leftIcon={Ruler}
                  options={lengthUnits.map((unit) => ({
                    value: unit.symbol,
                    label: `${unit.name} (${unit.symbol})`,
                  }))}
                  variant="outlined"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapUnits}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  title="Swap units"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <FormSelect
                  label="To Unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  leftIcon={Ruler}
                  options={lengthUnits.map((unit) => ({
                    value: unit.symbol,
                    label: `${unit.name} (${unit.symbol})`,
                  }))}
                  variant="outlined"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Result
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                  {result || "0"}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Conversions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Conversions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { from: "1", fromUnit: "m", toUnit: "ft" },
                { from: "1", fromUnit: "km", toUnit: "mi" },
                { from: "1", fromUnit: "in", toUnit: "cm" },
                { from: "1", fromUnit: "ft", toUnit: "m" },
                { from: "1", fromUnit: "mi", toUnit: "km" },
                { from: "1", fromUnit: "cm", toUnit: "in" },
              ].map((quick, index) => {
                const fromUnitData = lengthUnits.find(
                  (unit) => unit.symbol === quick.fromUnit
                );
                const toUnitData = lengthUnits.find(
                  (unit) => unit.symbol === quick.toUnit
                );
                const quickResult =
                  fromUnitData && toUnitData
                    ? (
                        (parseFloat(quick.from) * fromUnitData.toMeters) /
                        toUnitData.toMeters
                      ).toFixed(4)
                    : "0";

                return (
                  <div key={index} className="tool-card p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {quick.from} {quick.fromUnit} =
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {quickResult} {quick.toUnit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
