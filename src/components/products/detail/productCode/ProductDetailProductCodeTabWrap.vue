<script setup lang="ts">
import ProductDetailSellerMessageExpand from './ProductDetailSellerMessageExpand.vue'
import ProductDetailProductCodeExpand from './ProductDetailProductCodeExpand.vue'
import ProductDetailCertificateSafeExpand from './ProductDetailCertificateSafeExpand.vue'
import ProductDetailProductInformationNoticeExpand from './ProductDetailProductInformationNoticeExpand.vue'
import ProductDetailSellerInformationExpand from './ProductDetailSellerInformationExpand.vue'
import { ref } from 'vue'
import ProductDetailInformationReleaseExpand from '@/components/products/detail/productCode/ProductDetailInformationReleaseExpand.vue'
import { SellerCompanyShipmentModel } from '@/models/views/member/SellerCompanyShipment'
import ProductDetailDeliveryExchangeReturnRefundInfo from '../deliveryExchangeReturnRefund/ProductDetailDeliveryExchangeReturnRefundInfo.vue'
import { ProductDetailClassificationEnum, ProductDetailModel } from '@/models/views/products/ProductDetailReviewModel'

interface ProductDetailProductCodeTabWrapProps {
  productDetail: ProductDetailModel
  showImage: () => void
  listSellerShipments?: SellerCompanyShipmentModel
}

const props = defineProps<ProductDetailProductCodeTabWrapProps>()
const refExpander = ref()

defineExpose({
  openExpander: () => {
    refExpander.value?.openExpander()
  }
})
</script>
<template>
  <div class="wf-tab-code">
    <ProductDetailSellerMessageExpand :show-image="props.showImage" />
    <ProductDetailProductCodeExpand title="상품코드" :productCode="props.productDetail?.productCode" />
    <ProductDetailInformationReleaseExpand
      v-if="productDetail?.productClassificationCode === ProductDetailClassificationEnum.ticket"
      title="발급정보"
    />
    <div v-if="productDetail?.productClassificationCode === ProductDetailClassificationEnum.delivery">
      <ProductDetailDeliveryExchangeReturnRefundInfo :listSellerShipments="props.listSellerShipments" />
      <ProductDetailCertificateSafeExpand title="안전인증정보" />
    </div>
    <ProductDetailProductInformationNoticeExpand id="welfare-info-product-tab" ref="refExpander" title="상품정보고시" />
    <ProductDetailSellerInformationExpand title="판매자정보" />
  </div>
</template>
