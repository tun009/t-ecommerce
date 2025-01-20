import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { CategoryBannerImageModel } from '@/models/views/categories/CategoryListProductModel'
import { BaseApi } from '../BaseApi'

class CategoryDisplayApi extends BaseApi {
  constructor() {
    super('shop/display')
  }
  getBannerCategoryList(cat: string): Promise<BaseModelResponse<CategoryBannerImageModel[]>> {
    return this.get(`display-category/banner/list/${cat}`)
  }
}

export const categoryDisplayApi = new CategoryDisplayApi()
