<!-- FO_MC_MY015002P / FO_MC_MY016007P / FO_MC_MY016002P -->
<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import { useMyPageRefundInformationModal } from '@/composables/myPage/useMyPageRefundInformationModal'

interface Props {
  title: string
  showCheckbox: boolean
  disappearCheckbox?: boolean
  orderKey: number
}

type Emits = (e: 'close') => void
const props = defineProps<Props>()
defineEmits<Emits>()
const { totalPrice, optionsSelectCard, optionsSelectInstallmentTerm, selectedCard, selectedInstallmentTerm, checkboxOne, handleValidate } =
  useMyPageRefundInformationModal(props.orderKey)
</script>
<template>
  <div class="wf-bg--g-fff wf-pt-25 wf-pb-30 wf-mx-auto wf_width-modal">
    <div class="wf_flex wf_flex-center wf-relative wf_width-full wf-br-b-1 wf-br--111 wf-pb-19">
      <div class="wf-font_21--bold wf-color--g-111 wf_text-center">{{ $t(props.title) }}</div>
      <div class="wf-absolute wf-right-0">
        <button @click="$emit('close')" class="wf_flex wf_items-start">
          <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
        </button>
      </div>
    </div>
    <div class="wf-py-24 wf_flex wf_flex-col wf-space-y-20">
      <div class="wf_flex wf_justify-between wf_items-center">
        <span class="wf-font_15--mid wf-color--g-333">{{ $t('myPage.refundInformation.labelPrice') }}</span>
        <WelfareViewPrice :price="totalPrice" class="wf-color_i--f-95729 wf-font_15-reg--lh130 wf-color--g-333" class-price="wf-font_23--bold " />
      </div>
      <div class="wf_flex wf_flex-col wf-space-y-11">
        <WelfareSelect
          v-model="selectedCard"
          :placeholder="$t('myPage.refundInformation.placeholderCard')"
          panelClass="wf-dropdown-panel-max-height"
          :options="optionsSelectCard"
        />
        <div v-if="showCheckbox && !disappearCheckbox" class="wf_flex wf-space-x-6">
          <WelfareCheckbox v-model="checkboxOne" inputId="verify-card-payment-id" />
          <label for="verify-card-payment-id" class="wf-color--g-333 wf-font_15--mid">{{ $t('myPage.refundInformation.labelCheckboxCard') }}</label>
        </div>
        <div v-if="disappearCheckbox" class="wf_height-18"></div>
      </div>
      <div>
        <div class="wf_flex wf_flex-col wf-space-y-10">
          <label class="wf-color--g-333 wf-font_15--mid wf_letter-spacing--0-7" for="selectedInstallmentTerm">
            {{ $t('myPage.refundInformation.labelPaymentType') }}
          </label>
          <WelfareSelect
            id="selectedInstallmentTerm"
            v-model="selectedInstallmentTerm"
            :placeholder="$t(`myPage.refundInformation.placeholderPaymentType`)"
            panelClass="wf-dropdown-panel-max-height"
            :options="optionsSelectInstallmentTerm"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-space-x-10">
      <WelfareButtonLine
        @click="$emit('close')"
        class="wf_flex-1"
        type="lg"
        lg-state="grey-line"
        :text="$t(`myPage.refundInformation.cancelButton`)"
      />
      <WelfareButtonLine
        @click="() => handleValidate(selectedCard, selectedInstallmentTerm)"
        class="wf_flex-1"
        type="lg"
        lg-state="default"
        :text="$t(`myPage.refundInformation.paymentButton`)"
      />
    </div>
  </div>
</template>
