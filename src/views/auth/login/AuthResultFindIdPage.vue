<!-- 
  FO_MC_LO022011
  FO_MC_LO022013
 -->
<script setup lang="ts">
import { AUTH_LOGIN_RESET_PASSWORD_ROUTER, AUTH_LOGIN_ROUTER, DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/commons'
import AuthLoginNoteBottom from '@/components/auth/login/AuthLoginNoteBottom.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { YesNoEnum } from '@/models/common'
import { useRoute } from 'vue-router'

const route = useRoute()
const { email, date, status, name, phone, csrfToken } = route.query
const { processLink } = useBuildLink()
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="$t('auth.login.byFindId.title')" />
  <div class="wf_flex wf_flex-col wf-space-y-30 wf-px-16 wf-mt-30 wf-mb-85">
    <div class="wf_flex wf_flex-col wf-space-y-20 wf_items-center wf_justify-center">
      <span class="wf-font_17--reg wf-color--g-333">{{ $t('auth.login.byFindId.subTitle') }}</span>
      <div class="wf_flex wf_flex-col wf-space-y-8 wf-color--g-555 wf-font_13--reg">
        <span>{{ $t('auth.login.byFindId.emailTitle') }} &nbsp;:&nbsp; {{ email }}</span>
        <span>{{ $t('auth.login.byFindId.dateTitle') }} &nbsp;:&nbsp; {{ formatTime(date as string, DEFAULT_DATE_FORMAT_DOT) }}</span>
        <span v-if="status === YesNoEnum.N">{{ $t('auth.login.byFindId.memberTitle') }} &nbsp;:&nbsp; {{ $t('auth.login.byFindId.status') }}</span>
      </div>
    </div>

    <div class="wf_flex wf_flex-col wf-space-y-10">
      <router-link :to="processLink(`${AUTH_LOGIN_ROUTER}?name=${name}`)">
        <WelfareButtonLine
          lg-state="grey-line"
          class="wf_height-50 wf_width-full"
          type="lg"
          :active="true"
          :text="$t('auth.login.byFindId.btnLogin')"
        />
      </router-link>
      <router-link :to="processLink(`${AUTH_LOGIN_RESET_PASSWORD_ROUTER}?name=${name}&phone=${phone}&csrfToken=${csrfToken}`)">
        <WelfareButtonLine
          lg-state="grey-line"
          class="wf_height-50 wf_width-full"
          type="lg"
          :active="true"
          :text="$t('auth.login.byFindId.changePassword')"
        />
      </router-link>
    </div>

    <AuthLoginNoteBottom v-if="status === YesNoEnum.N" :note="$t('auth.login.byFindId.bottomTitle')" />
  </div>
</template>
