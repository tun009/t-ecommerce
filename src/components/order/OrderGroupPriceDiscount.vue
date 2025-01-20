<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import { InputNumberInputEvent } from 'primevue/inputnumber'
import WelfareCheckbox from '../uikit/input/WelfareCheckbox.vue'
import IconQuestionGreyCircle from '../icons/IconQuestionGreyCircle.vue'
import WelfareButtonLine from '../uikit/button/WelfareButtonLine.vue'
import WelfareInputNumber from '../uikit/input/WelfareInputNumber.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'

interface GroupPriceDiscountProps {
  text: string
  displayQuestion?: boolean
  displayBtn?: boolean
  displayCheckBox?: boolean
  checked?: boolean
  price?: number
  inputValue?: number
  displayInput?: boolean
  classGroup?: string
  subPrice?: number
  disabled?: boolean
}

interface GroupPriceDiscountEmits {
  (e: 'question-click'): void
  (e: 'view-click'): void
  (e: 'update:checked', value: any): void
  (e: 'update:inputValue', value: any): void
}

const props = defineProps<GroupPriceDiscountProps>()
const emits = defineEmits<GroupPriceDiscountEmits>()
const { openModal } = useModalNotification()
const handleUpdateInput = (value: InputNumberInputEvent) => {
  if (+value > Number(props?.subPrice)) {
    openModal?.({
      content: '혜택 금액보다 크지 않은 금액을 입력하세요.'
    })
    emits('update:inputValue', '')
  } else {
    emits('update:inputValue', value)
  }
}
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between" :class="{ 'wf_items-center': props.displayInput, ' wf_items-start': !props.displayInput }">
    <label class="wf_flex" :class="props.classGroup ?? 'wf-space-x-6'">
      <WelfareCheckbox
        v-if="props.displayCheckBox"
        :disabled="props.disabled"
        :model-value="$props.checked"
        @input="(value: boolean) => $emit('update:checked', value)"
      />
      <div class="wf_flex wf_items-center wf_flex-1 wf_flex-wrap wf-space-6">
        <span class="wf-font_15--reg wf-color--g-333">{{ $t(props.text) }}</span>
        <button v-if="props.displayQuestion" class="wf_height-18 wf_items-start wf_flex" @click="emits('question-click')">
          <IconQuestionGreyCircle />
        </button>
        <WelfareButtonLine @click="emits('view-click')" class="wf_width-69" sm-sate v-if="props.displayBtn" :text="$t('button.view')" />
        <p v-if="props.subPrice" class="wf-color--g-999 wf_flex wf_items-center wf-font_15--reg">{{ formatNumberDot(props.subPrice ?? 0) }}원</p>
      </div>
    </label>
    <div v-if="props.displayInput" class="wf_flex wf_items-center wf-space-x-4">
      <WelfareInputNumber
        @update:model-value="handleUpdateInput"
        :model-value="props.inputValue"
        :class-wrap="`wf_max-width-138`"
        :input-class="`wf_text-right wf_w-full wf_letter-spacing--0745`"
        :disabled="props.disabled || !checked"
        :input-props="{ inputmode: 'numeric' }"
        placeholder="0"
        locale="en-US"
        :useGrouping="true"
      />
      <span class="wf-font_15--reg wf-color--g-333">원</span>
    </div>
    <WelfareViewPrice v-if="!props.displayInput" :price="price ?? 0" class="wf-font_14-reg--lh130 wf-color--g-333" class-price="wf-font_15--bold" />
  </div>
</template>
