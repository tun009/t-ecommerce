<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import MyPageNotFound from '@/components/myPage/products/common/MyPageNotFound.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import MyPageAccordion from '@/components/myPage/common/MyPageAccordion.vue'
import MyPageAccordionContent from '@/components/myPage/common/MyPageAccordionContent.vue'
import MypageNoticeList from '@/components/myPage/notice/MyPageNoticeList.vue'
import { CustomerCall } from '@/assets/images'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { MYPAGE_INQUIRY_DETAIL_MEMBER, MYPAGE_INQUIRY_DETAIL_PRODUCT, MYPAGE_NOTICE, MYPAGE_INQUIRY_WRITE } from '@/commons'
import { useMyPageCustomer } from '@/composables/myPage/useMyPageCustomer'
import { useRouter } from 'vue-router'
const router = useRouter()
const { processLink } = useBuildLink()

const {
  categoryTab,
  faqTypeData,
  searchInput,
  searchResult,
  withOutSpaces,
  noticeList,
  hashTagList,
  totalCount,
  page,
  getExpanded,
  updateView,
  getSearch
} = useMyPageCustomer()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :title="$t('myPage.customer.mainTitle')" display-back-icon :display-search-icon="false" :display-cart-icon="false" />
    <div class="wf-relative">
      <div class="wf-px-16 wf-py-30 wf-inquiry-background">
        <div class="wf_flex wf_justify-between search_input_info">
          <input
            type="text"
            v-model.trim="searchInput"
            class="wf-py-12 wf-inquiry-background search_input"
            :placeholder="$t('myPage.customer.placeholder')"
          />
          <button @click="getSearch(searchInput)"><IconSearch /></button>
        </div>
        <div class="line_bottom"></div>
        <div class="search_word">
          <div v-for="(item, index) of hashTagList" :key="'hash' + index">
            <div class="search_round" @click="getSearch(item.searchResultTag)"># {{ item.searchResultTag }}</div>
          </div>
        </div>
      </div>
      <div v-if="searchResult == 'false'" class="wf-pt-18 wf-px-16 wf-br--g-e-7 wf-br-b-1">
        <WelfareTab v-if="categoryTab.length" :items="categoryTab" @onChange="updateView" :default="categoryTab[0]" name="line-tab-1" />
      </div>
      <div v-if="searchResult == 'true'" class="wf-px-16 wf-pt-18 fw-600">{{ withOutSpaces }}({{ faqTypeData.length }})</div>
      <div v-if="faqTypeData.length" class="pb-20">
        <div v-for="item of faqTypeData" :key="item.key" class="wf-px-16">
          <MyPageAccordion :show="item.show">
            <template #title>
              <MypageNoticeList contentType="customer" :title-name="item.question" :isIcon="true" :show="item.show" @click="item.show = !item.show" />
            </template>
            <template #content>
              <div class="wf-pb-20 wf-pt-18 wf-px-16 wf-br--g-e-7 wf_flex wf_flex-col wf-space-y-20">
                <MyPageAccordionContent :contents="item.answer" />
              </div>
            </template>
          </MyPageAccordion>
        </div>
        <div class="wf_flex wf_flex-col wf-py-10 wf-px-10 prd-footer">
          <WelfareButtonFull
            v-if="totalCount > page * 10"
            @click="getExpanded"
            class="wf_width-271 gap_20 border-111"
            :text="$t('myPage.inquiryList.buttonLoadMore')"
            active
          />
        </div>
      </div>
      <MyPageNotFound v-else :desc="$t('myPage.customer.noContent')" />
      <div class="wf-background height-7"></div>
      <div class="wf-px-16 wf-py-20">
        <div class="customer_grid">
          <router-link :to="processLink(MYPAGE_INQUIRY_WRITE)">
            <div class="url">{{ $t('myPage.customer.button1') }}</div>
          </router-link>
          <router-link :to="processLink(MYPAGE_INQUIRY_DETAIL_MEMBER)">
            <div class="url">{{ $t('myPage.customer.button2') }}</div>
          </router-link>
          <router-link :to="processLink(MYPAGE_INQUIRY_DETAIL_PRODUCT)">
            <div class="url">{{ $t('myPage.customer.button3') }}</div>
          </router-link>
          <div class="url"></div>
        </div>
      </div>
      <div class="wf-background">
        <div class="customer_call">
          <div class="wf_unit-product-image call_img">
            <WelfareImage class="wf-unit-image" :data-src="CustomerCall" />
          </div>
          <div>
            <div class="font-15 fw-600 customer_center mb-10">{{ $t('myPage.customer.content1') }}</div>
            <div class="font-13 customer_center color-555">{{ $t('myPage.customer.content2') }}</div>
          </div>
        </div>
      </div>
      <div class="wf-px-16 wf-py-20 customer_notice">
        <div class="customer_notice_title">
          <div class="wf-font_21--bold font-17">{{ $t('myPage.notice.mainTitle') }}</div>
          <div class="font-14">
            <button @click="() => router.push(processLink(MYPAGE_NOTICE))">{{ $t('myPage.customer.button4') }} <IconArrowRight /></button>
          </div>
        </div>
        <div v-for="items in noticeList" :key="items.noticeKey">
          <div class="notice_sec" @click="() => router.push(`/my-page/notice?key=${items.noticeKey}`)">
            <div class="notice_sec_comment fw-500">{{ items.titleName }}</div>
            <div class="notice_sec_date">{{ items.createdDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/customer/_welfare-customer.scss');
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
