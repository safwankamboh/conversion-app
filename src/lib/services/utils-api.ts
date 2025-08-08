import api from '../api';

export interface AppStats {
  totalConversions: number;
  totalUsers: number;
  supportedFormats: number;
  uptime: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  defaultCurrency: string;
  defaultLengthUnit: string;
  notifications: boolean;
}

export interface SystemInfo {
  version: string;
  lastUpdate: string;
  maintenanceMode: boolean;
  apiStatus: 'healthy' | 'degraded' | 'down';
}

// Get application statistics
export const getAppStats = async (): Promise<AppStats> => {
  try {
    const response = await api.get('/stats/app');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch app statistics');
  }
};

// Get user preferences
export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const response = await api.get('/user/preferences');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user preferences');
  }
};

// Update user preferences
export const updateUserPreferences = async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
  try {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user preferences');
  }
};

// Get system information
export const getSystemInfo = async (): Promise<SystemInfo> => {
  try {
    const response = await api.get('/system/info');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch system information');
  }
};

// Check API health
export const checkApiHealth = async (): Promise<{ status: string; timestamp: string }> => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error: any) {
    throw new Error('API health check failed');
  }
};

// Get supported file formats
export const getSupportedFileFormats = async (): Promise<{
  [category: string]: Array<{
    extension: string;
    name: string;
    description: string;
    maxSize: number;
  }>;
}> => {
  try {
    const response = await api.get('/formats/supported');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch supported formats');
  }
};

// Get conversion limits
export const getConversionLimits = async (): Promise<{
  maxFileSize: number;
  maxFilesPerBatch: number;
  maxConcurrentConversions: number;
  rateLimit: {
    requests: number;
    window: number;
  };
}> => {
  try {
    const response = await api.get('/limits/conversion');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch conversion limits');
  }
};

// Log user activity
export const logUserActivity = async (activity: {
  action: string;
  tool: string;
  details?: any;
}): Promise<void> => {
  try {
    await api.post('/analytics/activity', activity);
  } catch (error: any) {
    // Don't throw error for analytics logging
    console.warn('Failed to log user activity:', error);
  }
};

// Get user conversion history
export const getUserConversionHistory = async (
  limit: number = 10,
  offset: number = 0
): Promise<Array<{
  id: string;
  tool: string;
  inputFormat: string;
  outputFormat: string;
  fileSize: number;
  timestamp: string;
  status: 'completed' | 'failed' | 'processing';
}>> => {
  try {
    const response = await api.get(`/user/history?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch conversion history');
  }
};
