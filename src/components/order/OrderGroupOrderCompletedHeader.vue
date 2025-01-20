<script setup lang="ts">
import IconCheckBoxBlack from '../icons/IconCheckBoxBlack.vue'
import { formatNumberDot } from '@/commons'

interface OrderGroupOrderCompletedHeaderProps {
  isMember: boolean
  ordererName: string
  orderKey?: number
  isECoupon?: boolean
}

const props = defineProps<OrderGroupOrderCompletedHeaderProps>()
</script>
<template>
  <div class="wf_text-center wf-pt-21">
    <div class="wf_flex-center wf_flex">
      <IconCheckBoxBlack />
    </div>

    <div class="wf-pb-9 wf-pt-10">
      <p class="wf-color--g-111 wf-font_23--bold wf_line-height-27">
        {{ props.ordererName }} <br />
        주문이 완료 되었습니다.
      </p>
      <span class="wf-color--g-777 wf-font_15--reg-p wf_line-height-31">주문번호 {{ props.orderKey ?? '' }}</span>
    </div>
    <div v-if="props.isECoupon" class="wf-pb-20">
      <p class="wf-color--g-999 wf-font_13--reg-p wf_line-height-18">수신자정보에 기재된 번호로 모바일상품권(e쿠폰)이 발송됩니다.</p>
    </div>
    <div v-else class="wf-pb-20">
      <p class="wf-color--g-999 wf-font_13--reg-p wf_line-height-18">
        배송이 시작되면 카카오메시지(또는 SMS),<br />
        이메일로 배송정보가 안내됩니다.
      </p>
    </div>
    <div v-if="props.isMember" class="wf-bg--g-f-8-f-8 wf-py-16 wf-font_13--reg-p wf-color--g-555 wf_height-63 wf-mx-16 wf_line-height-9">
      <p>
        적립예정 금액은 <span class="wf-color--blue-4075-f-3">{{ formatNumberDot(0) }}원</span> 입니다.
      </p>
      <br />
      <p>예정된 적립금은 배송완료 익일 지급됩니다.</p>
    </div>
  </div>
</template>
