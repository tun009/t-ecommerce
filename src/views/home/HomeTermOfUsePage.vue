<!-- FO_MC_MA011300 -->
<script setup lang="ts">
import HomeTermComponent from '@/components/home/HomeTermComponent.vue'
import { HomeTermOfUseType } from '@/models/views/home/HomeTermOfUseModel'
</script>
<template>
  <HomeTermComponent :title="$t('homeTerm.termOfUse.title')" :title-page="$t('homeTerm.termOfUse.titlePage')" :type="HomeTermOfUseType.SVC" />
</template>
