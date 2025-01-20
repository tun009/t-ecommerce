<script setup lang="ts">
import { HTMLListModel } from '@/models/htmlList/HTMLListModel'
import HTMListTitle from './HTMListTitle.vue'
import { defineProps } from 'vue'
export type HTMListItemProps = HTMLListModel
const props = defineProps<HTMListItemProps>()
</script>
<template>
  <HTMListTitle :title="props.title" />
  <table aria-describedby="" class="wf-table-container">
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr class="wf-tr-match-parent" v-for="(item, index) in props.contents" :key="index">
      <td class="wf-td-id">{{ index + 1 }}</td>
      <td class="wf-td-description wf-td-space">{{ item.title }}</td>
      <td class="wf-td-link wf-td-space">
        <router-link class="wf-color--blue-4075-f-3 wf-text-underline" :to="item.link">{{ item.description }}</router-link>
        <div class="wf-td-link__history">{{ item.history }}</div>
      </td>
    </tr>
  </table>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/commons/_welfare-html-list-local.scss');
</style>
