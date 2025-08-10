import api from '../api';

export interface ConversionOptions {
  quality?: 'low' | 'medium' | 'high';
  pageSize?: 'a4' | 'letter' | 'legal';
  orientation?: 'portrait' | 'landscape';
  margins?: 'normal' | 'wide' | 'narrow';
}

export interface ConversionResponse {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: string;
  error?: string;
}

export interface BatchConversionResponse {
  success: boolean;
  files: Array<{
    originalName: string;
    downloadUrl: string;
    fileName: string;
    fileSize: string;
  }>;
  error?: string;
}

// Word to PDF conversion
export const convertWordToPdf = async (
  file: File,
  options: ConversionOptions = {}
): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    const response = await api.post('/convert/word-to-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 seconds for file conversion
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Conversion failed',
    };
  }
};

// Batch Word to PDF conversion
export const convertBatchWordToPdf = async (
  files: File[],
  options: ConversionOptions = {}
): Promise<BatchConversionResponse> => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append('options', JSON.stringify(options));

    const response = await api.post('/convert/batch/word-to-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes for batch conversion
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      files: [],
      error: error.response?.data?.message || 'Batch conversion failed',
    };
  }
};

// Get conversion status
export const getConversionStatus = async (jobId: string): Promise<any> => {
  try {
    const response = await api.get(`/convert/status/${jobId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get conversion status');
  }
};

// Download converted file
export const downloadConvertedFile = async (fileId: string): Promise<Blob> => {
  try {
    const response = await api.get(`/convert/download/${fileId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to download file');
  }
};

// Get supported formats
export const getSupportedFormats = async (): Promise<any> => {
  try {
    const response = await api.get('/convert/formats');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get supported formats');
  }
};

// Get conversion limits
export const getConversionLimits = async (): Promise<any> => {
  try {
    const response = await api.get('/convert/limits');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get conversion limits');
  }
};

// Single PDF to Word conversion
export const convertPdfToWord = async (
  file: File
): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/convert/pdf-to-word', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 1 minute for single file
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Conversion failed',
    };
  }
};

// Batch PDF to Word conversion
export const convertBatchPdfToWord = async (
  files: File[]
): Promise<BatchConversionResponse> => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response = await api.post('/convert/batch/pdf-to-word', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes for batch conversion
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      files: [],
      error: error.response?.data?.message || 'Batch conversion failed',
    };
  }
};

