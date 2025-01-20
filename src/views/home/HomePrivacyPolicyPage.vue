<!-- FO_MC_MA011400 -->
<script setup lang="ts">
import HomeTermComponent from '@/components/home/HomeTermComponent.vue'
import { HomeTermOfUseType } from '@/models/views/home/HomeTermOfUseModel'
</script>
<template>
  <HomeTermComponent :title="$t('homeTerm.privacyPolicy.title')" :title-page="$t('homeTerm.privacyPolicy.titlePage')" :type="HomeTermOfUseType.PSN" />
</template>
