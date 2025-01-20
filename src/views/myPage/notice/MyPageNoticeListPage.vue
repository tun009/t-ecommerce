<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import BottomCustomerServiceFooter from '@/components/layout/BottomCustomerServiceFooter.vue'
import MypageNoticeList from '@/components/myPage/notice/MyPageNoticeList.vue'
import MyPageAccordion from '@/components/myPage/common/MyPageAccordion.vue'
import MyPageAccordionContent from '@/components/myPage/common/MyPageAccordionContent.vue'
import MyPageNotFound from '@/components/myPage/products/common/MyPageNotFound.vue'
import { PAGE_SIZE } from '@/commons'
import { useMyPageNotice } from '@/composables/myPage/useMyPageNotice'

const { noticeList, isExpanded, getExpanded } = useMyPageNotice()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :title="$t('myPage.notice.mainTitle')" display-back-icon :display-search-icon="false" :display-cart-icon="false" />
    <div v-if="noticeList">
      <div v-for="item of noticeList" :key="item.noticeKey" class="wf-px-13">
        <MyPageAccordion :show="item.show">
          <template #title>
            <MypageNoticeList
              contentType="notice"
              :title-name="item.titleName"
              :created-date="item.createdDate"
              :isIcon="false"
              :show="item.show"
              @click="item.show = !item.show"
            />
          </template>
          <template #content>
            <div class="wf-pb-20 wf-pt-18 wf-px-16 wf-br--g-e-7 wf_flex wf_flex-col wf-space-y-20">
              <MyPageAccordionContent :contents="item.contents" />
            </div>
          </template>
        </MyPageAccordion>
      </div>
      <div v-if="noticeList.length > PAGE_SIZE" class="wf_flex wf_flex-col wf-pb-15 wf-px-10 prd-footer">
        <WelfareButtonFull
          class="wf_width-271 gap_20 border-111"
          :text="$t('productInquiry.buttonViewMore', { pageNum: PAGE_SIZE })"
          :isRotate="isExpanded"
          @click="getExpanded"
        />
      </div>
    </div>
    <MyPageNotFound v-else :desc="$t('myPage.notice.noContent')" />
    <BottomCustomerServiceFooter />
  </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/customer/_welfare-customer.scss');
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
