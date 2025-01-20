<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareScore from '@/components/uikit/score/WelfareScore.vue'
</script>

<template>
  <WelfareContainer title="COMPONENT">
    <div class="wf_grid wf_grid-cols-3 wf-px-12">
      <div class="">
        <div class="wf-mt-30">
          <WelfareScore :value="4" />
        </div>
        <div class="wf-mt-30">
          <WelfareScore :value="4" small />
        </div>
        <div class="wf-mt-30">
          <WelfareScore :value="4" small :number="1" />
        </div>
      </div>
      <div class="wf_flex wf_flex-col-reverse wf_justify-end">
        <div class="wf-mt-30" v-for="item in 10" v-bind:key="item">
          <WelfareScore :value="item / 2" />
        </div>
      </div>
      <div class="wf_flex wf_flex-col-reverse wf_justify-end">
        <div class="wf-mt-30" v-for="item in 10" v-bind:key="item">
          <WelfareScore :value="item / 2" small />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
