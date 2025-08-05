"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { DollarSign, ArrowLeftRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { currencies } from "@/common-imports/currencies";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";

export default function CurrencyConverter() {
  const [fromValue, setFromValue] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [rate, setRate] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertCurrency = async () => {
    const value = parseFloat(fromValue);
    if (isNaN(value) || fromCurrency === toCurrency) {
      setResult(value.toString());
      setRate(1);
      return;
    }

    setIsLoading(true);
    try {
      // Using a free currency API
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();

      if (data.rates && data.rates[toCurrency]) {
        const exchangeRate = data.rates[toCurrency];
        const converted = value * exchangeRate;
        setResult(converted.toFixed(4));
        setRate(exchangeRate);
        setLastUpdated(new Date().toLocaleString());
      } else {
        toast.error("Unable to fetch exchange rate");
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      toast.error("Error fetching exchange rate");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [fromValue, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find((c) => c.code === code);
    return currency?.symbol || code;
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
            href="/finance"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Finance Tools
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">
            Currency Converter
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Currency Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert between 170+ world currencies with live exchange rates
          </p>
        </div>

        {/* Converter */}
        <div className="max-w-2xl mx-auto">
          <div className="tool-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* From */}
              <div>
                <FormInput
                  label="Amount"
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Enter amount"
                  leftIcon={DollarSign}
                />
              </div>

              {/* Currency Selector */}
              <div>
                <FormSelect
                  label="From Currency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  leftIcon={DollarSign}
                  options={currencies.map((currency) => ({
                    value: currency.code,
                    label: `${currency.code} - ${currency.name}`
                  }))}
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  title="Swap currencies"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <FormSelect
                  label="To Currency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  leftIcon={DollarSign}
                  options={currencies.map((currency) => ({
                    value: currency.code,
                    label: `${currency.code} - ${currency.name}`
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Result
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                  {isLoading ? "Loading..." : result || "0"}
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            {rate > 0 && fromCurrency !== toCurrency && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Exchange Rate:
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                  </div>
                </div>
                {lastUpdated && (
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Last updated: {lastUpdated}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Popular Conversions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Conversions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { from: "USD", to: "EUR", amount: "1" },
                { from: "EUR", to: "GBP", amount: "1" },
                { from: "USD", to: "JPY", amount: "1" },
                { from: "GBP", to: "USD", amount: "1" },
                { from: "EUR", to: "USD", amount: "1" },
                { from: "USD", to: "CAD", amount: "1" },
              ].map((conversion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(conversion.from);
                    setToCurrency(conversion.to);
                    setFromValue(conversion.amount);
                  }}
                  className="tool-card p-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {conversion.amount} {conversion.from} to {conversion.to}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getCurrencySymbol(conversion.from)} →{" "}
                    {getCurrencySymbol(conversion.to)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
