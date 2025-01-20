import { DummyImage } from '@/assets/images'
import { ProductState } from '@/models/uikits/WelfareUnitCardTypes'

export const dataOrderHistoryPage = {
  productCustomer: {
    id:0,
    productName: '[폴스미스] 남성 디노 맨투맨 블랙 두줄로 제목이길게 나온다고하면 이렇게 나옵니다람쥐 길면계속가다가나중에말줄임이나오지...',
    productImage: DummyImage,
    pricePromotion: 99999999,
    quantity: 9999,
    state: ProductState.normal,
    nameOption: '옵션명 옵션명옵션명 옵션명옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명 옵션...',
    config: {
      name: '추가구성',
      des: '양말세트양말세트양말세트양말세트 양말세트양말세트양말세트양말세트'
    },
    gift: {
      name: '사은품',
      des: ['블랙 비니']
    }
  }
}
