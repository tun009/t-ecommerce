<script lang="ts" setup>
import { Info } from '@/assets/images'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { SearchProductCode, WelfareProductCodeProps } from '@/models/views/myPage/MyPageCustomerInfo'
import { BaseContentConfirmModalEmits } from '@/models/widgets/modal'
import { useMyPageInquiryProductCode } from '@/composables/myPage/useMyPageInquiry'

const props = defineProps<WelfareProductCodeProps>()
const emit = defineEmits<BaseContentConfirmModalEmits<SearchProductCode>>()

const { productCodeData, getProductCode } = useMyPageInquiryProductCode(props, emit)
</script>

<template>
  <WelfareTitleModal class="wf_width-auto wf-pb-15 wf-mx-16" :title="props.title" @close="() => emit('close')" classIcon="wf-mt-2" />
  <div class="wf-px-16">
    <div class="wf_flex wf-mx-auto wf_width-full wf-mt-24 gap-10">
      <WelfareInput v-model.trim="productCodeData.searchText" :placeholder="$t('myPage.inquiryProduceCode.mainTitle')" />
      <WelfareButtonLine
        type="md"
        :text="$t('button.view')"
        class="inquiry_box"
        @click="() => getProductCode({ title: $t('myPage.inquiryProduceCode.mainTitle') })"
      />
    </div>
    <div class="wf-mt-20 wf-mb-20 wf_text-center">
      <p class="wf-font_14--mid wf-mb-10">{{ $t('myPage.inquiryProduceCode.content1') }}</p>
      <p class="wf-font_13--mid wf-color--g-777">{{ $t('myPage.inquiryProduceCode.content2') }}</p>
    </div>
    <div class="wf-bg--g-f-5-f-6-fa wf-mb-24">
      <div class="wf-py-40 wf-px-40">
        <WelfareImage class="wf-unit-image" :data-src="Info" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
