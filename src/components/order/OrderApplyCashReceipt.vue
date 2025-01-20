<script setup lang="ts">
import { CODE_TEL_LIST, defaultColor } from '@/commons'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import {
  orderProductOptionRadioUseCashReceipt,
  orderProductOptionsSelectBoxCompanyCashReceipt,
  orderProductOptionsSelectBoxPersonCashReceipt
} from '@/models/views/order/OrderProductPageModel'
import IconQuestionGreyCircle from '../icons/IconQuestionGreyCircle.vue'
import WelfareButtonLine from '../uikit/button/WelfareButtonLine.vue'
import WelfareRadioGroup from '../uikit/input/WelfareRadioGroup.vue'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import OrderGroupEnterPhone from './OrderGroupEnterPhone.vue'
import OrderGroupInputEnterNumber from './OrderGroupInputEnterNumber.vue'
import OrderProductOrderTitle from './OrderProductOrderTitle.vue'
import WelfareNoteText from '@/components/widgets/common/WelfareNoteText.vue'

interface Props {
  isUseApplyCash: boolean
  personalApplyCash: boolean
  incomePersonal: WelfareSelectDataModel
  incomeCompany: WelfareSelectDataModel
  infoPersonal: {
    prefix: string | undefined
    phone: string
    numberBankPerson: string[]
  }
  infoCompany: {
    numberBank: string[]
    numberCompany: string[]
  }
}

interface Emits {
  (e: 'update:isUseApplyCash', value: boolean): void
  (e: 'update:personalApplyCash', value: boolean): void
  (e: 'update:incomePersonal', value: WelfareSelectDataModel): void
  (e: 'update:incomeCompany', value: WelfareSelectDataModel): void
  (
    e: 'update:infoPersonal',
    value: {
      prefix: string | undefined
      phone: string
      numberBankPerson: string[]
    }
  ): void
  (
    e: 'update:infoCompany',
    value: {
      numberBank: string[]
      numberCompany: string[]
    }
  ): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <WelfareBox>
    <OrderProductOrderTitle title="cardOrder.crashReceipt.title">
      <WelfareRadioGroup
        gap="20"
        :model-value="isUseApplyCash"
        @update:model-value="(value: boolean) => emits('update:isUseApplyCash', value)"
        :options="orderProductOptionRadioUseCashReceipt"
      />
    </OrderProductOrderTitle>
    <div class="wf_flex wf-mt-10 wf_items-center wf-space-x-3">
      <IconQuestionGreyCircle :color="defaultColor.gray3" />
      <span class="wf-font_13--reg wf-color--g-777">모바일상품권은 사용처를 통해 현금영수증 발급이 가능합니다</span>
    </div>
    <div v-if="isUseApplyCash" class="wf-mt-20 wf_flex wf_flex-col wf-space-y-10">
      <div class="wf_flex wf-space-x-10">
        <WelfareButtonLine
          @click="emits('update:personalApplyCash', true)"
          :active="personalApplyCash"
          text="소득공제용(개인)"
          class="wf_flex-1"
          type="lg"
          lg-state="grey-line"
        />
        <WelfareButtonLine
          @click="emits('update:personalApplyCash', false)"
          :active="!personalApplyCash"
          text="지출증빙용(사업자)"
          class="wf_flex-1"
          type="lg"
          lg-state="grey-line"
        />
      </div>
      <WelfareSelect
        v-if="personalApplyCash"
        :model-value="incomePersonal"
        @update:model-value="(value) => emits('update:incomePersonal', value)"
        class="wf-py-11--i"
        option-label="label"
        :options="orderProductOptionsSelectBoxPersonCashReceipt"
      />
      <WelfareSelect
        v-else
        @update:model-value="(value) => emits('update:incomeCompany', value)"
        :model-value="incomeCompany"
        class="wf-py-11--i"
        option-label="label"
        :options="orderProductOptionsSelectBoxCompanyCashReceipt"
      />
      <div v-if="personalApplyCash">
        <OrderGroupEnterPhone
          v-if="incomePersonal.value"
          :phone="props.infoPersonal.phone"
          @update:phone="(phone) => emits('update:infoPersonal', { ...props.infoPersonal, phone })"
          :prefix="props.infoPersonal.prefix"
          @update:prefix="
            (prefix) => {
              emits('update:infoPersonal', { ...props.infoPersonal, prefix })
            }
          "
          :option-contact="CODE_TEL_LIST"
        />
        <OrderGroupInputEnterNumber
          v-else
          :value="props.infoPersonal.numberBankPerson"
          @update:value="(value) => emits('update:infoPersonal', { ...props.infoPersonal, numberBankPerson: value })"
        />
      </div>
      <div v-else>
        <OrderGroupInputEnterNumber
          v-if="incomeCompany.value"
          :value="props.infoCompany.numberCompany"
          @update:value="(value) => emits('update:infoCompany', { ...props.infoCompany, numberCompany: value })"
        />
        <OrderGroupInputEnterNumber
          v-else
          :value="props.infoCompany.numberBank"
          @update:value="(value) => emits('update:infoCompany', { ...props.infoCompany, numberBank: value })"
        />
      </div>
      <WelfareNoteText text="cardOrder.crashNote" />
    </div>
  </WelfareBox>
</template>
