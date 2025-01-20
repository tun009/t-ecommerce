<!--FO_MC_IT012014-->
<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import ProductDetailTableInformationNotice from '@/components/products/detail/common/ProductDetailTableInformationNotice.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ProductDetailInformationNoticeModel } from '@/models/services/responses/products/detail/ProductDetailProductCodeResponse'
import { productDetailProductCodeTabApi } from '@/services/api/products/detail/ProductDetailProductCodeTabApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const refExpander = ref()

interface ProductCodeExpandProps {
  title: string
}

const props = defineProps<ProductCodeExpandProps>()
const router = useRoute()
const productInformationNotice = ref<ProductDetailInformationNoticeModel>()
onMounted(() => {
  if (router.query?.productKey) {
    productDetailProductCodeTabApi
      .getProductInformationNotice(Number(router.query.productKey))
      .then((res) => {
        productInformationNotice.value = res.data
      })
      .catch(() => {
        //hanlde error
      })
  }
})

defineExpose({
  openExpander: () => {
    refExpander.value?.handleShowExpander?.()
  }
})
</script>

<template>
  <WelfareExpander ref="refExpander">
    <template #button="{ isExpander }">
      <OrderProductOrderTitle classTitle="wf-font_15--mid" class="wf-px-16 wf-py-16 wf-br-b-1 wf-br--g-e-7"
        @click="refExpander?.handleToggleExpander" :title="props.title" rawText>
        <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
          <IconArrowDown />
        </div>
      </OrderProductOrderTitle>
    </template>
    <div class="wf-px-16 wf_flex wf_flex-col wf-pb-20">
      <span class="wf-font_15--bold wf-color--g-111 wf-py-20">상품정보고시</span>
      <div class="wf_flex wf_flex-col wf-space-y-20">
        <ProductDetailTableInformationNotice :infos="productInformationNotice?.foItemInfoAncmList" />
      </div>
    </div>
  </WelfareExpander>
</template>
