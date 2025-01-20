<script setup lang="ts">
import { DummyImage } from '@/assets/images'
import { ProductModel, ProductState } from '@/models/uikits/WelfareUnitCardTypes'
import { ref } from 'vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareUnitCardOrder from '../uikit/unit/WelfareUnitCardOrder.vue'
import WelfareButtonLine from '../uikit/button/WelfareButtonLine.vue'
const productOrder = ref<ProductModel>({
  productName: '[폴스미스] 남성 디노 맨투맨 블랙 두줄로 제목이길게 나온다고 하면 이렇게 나옵니다람쥐 길면계속가가제목제목제목제목제목제...',
  productImage: DummyImage,
  pricePromotion: 99999999,
  quantity: 9999,
  state: ProductState.normal,
  nameOption: '옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명 ...',
  config: {
    name: '추가구성',
    des: '양말세트양말세트양말세트양말세트 양말세트양말세트양말세트양말세트'
  },
  gift: {
    name: '사은품',
    des: ['블랙 비니']
  }
})
const productListOrder = ref([
  {
    data: productOrder,
    quantityOrder: 999
  },
  {
    data: productOrder,
    quantityOrder: 999
  },
  {
    data: productOrder,
    quantityOrder: 999
  }
])
</script>
<template>
  <WelfareBox>
    <ProductOrderTitle title="배송정보">
      <WelfareButtonLine text="배송지별 수량 초기화" />
    </ProductOrderTitle>
    <div class="wf-order-product-page">
      <WelfareUnitCardOrder v-for="(item, index) in productListOrder" :key="index" v-model:quantity="item.quantityOrder" :product="item.data" />
    </div>
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-product-page.scss');
</style>
