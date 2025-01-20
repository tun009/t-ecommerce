<!-- FO_MC_MY011005P -->

<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'
import ModalHeader from '@/components/widgets/modal/ModalHeader.vue'
import { MyPageStatusDataOrderModel } from '@/models/views/myPage/MyPageStatusOrderModal'

interface Props {
  title: string
  description: string
  titleTable: string
  data: MyPageStatusDataOrderModel[]
}

type Emits = (e: 'close') => void

const props = defineProps<Props>()
defineEmits<Emits>()
</script>
<template>
  <div>
    <div class="wf-bg--g-fff wf-px-16 wf-pt-20 wf-pb-30 wf-mx-auto wf_width-modal">
      <ModalHeader :title="props.title" @on-close="$emit('close')" />
      <div class="wf_flex wf_flex-col wf_items-center wf-pt-17 wf-pb-16">
        <div class="wf_width-40 wf_height-40 wf_rounded-full wf-bg--g-f-c-d-c-d-f wf_flex wf_justify-center wf_items-center">
          <IconCheck :width="16" :height="16" />
        </div>
        <div v-html="$t(props.description)"></div>
      </div>
      <div>
        <p class="wf-font_15--bold wf-color--g-111 wf-pb-8 wf-br-b-1 wf-br--g-bbb">{{ $t(props.titleTable) }}</p>
        <div>
          <div v-for="(item, index) in props.data" :key="index" class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf_items-center">
              <span class="wf-font_14-reg--lh130 wf-color--g-333">{{ item.title }}</span>
            </div>
            <div
              :class="`wf_flex-1 wf-pl-20 wf-font_13--reg wf-color--g-999  ${item?.des && item?.des?.length > 1 ? 'wf-pt-14 wf-pb-11' : 'wf-py-14'}`"
            >
              <p>{{ item.createDate }}</p>
              <p class="wf-color--g-555 wf-mt-5">{{ item.content }}</p>
              <div v-if="item?.des && item?.des?.length" class="wf-mt-10 wf-font_11--reg wf_flex wf_flex-col wf-space-y-5">
                <span v-for="(des, _index) in item.des" :key="_index">{{ des }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
