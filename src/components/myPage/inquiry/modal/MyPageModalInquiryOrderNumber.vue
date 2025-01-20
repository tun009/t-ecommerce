<script setup lang="ts">
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageUnitCard from '@/components/myPage/inquiry/modal/MyPageUnitCard.vue'
import { BaseContentConfirmModalEmits } from '@/models/widgets/modal'
import { SearchProductCode } from '@/models/views/myPage/MyPageCustomerInfo'
import { WelfareOrderNumberProps } from '@/models/views/myPage/MyPageCustomerInfo'
import { formatTimeWithDot } from '@/commons'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'
import { useMyPageInquiryOrderCode } from '@/composables/myPage/useMyPageInquiry'

const props = defineProps<WelfareOrderNumberProps>()
const emit = defineEmits<BaseContentConfirmModalEmits<SearchProductCode>>()

const { orderDeliveryForm, orderTicketForm, selectDeliveryOrder, selectTicketOrder, mapReturnOrderDeliveryStatus } = useMyPageInquiryOrderCode(emit)
</script>

<template>
  <WelfareTitleModal class="wf_width-auto wf-pb-15 wf-mx-16" :title="props.title" @click="$emit('close')" classIcon="wf-mt-2" />
  <div class="wf-mx-auto wf_width-full wf-mt-12 wf-px-16">
    <div class="wf_flex wf_flex-col wf-space-y-21 wf-pb-20">
      <span class="font-13 border-bb-777 color-777 pd-10">{{ $t('myPage.inquiryOrderCode.content') }}</span>

      <div v-for="item in props.data" :key="item.orderKey">
        <div v-if="item.myPageOrderEntryResponses">
          <div class="wf_unit-claim--header wf_flex wf_justify-between wf_items-center wf_height-41">
            <p class="wf-font_15--bold wf-color--g-111">{{ formatTimeWithDot(item.createdDatetime) }}</p>
            <router-link class="wf-font_13--reg wf-color--g-777 wf-text-underline" to="#"
              >{{ $t('myPage.orderInfo.orderNumber') }} {{ item.orderKey }}</router-link
            >
          </div>

          <div v-for="(itemStatus, index) in item.myPageOrderEntryResponses" :key="index + 'product'" class="border-bb-777 wf-mb-20">
            <!-- 배송상품 -->
            <div v-if="itemStatus.deliveryOrderResponse">
              <div class="wf_height-41 wf_flex wf-space-x-12 wf-bg--g-f-5-f-6-fa wf-px-10 wf_items-center wf-mb-19">
                <p class="wf-font_13--mid wf-color--g-111">{{ $t('myPage.inquiryWrite.title6') }}</p>
                <p class="wf-color--g-555 wf-font_13--reg">
                  {{ itemStatus?.deliveryOrderResponse?.deliveryResponse?.receiverName }} &nbsp;{{
                    itemStatus?.deliveryOrderResponse?.deliveryResponse?.deliveryStreetAddress
                  }}
                </p>
              </div>

              <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between">
                <span class="wf-color--f-95729 wf-font_15--mid">{{
                  itemStatus.deliveryOrderResponse.claimProcessStatus == 'NOCLAM'
                    ? mapReturnOrderDeliveryStatus(itemStatus?.deliveryOrderResponse?.finalOrderStatus as MyPageStatusDeliveryOrder)
                    : mapReturnOrderDeliveryStatus(itemStatus?.deliveryOrderResponse?.claimProcessStatus as MyPageStatusDeliveryOrder)
                }}</span>
                <WelfareButtonLine
                  class="wf_width-62"
                  type="sm"
                  :text="$t('myPage.inquiryProduceCode.select')"
                  @click="selectDeliveryOrder({ ...itemStatus, createdDatetime: item.createdDatetime, orderKey: item.orderKey })"
                />
              </div>

              <MyPageUnitCard :product="orderDeliveryForm({ ...itemStatus, createdDatetime: item.createdDatetime, orderKey: item.orderKey })" />
            </div>

            <!-- 티켓상품 -->
            <div v-else>
              <div class="wf_height-41 wf_flex wf-space-x-12 wf-bg--g-f-5-f-6-fa wf-px-10 wf_items-center wf-mb-19">
                <p class="wf-font_13--mid wf-color--g-111">{{ $t('myPage.inquiryWrite.title5') }} {{ index + 1 }}</p>
                <p class="wf-color--g-555 wf-font_13--reg">
                  {{ itemStatus.ticketOrderReceiverResponse.receiverName }} &nbsp;{{ itemStatus.ticketOrderReceiverResponse.receiverPhoneNumber }}
                </p>
              </div>
              <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between">
                <span class="wf-color--f-95729 wf-font_15--mid">{{
                  itemStatus.ticketOrderReceiverResponse.claimProcessStatus == 'NOCLAM'
                    ? mapReturnOrderDeliveryStatus(itemStatus?.ticketOrderReceiverResponse?.finalOrderStatus as MyPageStatusDeliveryOrder)
                    : mapReturnOrderDeliveryStatus(itemStatus?.ticketOrderReceiverResponse?.claimProcessStatus as MyPageStatusDeliveryOrder)
                }}</span>

                <WelfareButtonLine
                  class="wf_width-62"
                  type="sm"
                  :text="$t('myPage.inquiryProduceCode.select')"
                  @click="selectTicketOrder({ ...itemStatus, createdDatetime: item.createdDatetime, orderKey: item.orderKey })"
                />
              </div>
              <MyPageUnitCard :product="orderTicketForm({ ...itemStatus, createdDatetime: item.createdDatetime, orderKey: item.orderKey })" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
