<!--FO_MC_IT012013, FO_MC_IT012014P-->
<script setup lang="ts">
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import IconChecked from '@/components/icons/IconChecked.vue'
import ProductDetailItemQAExpander from './ProductDetailItemQAExpander.vue'
import { PAGE_SIZE, defaultColor } from '@/commons'
import IconMessageInquiries from '@/components/icons/IconMessageInquiries.vue'
import { useProductDetailQuestionAndAnswerWrap } from '@/composables/products/detail/productQATab/useProductDetailQuestionAndAnswerWrap'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import ProductDetailFormInquiry from './ProductDetailFormInquiry.vue'

const {
  data,
  isMyQuestion,
  isAnswered,
  handleCheckedIsMyQuestion,
  handleCheckedIsAnswered,
  hasMore,
  handleLoadMore,
  isShowFormInquiry,
  handleShowFormInquiry,
  refresh
} = useProductDetailQuestionAndAnswerWrap()
</script>
<template>
  <div class="wf-qa-tab">
    <div class="wf_flex wf_justify-center wf-my-30">
      <WelfareButtonLine
        @click="handleShowFormInquiry"
        class="wf-br--red-ff-3-b-4-f wf-color--red-ff-3-b-4-f wf-font_15--semi"
        :text="$t('productInquiry.buttonInquiry')"
      />
    </div>
    <ProductDetailFormInquiry v-if="isShowFormInquiry" :refreshData="refresh" />
    <WelfareLineHorizontal />
    <div class="wf_flex wf_flex-col wf-space-y-20 wf-my-30 wf-mx-16">
      <div class="wf_flex wf-space-x-20 wf-font_15--semi">
        <div class="wf_flex wf_justify-center wf_items-center wf-space-x-10" @click="handleCheckedIsMyQuestion">
          <IconChecked :color="`${isMyQuestion ? defaultColor.black : defaultColor.gray5}`" />
          <span :class="`${isMyQuestion ? '' : 'wf-color--g-999'}`">{{ $t('productInquiry.titleMyQuestion') }}</span>
        </div>
        <div class="wf_flex wf_justify-center wf_items-center wf-space-x-10" @click="handleCheckedIsAnswered">
          <IconChecked :color="`${isAnswered ? defaultColor.black : defaultColor.gray5}`" />
          <span :class="`${isAnswered ? '' : 'wf-color--g-999'}`">{{ $t('productInquiry.titleAnsweredQuestion') }}</span>
        </div>
      </div>
      <div v-if="data.length > 0">
        <ProductDetailItemQAExpander v-for="(item, index) in data" :key="`${index}_inquiry`" :item-inquiry="item" :index="index" />
        <WelfareButtonFull
          v-if="hasMore"
          class="wf_flex-1 wf-my-30 wf_width-full wf-br--g-111"
          :text="$t('productInquiry.buttonViewMore', { pageNum: PAGE_SIZE })"
          type="lg"
          lg-state="black-line"
          @click="handleLoadMore"
        />
      </div>
      <div class="wf_flex wf_flex-col wf-space-y-15 wf_justify-center wf_items-center wf-mt-30-important" v-else>
        <IconMessageInquiries />
        <span class="wf-font_15--reg wf-color--g-333">{{ $t('productInquiry.emptyInquiriesMessage') }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-qa-wrap.scss');
</style>
