<script setup lang="ts">
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'

interface MyPageShoppingInformationProductOrderProps {
  class?: string
  product: ProductModel
  quantity?: number
  reason?: string
  options?: string
  hiddenQuantity?: boolean
  hiddenReason?: boolean
  hiddenOptions?: boolean
  titleQuantity?: string
  titleReason?: string
  titleOptions?: string
  claimProcessStatus?:string
  displayExchangeApplicationTag?: boolean
}

const props = defineProps<MyPageShoppingInformationProductOrderProps>()
</script>

<template>
  <div :class="props.class">
    <div v-if="displayExchangeApplicationTag" class="wf-mb-16 wf-mt-9 wf_flex wf_justify-between">
      <p class="wf-font_15--mid wf-color--f-95729"> {{ $t('myPage.shoppingInformation.exchangeHistory.exchangeApplication')}}</p>
      <WelfareColorTag class="wf-mt--3" :text="props.claimProcessStatus ?? ''"/>
    </div>
    <WelfareUnitCard :isDeliveryPage="true" :product="props.product"> </WelfareUnitCard>
    <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between wf-mt-16" v-if="!props.hiddenQuantity">
      <p class="wf-font_13--reg wf-color--g-999">
        {{ props.titleQuantity ? props.titleQuantity : $t('myPage.shoppingInformation.refund.returnQuantity') }}
      </p>
      <p class="wf-font_13--reg wf-color--g-999">{{ props.quantity ?? 0 }}</p>
    </div>
    <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between" v-if="!props.hiddenOptions">
      <p class="wf-font_13--reg wf-color--g-999">
        {{ props.titleOptions ?? '' }}
      </p>
      <p class="wf-font_13--reg wf-color--g-999">{{ `${props.options ?? ''}` }}</p>
    </div>
    <div class="wf_height-31 wf_flex wf_items-center wf_justify-between" v-if="!props.hiddenReason">
      <p class="wf-font_13--reg wf-color--g-999">
        {{ props.titleReason ? props.titleReason : $t('myPage.shoppingInformation.refund.returnReason') }}
      </p>
      <p class="wf-font_13--reg wf-color--g-999">{{ `${props.reason ?? ''}` }}</p>
    </div>
  </div>
</template>
