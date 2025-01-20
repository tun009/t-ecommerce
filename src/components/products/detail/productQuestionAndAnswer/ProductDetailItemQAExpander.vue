<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ref } from 'vue'
import IconSplit from '@/components/icons/IconSplit.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconStatusAcceptQuestion from '@/components/icons/IconStatusAcceptQuestion.vue'
import IconStatusAnswered from '@/components/icons/IconStatusAnswered.vue'
import { ProductDetailProductQAResponse } from '@/models/services/responses/products/detail/ProductDetailProductQAResponse'
import { ProductDetailInquiriesAnswerStatusType, ProductDetailInquiriesMyQuestionYNType } from '@/models/views/products/ProductDetailProductQAModel'
import { formatTimeWithDot } from '@/commons'
import { useModal } from '@/composables/common/useModal'
import PopupNotification from '@/components/widgets/modal/popup/PopupNotification.vue'
import { useI18n } from 'vue-i18n'

interface ProductDetailItemStatusAnswerProps {
  itemInquiry: ProductDetailProductQAResponse
  index: number
}

const props = defineProps<ProductDetailItemStatusAnswerProps>()
const refExpander = ref()

const { showModal, closeModalByPop } = useModal()

const { t } = useI18n()

const titleSecretTopic = (itemInquiry: ProductDetailProductQAResponse) => {
  if (itemInquiry.releaseYn === ProductDetailInquiriesMyQuestionYNType.N && itemInquiry.myQuestionYn === ProductDetailInquiriesMyQuestionYNType.N) {
    return t('productInquiry.inquiryItem.isSecretMessage')
  } else {
    return itemInquiry.titleName
  }
}

const handleExpand = (itemInquiry: ProductDetailProductQAResponse) => {
  if (itemInquiry.releaseYn === ProductDetailInquiriesMyQuestionYNType.N && itemInquiry.myQuestionYn === ProductDetailInquiriesMyQuestionYNType.N) {
    showModal?.({
      component: PopupNotification,
      props: {
        content: t('productInquiry.inquiryItem.alertSecretMessage'),
        onAccept: () => {
          closeModalByPop?.()
        }
      }
    })
  } else {
    refExpander.value?.handleToggleExpander()
  }
}
</script>

<template>
  <WelfareExpander ref="refExpander" :class="`wf-br-b-1 ${props.index !== 0 ? 'wf-mt-20' : ''}`">
    <template #button="{ isExpander }">
      <div @click="handleExpand(itemInquiry)" class="wf-pb-14 wf-br--g-e-7 wf_flex wf_items-center wf_justify-between wf-space-x-5">
        <div class="wf_flex wf_items-center wf-space-x-10">
          <div class="wf_flex wf-space-x-10 wf_justify-center wf_items-center">
            <div>
              <IconStatusAnswered v-if="itemInquiry.answerStatusCode === ProductDetailInquiriesAnswerStatusType.COMPLETE" />
              <IconStatusAcceptQuestion v-else />
            </div>
            <div class="wf_flex wf_flex-col wf-space-y-10 wf-font_13--reg">
              <div class="wf_flex wf-space-x-7 wf_items-center wf-color--g-555">
                <span>{{ itemInquiry.memberInfo.loginId }}</span>
                <IconSplit />
                <span>{{ formatTimeWithDot(itemInquiry.createdQuestionDate) }}</span>
              </div>
              <div class="wf_flex wf-space-x-2">
                <span>{{ titleSecretTopic(itemInquiry) }}</span>
                <IconLock v-if="itemInquiry.releaseYn === ProductDetailInquiriesMyQuestionYNType.N" />
              </div>
            </div>
          </div>
        </div>
        <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
          <IconArrowDown />
        </div>
      </div>
    </template>
    <div class="wf-px-15 wf_flex wf_flex-col wf-py-20 wf-bg--g-f-8-f-8 wf-space-y-20">
      <div class="wf_flex wf_flex-col wf-color--g-333 wf-space-y-10 wf-font_15--reg">
        <span>{{ itemInquiry.titleName }}</span>
        <span>{{ itemInquiry.questionContents }}</span>
      </div>
      <div class="wf_flex wf_flex-col wf-color--g-333 wf-space-y-10 wf-font_13-reg--lh140">
        <span>{{ itemInquiry.answerTitleName }}</span>
        <span>{{ itemInquiry.answerContents }}</span>
      </div>
    </div>
  </WelfareExpander>
</template>
