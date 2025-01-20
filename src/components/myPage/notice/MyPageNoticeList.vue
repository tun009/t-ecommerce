<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'

interface NoticeProps {
  contentType: string
  titleName: string
  createdDate?: string
  isIcon: boolean
  show: boolean
}
type CustomerCommentEmits = (e: 'click') => void

const props = defineProps<NoticeProps>()

const emits = defineEmits<CustomerCommentEmits>()
</script>

<template>
  <div class="notice_sec" @click="emits('click')">
    <div class="wf-transition-03 notice_icon" :class="{ 'wf-rotate-180': props.show }">
      <div v-if="isIcon">
        <IconArrowDown />
      </div>
    </div>
    <div v-if="contentType === 'customer'">
      <span class="fw-700 font-19 mr-2">Q. </span>
      <span>{{ props.titleName }}</span>
    </div>
    <div v-else>
      <div class="notice_sec_comment fw-400">{{ props.titleName }}</div>
      <div class="notice_sec_date">{{ props.createdDate }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/customer/_welfare-customer.scss');
</style>
