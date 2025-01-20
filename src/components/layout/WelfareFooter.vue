<script setup lang="ts">
import { AUTH_LOGIN_ROUTER } from '@/commons'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import { useFooterLayout } from '@/composables/widgets/layout/useFooterLayout'
import { WelfareFooterProps } from '@/models/views/common/FooterProps'
import { useI18n } from 'vue-i18n'

withDefaults(defineProps<WelfareFooterProps>(), {
  isHideNavigation: true
})

const { tm } = useI18n()
const { select, footerLinks, footerAboutLinks, logout } = useFooterLayout()
</script>

<template>
  <div class="wf-mt-auto wf_flex-1 wf-bg--g-f-0-f-0">
    <div v-if="!$props.isHideNavigation" class="wf_width-full wf-bg--g-bbb wf_height-40 wf_flex wf_justify-around wf-pb-12 wf-pt-13">
      <div
        @click="link.link === AUTH_LOGIN_ROUTER && logout()"
        :class="`wf-color--g-fff wf-font_15--reg wf-pointer ${
          link.text === '' ? 'wf-br-r-1 wf-br--white wf_height-14' : 'wf-screen-375 wf_min-width-initial wf_min-width-124-i wf_text-center'
        }`"
        v-for="(link, index) in footerLinks"
        v-bind:key="index"
      >
        {{ link.text }}
      </div>
    </div>
    <div class="wf_width-full wf-px-16 wf-py-30 wf-bg--g-f-0-f-0">
      <div class="wf_flex wf_flex-col wf-space-y-25">
        <div class="wf-color--g-777 wf-font_13--reg wf_flex wf_flex-col wf-space-y-9">
          <div class="wf-mt-1">{{ $t('footer.company') }}</div>
          <div class="">{{ tm('footer.owner') }}</div>
          <div class="">{{ tm('footer.report') }}</div>
          <div class="">{{ tm('footer.address') }}</div>
          <div class="">{{ tm('footer.phone') }}</div>
        </div>
        <div class="wf_flex wf_justify-between wf-mt-2 wf_max-width-375">
          <template v-for="(link, index) in footerAboutLinks" v-bind:key="index">
            <a :href="link.link" v-if="link.link" target="_blank" class="wf-color--g-777 wf-font_13--reg">{{ link.text }}</a>
            <span v-else class="wf-color--g-777 wf-font_13--reg wf-pointer">{{ link.text }}</span>
          </template>
        </div>
        <span class="wf-color--g-555 wf-font_11--semi wf_letter-spacing--1">{{ tm('footer.copyright') }}</span>
      </div>
      <div class="wf-mt-40 wf-mb-10">
        <WelfareSelect
          class="wf_height-41 wf-pt-13-important"
          v-model="select"
          :placeholder="tm('footer.selectPlaceholder')"
          :options="tm('footer.selectFooterOptions')"
        />
      </div>
    </div>
  </div>
</template>
