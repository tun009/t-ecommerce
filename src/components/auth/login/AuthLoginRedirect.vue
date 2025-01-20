<script setup lang="ts">
import { AUTH_LOGIN_FIND_ID_ROUTER, AUTH_LOGIN_RESET_PASSWORD_ROUTER } from '@/commons'
import { useBuildLink } from '@/composables/common/useBuildLink'
const { processLink } = useBuildLink()
</script>

<template>
  <div class="wf-color--g-111 wf-font_15--reg">
    <router-link :to="processLink(AUTH_LOGIN_FIND_ID_ROUTER)">{{ $t('auth.login.redirect.findId') }}</router-link> &nbsp;|&nbsp;
    <router-link :to="processLink(AUTH_LOGIN_RESET_PASSWORD_ROUTER)">{{ $t('auth.login.redirect.resetPassword') }}</router-link>
  </div>
</template>
