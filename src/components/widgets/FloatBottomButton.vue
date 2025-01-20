<script setup lang="ts">
import IconPlusNavigation from '../icons/navigation/IconPlusNavigation.vue'
import IconScrollTop from '../icons/navigation/IconScrollTop.vue'
import IconClear from '../icons/IconClear.vue'
import { ref } from 'vue'
import IconBox from '../icons/home/IconBox.vue'
import IconSupport from '../icons/IconSupport.vue'
import { MYPAGE_ADDRESS_ROUTER, MYPAGE_CUSTOMER_ROUTER, defaultColor, openWindowWithNewTab } from '@/commons'
import IconClose from '../icons/IconClose.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { HomeBottomBannerModal } from '@/models/services/responses/home/HomeBottomBannerResponse'

interface FloatBottomProps {
  bannerFloat: HomeBottomBannerModal[]
}

defineProps<FloatBottomProps>()

const scrollTop = () => {
  document.documentElement.scrollTop = 0
}

const isShowLeft = ref(true)
const activeBtnPlus = ref(false)
const { processLink } = useBuildLink()
const listNavigation = [
  {
    icon: IconBox,
    name: '배송지관리',
    path: MYPAGE_ADDRESS_ROUTER
  },
  {
    icon: IconSupport,
    name: '고객센터',
    path: MYPAGE_CUSTOMER_ROUTER
  }
]
</script>

<template>
  <div
    id="wf-float-button-navigation"
    class="wf_index-10001 wf_height-0 wf_flex-row wf_justify-between wf_items-end wf-space-y-12 wf-float-button-navigation"
  >
    <div
      :class="[{ 'wf-hide': activeBtnPlus }]"
      class="wf-float-button-navigation-item wf-float-button-navigation-item--left wf-float-button--left-item"
      @click="activeBtnPlus = false"
    >
      <template v-if="isShowLeft && $props.bannerFloat && $props.bannerFloat.length > 0">
        <IconClear class="wf-float-button--left-item-icon" @click="isShowLeft = false" />
        <img
          class="wf-float-button--left-img"
          :src="$props.bannerFloat[0].imageUrl"
          :alt="$props.bannerFloat[0].imageAltName ?? ''"
          @click="$props.bannerFloat[0].linkUrl && openWindowWithNewTab($props.bannerFloat[0].linkUrl)"
        />
      </template>
    </div>
    <div class="wf-float-button-navigation-item wf_flex wf_flex-col wf_items-end wf-space-y-12">
      <ul v-if="activeBtnPlus" class="wf_index-2 wf_flex wf_flex-col wf-float-button-navigation-hide" id="floatingMenu">
        <li v-for="(item, index) in listNavigation" :data="item" :key="index">
          <router-link :to="processLink(item.path)" class="wf_flex wf_items-center wf_justify-end wf-mb-10">
            <span class="wf-mr-12 wf-font_13--semi wf-color--g-fff">{{ item.name }}</span>
            <div class="wf-float-button-item wf_flex wf-bg--red-ff-3-b-4-f--i wf-br--red-ff-3-b-4-f">
              <component v-if="item.icon" :is="item.icon" />
            </div>
          </router-link>
        </li>
      </ul>
      <button
        class="wf_index-2 wf-float-button-item wf-float-button-navigation-hide"
        :class="[{ 'wf-bg--g-111-important wf-br--g-111': activeBtnPlus }]"
        @click="activeBtnPlus = !activeBtnPlus"
      >
        <IconClose :color="defaultColor.white" v-if="activeBtnPlus" />
        <IconPlusNavigation v-else />
      </button>
      <button
        @click="
          () => {
            scrollTop()
            activeBtnPlus = false
          }
        "
        class="wf_index-2 wf-float-button-item wf-float-button-navigation-hide"
      >
        <IconScrollTop />
      </button>
    </div>
  </div>
  <div
    v-if="activeBtnPlus"
    class="wf_index-10000 wf-floating-menu-backdrop wf-float-button-navigation-hide "
    id="floatingMenuBackdrop"
    @click="activeBtnPlus = false"
  ></div>
</template>
