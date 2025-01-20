<script setup lang="ts">
import WelfareTitleText from '@/components/uikit/title/WelfareTitleText.vue'
</script>

<template>
  <div class="wf_flex wf_flex-col wf_justify-center wf_items-center wf_width-375 wf-space-y-20 wf-mx-auto wf-mt-16">
    <WelfareTitleText title="title text" displayBackIcon />

    <WelfareTitleText title="title text" displayBackIcon displayCloseIcon />

    <WelfareTitleText title="title text" displayBackIcon displaySearchIcon displayCartIcon />

    <WelfareTitleText title="title text" displayCloseIcon />

    <WelfareTitleText displayBackIcon displayMenuIcon displayHomeRightIcon displaySearchIcon displayCartIcon />

    <WelfareTitleText title="title text" displayBackIcon displayHomeLeftIcon />

    <WelfareTitleText title="title text" />

    <WelfareTitleText title="title text" displayBackIcon displayHomeLeftIcon displaySearchIcon displayCartIcon />

    <WelfareTitleText title="title text" smallTitle displayBackIcon displayShareIcon />
  </div>
</template>
