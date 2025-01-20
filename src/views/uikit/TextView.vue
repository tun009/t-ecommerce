<script setup lang="ts">
import { MockDataTextFont } from '@/assets/mockData/data-text-font'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
</script>
<template>
  <WelfareContainer>
    <div class="wf_flex wf_flex-row wf_flex-1 wf_inline-flex wf_items-start wf_pr-0">
      <div class="wf-mr-80">
        <p class="wf-font_16-bold-lh1">Type style</p>
      </div>
      <div class="wf_flex-1">
        <table aria-describedby="" class="wf_width-full wf-table-font">
          <thead>
            <tr>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w125">Size</th>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w165">Example</th>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w238">Name</th>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w238">Weight</th>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w238">Line height</th>
              <th :align="'center'" class="wf-font_13--reg wf_text-center text-view-table-header-w238">Strikethrough</th>
            </tr>
          </thead>
          <template v-for="(item, index) in MockDataTextFont" :key="index">
            <tr v-for="(_item, _index) in item" :key="_index">
              <td v-if="_index === 0" :align="'center'" :rowspan="_index === 0 ? item.length : '1'" class="wf-font_16--bold wf_custom-spacing">
                {{ _item.pixel }}px
              </td>
              <td :align="'center'" :class="_item.class">Pretendard</td>
              <td :align="'center'" class="wf-font_13--reg">
                {{ _item.name }}
              </td>
              <td :align="'center'" class="wf-font_13--reg">
                {{ _item.weight }}
              </td>
              <td :align="'center'" class="wf-font_13--reg">
                {{ _item.lineHeight }}
              </td>
              <td :align="'center'" class="wf-font_13--reg">
                {{ _item?.isLineThrough ? 'Strikethrough' : '-' }}
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </WelfareContainer>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/uikit/_welfare-text-view.scss');
</style>
