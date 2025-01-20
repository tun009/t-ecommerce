<script lang="ts" setup>
import { GroupProductNewsProps } from '@/models/uikits/WelfareProductTypes'

const props = defineProps<GroupProductNewsProps>()
</script>
<template>
  <div>
    <p class="wf-mb-20 wf-color--g-111 wf-font_17--bold">{{ $t('productSpecialPrice.newProduct') }}</p>
    <div class="wf_overflow-x-auto wf_flex wf-space-x-10">
      <div v-for="(item, index) in props.data" :key="index">
        <div class="wf_width-full wf">
          <img class="wf_min-width-140 wf_height-180" :src="item.thumbnail" alt="" />
        </div>
        <p class="line-clamp-2 wf-mt-12 wf-font_15-mid--lh140 wf-color--g-333">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
