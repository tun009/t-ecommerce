<!-- 
  FO_MC_MY014000,
  FO_MC_MY014001,
  FO_MC_MY014002,
  FO_MC_MY014003
-->
<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT } from '@/commons'
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageSyntheticProductOrder from '@/components/myPage/common/MyPageSyntheticProductOrder.vue'
import OrderBillAddressDelivery from '@/components/order/OrderBillAddressDelivery.vue'
import OrderGroupOrderBankPayment from '@/components/order/OrderGroupOrderBankPayment.vue'
import OrderGroupOrderPricePayment from '@/components/order/OrderGroupOrderPricePayment.vue'
import OrderGroupRefundPricePayment from '@/components/order/OrderGroupRefundPricePayment.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import OrderTotalPricePayment from '@/components/order/OrderTotalPricePayment.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageOrderDetail } from '@/composables/myPage/useMyPageOrderDetail'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'

const {
  isSingleAddress,
  products,
  priceInfoBill,
  totalPayment,
  paymentMethodUseAgain,
  switchMethodPaymentRadio,
  currentBank,
  methodPaymentSelect,
  installmentMonthSelect,
  optionsPaymentMethod,
  optionsInstallmentMonthSelect,
  dataBanks,
  handleClickOther,
  agreePolicyCheckbox,
  showModalChangeDeliveryAddress,
  showModalListDelivery,
  isNonMember,
  isRefundOrder,
  refundBill,
  orderInformation,
  isShowChangeAddressButton
} = useMyPageOrderDetail()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :title="$t('myPage.orderDetail.title')" display-back-icon display-cart-icon display-search-icon />
    <div class="wf-relative">
      <MyPageOrderShortInfo
        :order-date="orderInformation?.orderDate || DEFAULT_DATE_FORMAT_DOT"
        :order-number="orderInformation?.orderNumber || ''"
      />
      <div class="wf-pt-20" v-for="(orderProduct, index) in products" v-bind:key="index">
        <div class="wf-px-16">
          <p class="wf-font_17--bold wf-color--g-111 wf-mb--8">{{ $t('myPage.orderDetail.product') + (index > 0 ? index + 1 : '') }}</p>
          <MyPageSyntheticProductOrder
            v-for="(product, indexProduct) in orderProduct.products"
            v-bind:key="indexProduct"
            :class="`wf-pt-20 wf-pb-19 ${indexProduct < orderProduct.products.length - 1 && 'wf-br-b-1 wf-br--g-e-7'}`"
            :product="product?.products[0].product"
            :finalOrderStatus="product?.products[0].product.finalOrderStatus ?? MyPageStatusDeliveryOrder.DELIVERY"
            showTextReturn
            :showButtonStatusDelivery="true"
            @clickButtonStatusDelivery="() => showModalListDelivery(product?.products?.[0]?.product.id ?? 0)"
          />
        </div>
        <WelfareLineHorizontal />
        <WelfareBox>
          <div class="wf_flex wf_justify-between wf_items-center wf-mb-20">
            <OrderProductOrderTitle :title="`cardOrder.titleDeliveryOrder`" />
            <WelfareButtonLine
              v-if="isShowChangeAddressButton"
              class="wf_width-81"
              smSate
              type="sm"
              :text="$t('myPage.orderDetail.changeDeliveryAddress')"
              @click="
                () =>
                  showModalChangeDeliveryAddress(
                    index,
                    orderProduct.deliveryAddress as DeliveryAddressModel,
                    orderProduct.messageAddressDelivery,
                    isNonMember
                  )
              "
            />
          </div>
          <OrderBillAddressDelivery
            :hideDefaultTag="true"
            :delivery-address="orderProduct.deliveryAddress"
            :message-address-delivery="orderProduct.messageAddressDelivery"
          />
        </WelfareBox>
        <WelfareLineHorizontal />
      </div>
      <template v-if="isRefundOrder && refundBill">
        <OrderGroupRefundPricePayment
          :welfarePoints="refundBill.priceSavePoint"
          :payingCreditCard="refundBill.priceVoucher"
          :totalRefund="refundBill.totalPrice"
        />
        <WelfareLineHorizontal />
      </template>

      <template v-if="!isSingleAddress">
        <WelfareLineHorizontal class="wf-mt--5" />
        <OrderGroupOrderBankPayment
          :data-banks="dataBanks"
          :isMember="true"
          :optionsInstallmentMonthSelect="optionsInstallmentMonthSelect"
          :optionsPaymentMethod="optionsPaymentMethod"
          @click-bank="handleClickOther"
          v-model:current-bank="currentBank"
          v-model:installment-month-select="installmentMonthSelect"
          v-model:method-payment-select="methodPaymentSelect"
          v-model:payment-method-use-again="paymentMethodUseAgain"
          v-model:switch-method-payment-radio="switchMethodPaymentRadio"
        />
      </template>

      <WelfareLineHorizontal />
      <OrderGroupOrderPricePayment
        v-if="priceInfoBill"
        :isMember="false"
        :total-price-before-discount="priceInfoBill.totalPrice"
        :cost-delivery="priceInfoBill.costDelivery"
        :total-price-discount="priceInfoBill.priceVoucher"
        :price-save-point="priceInfoBill.priceSavePoint"
        :total-price-payment="totalPayment"
        :discounts="priceInfoBill.discounts"
        :use-point-discounts="priceInfoBill.usePointDiscounts"
        :isShowHintPayment="true"
      />

      <OrderTotalPricePayment v-if="!isSingleAddress" v-model:agree-payment-checkbox="agreePolicyCheckbox" :total-price-payment="totalPayment" />
      <div class="wf-mb-40" v-else></div>
    </div>
  </div>
</template>
