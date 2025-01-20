<script setup lang="ts">
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageProductCodeContent from '@/components/myPage/inquiry/modal/MyPageProductCodeContent.vue'
import { WelfareModalProductCodeProps, SearchProductCode } from '@/models/views/myPage/MyPageCustomerInfo'
import { BaseContentConfirmModalEmits } from '@/models/widgets/modal'
import { useMyPageInquiryPopupProductCode } from '@/composables/myPage/useMyPageInquiry'

const emit = defineEmits<BaseContentConfirmModalEmits<SearchProductCode>>()
const props = defineProps<WelfareModalProductCodeProps>()

const { getProductCode, productCodeData, selectedProductCode } = useMyPageInquiryPopupProductCode(props, emit)
</script>

<template>
  <div class="wf_modal-width wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important">
    <WelfareTitleModal class="wf-pt-10 wf-pb-15" classTitle=" wf_letter-spacing--0745 " :title="props.title" @click="$emit('close')" />
    <div class="wf-px-16">
      <div class="wf_flex wf-mx-auto wf_width-full gap-10">
        <WelfareInput v-model.trim="productCodeData.searchText" :placeholder="$t('myPage.inquiryProduceCode.mainTitle')" />
        <WelfareButtonLine type="md" :text="$t('button.view')" class="inquiry_box" @click="() => getProductCode()" />
      </div>
      <div class="wf-pt-20 wf-px-16">
        <MyPageProductCodeContent :data="productCodeData.view" />
      </div>
      <div class="wf_flex wf_flex-col wf-py-10 wf-px-10">
        <WelfareButtonLine type="lg" :text="$t('myPage.inquiryProduceCode.select')" @click="() => selectedProductCode()" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
