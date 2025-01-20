<!-- FO_MC_CP010001P -->
<script setup lang="ts">
import { DEFAULT_DATE_TIME_FORMAT_DASH_HOURS_MINUTES, formatTime } from '@/commons'
import IconDownload from '@/components/icons/IconDownload.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useProductGetCouponBtnModal } from '@/composables/products/detail/useProductGetCouponBtnModal'
import { defaultColor } from '@/commons'
interface ProductDetailGetCouponBtnModalProps {
  productKey: string | number
  buttonConfirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
}
const props = defineProps<ProductDetailGetCouponBtnModalProps>()

const { dataCoupon, handleDownloadAll, handleDownloadCoupon } = useProductGetCouponBtnModal(props.productKey)
</script>
<template>
  <div class="wf_width-screen wf_height-screen wf-bg--white wf-sticky-bottom wf-coupon-pd">
    <WelfareTitleModal :title="$t('productDetail.coupon.title')" @close="props.onCancel" />

    <div class="wf-mt-24 wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-coupon-box wf_flex" :class="{ wf_isDownloaded: item.downloaded }" v-for="(item, index) in dataCoupon" :key="index">
        <div>
          <p class="wf-font_13--reg-p-7">{{ item.couponName }}</p>
          <p class="wf-font_15--bold-lt-1 wf-mt-6 wf-color--f-95729">{{ item.benefitValue }} {{ $t('productDetail.coupon.discountPercent') }}</p>

          <div class="wf_flex wf_flex-col wf-mt-14 wf-font_11--reg wf-space-y-5">
            <span
              >{{ item.minOrderAmount }}{{ $t('productDetail.coupon.maximumPurchases') }} {{ item.maxDiscountAmount
              }}{{ $t('productDetail.coupon.krw') }}</span
            >
            <span>{{ item.validToDate ? formatTime(item.validToDate, DEFAULT_DATE_TIME_FORMAT_DASH_HOURS_MINUTES) : '' }}</span>
          </div>
        </div>

        <div class="wf-coupon-status wf_width-63">
          <p v-if="item.downloaded" class="wf-font_13--reg-p-7">{{ $t('productDetail.coupon.receivedCompleted') }}</p>
          <div v-else class="wf-coupon-download" @click="handleDownloadCoupon(item)">
            <IconDownload :color="defaultColor.gray2" :height="24" :width="12" />
          </div>
        </div>
      </div>
    </div>

    <div class="wf-mt-20">
      <WelfareButtonLine @click="handleDownloadAll" class="wf_w-full" type="lg" sm-sate :text="$t('productDetail.coupon.getCoupon')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/products/detail/_welfare-product-coupon-modal.scss');
</style>
