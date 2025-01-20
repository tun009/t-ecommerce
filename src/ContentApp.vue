<script setup lang="ts">
import { useAuthRefreshToken } from './composables/auth/useAuthRefreshToken'
import { useCheckLogin } from './composables/common/useCheckLogin'
import { useLocalization } from './composables/common/useLocalization'
import { useScrollToTopPage } from '@/composables/common/useScrollToTopPage'
useAuthRefreshToken()
useCheckLogin()
useLocalization()
useScrollToTopPage()
</script>

<template>
  <router-view></router-view>
</template>
