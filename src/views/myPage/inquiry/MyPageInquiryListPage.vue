<!-- FO_MC_MY053001-->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import MyPageTab from '@/components/myPage/products/common/MypageTab.vue'
import { useMyPageInquiryList } from '@/composables/myPage/useMyPageInquiry'

const { currentTab, myPageInquiryTab, tabs } = useMyPageInquiryList()

</script>

<template>
  <WelfareTitleTextStickyTop :displayBackIcon="true" :title="$t('myPage.main.linkRedirect.detailInquiry')" class="wf-px-20--i"/>
  <div class="wf-bg--g-fff wf-px-16 wf-py-20">
    <MyPageTab v-model="currentTab" :tabList="myPageInquiryTab" />
  </div>
  
  <component :is="tabs[currentTab]"></component>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product.scss');
</style>
