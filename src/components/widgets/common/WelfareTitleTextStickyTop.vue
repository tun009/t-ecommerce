<script setup lang="ts">
import { CART_ROUTER, SEARCH_ROUTER } from '@/commons'
import WelfareTitleText from '@/components/uikit/title/WelfareTitleText.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { WelfareTitleTextStickyTopEmits, WelfareTitleTextStickyTopProps } from '@/models/uikits/WelfareTitleTextTypes'
import { getCurrentInstance, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<WelfareTitleTextStickyTopProps>()
const emits = defineEmits<WelfareTitleTextStickyTopEmits>()
const router = useRouter()
const { processLink } = useBuildLink()

const vm = getCurrentInstance()
const haveBackEvent = computed(() => {
  return !!vm?.vnode.props?.onOnClickBack
})

const haveHomeEvent = computed(() => {
  return !!vm?.vnode.props?.onCLickHomeLeft
})

const haveSearchEvent = computed(() => {
  return !!vm?.vnode.props?.onOnClickSearch
})

const haveCartEvent = computed(() => {
  return !!vm?.vnode.props?.onOnClickCart
})

const emitEvent = {
  onClickBack: () => {
    if (haveBackEvent.value) {
      emits('on-click-back')
      return
    }
    router.back()
  },
  onClickMenu: () => {
    emits('on-click-menu')
  },
  onClickHomeLeft: () => {
    if (haveHomeEvent.value) {
      emits('on-click-home-left')
      return
    }
    router.push(processLink('/'))
  },
  onClickHomeRight: () => {
    emits('on-click-home-right')
  },
  onClickSearch: () => {
    if (haveSearchEvent.value) {
      emits('on-click-search')
    } else {
      router.push(processLink(SEARCH_ROUTER))
    }
  },
  onClickCart: () => {
    if (haveCartEvent.value) {
      emits('on-click-cart')
    } else {
      router.push(processLink(CART_ROUTER))
    }
  },
  onClickClose: () => {
    emits('on-click-close')
  },
  onClickShare: () => {
    emits('on-click-share')
  }
}
</script>
<template>
  <div class="wf-sticky-top wf-bg--g-fff wf_zIndex-1001">
    <WelfareTitleText v-bind="props" v-on="emitEvent" />
    <slot />
  </div>
</template>
