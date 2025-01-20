<!-- FO_MC_MA010100 -->

<script setup lang="ts">
import AuthLoginCompanyForm from '@/components/auth/login/AuthLoginCompanyForm.vue'
import MainWrapper from '@/components/layout/MainWrapper.vue'
</script>

<template>
  <MainWrapper logo="megazone-play" showWidgetMobile class=" wf-mt-20">
    <template #main>
      <AuthLoginCompanyForm />
    </template>
  </MainWrapper>
</template>
