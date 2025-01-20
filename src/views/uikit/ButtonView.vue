<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import WelfareButtonHeart from '@/components/uikit/button/WelfareButtonHeart.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareButtonSimple from '@/components/uikit/button/WelfareButtonSimple.vue'
import WelfareButtonTap from '@/components/uikit/button/WelfareButtonTap.vue'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import WelfareTag from '@/components/uikit/tag/WelfareTag.vue'
import { ref } from 'vue'

const isHeart = ref(false)
const isHeartLg = ref(false)
</script>

<template>
  <WelfareContainer class="wf_ui-kit-container-1440">
    <div class="wf_flex">
      <div class="wf_ui-kit-title wf-mr-88">Button</div>
      <div>
        <p class="wf-font_16--bold">활용법</p>
        <p class="wf_ui-kit-sub-title wf-mt-16">메인에 추가 된 구좌 리스트 입니다.</p>
      </div>
    </div>
    <hr class="wf_ui-kit-breake-line-BBB wf-mt-58" />
    <table aria-describedby="" class="wf_width-full wf_ui-kit-table">
      <thead>
        <tr class="wf_height-50 wf_text-center wf_ui-kit_text-13-reg">
          <th class="wf_ui-kit-col-170"></th>
          <th class="wf_ui-kit-col-170"></th>
          <th class="wf_ui-kit-col-340">Normal</th>
          <th class="wf_ui-kit-col-340">Selected</th>
          <th class="wf_ui-kit-col-340">Disable</th>
        </tr>
      </thead>
      <tbody>
        <tr class="wf_height-119">
          <td class="wf-font_16--bold" :align="'center'" :colspan="2">tap1</td>
          <td :align="'center'"><WelfareButtonTap text="tap1" /></td>
          <td :align="'center'"><WelfareButtonTap :active="true" text="tap1" /></td>
          <td :align="'center'"><WelfareButtonTap disabled text="tap1" /></td>
        </tr>
        <tr class="wf_height-120">
          <td class="wf-font_16--bold" :align="'center'" colspan="2">tap2</td>
          <td :align="'center'"><WelfareButtonTap type="tapRound" text="tap2" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapRound" :active="true" text="tap2" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapRound" disabled text="tap2" /></td>
        </tr>
        <tr class="wf_height-120">
          <td class="wf-font_16--bold" :align="'center'" colspan="2">tap3</td>
          <td :align="'center'"><WelfareButtonTap type="tapCircle" text="tap3" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapCircle" :active="true" text="tap3" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapCircle" disabled text="tap3" /></td>
        </tr>
        <tr class="wf_height-120">
          <td class="wf-font_16--bold" :align="'center'" colspan="2"><div class="wf_height-52wf-py-10">tap4</div></td>
          <td :align="'center'"><WelfareButtonTap type="tapCircleArrow" text="tap4" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapCircleArrow" :active="true" text="tap4" /></td>
          <td :align="'center'"><WelfareButtonTap type="tapCircleArrow" disabled text="tap4" /></td>
        </tr>

        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" rowspan="2">
            <div class="wf-px-30">
              <p>Line Button</p>
              <p>Height : 31px</p>
            </div>
          </td>
          <td class="wf_ui-kit-text-16-bold" :align="'center'">font:13px</td>
          <td :align="'center'"><WelfareButtonLine type="sm" text="버튼 31" /></td>
          <td :align="'center'"><WelfareButtonLine type="sm" :active="true" text="버튼 31" /></td>
          <td :align="'center'"><WelfareButtonLine type="sm" disabled text="버튼 31" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">font:13px</td>
          <td :align="'center'"><WelfareButtonLine smSate type="sm" text="버튼 31" /></td>
          <td :align="'center'"><WelfareButtonLine smSate type="sm" :active="true" text="버튼 31" /></td>
          <td :align="'center'"><WelfareButtonLine smSate type="sm" disabled text="버튼 31" /></td>
        </tr>

        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" rowspan="3">
            <div class="wf-px-30">
              <p>Line Button</p>
              <p>Height : 41px</p>
            </div>
          </td>
          <td class="wf_ui-kit-text-16-bold" :align="'center'">Default</td>
          <td :align="'center'"><WelfareButtonLine type="md" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine type="md" :active="true" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine type="md" disabled text="버튼 41" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">Point</td>
          <td :align="'center'"><WelfareButtonLine md-state="point" type="md" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine md-state="point" type="md" :active="true" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine md-state="point" type="md" disabled text="버튼 41" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">Line</td>
          <td :align="'center'"><WelfareButtonLine md-state="line" type="md" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine md-state="line" type="md" :active="true" text="버튼 41" /></td>
          <td :align="'center'"><WelfareButtonLine md-state="line" type="md" disabled text="버튼 41" /></td>
        </tr>

        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" rowspan="3">
            <div class="wf-px-30">
              <p>Line Button</p>
              <p>Height : 51px</p>
            </div>
          </td>
          <td class="wf_ui-kit-text-16-bold" :align="'center'">GreyLine</td>
          <td :align="'center'"><WelfareButtonLine lg-state="grey-line" type="lg" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine lg-state="grey-line" type="lg" :active="true" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine lg-state="grey-line" type="lg" disabled text="버튼51" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">BlackLine</td>
          <td :align="'center'"><WelfareButtonLine lg-state="black-line" type="lg" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine lg-state="black-line" type="lg" :active="true" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine lg-state="black-line" type="lg" disabled text="버튼51" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">Black</td>
          <td :align="'center'"><WelfareButtonLine type="lg" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine type="lg" :active="true" text="버튼51" /></td>
          <td :align="'center'"><WelfareButtonLine type="lg" disabled text="버튼51" /></td>
        </tr>
        <tr class="wf_height-120">
          <td class="wf_ui-kit-text-16-bold" colspan="2" :align="'center'">Full Button</td>
          <td :align="'center'"><WelfareButtonFull class="wf_width-271" text="더보기 51" /></td>
          <td :align="'center'"><WelfareButtonFull class="wf_width-271" :active="true" text="더보기 51" /></td>
          <td :align="'center'"><WelfareButtonFull class="wf_width-271" disabled text="더보기 51" /></td>
        </tr>
        <tr class="wf_height-120">
          <td class="wf_ui-kit-text-16-bold" colspan="2" :align="'center'">Simple Button</td>
          <td :align="'center'"><WelfareButtonSimple text="text" /></td>
          <td :align="'center'"><WelfareButtonSimple active text="text" /></td>
          <td :align="'center'"><WelfareButtonSimple disabled text="text" /></td>
        </tr>

        <tr class="wf_height-120">
          <td class="wf_ui-kit-text-16-bold" colspan="2" :align="'center'">Tag1</td>
          <td :align="'center'"><WelfareTag text="tap4" /></td>
          <td :align="'center'"><WelfareTag active text="tap4" /></td>
          <td :align="'center'"><WelfareTag disabled text="tap4" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" rowspan="2"><div class="wf-px-30">Color tag</div></td>
          <td class="wf_ui-kit-text-16-bold" :align="'center'">state : 19</td>
          <td :align="'center'"><WelfareColorTag text="text" /></td>
          <td :align="'center'"><WelfareColorTag active text="text" /></td>
          <td :align="'center'"><WelfareColorTag disabled text="text" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">state : 34</td>
          <td :align="'center'"><WelfareColorTag type="lg" text="text" /></td>
          <td :align="'center'"><WelfareColorTag type="lg" active text="text" /></td>
          <td :align="'center'"><WelfareColorTag type="lg" disabled text="text" /></td>
        </tr>

        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" rowspan="2"><div class="wf-px-30">Icon Button</div></td>
          <td class="wf_ui-kit-text-16-bold" :align="'center'">value : 30</td>
          <td :align="'center'"><WelfareButtonHeart v-model:is-active="isHeart" type="lg" text="text" /></td>
          <td :align="'center'"><WelfareButtonHeart :is-active="true" type="lg" text="text" /></td>
          <td :align="'center'"><WelfareButtonHeart v-model:is-active="isHeart" disabled type="lg" text="text" /></td>
        </tr>
        <tr class="wf_height-100">
          <td class="wf_ui-kit-text-16-bold" :align="'center'">value : 50</td>
          <td :align="'center'"><WelfareButtonHeart v-model:is-active="isHeartLg" type="sm" text="text" /></td>
          <td :align="'center'"><WelfareButtonHeart :is-active="true" type="sm" text="text" /></td>
          <td :align="'center'"><WelfareButtonHeart v-model:is-active="isHeart" disabled type="sm" text="text" /></td>
        </tr>
      </tbody>
    </table>
  </WelfareContainer>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-container.scss');
</style>
