import { BaseApi } from '@/services/api/BaseApi'
import {
  SearchAutocomplete,
  SearchCategoryProductModel,
  SearchExhibitionModelResponse,
  SearchFilterInfoResponse,
  SearchProductBannerResponse,
  SearchProductResponse
} from '@/models/services/responses/search/SearchResponse'
import { SearchOptionsModel } from '@/models/views/cart/SearchResultModel'
import { ListeModelResponse } from '@/models/services/responses/BaseModelResponse'
import { CategoryProductSearchListRequest } from '@/models/services/requests/categories/CategoryListProductRequest'

class SearchResultApi extends BaseApi {
  constructor() {
    super('shop')
  }
  async getListSearchProduct(params: SearchOptionsModel): Promise<SearchProductResponse> {
    return await this.get('search/product', params)
  }

  async getListSearchProductBanner(keyword: string): Promise<SearchProductBannerResponse> {
    return await this.get(`display/search-word-banner/list/${keyword}`)
  }

  async getSearchFilterInfo(customerKey: number, searchWord: string): Promise<SearchFilterInfoResponse> {
    return await this.get(`search/filter?customerKey=${customerKey}&searchWord=${searchWord}`)
  }
  async getExhibitionEventImages(customerKey: number, searchWord: string): Promise<SearchExhibitionModelResponse> {
    return await this.get(`search/exhibition?customerKey=${customerKey}&searchWord=${searchWord}`)
  }

  getAutocomplete = (searchWord: string): Promise<ListeModelResponse<SearchAutocomplete>> => {
    return this.get(`search/autocomplete/${searchWord}`)
  }

  async searchCategoryProduct(params: CategoryProductSearchListRequest): Promise<ListeModelResponse<SearchCategoryProductModel>> {
    return await this.get(`/search/category`, params)
  }
}

export const searchApi = new SearchResultApi()
