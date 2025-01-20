<script setup lang="ts">
import { IcArrowUp, IcLogoDigital, IcLogoPlay, IcTranslateText } from '@/assets/icons'
import { computed } from 'vue'

interface MainWrapperProps {
  logoPlay?: boolean
  showWidgetMobile?: boolean
  showSubTitle?: boolean
  hasLocales?: boolean
  hasFooter?: boolean
  class?: string
}
const props = defineProps<MainWrapperProps>()

const logoComputed = computed(() => (!props.logoPlay ? IcLogoDigital : IcLogoPlay))
</script>

<template>
  <div :class="`wf-px-16 ${props.class}`">
    <div v-if="props.showWidgetMobile" class="wf_height-44"></div>
    <div v-if="props.hasLocales" class="wf_min-height-60 wf-py-20 wf_flex wf_items-center wf_justify-end">
      <div>
        <div class="wf_width-130 wf_rounded-16 wf-px-12 wf_height-30 wf-bg--g-f-0-f-0">
          <div class="wf_h-full wf_flex wf_items-center wf_w-full">
            <img class="wf_width-19 wf_height-15" :src="IcTranslateText" alt="translate-icon" />
            <div class="wf_flex-1">
              <p class="wf-font_13--mid wf-color--g-555 wf_text-center">{{ $t('auth.login.wrap.lang') }}</p>
            </div>
            <img class="wf_width-120 wf_height-12" :src="IcArrowUp" alt="arrow-up-icon" />
          </div>
        </div>
      </div>
    </div>
    <slot name="header">
      <div class="wf_flex wf_justify-center">
        <img :class="`wf_width-120 ${!props.logoPlay && 'wf-pl-4'}`" :src="logoComputed" alt="logo-megazone" />
      </div>
      <div v-if="props.showSubTitle" class="wf-mt-19 wf-mb-4">
        <p class="wf_text-center wf-font_14--mid wf-color--g-333">{{ $t('auth.login.wrap.subTitle') }}</p>
      </div>
    </slot>
    <div class="wf-mt-40">
      <slot name="main"></slot>
    </div>
    <div>
      <slot name="footer">
        <div v-if="props.hasFooter">
          <hr class="wf_break-line-2-e-7-e-7" />
          <div class="wf-mt-15">
            <p class="wf_text-center wf-font_15--reg wf-color--g-333">{{ $t('auth.login.wrap.phone') }}</p>
            <div class="wf-mt-10 wf_flex wf_justify-center wf_items-center">
              <p class="wf_width-fit wf-font_13--reg wf-color--g-555 wf-ml--5 wf_text-center">
                <span class="wf-mr-4">&#x2022;</span>
                <span>{{ $t('auth.login.wrap.time') }}</span>
              </p>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
