<!-- FO_MC_MY011002P -->
<script setup lang="ts">
import { defaultColor } from '@/commons'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareNoteText from '@/components/widgets/common/WelfareNoteText.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { MyPageStatusDeliveryOrderProps } from '@/models/views/myPage/MyPageStatusOrderModal'
import { useMyPageListDeliveryModal } from '@/composables/myPage/useMyPageListDeliveryModal'
import { myPageListMessageStatusDelivery } from '@/models/views/myPage/MyPageMainMemberModel'
const props = defineProps<MyPageStatusDeliveryOrderProps>()

const { data, handleShowStatusDeliveryModal } = useMyPageListDeliveryModal(props)
</script>
<template>
  <div class="wf-bg--g-fff wf-pt-20 wf-pb-30 wf_width-screen wf-overflow-scroll-full--y">
    <div class="wf_flex wf-px-16 wf_justify-center wf-br--g-e-7 wf-relative wf_width-full wf-br-b-1 wf-pb-19">
      <div class="wf-font_21--bold wf-color--g-111 wf_text-center">배송목록</div>
      <div class="wf-absolute wf-top-2 wf-right-13">
        <button @click="$emit('onClose')" class="wf_flex wf_items-start">
          <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
        </button>
      </div>
    </div>
    <WelfareBox>
      <WelfareNoteText mt="0" text="송장번호를 누르시면 상품의 배송현황을 확인하실 수 있습니다." />
      <WelfareNoteText text="출고 대기중인 상품은 송장 등록이 완료되면 목록에서 확인 가능합니다." />
      <div class="wf-mt-20 wf-br-t-1 wf-br--g-bbb">
        <div
          class="wf_flex wf_items-center wf_justify-between wf-bg--g-f-5-f-6-fa wf-pl-16 wf-pr-19 wf-color--g-33 wf-pt-13 wf-pb-12 wf-br-b-1 wf-br--g-e-7 wf-font_14-reg--lh130"
        >
          <div class="">NO</div>
          <div class="wf_text-center">택배사</div>
          <div class="wf_text-center">송장번호</div>
          <div class="wf_text-right">배송상태</div>
        </div>
        <div
          v-for="(item, index) in data"
          :key="index"
          class="wf_flex wf_items-center wf_justify-between wf-pl-16 wf-pr-19 wf-color--g-33 wf-pt-12 wf-pb-11 wf-br-b-1 wf-font_13--reg wf-br--g-e-7"
        >
          <div class="wf_text-center wf_width-18">{{ index + 1 }}</div>
          <div class="wf-pr-0">{{ item.nameCompany }}</div>
          <div class="wf-pr-12 wf-hover-underline" @click="handleShowStatusDeliveryModal(item.numberBill)">{{ item.numberBill }}</div>
          <div class="wf_text-center wf-pr-6">
            {{ myPageListMessageStatusDelivery?.[item.statusDelivery] }}
          </div>
        </div>
      </div>
    </WelfareBox>
  </div>
</template>
