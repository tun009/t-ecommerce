import { CategoryDataModel } from '@/models/views/categories/CategoryListProductModel'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface CategoryDataResponse extends BaseModelResponse<CategoryDataModel[]> {}
