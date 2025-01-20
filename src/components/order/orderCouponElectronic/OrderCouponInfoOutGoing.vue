<script lang="ts" setup>
import { isSupportedContactApi } from '@/commons'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareInputMark from '@/components/uikit/input/WelfareInputMark.vue'

interface Props {
  name: string
  phone: string
  index?: number
}

interface Emits {
  (e: 'update:name', value: any): void
  (e: 'update:phone', value: any): void
  (e: 'click-info-me'): void
  (e: 'click-info-other'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <div class="wf_flex wf_flex-col wf-space-y-20">
    <div>
      <WelfareInput
        :title="`받는분${index ?? ''}`"
        :clear-text="false"
        :model-value="props.name"
        @update:modelValue="(value) => emits('update:name', value)"
        :max-length="15"
        :show-max-length="false"
        :placeholder="$t('cardOrder.orderCoupon.nameOutgoingPlaceholder')"
      />
      <WelfareInputMark
        :clear-text="false"
        class-wrap="wf-mt-10"
        :model-value="props.phone"
        mask="999-9999-9999"
        @update:modelValue="(value) => emits('update:phone', value)"
        :placeholder="$t('cardOrder.orderCoupon.phoneOutgoingPlaceholder')"
      />
    </div>
    <div class="wf_flex wf-space-x-8">
      <WelfareButtonLine @click="emits('click-info-me')" text="나에게 보내기" type="md" />
      <WelfareButtonLine v-if="isSupportedContactApi" @click="emits('click-info-other')" text="나에게 보내기" type="md" md-state="default" />
    </div>
  </div>
</template>
