<!-- FO_MC_IT011002P -->
<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { ProductDetailModel } from '@/models/views/products/ProductDetailReviewModel'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { orderApi } from '@/services/api/order/OrderApi'
import { OrderProductCouponDiscountResponse } from '@/models/services/responses/order/OrderProductCartResponse'
import { CouponBenefitType } from '@/models/common'
import { intergetNumberRegex } from '@/commons'

interface ProductDetailDiscountPriceInformationModalProps {
  buttonConfirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  productDetail: ProductDetailModel
}

const props = defineProps<ProductDetailDiscountPriceInformationModalProps>()
const listCoupons = ref<OrderProductCouponDiscountResponse[]>([])
const router = useRoute()
onMounted(() => {
  const productKey = Number(router.query?.productKey)
  if (intergetNumberRegex.test(productKey.toString())) {
    orderApi
      .getListCoupons(productKey)
      .then((data) => {
        listCoupons.value = data.data
      })
      .catch(() => {})
  }
})
const totalDiscountAmount = computed(() => {
  return listCoupons.value.reduce((total, coupon) => {
    return total + calculateBenefitValue(coupon.benefit.benefitType as CouponBenefitType, coupon.benefit.benefitSettingValue)
  }, 0)
})

const lastTotalAmount = computed(() => {
  if (props.productDetail) {
    return props.productDetail.salePrice - totalDiscountAmount.value > 0 ? props.productDetail.salePrice - totalDiscountAmount.value : 0
  }
  return 0
})

const calculateBenefitValue = (couponBenefitType: CouponBenefitType, originBenefitValue: number) => {
  if (props.productDetail) {
    if (couponBenefitType === CouponBenefitType.PERCENT) {
      return (originBenefitValue / 100) * (props.productDetail.salePrice - props.productDetail.immediatelyProductDiscountAmount)
    }
    return originBenefitValue
  }
  return 0
}
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-30 wf-pb-24">
    <WelfareTitleModal title="추가할인가 안내" class="wf-pb-14" classIcon="wf-mt--4" classTitle=" wf_letter-spacing--0745" @close="$props.onCancel" />
    <div class="wf_flex wf_flex-col wf-space-y-20 wf_width-full wf-br-b-1 wf-br--g-e-7 wf-pb-18">
      <div class="wf_width-full">
        <div class="wf_flex wf_justify-between wf_width-full wf_items-center wf-mt--4">
          <span class="wf-font_15--bold wf-color--g-111">판매가</span>
          <WelfareViewPrice :price="productDetail?.salePrice ?? 0" :is-minus="false" class="wf-font_13-reg--lh130" class-price="wf-font_15--mid" />
        </div>
        <div class="wf_flex wf-mt-20 wf-bg--3-f-5-f-6-fa wf-mb-28">
          <div class="wf-px-24 wf-py-18 wf_width-full wf_height-169 wf_overflow-y-auto">
            <span class="wf-font_13--bold wf-color--g-333">즉시할인</span>
            <div
              v-for="(coupon, indexCoupon) in listCoupons"
              :key="indexCoupon"
              class="wf_flex wf_justify-between wf_width-full wf-mt-15 wf_items-start"
            >
              <span class="wf-font_13--reg wf-color--g-555">ㄴ {{ coupon.couponName }}</span>
              <WelfareViewPrice
                :price="calculateBenefitValue(coupon.benefit.benefitType as CouponBenefitType, coupon.benefit.benefitSettingValue)"
                :is-minus="true"
                class-minus="wf-color--g-333"
                class="wf-font_13--bold wf-color--g-333"
                class-price="wf-font_13--bold "
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_justify-between wf_width-full wf_items-end">
          <span class="wf-font_15--bold wf-color--g-111">총 할인 금액</span>
          <WelfareViewPrice
            :price="totalDiscountAmount"
            :is-minus="true"
            class="wf-font_13--reg wf-color_i--f-95729"
            class-price="wf-font_15--bold"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf_justify-between wf_width-full wf_items-center wf-mt--14">
      <span class="wf-font_15--bold wf-color--g-111">예상구매가</span>
      <WelfareViewPrice :price="lastTotalAmount" :is-minus="false" class="wf-mt-6 wf-font_15--mid" />
    </div>
    <div class="wf_flex wf_width-full wf_flex-col wf-mt--3 wf-space-y-10">
      <div class="wf_width-full wf-font_13--mid wf-color--g-777">
        <IconDot /> &nbsp;상품 구매시 &nbsp; 받을 수 있는 &nbsp; 할인혜택 &nbsp; 정보입니다.
      </div>
      <div class="wf_width-full wf-font_13--mid wf-color--g-777">
        <IconDot /> &nbsp;단, &nbsp;주문서 &nbsp;작성시 &nbsp;적용하는 &nbsp;혜택에 &nbsp;따라 &nbsp;차이가 &nbsp;생길 &nbsp;수 &nbsp;있습니다.
      </div>
      <div class="wf_width-full wf-font_13--mid wf-color--g-777">
        <IconDot /> &nbsp;다운받을수 &nbsp;있는 &nbsp;쿠폰 &nbsp;중 &nbsp;최대 &nbsp;할인 &nbsp;쿠폰을 &nbsp;적용하였습니다.
      </div>
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full">
      <WelfareButtonLine type="lg" class="wf_flex-1" :text="`확인`" @click="$props.onCancel" />
    </div>
  </div>
</template>
