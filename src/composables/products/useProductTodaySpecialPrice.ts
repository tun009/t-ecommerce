import { convertTimeProduct } from '@/commons/common'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { OtherCornerSpecialPriceResponse } from '@/models/views/other/OtherSpecialPriceModel'
import { otherApi } from '@/services/api/other/otherApi'
import { onBeforeMount, ref } from 'vue'
import { useLoading } from '../common/useLoading'

export const useProductTodaySpecialPricePage = (props: { id: number }) => {
  const productLg = ref<WelfareUnitProductModel[]>([])
  const { setLoading } = useLoading()
  onBeforeMount(async () => {
    setLoading?.(true)
    try {
      const data = await otherApi.getDisplayConnerGNBList(props?.id)
      productLg.value = data.data.reduce((currentArray: WelfareUnitProductModel[], item: any) => {
        return [
          ...currentArray,
          ...item.foCornerSpecialPriceResponseList.map((_item: OtherCornerSpecialPriceResponse) => {
            console.log(_item.productDiscountPrice / _item.productSalePrice)
            return {
              id: _item.productKey,
              titleDayWarning: _item.endTimeFlag,
              thumbnailProduct: _item.imageUrl,
              thumbnailBo: _item.benefitImageUrl,
              pricePromotion: _item.productDiscountPrice,
              price: _item.productSalePrice,
              percent: _item.productDiscountPrice / _item.productSalePrice,
              name: _item.productName,
              productLikeYn: _item.productLikeYn,
              timeCount: convertTimeProduct(_item.remainEndTime),
              productSaleStatus: _item.productSaleStatus
            }
          })
        ]
      }, [])
    } catch (error) {
    } finally {
      setLoading?.(false)
    }
  })

  return {
    productLg
  }
}
