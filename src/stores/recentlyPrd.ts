import { defineStore } from 'pinia'
import { MyPageRecentlyProduct } from '@/models/views/myPage/MyPageProductReview'
import { ProductDetailModel } from '@/models/views/products/ProductDetailReviewModel'
import dayjs from 'dayjs'
type ItemProps = ProductDetailModel & { productKey: number }

const thirtyDaysAgoFilter = (item: MyPageRecentlyProduct[]) => {
  if (item.length === 0) return []
  const currentTime = dayjs().unix()
  const thirtyDaysAgo = dayjs().subtract(30, 'day').unix()
  return item.filter((item) => item.timestamp >= thirtyDaysAgo && item.timestamp <= currentTime)
}

const removeDuplicates = (prdList: MyPageRecentlyProduct[], productKey: number) => {
  return prdList.some((item) => item.productKey === productKey)
}
const setLocalStorageItem = (prdInfo: ItemProps, prdList: MyPageRecentlyProduct[]) => {
  const { productKey, productName, salePrice, foAttachFileList } = prdInfo
  const newItem = { productKey, productName, salePrice, foAttachFileList, timestamp: dayjs().unix() }
  const newItemList = [{ ...newItem }, ...prdList]
  newItemList.splice(20)
  return newItemList
}

export const useRecentlyItemStore = defineStore('recently-prd', {
  state: () => {
    return {
      prdList: [] as MyPageRecentlyProduct[]
    }
  },

  actions: {
    updatePrdInfo(prdInfo: ItemProps) {
      const isDuplicate = removeDuplicates(this.prdList, prdInfo.productKey)
      if (isDuplicate) return []
      this.prdList = setLocalStorageItem(prdInfo, this.prdList)
    },
    deletePrdInfo(productKey: number[]) {
      this.prdList = this.prdList.filter((item) => !productKey.includes(item.productKey))
    },
    filterDaysAgoPrdInfo() {
      const daysFilterList = thirtyDaysAgoFilter(this.prdList)
      if (daysFilterList.length === 0) {
        localStorage.removeItem('recently')
      }
      this.prdList = daysFilterList
    }
  },
  persist: {
    enabled: true, //storage 저장유무
    strategies: [
      {
        key: 'recently', //storage key값 설정
        storage: localStorage // localStorage, sessionStorage storage 선택 default sessionStorage
      }
    ]
  }
})
