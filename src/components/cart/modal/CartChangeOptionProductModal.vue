<!-- FO_MC_CT011005P -->
<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareLoader from '@/components/uikit/loader/WelfareLoader.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import WelfareProductAmountWithInput from '@/components/widgets/common/WelfareProductAmountWithInput.vue'
import { useCartChangeOptionProductModal } from '@/composables/cart/modal/useCartChangeOptionProductModal'
import { CartProductOptionResponses } from '@/models/services/responses/cart/CartResponse'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { BaseModalEmits } from '@/models/widgets/modal'

export interface CartChangeOptionProductModalProps {
  dataProduct: CartProductModel
  optionsSelected: CartProductOptionResponses[]
}

export interface CartChangeOptionProductModalEmits extends BaseModalEmits {
  (e: 'save', optionKey?: number): void
}

const props = defineProps<CartChangeOptionProductModalProps>()
const emits = defineEmits<CartChangeOptionProductModalEmits>()
const {
  isLoading,
  selectedOption,
  handleUpdateQuantity,
  onSave,
  isSaving,
  quantity,
  listLargeOptions,
  listMediumOptions,
  listSmallOptions,
  selectedLargeOption,
  selectedMediumOption,
  selectedSmallOption,
  promotionPrice
} = useCartChangeOptionProductModal(props, emits)
</script>

<template>
  <div
    v-if="!isLoading"
    class="wf_width-full wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important"
  >
    <WelfareUnitCard
      class="wf-mb-19"
      v-if="props.dataProduct"
      :is-check-box="false"
      :is-show-delete="false"
      :is-show-money="true"
      :product="props.dataProduct"
    >
    </WelfareUnitCard>
    <div class="wf_flex wf_flex-col wf-space-y-10">
      <WelfareSelect
        option-label="label"
        option-value="value"
        :disabled="isSaving"
        v-model="selectedLargeOption"
        class="wf_width-full"
        :options="listLargeOptions"
        :placeholder="$t('productDetail.selectOption')"
        v-if="listLargeOptions && listLargeOptions.length > 0"
      />
      <WelfareSelect
        option-label="label"
        option-value="value"
        :disabled="isSaving"
        v-model="selectedMediumOption"
        class="wf_width-full"
        :options="listMediumOptions"
        :placeholder="$t('productDetail.selectOption')"
        v-if="listMediumOptions && listMediumOptions.length > 0"
      />
      <WelfareSelect
        option-label="label"
        option-value="value"
        :disabled="isSaving"
        v-model="selectedSmallOption"
        class="wf_width-full"
        :options="listSmallOptions"
        :placeholder="$t('productDetail.selectOption')"
        v-if="listSmallOptions && listSmallOptions.length > 0"
      />
    </div>
    <div class="wf-bg--3-f-5-f-6-fa wf-px-16 wf-py-16" v-if="selectedOption && !!selectedOption?.value">
      <div class="wf-mb-20 wf-font_15--mid wf-color--g-333">{{ selectedOption.label }}</div>
      <div class="wf_flex wf_justify-between wf_items-center">
        <WelfareProductAmountWithInput
          :disabled="isSaving"
          :quantity="quantity"
          @update:quantity="handleUpdateQuantity"
          :min="props.dataProduct.minimumPurchaseQuantity"
          :max="props.dataProduct.maximumPurchaseQuantity"
        />
        <div>
          <span
            v-if="props.dataProduct.pricePromotion"
            class="wf-font_15--bold wf-color--g-111"
            v-text="formatNumberDot(promotionPrice * quantity)"
          ></span>
          {{ $t('common.won') }}
        </div>
      </div>
    </div>
    <div class="wf_w-full wf_flex wf_justify-between wf-space-x-10">
      <WelfareButtonLine
        :disabled="isSaving"
        @click="emits('onClose')"
        type="lg"
        lg-state="black-line"
        :text="$t('button.cancel')"
        class="wf_w-full"
      />
      <WelfareButtonLine
        :disabled="isSaving || !selectedOption || !selectedOption?.value"
        @click="onSave"
        type="lg"
        :text="$t('cart.productDetail.change')"
        class="wf_w-full"
      />
    </div>
  </div>
  <div v-else class="wf_w-full wf_flex wf_justify-center wf_height-169 wf_items-center">
    <WelfareLoader />
  </div>
</template>
