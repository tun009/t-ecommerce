<!-- FO_MC_OR011011P -->

<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconEqualCoupon from '@/components/icons/IconEqualCoupon.vue'
import IconReload from '@/components/icons/IconReload.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfarePriceColumn from '@/components/uikit/product/WelfarePriceColumn.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareUnitCardStateCustomer from '@/components/uikit/unit/WelfareUnitCardStateCustomer.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useApplyCouponModal } from '@/composables/order/modal/useApplyCouponModal'
import { OrderApplyCouponProps } from '@/models/views/order/modal/OrderApplyCouponModel'
import { BaseApplyCouponConfirmModalEmits } from '@/models/widgets/modal'

const props = defineProps<OrderApplyCouponProps>()
const emit = defineEmits<BaseApplyCouponConfirmModalEmits>()

const { values, setFieldValue, onResetDiscount, onCancel, onConfirm, calcGroupCoupon, getCouponList } = useApplyCouponModal(props, emit)
</script>

<template>
  <div class="wf_overflow-hidden wf-bg--g-fff wf_width-screen wf_flex wf_flex-col">
    <WelfareTitleModal
      :title="$t('order.modal.applyCoupon.title')"
      class="wf-py-20 wf-px-16 wf-br--g-e-7"
      :widthIcon="20"
      classIcon="wf-mt--1"
      :colorIcon="defaultColor.primary"
      @close="onCancel"
    />
    <div class="wf-pt-20 wf_height-screen-un-title wf_flex wf_flex-col">
      <div class="wf-px-16">
        <WelfareButtonLine
          active
          class="wf_width-full wf_height-40-important wf-pt-15 wf_flex wf-space-x-5"
          type="md"
          md-state="line"
          :text="$t('order.modal.applyCoupon.reloadBtn')"
          @click="() => onResetDiscount()"
        >
          <template #left>
            <IconReload />
          </template>
          <template #right>
            <div class="wf-pr-4"></div>
          </template>
        </WelfareButtonLine>
      </div>
      <div class="wf_overflow-y-auto wf_height-full wf-pb-20">
        <div class="wf-mt-20" v-for="({ product, messageDelivery }, i) in $props?.orderCarts[0]?.products" :key="i">
          <div class="wf-px-16">
            <WelfareUnitCardStateCustomer :product="product" />
            <div class="wf_flex wf_flex-col wf-space-y-10 wf-mt-21">
              <WelfareSelect
                class="wf_height-41"
                placeholder="상품쿠폰을 선택해 주세요"
                option-label="couponName"
                option-value="memberCouponKey"
                option-disabled="disabled"
                empty-message="데이터 없음"
                :options="getCouponList(i)"
                :model-value="values?.orderCards[0]?.products?.[i]?.coupon"
                @update:model-value="(value) => setFieldValue(`orderCards.0.products.${i}.coupon`, value)"
              />
            </div>
            <div>
              <div class="wf-mt-10 wf_height-41 wf_flex wf_justify-end wf_items-center wf-br-b-1 wf-br--111 wf-font_13--mid wf-color--blue-4075-f-3">
                {{ messageDelivery ?? '' }}
              </div>
              <div class="wf-pt-20 wf-pb-28">
                <div class="wf_flex wf-my--2">
                  <WelfarePriceColumn title="상품 할인" :price="calcGroupCoupon(values.orderCards[0].products[i]).discount" />
                  <IconEqualCoupon />
                  <WelfarePriceColumn
                    title="총할인금액"
                    :price="calcGroupCoupon(values.orderCards[0].products[i]).total"
                    priceClass="wf-color--f-95729"
                  />
                </div>
              </div>
            </div>
          </div>
          <WelfareLineHorizontal :key="i" v-if="i < $props.orderCarts[0].products.length - 1" />
        </div>
      </div>
      <div class="wf-bg--g-fff">
        <div class="wf_flex wf-space-x-11 wf_width-full wf-py-20 wf-px-16">
          <WelfareButtonLine lg-state="grey-line" type="lg" class="wf_flex-1" :text="$t('button.apply')" @click="onCancel" />
          <WelfareButtonLine type="lg" class="wf_flex-1" :text="$t('button.cancel')" @click="onConfirm" />
        </div>
      </div>
    </div>
  </div>
</template>
