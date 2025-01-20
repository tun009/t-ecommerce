<script lang="ts" setup>
import { defaultColor } from '@/commons'
import { ProductNavigation } from '@/assets/images'
import WelfareThumbCircle from '@/components/widgets/avatar/WelfareThumbCircle.vue'

interface WelfareNavigationItemProps {
  data: {
    icon?: any
    name: string
    path: string
  }
  isActive: boolean
}

type WelfareNavigationItemEmits = (e: 'click') => void

// const router = useRoute()
const props = defineProps<WelfareNavigationItemProps>()

const emits = defineEmits<WelfareNavigationItemEmits>()

// const isActive = computed(() => {
//   return router.path === props.data.
// })
</script>
<template>
  <router-link class="mz-bottom-list-item wf-pt-8" :class="{ active: props.isActive }" :to="props?.data.path" @click="emits('click')">
    <i class="wf_width-28 wf_height-28 wf_flex wf_justify-center wf_items-center">
      <component v-if="props.data.icon" :color="props.isActive ? defaultColor.white : defaultColor.gray_6d" :is="props?.data.icon" />
      <WelfareThumbCircle v-else :url="ProductNavigation" size="md" />
    </i>
    <span class="wf-font_11--reg wf-color--g-777">{{ props?.data.name }}</span>
  </router-link>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-navigation.scss');
</style>
