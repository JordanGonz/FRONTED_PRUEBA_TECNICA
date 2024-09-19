import { Pagination } from './http-pagination.interface';

export interface ApiResponse<T> {
  data: T;
  success:boolean;
  message: string;
  meta: {
    pagination: Pagination;
    message: string;
    code: number;
    
  };
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  path: string;
  errors: unknown[];
}
