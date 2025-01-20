<script setup lang="ts">
import WelfareTitleTextStickyTop from '../widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
import { useHomePageTermOfUse } from '@/composables/home/useHomePageTermOfUse'
import { HomeTermOfUseType } from '@/models/views/home/HomeTermOfUseModel'
interface HomeTermProps {
  title: string
  type: HomeTermOfUseType
  titlePage: string
}

const props = defineProps<HomeTermProps>()

const { dataSelectTerms, selectedOption, dataTermDetail, fetchDataDetail } = useHomePageTermOfUse(props.type)
</script>
<template>
  <WelfareTitleTextStickyTop :displayBackIcon="true" :title="props.title" class="wf-px-20--i" />
  <div class="wf-term-of-use-main wf-term-of-use-main-p">
    <div class="wf_container-col wf_container-col-r-g">
      <p class="wf-font_17--bold">{{ props.titlePage }}</p>
      <WelfareSelect
        option-label="label"
        class="wf_height-41 wf-pt-13-important"
        v-model="selectedOption"
        :options="dataSelectTerms"
        @update:model-value="(data) => fetchDataDetail(data.value)"
      />
    </div>
    <div class="wf-mt-20 wf_container-col">
      <p v-text="dataTermDetail?.versionInfo"></p>
      <p class="wf-font_15--bold" v-text="dataTermDetail?.termsName"></p>
      <span v-html="dataTermDetail?.contents"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('@/assets/styles/views/home/_welfare-home-use-of-term.scss');
</style>
