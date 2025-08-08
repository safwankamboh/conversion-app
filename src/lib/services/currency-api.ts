import api from '../api';

export interface CurrencyRate {
  currency: string;
  rate: number;
  lastUpdated: string;
}

export interface CurrencyConversion {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  timestamp: string;
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

// Get latest exchange rates
export const getExchangeRates = async (baseCurrency: string = 'USD'): Promise<CurrencyRate[]> => {
  try {
    const response = await api.get(`/currency/rates?base=${baseCurrency}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch exchange rates');
  }
};

// Convert currency
export const convertCurrency = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<CurrencyConversion> => {
  try {
    const response = await api.post('/currency/convert', {
      fromCurrency,
      toCurrency,
      amount,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Currency conversion failed');
  }
};

// Get supported currencies
export const getSupportedCurrencies = async (): Promise<CurrencyInfo[]> => {
  try {
    const response = await api.get('/currency/supported');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch supported currencies');
  }
};

// Get currency history
export const getCurrencyHistory = async (
  fromCurrency: string,
  toCurrency: string,
  days: number = 30
): Promise<Array<{ date: string; rate: number }>> => {
  try {
    const response = await api.get(`/currency/history?from=${fromCurrency}&to=${toCurrency}&days=${days}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch currency history');
  }
};

// Get currency symbols and info
export const getCurrencyInfo = async (): Promise<CurrencyInfo[]> => {
  try {
    const response = await api.get('/currency/info');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch currency information');
  }
};
