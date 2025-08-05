'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { DollarSign, ArrowLeftRight, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Currency {
  code: string
  name: string
  symbol: string
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮' },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'so'm' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$' },
  { code: 'PYG', name: 'Paraguayan Guaraní', symbol: '₲' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.' },
  { code: 'DOP', name: 'Dominican Peso', symbol: '$' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: '$' },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: '$' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: '$' },
  { code: 'XCD', name: 'East Caribbean Dollar', symbol: '$' },
  { code: 'BZD', name: 'Belize Dollar', symbol: '$' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: '$' },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'K' },
  { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: '$' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: '$' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L' },
  { code: 'SZL', name: 'Eswatini Lilangeni', symbol: 'L' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf' },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK' },
  { code: 'ZMK', name: 'Zambian Kwacha', symbol: 'ZK' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT' },
  { code: 'STD', name: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG' },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: '$' },
  { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le' },
  { code: 'SSP', name: 'South Sudanese Pound', symbol: '£' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' },
  { code: 'MRO', name: 'Mauritanian Ouguiya', symbol: 'UM' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK' },
  { code: 'ZMK', name: 'Zambian Kwacha', symbol: 'ZK' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT' },
  { code: 'STD', name: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG' },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: '$' },
  { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le' },
  { code: 'SSP', name: 'South Sudanese Pound', symbol: '£' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' },
  { code: 'MRO', name: 'Mauritanian Ouguiya', symbol: 'UM' }
]

export default function CurrencyConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState('')
  const [rate, setRate] = useState(0)
  const [lastUpdated, setLastUpdated] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const convertCurrency = async () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || fromCurrency === toCurrency) {
      setResult(value.toString())
      setRate(1)
      return
    }

    setIsLoading(true)
    try {
      // Using a free currency API
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      const data = await response.json()
      
      if (data.rates && data.rates[toCurrency]) {
        const exchangeRate = data.rates[toCurrency]
        const converted = value * exchangeRate
        setResult(converted.toFixed(4))
        setRate(exchangeRate)
        setLastUpdated(new Date().toLocaleString())
      } else {
        toast.error('Unable to fetch exchange rate')
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      toast.error('Error fetching exchange rate')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    convertCurrency()
  }, [fromValue, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code)
    return currency?.symbol || code
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/finance" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            Finance Tools
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">Currency Converter</span>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="input-field"
                  placeholder="Enter amount"
                />
              </div>

              {/* Currency Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Currency
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input-field"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Currency
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input-field"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Result
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                  {isLoading ? 'Loading...' : (result || '0')}
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
                { from: 'USD', to: 'EUR', amount: '1' },
                { from: 'EUR', to: 'GBP', amount: '1' },
                { from: 'USD', to: 'JPY', amount: '1' },
                { from: 'GBP', to: 'USD', amount: '1' },
                { from: 'EUR', to: 'USD', amount: '1' },
                { from: 'USD', to: 'CAD', amount: '1' }
              ].map((conversion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(conversion.from)
                    setToCurrency(conversion.to)
                    setFromValue(conversion.amount)
                  }}
                  className="tool-card p-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {conversion.amount} {conversion.from} to {conversion.to}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getCurrencySymbol(conversion.from)} → {getCurrencySymbol(conversion.to)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 