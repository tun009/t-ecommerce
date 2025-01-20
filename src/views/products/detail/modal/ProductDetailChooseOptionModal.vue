<!-- FO_MC_IT011001P / FO_MC_MA011001P -->
<script setup lang="ts">
import { defaultColor, formatNumberDot } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonHeart from '@/components/uikit/button/WelfareButtonHeart.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLoading from '@/components/widgets/common/WelfareLoading.vue'
import WelfareProductAmountWithInput from '@/components/widgets/common/WelfareProductAmountWithInput.vue'
import { useProductDetailChooseOptionModal } from '@/composables/products/detail/useProductDetailChooseOptionModal'
import {
  ProductDetailChooseOptionModalEmits,
  ProductDetailChooseOptionModalProps,
  ProductDetailClassificationEnum,
  ProductDetailOptionTypeEnum
} from '@/models/views/products/ProductDetailReviewModel'

const props = defineProps<ProductDetailChooseOptionModalProps>()
const emits = defineEmits<ProductDetailChooseOptionModalEmits>()

const {
  listDataSelectDepth1,
  listDataSelectDepth2,
  listDataSelectDepth3,
  handleChangeValueDepth1,
  handleChangeValueDepth3,
  handleChangeValueDepth2,
  listDataChooseProduct,
  handleDeleteOption,
  totalPrice,
  handleAddToCart,
  isLoading,
  handleBuy
} = useProductDetailChooseOptionModal(props, emits)
</script>
<template>
  <div class="wf_flex wf_flex-col wf_height-fit">
    <WelfareBox class="wf_flex wf_flex-col wf-space-y-10 wf-pt-0-i">
      <WelfareSelect
        v-if="listDataSelectDepth1.options.length"
        :options="listDataSelectDepth1.options"
        :model-value="listDataSelectDepth1.value"
        @update:model-value="handleChangeValueDepth1"
        option-label="option1DepthName"
        option-disabled="disabled"
        :placeholder="$t('productDetail.selectOption')"
      >
        <template #option="{ props }" v-if="props.optionType === ProductDetailOptionTypeEnum.singleOption">
          <div class="wf-custom-select" :class="{ 'wf-option-disabled': props?.option?.disabled }">
            <div>{{ props?.option?.option1DepthName }}</div>
            <div class="wf-space-y-10">
              <span class="wf-font_17-bold--lp1">{{ formatNumberDot(props?.option.optionPrice ?? 0) }}</span
              >원
            </div>
          </div>
        </template>
      </WelfareSelect>
      <template v-if="props.optionType !== ProductDetailOptionTypeEnum.singleOption">
        <WelfareSelect
          v-if="listDataSelectDepth1.value && listDataSelectDepth2.options.length > 0"
          @update:model-value="handleChangeValueDepth2"
          :options="listDataSelectDepth2.options"
          :model-value="listDataSelectDepth2.value"
          option-label="option2DepthName"
          :placeholder="$t('productDetail.selectOption')"
        >
          <template #option="{ props }" v-if="props.optionType === ProductDetailOptionTypeEnum.multiOption">
            <div class="wf-custom-select" :class="{ 'wf-option-disabled': props?.option?.disabled }">
              <div>{{ props?.option?.option2DepthName }}</div>
              <div class="wf-space-y-10">
                <span class="wf-font_17-bold--lp1">{{ formatNumberDot(props?.option.optionPrice ?? 0) }}</span
                >원
              </div>
            </div>
          </template>
        </WelfareSelect>
        <WelfareSelect
          v-if="listDataSelectDepth2.value && listDataSelectDepth3.options.length > 0"
          @update:model-value="handleChangeValueDepth3"
          :options="listDataSelectDepth3.options"
          :model-value="listDataSelectDepth3.value"
          option-label="option3DepthName"
          :placeholder="$t('productDetail.selectOption')"
        >
          <template #option="{ props }" v-if="props.optionType === ProductDetailOptionTypeEnum.multiOptionWidthDate">
            <div class="wf-custom-select" :class="{ 'wf-option-disabled': props?.option?.disabled }">
              <div>{{ props?.option?.option3DepthName }}</div>
              <div class="wf-space-y-10">
                <span class="wf-font_17-bold--lp1">{{ formatNumberDot(props?.option.optionPrice ?? 0) }}</span
                >원
              </div>
            </div>
          </template>
        </WelfareSelect>

        <WelfareLoading v-if="isLoading" class-image="wf_width-25 wf_height-25" />
      </template>
      <div class="wf-py-14 wf-px-14 wf-bg--g-f-5-f-6-fa" v-for="(item, index) in listDataChooseProduct" :key="index">
        <div class="wf_flex wf_justify-between">
          <span class="wf_font-15--mid wf-color--g-333">{{ item.name }}</span>
          <button class="wf-box-circle wf-btn-hover" @click="handleDeleteOption(index)" v-if="!item.isHiddenButton">
            <IconClose :width="13" :height="13" :color="defaultColor.gray5" />
          </button>
        </div>
        <div class="wf-mt-13 wf_flex wf_justify-between wf_items-center">
          <div>
            <WelfareProductAmountWithInput
              :min="1"
              :max="item.totalQuantity"
              v-model:quantity="item.quantity"
              :is-edit-input="props.isEditInputQuantity"
            />
          </div>
          <div class="wf_flex wf_items-center wf_height-29">
            <!-- <p class="wf-color--f-95729 wf-font_13--reg"><span class="wf-font_17--bold">30</span><span class="wf-ml-2">%</span></p> -->
            <p class="wf-color--g-111 wf-font_15--reg wf-ml-4">
              <span class="wf-font_17--bold">{{ formatNumberDot(item.price * item.quantity) }}</span>
              <span class="wf-ml-2">원</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="listDataChooseProduct.length" class="wf-mt-20 wf_flex wf_justify-end wf_items-center wf-space-x-10">
        <span class="wf-font_15--bold wf-color--g-111">총 상품금액</span>
        <WelfareViewPrice :price="totalPrice" type="lg" class="wf_font-15--mid wf-color--f-95729--i" />
      </div>
    </WelfareBox>
    <WelfareBox :is-padding-vertical="false" class="wf-pt-19 wf-mt-auto wf-pb-20 wf-br-t-1 wf-br--g-e-7">
      <div class="wf_flex wf-space-x-10">
        <WelfareButtonHeart @update:is-active="emits('onHeart')" type="sm" :is-active="props.isHeart" v-if="!props.hideHeartBtn" />
        <div class="wf_flex wf-space-x-7 wf_flex-1">
          <WelfareButtonLine
            v-if="props.productClassificationCode !== ProductDetailClassificationEnum.ticket && !isDisabledButtonBuy"
            :disabled="listDataChooseProduct.length === 0"
            @click="handleAddToCart()"
            class="wf_flex-1"
            text="장바구니"
            type="lg"
            lg-state="black-line"
          />
          <WelfareButtonLine @click="handleBuy" class="wf_flex-1" :text="textButtonBuy" type="lg" lg-state="default" v-if="!props.hideBuyBtn" />
        </div>
      </div>
    </WelfareBox>
  </div>
</template>
<style lang="scss">
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-choose-option-modal.scss');
</style>
