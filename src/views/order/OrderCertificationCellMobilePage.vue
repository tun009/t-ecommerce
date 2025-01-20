<script setup lang="ts">
import { defaultColor, formatSecondsToTime } from '@/commons'
import IconQuestionGreyCircle from '@/components/icons/IconQuestionGreyCircle.vue'
import ProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { WelfareInput, WelfareInputNumber } from '@/components/uikit/input'
import WelfareTitleText from '@/components/uikit/title/WelfareTitleText.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { useOrderCertificationCellMobile } from '@/composables/order/useOrderCertificationCellMobile'

const { times, handleCheckCode, handleResendCode, handleSendCode, messageCode, disabledSave, refInfoUser, disabledResend } =
  useOrderCertificationCellMobile()
</script>
<template>
  <div class="wf-relative wf-overflow-scroll-full--y wf_flex wf_flex-col">
    <WelfareTitleText class="wf-sticky-top" :displayBackIcon="true" :title="$t('cardOrder.orderCertification.title')" />
    <WelfareBox class="wf-mt--2">
      <ProductOrderTitle title="cardOrder.orderCertification.titleVerification" />
      <div class="wf-mt-20 wf_flex wf_flex-col wf-space-y-20">
        <WelfareInput :clearText="false" v-model:modelValue="refInfoUser.name" :title="$t('cardOrder.orderCertification.name')" />
        <div>
          <WelfareInputNumber
            :placeholder="$t('cardOrder.orderCertification.phonePlaceholder')"
            :clearText="false"
            v-model:modelValue="refInfoUser.phone"
            :title="$t('cardOrder.orderCertification.phone')"
          />
          <div class="wf-mt-10">
            <WelfareInput
              :clearText="false"
              v-model:modelValue="refInfoUser.code"
              :placeholder="$t('cardOrder.orderCertification.inputSendPlaceholder')"
              classWrap="wf_flex wf-space-x-10"
            >
              <template #suffix>
                <WelfareButtonLine class="wf-button-resend wf-px-0" @click="handleResendCode" :text="$t('button.resendNumber')" type="md" />
              </template>

              <template #last-content>
                <div class="wf_flex">
                  <span class="wf-font-15--reg wf-color--red-ff-3-b-4-f">{{ formatSecondsToTime(!disabledResend ? times / 1000 : 0) }}</span>
                </div>
              </template>
            </WelfareInput>
            <div v-if="messageCode.type" class="wf_flex wf-mt-10 wf-space-x-3">
              <IconQuestionGreyCircle :color="messageCode.type === 'sended' ? defaultColor.gray3 : defaultColor.red" />
              <span
                class="wf-font_13--reg"
                :class="[{ 'wf-color--g-777': messageCode.type === 'sended', 'wf-color--red-ff-3-b-4-f': messageCode.type === 'error' }]"
                >{{ $t(messageCode.message) }}</span
              >
            </div>
          </div>
        </div>
        <WelfareButtonLine @click="handleSendCode" type="md" mdState="point" :text="$t('button.sendNumber')" />
      </div>
    </WelfareBox>
    <WelfareBox class="wf_flex-1 wf_flex wf_items-end">
      <WelfareButtonLine
        class="wf_width-full"
        type="lg"
        @click="handleCheckCode"
        :disabled="disabledSave"
        lgState="default"
        :text="$t('button.check')"
      />
    </WelfareBox>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-certification-phone.scss');
</style>
