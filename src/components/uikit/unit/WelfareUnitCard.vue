<script setup lang="ts">
import { PRODUCT_DETAIL_ROUTER, formatNumberDot } from '@/commons'
import { WelfareUnitCardEmits, WelfareUnitCardProps } from '@/models/uikits/WelfareUnitCardTypes'
import IconQuestion from '@/components/icons/IconQuestion.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import WelfareCheckbox from '../input/WelfareCheckbox.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import { ProductDetailSaleStatus, dataProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

interface WelfareUnitCardSlots {
  footer: () => void
  money: () => void
}

defineSlots<WelfareUnitCardSlots>()

const emits = defineEmits<WelfareUnitCardEmits>()

const props = withDefaults(defineProps<WelfareUnitCardProps>(), {
  isCheckBox: false,
  isShowMoney: true,
  isShowDelete: false,
  isOutOfStock: false,
  isDeliveryPage: false,
  isShowConfigDescription: true
})

const handleChangeCheckBox = (value: boolean) => {
  emits('update:checked', value)
}
// const stateProduct = {
//   [ProductState.delivery]: '상품준비중',
//   [ProductState.outOfStock]: '일시품절',
//   [ProductState.stocking]: '',
//   [ProductState.normal]: ''
// }
const { processLink } = useBuildLink()
</script>

<template>
  <div class="wf-unit-card">
    <div class="wf_flex wf-space-x-6">
      <div class="wf_flex wf_flex-1 wf-space-x-6">
        <WelfareCheckbox v-if="isCheckBox" :model-value="$props?.checked" class="wf-mt-4" @input="handleChangeCheckBox" type="checkbox" />
        <router-link
          :to="props.product.linkTo ? props.product.linkTo : processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.product.id ?? 0}`)"
          class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140"
          >{{ props?.product?.productName }}</router-link
        >
      </div>
      <button v-if="isShowDelete" class="wf_height-14 wf-pr-13 wf-py-4">
        <IconTrash @click="emits('click:delete-icon')" />
      </button>
    </div>

    <div class="wf_flex wf-mt-16 wf-space-x-15">
      <router-link
        :to="props.product.linkTo ? props.product.linkTo : processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.product.id ?? 0}`)"
        class="wf-unit-image"
        :class="{ 'wf-unit-image-state': product?.state !== ProductDetailSaleStatus.onSale }"
        :data-label="product?.state ? dataProductDetailSaleStatus?.[product.state] : ''"
      >
        <WelfareImage :alt="props.product.productName" :data-src="props?.product?.productImage" :src="props?.product?.productImage" />
      </router-link>
      <div class="wf_flex-1 wf_flex wf_flex-col wf-space-y-12">
        <div v-if="isShowMoney" class="wf_flex wf_flex-col">
          <div>
            <slot name="money">
              <div class="wf_flex wf_items-center wf-space-x-2 wf-pt-10">
                <p v-if="props?.product.percent" class="wf-color--f-95729 wf_flex wf_items-center wf-font_13--mid">
                  <span class="wf-font_15--bold">{{ props.product.percent }}</span
                  >%
                </p>
                <p class="wf-font_13--reg wf-color--g-111 wf_flex wf_items-center" :class="{ 'wf-ml-2': props.product.percent }">
                  <span
                    v-if="props.product.pricePromotion"
                    class="wf-font_15--bold wf-color--g-111"
                    v-text="formatNumberDot(props.product.pricePromotion * props.product.quantity)"
                  ></span
                  >&nbsp;원&nbsp;<span v-if="props?.product.quantity">/</span>
                </p>
                <p class="wf-font_13--reg wf-color--g-111" v-if="props.product.quantity">
                  <span class="wf-font_13--reg wf-color--g-111" v-text="formatNumberDot(props.product.quantity)"></span>개
                </p>
              </div>
            </slot>
            <p
              v-if="props?.product?.immediatelyProductDiscountAmount"
              class="wf-color--g-bbb wf-border-top-absolute wf_width-fit wf-mt-6 wf wf-text wf-font_13--reg"
            >
              {{ props.product.immediatelyProductDiscountAmount }}원
            </p>
            <div v-if="props.product.price && props.product.price !== props.product.pricePromotion" class="wf_flex wf-mt-8 wf-space-x-2">
              <p class="wf-color--g-bbb wf-font_13-reg--lt">{{ props?.product?.price }}원</p>
              <IconQuestion @click="emits('click:question-icon')" />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p
              v-if="props.product?.nameOption"
              class="wf-font_13-reg--lh130 wf-color--g-555 line-clamp-2"
              :class="[{ 'wf-pr-8': !props.isDeliveryPage }]"
              v-text="props.product.nameOption"
            />
            <div
              v-if="product?.config?.des && props.isShowConfigDescription"
              class="wf_flex wf-color--g-555 wf-mt-7"
              :class="[{ 'wf-space-x-7': !props.isDeliveryPage, 'wf-space-x-10': props.isDeliveryPage }]"
            >
              <div class="wf_w-20 wf-font_13-reg--lh130">추가구성</div>
              <span class="wf_flex-1 line-clamp-2 wf-font_13-reg--lh130 wf-pr-2" :class="[{ 'wf-pr-8': !props.isDeliveryPage }]"
                >{{ product.config?.des }}
              </span>
            </div>
            <!-- <div v-if="props.product?.gift" class="wf_flex wf-color--g-555 wf-space-x-7 wf-mt-6 wf-font_13-reg--lh130">
              <div class="wf_w-20">사은품</div>
              <span class="wf_flex-1">{{ stringGift }}</span>
            </div> -->
          </div>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
