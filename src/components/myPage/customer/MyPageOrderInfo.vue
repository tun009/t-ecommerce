<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import MyPageProductReviewItem from '@/components/myPage/products/common/MyPageProductReviewItem.vue'
import { formatNumberDot } from '@/commons'

//해당페이지 상품코드 조회/ 주문번호 조회(배송상품/티켓상품) 관련 페이지

interface MyPageOrderInfoProps {
  orderStatus?: string // 주문상태
  orderDate?: string // 주문날짜
  orderNumber?: number // 주문번호
  orderName?: string // 수신자명
  orderPhoneNumber?: string // 수신자 전화번호 (티켓상품 유일)
  orderAddress?: string // 배송지 (배송상품 유일)
  productName: string // 상품명
  productImage?: string // 상품이미지
  productPrice: number // 판매가
  productAmount?: number // 구매수량
  productOptions?: string // 구매옵션명
}

defineProps<MyPageOrderInfoProps>()
const emit = defineEmits<(e: 'init') => void>()

const { t } = useI18n()
const { openModal: openNotification, closeModalByPop } = useModalConfirm()

const reset = () => {
  openNotification({
    content: t('myPage.inquiryWrite.alert6'),
    onConfirm: () => {
      closeModalByPop?.()
      emit('init')
    }
  })
}
</script>

<template>
  <div v-if="$props.orderNumber">
    <div class="wf_flex wf_justify-between wf_items-center wf_height-41">
      <span class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1">{{ $props.orderDate }}</span>
      <span class="wf-color--g-777 wf-font_13--reg wf-underline wf-text-underline-offset-3 wf-mr-2">{{
        `${t('myPage.orderInfo.orderNumber')} ${$props.orderNumber}`
      }}</span>
    </div>
    <div v-if="$props.orderPhoneNumber" class="wf_flex wf_items-center wf_height-41 wf-px-10 wf-bg--g-f-5-f-6-fa row-gap-10">
      <span class="wf-color--g-111 wf-font_13--bold pdr-10">{{ $t('myPage.inquiryWrite.title5') }}</span>
      <span class="wf-color--g-555 wf-font_13--reg pdr-10">{{ $props.orderName }}</span>
      <span class="wf-color--g-555 wf-font_13--reg">{{ $props.orderPhoneNumber }}</span>
    </div>
    <div v-if="$props.orderAddress" class="wf_flex wf_items-center wf_height-41 wf-px-10 wf-bg--g-f-5-f-6-fa row-gap-10">
      <span class="wf-color--g-111 wf-font_13--bold pdr-10">{{ $t('myPage.inquiryWrite.title6') }}</span>
      <span class="wf-color--g-555 wf-font_13--reg pdr-10">{{ $props.orderName }}</span>
      <span class="wf-color--g-555 wf-font_13--reg">{{ $props.orderAddress }}</span>
    </div>
  </div>
  <div class="row-gap-10 border-bb-777">
    <div class="prd-content-header wf-py-16">
      <span class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140">
        {{ $props.productName }}
      </span>
    </div>
    <MyPageProductReviewItem alt="" :src="$props.productImage || ''">
      <template #item>
        <div class="wf-font_13--reg wf-color--g-111 wf_flex wf_items-center">
          <span class="wf-font_15--bold wf-color--g-111" v-text="formatNumberDot($props.productPrice)"></span>&nbsp;{{
            $t('myPage.welfarePoints.won')
          }}&nbsp;
          <p v-if="$props.productAmount" class="wf-font_13--reg wf-color--g-111">
            <span>/</span><span class="wf-font_13--reg wf-color--g-111" v-text="$props.productAmount"></span>{{ $t('myPage.welfarePoints.num') }}
          </p>
        </div>
        <div class="wf-font_13--reg wf-color--g-111 wf_flex wf_items-center wf-pt-10">
          <p v-if="$props.productOptions" class="wf-font_13--reg wf-color--g-111">
            <span>{{ $props.productOptions }}</span>
          </p>
        </div>
      </template>
    </MyPageProductReviewItem>
    <div class="wf_flex wf_justify-between wf-align-center wf-py-10">
      <span class="wf-font_13--light wf-color--red-ff-3-b-4-f">{{ $props.orderStatus }}</span>
      <WelfareButtonLine class="wf_width-62" type="sm" :text="$t('myPage.inquiryWrite.button2')" @click="reset" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/_welfare-my-page-order-short-info.scss');
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
