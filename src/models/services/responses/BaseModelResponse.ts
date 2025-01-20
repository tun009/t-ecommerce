export interface BaseModelErrorResponse {
  code?: string
  message?: string
}

export interface BaseModelResponse<T> extends BaseModelErrorResponse {
  data: T
}

export interface DataTablePaginationResponseModel<T> extends BaseModelErrorResponse {
  data: T[]
  totalItems: number
}

export interface ListeModelResponse<T> extends BaseModelErrorResponse {
  data: T[]
  page?: {
    pageNum: number
    totalCount: number
  }
}
