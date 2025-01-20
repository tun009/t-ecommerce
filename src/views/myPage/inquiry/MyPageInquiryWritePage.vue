<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareFormTitle from '@/components/uikit/form/WelfareFormTitle.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import MyPageOrderInfo from '@/components/myPage/customer/MyPageOrderInfo.vue'
import { useMyPageInquiryWrite } from '@/composables/myPage/useMyPageInquiry'
import MypageFileUpload from '@/components/myPage/common/MypageFileUpload.vue'

const {
  inquiryWriteData,
  categoryTab,
  searchResult,
  uploadFileList,
  handleShowOrderNumber,
  handleShowProductCode,
  resultReset,
  submitInquiry,
  openFileUploadPopup,
  resetFileUpload
} = useMyPageInquiryWrite()
</script>

<template>
  <WelfareTitleTextStickyTop :title="$t('myPage.inquiryWrite.mainTitle')" display-back-icon :display-search-icon="false" :display-cart-icon="false" />
  <div class="wf_flex wf_flex-col wf-space-y-10 wf-pt-20 wf-px-16">
    <WelfareFormTitle :title="$t('myPage.inquiryWrite.title')" :required="true" />
    <WelfareSelect
      v-model="inquiryWriteData.inquiryType"
      class="wf_height-41"
      :placeholder="$t('myPage.inquiryWrite.placeholder')"
      option-label="label"
      :options="categoryTab"
    />
  </div>
  <div class="wf_flex inquiry_flex gap-10 wf-bg--g-fff wf-px-16 wf-pt-20">
    <WelfareButtonLine
      type="md"
      :text="$t('myPage.inquiryWrite.button')"
      class="inquiry_box"
      @click="handleShowOrderNumber({ title: $t('myPage.inquiryWrite.button') })"
    />
    <WelfareButtonLine
      type="md"
      :text="$t('myPage.inquiryWrite.button1')"
      class="inquiry_box"
      @click="handleShowProductCode({ title: $t('myPage.inquiryWrite.button1') })"
    />
  </div>
  <div v-if="searchResult.data.type == 'order'" class="wf-pt-20 wf-px-16">
    <MyPageOrderInfo
      :order-status="searchResult.data.state"
      :order-date="searchResult.data.date"
      :order-number="searchResult.data.key"
      :order-name="searchResult.data.receiverName"
      :order-phone-number="searchResult.data?.receiverPhoneNumber"
      :order-address="searchResult.data?.receiverAddress"
      :product-name="searchResult.data.productName"
      :product-image="searchResult.data.thumbnailProduct"
      :product-price="searchResult.data.pricePromotion"
      :product-amount="searchResult.data.price"
      :product-options="searchResult.data.optionName"
      @init="resultReset"
    />
  </div>
  <div v-if="searchResult.data.type == 'product'" class="wf-pt-20 wf-px-16">
    <MyPageOrderInfo
      :product-name="searchResult.data.productName"
      :product-image="searchResult.data.thumbnailProduct"
      :product-price="searchResult.data.pricePromotion"
      @init="resultReset"
    />
  </div>
  <div class="wf_flex wf_flex-col wf-space-y-10 wf-pt-20 wf-px-16">
    <WelfareFormTitle :title="$t('myPage.inquiryWrite.title1')" :required="true" />
    <WelfareInput v-model="inquiryWriteData.title" class="wf_letter-spacing--1-2" :placeholder="$t('myPage.inquiryWrite.placeholder1')" />
  </div>
  <div class="wf_flex wf_flex-col wf-space-y-10 wf-py-20 wf-px-16">
    <WelfareFormTitle :title="$t('myPage.inquiryWrite.title2')" :required="true" />
    <WelfareTextarea
      v-model="inquiryWriteData.contents"
      class="wf-mt--1"
      :placeholder="$t('myPage.inquiryWrite.placeholder2')"
      :show-max-length="true"
      :max-length="500"
    />
  </div>
  <div class="wf-background height-7"></div>
  <div class="wf-space-y-10 wf-py-20 wf-px-16">
    <div class="wf_flex wf-space-between wf-align-center">
      <WelfareFormTitle :title="$t('myPage.inquiryWrite.title3')" :required="false" />
      <WelfareButtonLine class="wf_width-62" type="sm" :text="$t('myPage.inquiryWrite.button2')" @click="resetFileUpload" />
    </div>
    <div class="wf_flex inquiry_flex wf_unit-product-image wf-py-20">
      <MypageFileUpload
        v-for="(item, index) in uploadFileList"
        :data="item"
        @handle-img-upload="() => openFileUploadPopup(index + '')"
        :key="`uload${index}`"
        :target="index + ''"
      />
    </div>
  </div>
  <div class="wf-background height-7"></div>
  <div class="wf_flex wf_flex-col wf-space-y-10 wf-pt-20 wf-px-16">
    <WelfareFormTitle :title="$t('myPage.inquiryWrite.title4')" :required="false" />
    <div class="wf_flex wf_items-start wf-font_13--reg wf-color--g-555 wf-ml--3">
      <span class="wf-mr-4 wf-color--g-bbb wf-mt--1">.</span>
      <span class="wf_line-height-16-6 color-777">{{ $t('myPage.inquiryWrite.content') }}</span>
    </div>
    <div class="wf_flex wf-align-center gap-8 wf-pt-20 wf-pb-10">
      <WelfareCheckbox v-model="inquiryWriteData.emailReceiveYn" trueValue="Y" falseValue="N" />
      <p class="font-15">{{ $t('myPage.inquiryWrite.check1') }}</p>
      <WelfareInput
        v-model="inquiryWriteData.inquirerEmail"
        class="wf_letter-spacing--1-2"
        placeholder="abcdefg@mz.co.kz"
        :clear-text="false"
        disabled
      />
    </div>
    <div class="wf_flex wf-align-center gap-8 wf-pb-10">
      <WelfareCheckbox v-model="inquiryWriteData.smsReceiveYn" trueValue="Y" falseValue="N" />
      <p class="font-15">{{ $t('myPage.inquiryWrite.check2') }}</p>
      <WelfareInput
        v-model="inquiryWriteData.inquirerPhoneNum"
        class="wf_letter-spacing--1-2"
        placeholder="01012345678"
        type="number"
        :clear-text="false"
        disabled
      />
    </div>
  </div>
  <div class="wf-background height-7"></div>
  <div class="wf_flex wf_flex-col wf-pt-20 wf-px-16 prd-footer">
    <WelfareButtonLine type="lg" :text="$t('button.registration')" @click="submitInquiry" />
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
