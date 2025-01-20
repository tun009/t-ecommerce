import { CategoryDataResponse } from '@/models/services/responses/categories/CategoryProductResponse'
import { BaseApi } from '../BaseApi'
import { CategoryListProductResponse } from '@/models/services/responses/categories/CategoryListProductResponse'
import { CategoryListProductRequest } from '@/models/services/requests/categories/CategoryListProductRequest'
import { YesNoEnum } from '@/models/common'

class CategoryListProductApi extends BaseApi {
  constructor() {
    super('shop/item')
  }

  getProductsByCategories(params: CategoryListProductRequest): Promise<CategoryListProductResponse> {
    return this.get('display-category-product-list', { ...params })
  }

  getCategoryDeep(deep: number, upperDisplayCategoryId: string, allFlag: YesNoEnum = YesNoEnum.N): Promise<CategoryDataResponse> {
    return this.get(`display-category-depth${deep}`, {
      upperDisplayCategoryId,
      allFlag
    })
  }

  getCategoryList(): Promise<CategoryDataResponse> {
    return this.get(`display-category-list`)
  }
}

export const categoryListProductApi = new CategoryListProductApi()
