<script lang="ts" setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
interface InfiniteLoadingProps {
  target?: string
  stopScroll?: boolean
}

type InfiniteLoadingEmitter = (e: 'infinite') => void
const emits = defineEmits<InfiniteLoadingEmitter>()
const props = defineProps<InfiniteLoadingProps>()
</script>

<template>
  <div>
    <slot></slot>
    <InfiniteLoading v-if="!props.stopScroll" :target="props.target ?? undefined" @infinite="emits('infinite')">
      <template #spinner>
        <span>상품 로딩 중입니다 ...</span>
      </template>
    </InfiniteLoading>
  </div>
</template>
