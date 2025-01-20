<!-- FO_MC_MY011003P -->
<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import IconDeliveryMyPage from '@/components/icons/myPage/IconDeliveryMyPage.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLoading from '@/components/widgets/common/WelfareLoading.vue'
import { useMyPageStatusDeliveryModal } from '@/composables/myPage/useMyPageStatusDeliveryModal'
import { MyPageStatusDeliveryOrderProps } from '@/models/views/myPage/MyPageStatusOrderModal'
import { BaseModalEmits } from '@/models/widgets/modal'

const props = defineProps<MyPageStatusDeliveryOrderProps>()
defineEmits<BaseModalEmits>()

const { data, isLoading } = useMyPageStatusDeliveryModal(props)
</script>
<template>
  <div class="wf-bg--g-fff wf-pt-20 wf-pb-30 wf_width-screen wf-overflow-scroll-full--y">
    <div class="wf_flex wf-px-16 wf_justify-center wf-br--g-e-7 wf-relative wf_width-full wf-br-b-1 wf-pb-20">
      <div class="wf-font_21--bold wf-color--g-111 wf_text-center">배송현황</div>
      <div class="wf-absolute wf-top-2 wf-right-13">
        <button @click="$emit('onClose')" class="wf_flex wf_items-start">
          <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
        </button>
      </div>
    </div>
    <WelfareBox>
      <div>
        <p class="wf-font_17--bold wf-color--g-111 wf-pb-20 wf-mt-2">배송정보</p>
        <div class="wf-br-t-1 wf-br--g-bbb">
          <div class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf-pt-13 wf-pb-14">
              <span class="wf-font_13--reg wf-color--g-333">상품명</span>
            </div>
            <div class="wf_flex-1 wf-pl-20 wf-font_13-reg--lh130 wf-color--g-555 wf-pt-12 wf-pr-17 wf-pb-11">
              <p class="line-clamp-2">{{ data?.infoDelivery.productName }}</p>
            </div>
          </div>
          <div class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf-pt-13 wf-pb-14">
              <span class="wf-font_13--reg wf-color--g-333">받으실 분</span>
            </div>
            <div class="wf_flex-1 wf-pl-20 wf-font_13--reg wf-color--g-555 wf-pt-13 wf-pb-14 line-clamp-2">{{ data?.infoDelivery.recipient }}</div>
          </div>
          <div class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf-pt-13 wf-pb-14">
              <span class="wf-font_13--reg wf-color--g-333">배송상태</span>
            </div>
            <div class="wf_flex-1 wf-pl-20 wf-font_13--reg wf-color--g-555 wf-pt-13 wf-pb-14 line-clamp-2">
              {{ data?.infoDelivery.statusDelivery }}
            </div>
          </div>
          <div class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf-pt-13 wf-pb-14">
              <span class="wf-font_13--reg wf-color--g-333">택배사</span>
            </div>
            <div
              v-if="data?.infoDelivery.companyDelivery.name || data?.infoDelivery.companyDelivery.phone"
              class="wf_flex-1 wf-pl-20 wf-font_13--reg wf-color--g-555 wf-pt-13 wf-pb-14 line-clamp-2"
            >
              {{ data?.infoDelivery.companyDelivery.name }} ({{ data?.infoDelivery.companyDelivery.phone }})
            </div>
          </div>
          <div class="wf-br-b-1 wf-br--g-e-7 wf_flex">
            <div class="wf_flex wf_width-100 wf-pl-15 wf-bg--g-f-5-f-6-fa wf-pt-13 wf-pb-14">
              <span class="wf-font_13--reg wf-color--g-333">송장번호</span>
            </div>
            <div class="wf_flex-1 wf-pl-20 wf-font_13--reg wf-color--g-555 wf-pt-13 wf-pb-14 line-clamp-2">{{ data?.infoDelivery.billNumber }}</div>
          </div>
        </div>
      </div>
      <WelfareLoading v-if="isLoading" class="wf-mt-31" class-image="wf_width-30 wf_height-30" />
      <div class="wf-expander" :class="{ 'wf-expanded': !isLoading }">
        <div class="wf-mt-31 wf-expander-content">
          <p class="wf-font_17--bold wf-color--g-111 wf-pb-20">배송 상세현황</p>
          <div class="wf-br-t-1 wf-br--g-bbb">
            <div
              class="wf_grid wf_grid-cols-3 wf-font_14-reg--lh130 wf-space-x-50 wf-color--g-333 wf_height-40 wf-bg--g-f-5-f-6-fa wf-br-b-1 wf-br--g-e-7"
            >
              <div class="wf_flex wf_justify-center wf_items-center wf-pl-18"><span class="wf_text-center">처리일시</span></div>
              <div class="wf_flex wf_justify-center wf_items-center"><span>현재위치</span></div>
              <div class="wf_flex wf_justify-center wf_items-center wf-pr-20"><span>배송상태</span></div>
            </div>
            <div
              v-for="(item, index) in data?.detailDelivery"
              :key="index"
              class="wf_grid wf_grid-cols-3 wf-font_13-reg--lh130 wf-pt-14 wf-pb-10 wf-space-x-10 wf-color--g-333 wf-br-b-1 wf-br--g-e-7"
            >
              <div class="wf_flex wf_justify-center wf-pr-15 wf-pl-6">
                <span class="wf_text-center">{{ item.createDate }}</span>
              </div>
              <div class="wf_flex wf_justify-center wf_items-center">
                <span>{{ item.location }}</span>
              </div>
              <div class="wf_flex wf_justify-center wf_items-center wf-pr-0">
                <span>{{ item.situation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WelfareBox>
    <div class="wf_flex wf_flex-col wf_width-164 wf-mx-auto wf-pt-20 wf-pb-40 wf_items-center">
      <IconDeliveryMyPage :width="45" :height="26" :color="defaultColor.gray1" />
      <span class="wf-font_13--semi wf-color--g-333 wf-mt-18">상품이 터미널로 입고되고 있습니다.</span>
      <span class="wf-font_13-reg--lh130 wf_text-center wf-color--g-333 wf-mt-16"
        >당일 발송된 상품의 경우,<br />
        당일 저녁 또는 다음 날 아침부터<br />
        조회하실 수 있습니다.</span
      >
    </div>
  </div>
</template>
