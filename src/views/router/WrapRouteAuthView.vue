
<script setup lang="ts">
import { AUTH_LOGIN_ROUTER } from '@/commons'
import WelfareFooter from '@/components/layout/WelfareFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHideNavigation = computed(() => {
  return route.path.startsWith(AUTH_LOGIN_ROUTER)
})

</script>
<template>
  <div class="wf-overflow-body-y-auto wf_min-height-screen wf_flex wf_flex-col">
    <router-view></router-view>
    <WelfareFooter :is-hide-navigation="isHideNavigation" />
  </div>
</template>
