<script lang="ts" setup>
import { CART_ROUTER, SEARCH_ROUTER, defaultColor } from '@/commons'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconCart from '@/components/icons/IconCart.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useRouter } from 'vue-router'

interface WelfareNavigationLayoutProps {
  isLogo?: boolean
  isBack?: boolean
  isSearch?: boolean
  isCart?: boolean
  title?: string
  isDark?: boolean
}

const props = withDefaults(defineProps<WelfareNavigationLayoutProps>(), {
  isLogo: true,
  isBack: false,
  isSearch: true,
  isCart: true,
  isDark: false
})
const router = useRouter()
const { processLink } = useBuildLink()
</script>

<template>
  <div class="wf_flex wf_justify-between wf-relative">
    <div class="wf_flex wf_items-center">
      <a v-if="props.isLogo" href="/">
        <IconLogo :color="!isDark ? defaultColor.black : defaultColor.white" :width="98" :height="27" />
      </a>
      <button v-if="props.isBack">
        <IconArrowLeft :color="!isDark ? defaultColor.primary : defaultColor.white" />
      </button>
    </div>
    <span v-if="props.title" class="wf-font_21--mid" :class="[{ 'wf-color--g-111': !props.isDark, 'wf-color--g-fff': props.isDark }]">{{
      props.title
    }}</span>
    <div class="wf_flex wf-space-x-18">
      <button v-if="props.isSearch" @click="() => router.push(processLink(SEARCH_ROUTER))">
        <IconSearch :color="!isDark ? defaultColor.gray1 : defaultColor.white" :width="20" :height="20" />
      </button>

      <button v-if="props.isCart" @click="router.push(processLink(CART_ROUTER))">
        <IconCart :color="!isDark ? defaultColor.primary : defaultColor.white" :width="20" :height="20" />
      </button>
    </div>
  </div>
</template>
