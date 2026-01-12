export interface ApiResponse<T> {
  Success: boolean;
  Code: number;
  Message: string;
  Data: T;
  MetaData?: any;
}
