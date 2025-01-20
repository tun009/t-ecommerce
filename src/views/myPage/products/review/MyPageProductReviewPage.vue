<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import MyPageProductReview from '@/components/myPage/products/review/MyPageProductReview.vue'
import MyPageProductReviewWriteList from '@/components/myPage/products/review/MyPageProductReviewWriteList.vue'
import { ref, onMounted, reactive } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import MyPageTab from '@/components/myPage/products/common/MypageTab.vue'
import { mypageProductTab } from '@/commons'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import MyPageProductReviewPolicy from '@/components/myPage/products/review/MyPageProductReviewPolicy.vue'
import WelfareFooter from '@/components/layout/WelfareFooter.vue'

const { t } = useI18n()
const currentTab = ref('MyPageProductReviewWriteList')
const tabs: { [key in typeof currentTab.value]: Component } = {
  MyPageProductReviewWriteList,
  MyPageProductReview
}
const reviewCountInfo = reactive<{ mypageProductTab: { value: string; label: string }[] }>({ mypageProductTab: [] })

const init = async () => {
  const data = await myPageProductOrder.getWelfareReviewCount()
  const { orderCount, reviewCount } = data.data
  const countArr = [orderCount, reviewCount]

  reviewCountInfo.mypageProductTab = mypageProductTab.map((item, index) => {
    return {
      ...item,
      label: `${t(`myPage.reviewTab.label${index + 1}`)} (${countArr?.[index]})`
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="$t('myPage.reviewTab.label3')" class="wf-px-20--i" />
  <div class="wf-bg--g-fff wf-px-16 wf-py-20">
    <MyPageTab v-if="reviewCountInfo.mypageProductTab.length > 0" v-model="currentTab" :tabList="reviewCountInfo.mypageProductTab" />
    <MyPageProductReviewPolicy />
  </div>
  <WelfareLineHorizontal />

  <component :is="tabs[currentTab]" @init="init"></component>

  <WelfareFooter :is-hide-navigation="false" />
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product.scss');
</style>
