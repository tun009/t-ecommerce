<script setup lang="ts">
import WelfareLoader from '../uikit/loader/WelfareLoader.vue'

type LoadingProps = {
  loading?: boolean
  size?: 'large' | 'small'
}

withDefaults(defineProps<LoadingProps>(), {
  loading: false,
  size: 'large'
})
</script>

<template>
  <div v-show="$props.loading" class="wf_loading-wrapper">
    <WelfareLoader :small="$props.size === 'small'" />
  </div>
</template>
