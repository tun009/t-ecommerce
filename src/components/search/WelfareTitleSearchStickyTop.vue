<script setup lang="ts">
import { WelfareTitleTextProps } from '@/models/uikits/WelfareTitleTextTypes'
import { useRouter } from 'vue-router'
import IconBack from '../icons/IconBack.vue'
import IconCart from '../icons/IconCart.vue'
import { CART_ROUTER, defaultColor } from '@/commons'
import InputWithSpecialCharacter from '../widgets/input/InputWithSpecialCharacter.vue'
import { ref } from 'vue'
import { useBuildLink } from '@/composables/common/useBuildLink'

interface WelfareTitleSearchStickyTopProps extends WelfareTitleTextProps {
  searchText: string
}

const inputRef = ref()

interface WelfareTitleSearchStickyTopEmits {
  (e: 'on-click-cart'): void

  (e: 'click-search-input', keyword: string): void

  (e: 'click-icon-search'): void

  (e: 'on-change-text', value: any): void
}

const props = defineProps<WelfareTitleSearchStickyTopProps>()
const emits = defineEmits<WelfareTitleSearchStickyTopEmits>()
const router = useRouter()
const { processLink } = useBuildLink()
const setBlur = () => {
  inputRef.value?.setBlur()
}

defineExpose({
  setBlur
})
</script>
<template>
  <div class="wf-sticky-top wf-bg--g-fff wf_zIndex-1001">
    <div
      :class="`wf_relative wf_flex wf_items-center wf_justify-between wf-px-16 wf-pt-20 wf-pb-14 wf_width-full wf-space-x-16 ${
        !props.hideBorder && 'wf-br-b-1 wf-br--g-e-7'
      } ${props.class}`"
    >
      <div class="wf_flex wf_items-center wf-pointer wf-no-select wf_justify-start">
        <IconBack @click="router.back()" />
      </div>
      <div class="wf_flex wf_flex-1 wf-mr-3 wf-ml--3">
        <InputWithSpecialCharacter
          ref="inputRef"
          :placeholder="$t('search.searchPage.inputPlaceholder')"
          :clear-text="true"
          :search-icon="true"
          :clear-icon="true"
          :model-value="searchText"
          @update:model-value="(value) => emits('on-change-text', value)"
          @click-icon-search="emits('click-icon-search')"
          :class-wrap-input="!searchText ? 'wf-bg--g-FFF-important' : ''"
          @click-input="emits('click-search-input', props.searchText)"
          @click-icon-clear="emits('click-search-input', '')"
        />
      </div>
      <div>
        <IconCart @click="router.push(processLink(CART_ROUTER))" :color="defaultColor.gray1" />
      </div>
    </div>
    <slot />
  </div>
</template>
