<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import ProductDetailTableInformationNotice from '@/components/products/detail/common/ProductDetailTableInformationNotice.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ref } from 'vue'

const refExpander = ref()

interface ProductCodeExpandProps {
  title: string
}

const props = defineProps<ProductCodeExpandProps>()
const tableInfo = [
  {
    productInfoProvisionItemContents: '상호명',
    productInfoProvisionContents: '온 무드'
  },
  {
    productInfoProvisionItemContents: '사업자등록번호',
    productInfoProvisionContents: '5025012462'
  },
  {
    productInfoProvisionItemContents: '통신팬매업번호',
    productInfoProvisionContents: '2022-서울도봉-1220'
  },
  {
    productInfoProvisionItemContents: '대표자',
    productInfoProvisionContents: '조한별'
  },
  {
    productInfoProvisionItemContents: '사업장소재지',
    productInfoProvisionContents: '(01323) 서울특별시 도봉구 마들로 760 3층 307호'
  }
]

const handleToggleExpander = () => {
  refExpander.value?.handleToggleExpander()
  setTimeout(() => {
    window.scrollTo({
      top: document.getElementById('wf-title-expand-seller-info')!.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    })
  }, 100)
}
</script>

<template>
  <WelfareExpander ref="refExpander">
    <template #button="{ isExpander }">
      <OrderProductOrderTitle classTitle="wf-font_15--mid" class="wf-px-16 wf-py-16 wf-br-b-1 wf-br--g-e-7"
        @click="handleToggleExpander" :title="props.title" rawText>
        <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
          <IconArrowDown />
        </div>
      </OrderProductOrderTitle>
    </template>
    <div class="wf-px-16 wf_flex wf_flex-col wf-pb-20">
      <span class="wf-font_15--bold wf-color--g-111 wf-py-20" id="wf-title-expand-seller-info">판매자정보</span>
      <div class="wf-pb-30 wf_flex wf_flex-col wf-space-y-20">
        <ProductDetailTableInformationNotice :infos="tableInfo" />
      </div>
    </div>
  </WelfareExpander>
</template>
