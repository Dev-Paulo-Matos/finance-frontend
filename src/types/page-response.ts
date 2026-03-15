export interface PageResponse<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}