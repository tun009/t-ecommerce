<script setup lang="ts">
import WelfareUnitCart from '@/components/uikit/unit/WelfareUnitCart.vue'
import WelfareModalSelect from './WelfareModalSelect.vue'
import WelfareButtonHeart from '@/components/uikit/button/WelfareButtonHeart.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
</script>

<template>
  <div class="wf-mx-auto wf_width-full">
    <div class="wf_flex wf_flex-col wf-space-y-30 wf-px-16">
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <div>
          <WelfareModalSelect />
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-39">
            <span class="wf-font_15--reg wf-color--g-333">파자마1</span>
            <span class="wf-font_15--reg wf-color--g-333">15,000</span>
          </div>
          <div
            class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br-t-1 wf-br--g-e-7 wf_flex wf_justify-between wf-bg--g-f-8-f-8 wf_height-41"
          >
            <span class="wf-font_15--reg wf-color--g-333">파자마2</span>
            <span class="wf-font_15--reg wf-color--g-333">15,000</span>
          </div>
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-41">
            <span class="wf-font_15--reg wf-color--g-ddd">파자마2 (품절)</span>
            <span class="wf-font_15--reg wf-color--g-ddd">15,000</span>
          </div>
        </div>

        <div>
          <WelfareModalSelect />
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-39">
            <span class="wf-font_15--reg wf-color--g-333">빨강</span>
          </div>
          <div
            class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br-t-1 wf-br--g-e-7 wf_flex wf_justify-between wf-bg--g-f-8-f-8 wf_height-39"
          >
            <span class="wf-font_15--reg wf-color--g-333">주황</span>
          </div>
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-41">
            <span class="wf-font_15--reg wf-color--g-ddd">노랑 (품절)</span>
          </div>
        </div>

        <div>
          <WelfareModalSelect />
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-39">
            <span class="wf-font_15--reg wf-color--g-333">105</span>
          </div>
          <div
            class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-l-1 wf-br-r-1 wf-br-t-1 wf-br--g-e-7 wf_flex wf_justify-between wf-bg--g-f-8-f-8 wf_height-41"
          >
            <span class="wf-font_15--reg wf-color--g-ddd">100 (품절)</span>
          </div>
          <div class="wf-pr-14 wf-pl-12 wf-pb-11 wf-pt-13 wf-br-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-41">
            <span class="wf-font_15--reg wf-color--g-333">95</span>
          </div>
        </div>

        <WelfareUnitCart name="파자마1 / 빨강 / 남자 105" price="15,000" />
        <WelfareUnitCart name="파자마1 / 빨강 / 남자 105" price="15,000" :discount="30" />
      </div>
      <div class="wf-pb-20 wf-ml-auto wf_flex wf-space-x-14 wf_items-center">
        <div class="wf-font_15--bold wf-color--g-111">총 상품금액</div>
        <div class="wf-color--f-95729 wf_flex wf-space-x-1 wf_items-center">
          <span class="wf-font_23--bold">99,999,999</span>
          <span class="wf-font_15--mid">원</span>
        </div>
      </div>
    </div>

    <div class="wf-px-16 wf-pb-20 wf-pt-18 wf-br-t-1 wf-br--g-e-7 wf_flex wf-space-x-10 wf_items-center wf_width-full">
      <WelfareButtonHeart :is-active="false" type="sm" text="text" />
      <div class="wf_flex wf-space-x-6 wf_items-center wf_flex-1">
        <WelfareButtonLine type="lg" lg-state="black-line" class="wf_flex-1" text="장바구니" />
        <WelfareButtonLine active lg-state="grey-line" type="lg" class="wf_flex-1" text="구매하기" />
      </div>
    </div>
  </div>
</template>
