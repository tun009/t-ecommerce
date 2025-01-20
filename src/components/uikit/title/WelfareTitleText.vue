<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconBack from '@/components/icons/IconBack.vue'
import IconCart from '@/components/icons/IconCart.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconShare from '@/components/icons/IconShare.vue'
import { WelfareTitleTextEmits, WelfareTitleTextProps } from '@/models/uikits/WelfareTitleTextTypes'
import { computed, defineEmits, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<WelfareTitleTextProps>()
const emit = defineEmits<WelfareTitleTextEmits>()

const titleClass = computed(() => {
  return `wf-line-clamp-1  wf-color--g-111 ${props.smallTitle ? ' wf-font_15--mid ' : ' wf-font_21--bold '}`
})

const iconWrapClass = computed(() => {
  return `wf_flex wf_items-center  wf-pointer wf-no-select wf_min-width-56 ${props.title ? ' wf-space-x-16 ' : ' wf-space-x-20 '}`
})

const vm = getCurrentInstance()
const haveBackEvent = computed(() => {
  return !!vm?.vnode.props?.onOnClickBack
})
</script>

<template>
  <div
    :class="`wf_relative wf_flex wf_items-center wf_justify-between wf-px-16 wf-pt-20 wf-pb-19 wf_width-full wf-space-x-16 wf-title-wrapper ${
      !props.hideBorder && 'wf-br-b-1 wf-br--g-e-7'
    } ${props.class}`"
  >
    <div :class="iconWrapClass + 'wf_justify-start wf-title-group-left'">
      <IconBack v-if="props.displayBackIcon" @click="haveBackEvent ? emit('on-click-back') : router.back()" />
      <IconMenu v-if="props.displayMenuIcon" @click="emit('on-click-menu')" />
      <div class="wf-ml-4 wf-title-home-left-icon">
        <IconHome v-if="props.displayHomeLeftIcon" @click="emit('on-click-home-left')" />
      </div>
    </div>
    <div :class="titleClass + 'wf-title-text'">{{ props.title }}</div>
    <div class="wf-title-group-icon-right" :class="iconWrapClass + 'wf_justify-end wf-title-group-right'">
      <IconHome v-if="props.displayHomeRightIcon" @click="emit('on-click-home-right')" />
      <IconSearch v-if="props.displaySearchIcon" @click="emit('on-click-search')" />
      <IconCart v-if="props.displayCartIcon" @click="emit('on-click-cart')" :color="defaultColor.gray1" />
      <IconClose v-if="props.displayCloseIcon" @click="emit('on-click-close')" :width="20" :height="20" />
      <IconShare v-if="props.displayShareIcon" @click="emit('on-click-share')" />
    </div>
  </div>
</template>
