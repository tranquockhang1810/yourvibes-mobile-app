export class BaseApiResponseModel<T extends Object> {
  constructor(
    public data: T,
    public paging: Paging,
    public message: string,
    public error: Error,
    public code: number,
  ) {}
}

export function createBaseApiResponseModel<T extends Object>(
  data: any
): BaseApiResponseModel<T> {
  // Log the raw response to inspect the structure
  console.log("Raw response data:", data);

  // Log each individual field to ensure the structure matches
  console.log("data.data:", data.data);
  console.log("data.paging:", data.paging);
  console.log("data.message:", data.message);
  console.log("data.error:", data.error);
  console.log("data.code:", data.code);

  return new BaseApiResponseModel<T>(
    data.data, 
    data.paging, 
    data.message, 
    data.error, 
    data.code
  );
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

export enum Privacy {
  PUBLIC = "public",
  PRIVATE = "private",
  FRIEND_ONLY = "friend_only",
}