<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface MyPageOrderShortInfoProps {
  orderDate: string
  orderNumber: string
  address?: string
  fzOderDate?: boolean
  titleDelivery?: string,
  idRedirect?: string
}
interface MyPageOrderShortInfoEmit {
  (e: 'redirectLinkDetail', id?:string) : void
}
defineProps<MyPageOrderShortInfoProps>()
defineEmits<MyPageOrderShortInfoEmit>()
const { t } = useI18n()
</script>

<template>
  <div v-if="orderDate">
    <div :class="`wf_flex wf_justify-between wf_items-center wf_height-41 ${!$props.address && 'wf-bg--g-f-5-f-6-fa wf-px-16'}`">
      <span class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1">{{ $props.orderDate }}</span>
      <span class="wf-color--g-777 wf-font_13--reg wf-underline wf-text-underline-offset-3 wf-mr-2" @click="$emit('redirectLinkDetail', $props.idRedirect)">{{
        `${t('myPage.orderInfo.orderNumber')} ${$props.orderNumber}`
      }}</span>
    </div>
  </div>
  <div
    v-if="address"
    class="wf_flex wf_justify-between wf_items-center wf_height-41 wf-px-10 wf-bg--g-f-5-f-6-fa"
    :class="`${$props.fzOderDate && 'wf-justify-gap'}`"
  >
    <span class="wf-color--g-111 wf-font_13--bold">{{ $props.titleDelivery ?? t('myPage.orderInfo.returnedProduct') }}</span>
    <span class="wf-color--g-555 wf-font_13--reg">{{ $props.address }}</span>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/_welfare-my-page-order-short-info.scss');
</style>
