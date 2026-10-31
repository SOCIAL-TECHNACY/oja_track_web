export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export interface ApiError {
  success: false;
  statusCode?: number;
  error?: string;
  message: string;
  details?: any;
}
