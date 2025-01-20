import {
  ProductDetailOptionDepth1Response,
  ProductDetailOptionDepth2Response,
  ProductDetailOptionDepth3Response,
  ProductDetailOptionProductLikeResponse,
  ProductDetailResponse
} from '@/models/services/responses/products/detail/ProductItemDetailResponse'
import { BaseApi } from '../../BaseApi'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

class ProductDetailApi extends BaseApi {
  constructor() {
    super('shop/item')
  }

  getItemProductDetail(id: number): Promise<ProductDetailResponse> {
    return this.get(
      'item-detail',
      {
        productKey: id
      }
    )
  }

  getItemProductInfoDetail(id: number): Promise<ProductDetailResponse> {
    return this.get('item-info-ancm', {
      productKey: id
    })
  }

  getOptionItemProductDepth1(productKey: number, isSingle: boolean): Promise<ProductDetailOptionDepth1Response> {
    return this.get(
      !isSingle ? 'item-option-lclass' : 'item-option-single',
      {
        productKey
      },
      false
    )
  }

  getOptionItemProductDepth2(productKey: number, option1DepthName: string): Promise<ProductDetailOptionDepth2Response> {
    return this.get(
      'item-option-mclass',
      {
        productKey,
        option1DepthName
      },
      false
    )
  }

  getOptionItemProductDepth3(productKey: number, option1DepthName: string, option2DepthName: string): Promise<ProductDetailOptionDepth3Response> {
    return this.get(
      'item-option-sclass',
      {
        productKey,
        option1DepthName,
        option2DepthName
      },
      false
    )
  }

  postItemLike(productKey: number): Promise<BaseModelErrorResponse> {
    return this.post('item-like', { productKey })
  }

  getItemLike(productKey: number): Promise<ProductDetailOptionProductLikeResponse> {
    return this.get('item-like', { productKey }, false)
  }

  deleteItemLike(productKey: number): Promise<BaseModelErrorResponse> {
    return this.delete('item-like-delete', { productKey })
  }
}

export const productDetailApi = new ProductDetailApi()
