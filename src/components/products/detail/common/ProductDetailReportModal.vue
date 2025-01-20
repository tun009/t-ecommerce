<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { WelfareRadio } from '@/components/uikit/input'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useModal } from '@/composables/common/useModal'
import { ProductDetailListOptionReport, ProductDetailReportType } from '@/models/views/products/detail/ProductDetailReportModalModel'
import { ref, watch } from 'vue'
import ProductDetailConfirmSubmitModal from './ProductDetailConfirmSubmitModal.vue'
import { productDetailReviewsApi } from '@/services/api/products/detail/ProductDetailReviewsApi'
import { useI18n } from 'vue-i18n'
interface ProductDetailReportModalProps {
  reportKey: string
  title: string
}
type ProductDetailReportModalEmits = (e: 'close') => void
const props = defineProps<ProductDetailReportModalProps>()
defineEmits<ProductDetailReportModalEmits>()

const reportOptions = ref<ProductDetailReportType[]>([
  ProductDetailReportType.ADULT_CONTENT_PORNOGRAPHIC_MATERIAL,
  ProductDetailReportType.VIOLENCE_PROFANITY_HATE_SPEECH,
  ProductDetailReportType.YOUTH_CHILD_ABUSE,
  ProductDetailReportType.IMPROPER_PRODUCT_SALES,
  ProductDetailReportType.ILLEGAL_GAMBLING,
  ProductDetailReportType.SPAM_FLOODING,
  ProductDetailReportType.COPYRIGHT_INFRINGEMENT,
  ProductDetailReportType.DEFAMATION_PRIVACY_INVASION,
  ProductDetailReportType.REPORTING_BLOCKING_MALICIOUS_USERS,
  ProductDetailReportType.INPUT_MANUALLY
])
const currentReport = ref<ProductDetailReportType>(reportOptions.value[0])
const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
const contentReport = ref('')
const refInput = ref()
const { t } = useI18n()

const { showModal, closeModalByPop } = useModal()

const handleShowModalConfirm = () => {
  showModal?.({
    component: ProductDetailConfirmSubmitModal,
    props: {
      title: t('productDetailReport.titleHeaderModal'),
      content: `${t('productDetailReport.reasonTitleModal')}: ${
        currentReport.value === ProductDetailReportType.INPUT_MANUALLY ? contentReport.value : ProductDetailListOptionReport[currentReport.value]
      }`,
      confirmContent: t('productDetailReport.confirmContentModal'),
      isConfirm: true,
      onCancel: () => {
        closeModalByPop?.()
      },
      onConfirm: hanleSubmitReportForm
    }
  })
}

watch(currentReport, (value) => {
  if (value !== ProductDetailReportType.INPUT_MANUALLY) {
    contentReport.value = ''
    refInput.value?.clearInput?.()
  }
})

const handleUpdateContentReport = (value: string) => {
  contentReport.value = value
}

const hanleSubmitReportForm = async () => {
  await productDetailReviewsApi.postReportReview(props.reportKey, {
    orderProductReviewDeclareReasonType: currentReport.value,
    declareContents: contentReport.value
  })
  closeModalByPop?.()
  showModal?.({
    component: ProductDetailConfirmSubmitModal,
    props: {
      title: t('productDetailReport.titleHeaderModal'),
      successContent: t('productDetailReport.submitSuccessModal'),
      onCancel: () => {
        contentReport.value = ''
        currentReport.value = reportOptions.value[0]
        refInput.value?.clearInput?.()
        closeModalByPop?.()
      }
    }
  })
}
</script>
<template>
  <WelfareTitleModal
    class="wf_width-auto wf-py-20 wf-px-16 wf-br--g-e-7 wf-sticky-top wf-bg--white wf_zIndex-1001"
    class-icon="wf-mt--2 wf-mr-2"
    :title="$t('productDetailReport.title')"
    @close="() => $emit('close')"
  />
  <div class="wf_width-screen wf_height-screen wf-bg--white wf_overflow-y-auto">
    <div class="wf-px-20 wf-mt-18">
      <div class="wf_grid wf_grid-cols-2">
        <div v-for="(report, index) in reportOptions" :key="index" class="wf_flex wf_items-center wf-space-x-6 wf-pb-16 wf-color--g-333">
          <WelfareRadio name="radio" v-model="currentReport" :value="report" />
          <span :class="getClass(report === currentReport)">{{ ProductDetailListOptionReport[report] }}</span>
        </div>
      </div>
      <WelfareTextarea
        ref="refInput"
        show-max-length
        :disabled="currentReport !== ProductDetailReportType.INPUT_MANUALLY"
        :max-length="100"
        :model-value="contentReport"
        @update:model-value="(value: string) => handleUpdateContentReport(value)"
        :placeholder="$t('productDetailReport.textAreaPlaceholder')"
        class="wf_width-full wf-mt--3 wf_height-122"
        class-maxlength="wf-mr-3 wf-space-x-0--i"
      />
      <div class="wf-font_13--reg wf-color--g-999 wf_flex wf-space-x-6 wf-mt-12 wf_items-center">
        <IconDot color="wf-color--g-999" :height="2" :width="2" />
        <span>{{ $t('productDetailReport.hintReport') }}</span>
      </div>
      <div class="wf_flex wf-space-x-6 wf_items-center wf_justify-center wf-px-10 wf-mt-22">
        <WelfareButtonLine @click="() => $emit('close')" type="lg" class="wf_flex-1" lg-state="grey-line" :text="$t('button.cancel')" />
        <WelfareButtonLine @click="handleShowModalConfirm" type="lg" class="wf_flex-1" :text="$t('button.check')" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-report-modal.scss');
</style>