<script setup lang="ts">
import { DummyImage } from '@/assets/images'

import { ref } from 'vue'
import { ProductModel, ProductState } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareUnitCardShopping from '@/components/uikit/unit/WelfareUnitCardShopping.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import WelfareUnitCardOrder from '@/components/uikit/unit/WelfareUnitCardOrder.vue'
import WelfareUnitCardStateCustomer from '@/components/uikit/unit/WelfareUnitCardStateCustomer.vue'
import WelfareUnitCardStateDelivery from '@/components/uikit/unit/WelfareUnitCardStateDelivery.vue'
const quantity = ref(999)
const checked = ref(false)
const checkedSecond = ref(false)
const checkedThree = ref(false)
const product = ref<ProductModel>({
  productName: '[폴스미스] 남성 디노 맨투맨 블랙 두줄로 제목이길게 나온다고하면 이렇게 나옵니다람쥐 길면계속가다가나중에말줄임이나오지...',
  productImage: DummyImage,
  pricePromotion: 99999999,
  price: 1213123099,
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
})

const data = [
  {
    title: '주문내용 변경',
    options: ['My page/ Claim'],
    component: WelfareUnitCardStateDelivery,
    componentOptions: {
      isButtonOption: true,
      isDeliveryPage: true,
      product: {
        ...product.value,
        deliveryName: '출고지시',
        price: 0,
        config: {
          name: '추가구성',
          des: '양말세트양말세트양말세트양말세트 양말세트양말세트양말세트양말세트'
        },
        gift: {
          name: '사은품',
          des: ['블랙 비니']
        }
      }
    } as any
  },
  {
    title: '주문내역',
    options: ['My page/ Claim'],
    component: WelfareUnitCardStateDelivery,
    componentOptions: {
      isButtonStateDelivery: true,
      product: {
        ...product.value,
        deliveryName: '배송중',
        price: 0,
        config: {
          name: '추가구성',
          des: '양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ ...'
        },
        gift: {
          name: '사은품',
          des: ['블랙 비니']
        }
      }
    }
  },
  {
    title: '기본유닛',
    options: ['My page', 'customer service center', 'order sheet'],
    component: WelfareUnitCardStateCustomer,
    componentOptions: {
      product: {
        ...product.value,
        price: 0,
        nameOption: '옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션 ...',
        config: {
          name: '추가구성',
          des: '양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ ...'
        }
      }
    }
  },
  {
    title: '배송지별 주문상품',
    options: ['order sheet', '', ''],
    component: WelfareUnitCardOrder,
    componentOptions: {
      product: {
        ...product.value,
        nameOption: '옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명 ...',
        config: {
          name: '추가구성',
          des: '양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ ...'
        }
      },
      quantity
    }
  },
  {
    title: '팝업상품',
    options: ['My page/ Claim', 'shopping basket'],
    component: WelfareUnitCard,
    componentOptions: {
      product: {
        ...product.value,
        price: 0,
        nameOption: '옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션 ...',
        config: {
          name: '추가구성',
          des: '양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ ...'
        }
      }
    }
  },
  {
    title: '상품준비중',
    options: ['shopping basket'],
    component: WelfareUnitCardShopping,
    componentOptions: {
      isDeliveryPage: true,
      product: {
        ...product.value,
        state: ProductState.delivery,
        nameOption: '옵션명 옵션명옵션명 옵션명옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명 옵션...',
        config: {
          name: '추가구성',
          des: '양말세트양말세트양말세트양말세트 양말세트양말세트양말세트양말세트'
        }
      },
      checked: checked.value
    }
  },
  {
    title: '일시품절',
    options: ['My page'],
    component: WelfareUnitCard,
    componentOptions: {
      product: {
        ...product.value,
        state: ProductState.outOfStock,
        percent: 46,
        price: 0,
        quantity: 0,
        immediatelyProductDiscountAmount: 99999999,
        nameOption: ''
      },
      isCheckBox: true,
      isShowDelete: true,
      checked: checkedSecond.value
    }
  },
  {
    title: '주문취소',
    options: ['My page/ Claim'],
    component: WelfareUnitCard,
    componentOptions: {
      product: {
        ...product.value,
        price: 0
      },
      isDeliveryPage: true,
      isCheckBox: true,
      checked: checkedThree.value
    }
  }
]
</script>

<template>
  <WelfareContainer>
    <div class="wf_flex unit-view-root">
      <p class="wf-font_22--bold">Unit</p>
      <div class="unit-view-header-left">
        <p class="wf-font_16-bold-lh1">활용법</p>
        <p class="wf-font_14-reg-lh1 wf-mt-16">주문관련 유닛에 적용하여 사용하고 있으며 적용범위(리스트)는 유닛 네이밍과 함께 작성되어있습니다.</p>
      </div>
    </div>
    <div class="wf-unit-container wf_flex wf-space-y-72 wf_flex-wrap wf-space-x-314 unit-view-content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="wf_width-343"
        :class="{ 'wf-mt-_11': index === 4 || index == 5, 'wf-mt-_13': index === 6 || index === 7 }"
      >
        <div
          class="wf-mb-8"
          :class="[{ 'wf-mb-10': index === 5, 'wf-mb-14': index === 2 || index === 3 || index === 4, 'wf-mb-12': index === 6 || index === 7 }]"
        >
          <h4 class="wf-font_16-bold-lh1">{{ item.title }}</h4>
          <div class="wf-mt-16">
            <p
              v-for="(_item, _index) in item.options"
              :key="_index"
              :class="{ 'wf-mt-6': index !== 0 }"
              class="wf-font_16-semi-lh1 wf_flex wf-space-x-10 wf-ml-6"
            >
              <span>•</span><span>{{ _item }}</span>
            </p>
          </div>
        </div>
        <div class="wf-py-20">
          <component
            v-if="index === data.length - 3"
            :is="item.component"
            v-bind="item.componentOptions"
            v-model:quantity="quantity"
            v-model:checked="checked"
          />
          <component
            v-if="index === data.length - 2"
            :is="item.component"
            v-bind="item.componentOptions"
            v-model:quantity="quantity"
            v-model:checked="checkedSecond"
          />
          <component
            v-if="index !== data.length - 2 && index !== data.length - 3"
            :is="item.component"
            v-bind="item.componentOptions"
            v-model:quantity="quantity"
            v-model:checked="checkedThree"
          />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/uikit/_welfare-unit-view.scss');
</style>
