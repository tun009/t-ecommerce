<script setup lang="ts">
import { useProductOrderDeliveryNew } from '@/composables/order/useOrderProductDeliveryNew'
import WelfareButtonLine from '../uikit/button/WelfareButtonLine.vue'
import { WelfareCheckbox, WelfareInput, WelfareRadioGroup } from '../uikit/input'
import OrderGroupEnterPhone from './OrderGroupEnterPhone.vue'
import OrderSearchAddress from './OrderSearchAddress.vue'
import { CODE_CONTACT_TEL_LIST } from '@/commons'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { YesNoEnum } from '@/models/common'

interface OrderProductDeliveryNewProps {
  currentAddress: DeliveryAddressModel
  gapWrapForm?: number
  isHiddenTypeDelivery?: boolean
  isHiddenAddressCheckboxDefault?: boolean
  isModal?: boolean
}

type OrderProductDeliveryNew = (e: 'update:currentAddress', data: DeliveryAddressModel) => void

const emits = defineEmits<OrderProductDeliveryNew>()
const props = withDefaults(defineProps<OrderProductDeliveryNewProps>(), {
  gapWrapForm: 24
})

const { phone, contact, listAddressDelivery, refSearchAddress, handleSetCurrentAddress } = useProductOrderDeliveryNew(props, emits)
</script>
<template>
  <div>
    <OrderSearchAddress
      @update:model-value="
        (data) =>
          emits('update:currentAddress', {
            ...props.currentAddress,
            ...data
          })
      "
      ref="refSearchAddress"
    />
    <p v-if="!isHiddenTypeDelivery" class="wf-font_15--bold wf-color--g-111">배송지 구분</p>
    <div :class="`wf-mt-10 wf_flex wf_flex-col wf-space-y-${gapWrapForm}`">
      <div v-if="!isHiddenTypeDelivery" :class="`${!props.isModal && 'wf_height-38'} wf_flex wf_item-center`">
        <WelfareRadioGroup
          :model-value="currentAddress.deliveryAddressCode"
          @update:model-value="
            (value) => {
              handleSetCurrentAddress('deliveryAddressCode', value)
            }
          "
          :gap="props.isModal ? 30 : 28"
          :gap-radio="props.isModal ? 9 : 6"
          :options="listAddressDelivery"
        />
      </div>
      <WelfareInput
        :model-value="currentAddress?.deliveryAddressName"
        @update:model-value="(value) => handleSetCurrentAddress('deliveryAddressName', value)"
        :clear-text="false"
        title="받으시는 분"
        required
        placeholder="받으시는 분 이름을 적어주세요."
      />
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <WelfareInput
          class-wrap="wf_flex wf-space-x-10"
          placeholder="주소를 검색해주세요."
          disabled
          class="wf_flex-1 wf_letter-spacing--1-4"
          title="주소"
          :model-value="currentAddress?.address?.zipCode"
          required
          :clearText="false"
          class-wrap-title="wf_justify-between"
        >
          <template v-if="!isHiddenAddressCheckboxDefault" #title-suffix>
            <div class="wf_flex wf_items-center wf-space-x-6">
              <WelfareCheckbox
                :model-value="currentAddress.deliveryAddressBaseYn === YesNoEnum.Y ? true : false"
                @update:model-value="
                  (value) => {
                    handleSetCurrentAddress('deliveryAddressBaseYn', value ? YesNoEnum.Y : YesNoEnum.N)
                  }
                "
              />
              <p class="wf-font_13--reg wf-color--g-333">기본배송지로 설정</p>
            </div>
          </template>
          <template #suffix>
            <WelfareButtonLine
              @click="
                () => {
                  refSearchAddress?.open?.()
                }
              "
              type="md"
              md-state="line"
              text="우편번호"
            />
          </template>
        </WelfareInput>
        <WelfareInput :model-value="currentAddress?.address?.basicRoad" :clearText="false" disabled placeholder="우편번호 찾기를 이용해주세요." />
        <WelfareInput :model-value="currentAddress?.address?.basicJibun" :clearText="false" disabled placeholder="우편번호 찾기를 이용해주세요." />
        <WelfareInput
          :model-value="currentAddress?.address?.detail"
          @update:model-value="
            (value) => {
              handleSetCurrentAddress('address', value)
            }
          "
          :clearText="false"
          placeholder="상세 주소를 입력하세요."
        />
      </div>
      <OrderGroupEnterPhone
        @update:phone="
          (value) => {
            handleSetCurrentAddress('deliveryCellphoneNumber', `${contact?.code ?? ''}-${value}`)
          }
        "
        @update:prefix="
          (value) => {
            handleSetCurrentAddress('deliveryCellphoneNumber', `${value}-${contact.phone}`)
          }
        "
        :phone="contact.phone"
        :prefix="contact.code"
        required
        title="휴대폰번호"
        :size-select="105"
      />

      <OrderGroupEnterPhone
        @update:phone="
          (value) => {
            handleSetCurrentAddress('deliveryTelNumber', `${phone?.code ?? ''}-${value}`)
          }
        "
        @update:prefix="
          (value) => {
            handleSetCurrentAddress('deliveryTelNumber', `${value}-${phone.phone}`)
          }
        "
        :option-contact="CODE_CONTACT_TEL_LIST"
        :phone="phone.phone"
        :prefix="phone.code"
        title="연락처"
        required
        :size-select="105"
      />
    </div>
  </div>
</template>
<style scoped>
:deep(.p-dropdown) {
  padding: 11px 13px;
}
</style>
