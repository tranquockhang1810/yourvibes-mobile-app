export class BaseApiResponseModel<T extends Object> {
  constructor(
    public data: T,
    public paging: Paging,
    public message: string,
    public error: Error,
    public code: number,
  ) {}
}

export interface Paging {
  limit: number;
  page: number;
  total: number;
}

export class Error {
  code?: number;
  message?: string;
}