<!-- FO_MC_MA021100 -->
<script setup lang="ts">
import {
  CATEGORY_ROUTER,
  MYPAGE_CUSTOMER_ROUTER,
  MYPAGE_MAIN_PAGE,
  MYPAGE_NOTIFICATION,
  MYPAGE_ORDER_DELIVERY_INQUIRY,
  MYPAGE_SETTING,
  MYPAGE_WELFARE_POINTS,
  defaultColor,
  formatNumberDot
} from '@/commons'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconArrowRightLink from '@/components/icons/IconArrowRightLink.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconNotice from '@/components/icons/myPage/IconNotice.vue'
import IconSettingMyPage from '@/components/icons/myPage/IconSettingMyPage.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useHomeCategoryMenu } from '@/composables/home/useHomeCategoryMenu'

const { processLink } = useBuildLink()
const { router, account, listLinkRedirect, logout, dataCategory, deliveryCountState, isApp } = useHomeCategoryMenu()
</script>

<template>
  <div>
    <WelfareBox>
      <div class="wf_flex wf_justify-end">
        <IconClose :height="20" :width="20" @click="router.back()" />
      </div>
      <div class="wf_height-57 wf_flex wf_justify-between wf-space-x-16">
        <div class="wf_flex wf_justify-between wf_flex-col">
          <p class="wf-color--g-777 wf-font_15--semi">{{ account?.company?.customerName }}</p>
          <router-link :to="processLink(MYPAGE_MAIN_PAGE)" class="wf-font_23--bold wf_flex wf_items-center wf-space-x-13 wf-color--g-111">
            <span
              >{{ account?.memberName }}<span class="wf-font_23--reg"> {{ $t('categoryMenu.welcome') }} </span></span
            >

            <span>
              <IconArrowRightLink :height="12" :color="defaultColor.primary" />
            </span>
          </router-link>
        </div>
        <div class="wf_flex wf-mt-auto wf-space-x-5">
          <router-link  v-if="isApp" :to="processLink(MYPAGE_NOTIFICATION)" class="wf_button-action wf_myPage-hover-link">
            <button class="wf_button-action wf_myPage-hover-link ticket" data-count="N">
              <IconNotice />
            </button>
          </router-link>
          <router-link :to="processLink(MYPAGE_SETTING)" class="wf_button-action wf_myPage-hover-link">
            <IconSettingMyPage />
          </router-link>
        </div>
      </div>
      <div class="wf-mt-20 wf-br-t-1 wf-br-b-1 wf-br--g-e-7 wf-px-20 wf-pt-20 wf-pb-18 wf-bg--g-f-5-f-6-fa">
        <div class="wf_flex wf_justify-between">
          <div class="wf-br-r-1 wf-br--g-e-7 wf_flex-1">
            <router-link :to="processLink(MYPAGE_WELFARE_POINTS)" class="wf_flex wf_flex-col wf_items-center wf_min-width-110 wf-pr-22">
              <span class="wf-font_15--reg wf-color--g-333 wf-mb-10">{{ $t('categoryMenu.point') }}</span>
              <WelfareViewPrice :price="account?.pointBalance || 0" classPrice="wf-font_21--bold" />
            </router-link>
          </div>
          <div class="wf_flex-1">
            <router-link :to="processLink(MYPAGE_ORDER_DELIVERY_INQUIRY)" class="wf-pl-10 wf_flex wf_flex-col wf_items-center wf_min-width-110">
              <span class="wf-font_15--reg wf-color--g-333 wf-mb-8 wf-ml-9">{{ $t('categoryMenu.delivery') }}</span>
              <p class="wf-color--g-111 wf_flex wf_items-center wf-pl-7" :class="$props.class ?? 'wf-font_13--reg'">
                <span :class="'wf-font_23--bold wf_letter-spacing--1'">{{ formatNumberDot(deliveryCountState?.deliveryCompletedCount) }} </span>
                {{ $t('myPage.main.deliveryCount') }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </WelfareBox>
    <WelfareLineHorizontal />
    <WelfareBox>
      <div class="wf-color--g-333 wf-font_15--semi wf-mb-6 wf-mt--2">{{ $t('categoryMenu.category') }}</div>
      <div class="wf_grid wf_grid-cols-3">
        <router-link
          :to="processLink(`${CATEGORY_ROUTER}?category1=${item.displayCategoryId}`)"
          class="wf_flex wf_items-center wf_justify-center wf_height-52 wf-color--g-555 wf-font_15--reg wf-px-4"
          v-for="(item, index) in dataCategory"
          :key="item?.displayCategoryId ?? 0 + index"
        >
          <span
            :class="[{ 'wf-br-l-1 wf-br-r-1 wf-br--g-e-7': index % 3 == 1 }]"
            class="wf-line-clamp-1 wf_width-full wf_flex wf_items-center wf_justify-center wf_text-center"
            >{{ item.displayCategoryName ?? '' }}</span
          >
        </router-link>
      </div>
    </WelfareBox>
    <WelfareLineHorizontal />
    <div class="wf-mb-24">
      <router-link
        v-for="(item, index) in listLinkRedirect"
        :to="processLink(item.path || '')"
        :key="index"
        class="wf_myPage-hover-link wf_block wf-br-t-1 wf-br--g-e-7 wf-px-16 wf-py-17"
      >
        <div class="wf_flex wf_justify-between wf_items-center wf_height-15">
          <span class="wf-font_15--mid wf-color--g-333">{{ $t(item.name) }}</span>
          <span>
            <IconArrowRight />
          </span>
        </div>
      </router-link>
    </div>
    <div class="wf_width-full wf-bg--g-bbb wf_height-40 wf_flex wf_justify-center wf-pb-12 wf-pt-13">
      <router-link :to="processLink(MYPAGE_CUSTOMER_ROUTER)" :class="`wf-color--g-fff wf-font_15--reg wf-pointer  wf_flex-1 wf_text-center`">
        {{ $t('categoryMenu.centerService') }}
      </router-link>
      <div :class="`wf-color--g-fff wf-font_15--reg wf-pointer wf-br-r-1 wf-br--white wf_height-14 wf-ml--6 wf-mr--6`"></div>
      <div @click="logout()" :class="`wf-color--g-fff wf-font_15--reg wf-pointer  wf_flex-1 wf_text-center`">
        {{ $t('categoryMenu.logout') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/_welfare-my-page-main-member.scss');
</style>
