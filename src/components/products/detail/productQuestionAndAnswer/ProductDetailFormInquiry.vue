<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { WelfareCheckbox, WelfareInput } from '@/components/uikit/input'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useForm } from 'vee-validate'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useLoading } from '@/composables/common/useLoading'
import { ref } from 'vue'
import { productDetailProductQATabApi } from '@/services/api/products/detail/ProductDetailProductQATabApi'
import { ProductDetailInquiriesAnswerStatusType, ProductDetailInquiriesMyQuestionYNType } from '@/models/views/products/ProductDetailProductQAModel'
import { useRoute } from 'vue-router'
import { MINIMUM_TEXTAREA_LENGTH } from '@/commons'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  refreshData: {
    type: Function,
    required: true
  }
})

const { openModal, closeAllModal } = useModalNotification()
const { loading, setLoading } = useLoading()
const refInput = ref()
const router = useRoute()
const { values, setFieldValue, handleSubmit } = useForm({
  initialValues: {
    titleQuestion: '',
    descriptionContent: '',
    isSecretQuestion: false
  }
})

const { t } = useI18n()

const handleShowError = () => {
  const { titleQuestion, descriptionContent } = values
  if (!titleQuestion) return openModal?.({ content: t('productInquiry.validateForm.title') })
  if (!descriptionContent) return openModal?.({ content: t('productInquiry.validateForm.content') })
  if (titleQuestion.length < MINIMUM_TEXTAREA_LENGTH) return openModal?.({ content: t('productInquiry.validateForm.titleLength') })
  onSubmit()
}

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  if (loading?.value) return
  try {
    closeAllModal?.()
    setLoading?.(true)
    await productDetailProductQATabApi.postNewQuestion({
      itemKey: Number(router.query?.productKey),
      answerStatusCode: ProductDetailInquiriesAnswerStatusType.HOLD,
      titleName: values.titleQuestion,
      questionContents: values.descriptionContent,
      releaseYn: values.isSecretQuestion ? ProductDetailInquiriesMyQuestionYNType.N : ProductDetailInquiriesMyQuestionYNType.Y
    })
    resetForm()
    refInput.value?.clearInput?.()
    props.refreshData()
    openModal?.({ content: t('productInquiry.validateForm.submitSuccess') })
  } catch (error: any) {
    openModal?.({ content: `${error?.data?.errors[0]?.message} (${error?.data?.errors[0]?.invalidValue})` })
  } finally {
    setLoading?.(false)
  }
})
</script>

<template>
  <WelfareLineHorizontal />
  <form @submit.prevent="handleShowError">
    <WelfareBox class="wf-mb-10">
      <WelfareInput
        :title="$t('productInquiry.formInquiry.labelOfTitleQuestion')"
        only-required-title
        classWrapTitle="wf_flex wf_justify-between wf_items-center wf-mt--1 wf-color--g-111"
        :placeholder="$t('productInquiry.formInquiry.placeholderTitleQuestion')"
        :model-value="values.titleQuestion"
        @update:model-value="(value: string) => setFieldValue('titleQuestion', value)"
      >
        <template #title-suffix>
          <div class="wf_flex wf_justify-between wf_items-center wf-space-x-6 wf-font_15--semi">
            <WelfareCheckbox
              v-model="values.isSecretQuestion"
              :value="values.isSecretQuestion"
              @update:model-value="(value: string) => setFieldValue('isSecretQuestion', !values.isSecretQuestion)"
            />
            <span>{{ $t('productInquiry.formInquiry.isSecretQuestionLabel') }}</span>
          </div>
        </template>
      </WelfareInput>
      <div class="wf-mt-20">
        <WelfareTextarea
          ref="refInput"
          only-required-title
          :title="$t('productInquiry.formInquiry.labelOfContentQuestion')"
          show-max-length
          :max-length="50"
          :model-value="values.descriptionContent"
          @update:model-value="(value: string) => setFieldValue('descriptionContent', value)"
          :placeholder="$t('productInquiry.formInquiry.placeholderContentQuestion')"
          class="wf_width-full"
          class-maxlength="wf-mr-3 wf-space-x-0--i"
        />
      </div>
      <WelfareButtonLine
        type-action="submit"
        :text="$t('productInquiry.formInquiry.labelButtonSubmit')"
        class="wf_width-full wf_flex-1 wf-mt-30"
        type="lg"
      />
    </WelfareBox>
  </form>
</template>
<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-form-inquiry.scss');
</style>
