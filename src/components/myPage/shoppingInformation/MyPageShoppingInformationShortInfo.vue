<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface MyPageShoppingInformationShortInfoProps {
  orderNumber: string
}
defineProps<MyPageShoppingInformationShortInfoProps>()
const { t } = useI18n()
</script>

<template>
  <div :class="`wf_flex wf_justify-center wf_items-center wf_height-41 wf-bg--g-f-5-f-6-fa wf-px-16`">
    <span class="wf-color--g-777 wf-font_13--reg wf-mr-2">{{ `${t('myPage.orderInfo.orderNumber')} ${$props.orderNumber}` }}</span>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/_welfare-my-page-order-short-info.scss');
</style>
