<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import ProductDetailTableCertificate from '@/components/products/detail/common/ProductDetailTableCertificate.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ref } from 'vue'

const refExpander = ref()

interface ProductCodeExpandProps {
  title: string
}

const props = defineProps<ProductCodeExpandProps>()
const tableInfo = [
  {
    icon: 'icon',
    contents: [
      { title: '어린이제품 안전인증', value: 'ABC-1234-123123 상세보기' },
      { title: '전기기용품 공급자적합성 확인', value: '상세페이지 참조' }
    ]
  }
]
</script>

<template>
  <WelfareExpander ref="refExpander">
    <template #button="{ isExpander }">
      <OrderProductOrderTitle
        classTitle="wf-font_15--mid"
        class="wf-px-16 wf-py-16 wf-br-b-1 wf-br--g-e-7"
        @click="refExpander?.handleToggleExpander"
        :title="props.title"
        rawText
      >
        <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
          <IconArrowDown />
        </div>
      </OrderProductOrderTitle>
    </template>
    <div class="wf-px-16 wf_flex wf_flex-col">
      <span class="wf-font_15--bold wf-color--g-111 wf-py-20">안전인증 &nbsp;정보</span>
      <div class="wf-pb-30 wf_flex wf_flex-col wf-space-y-20 wf-mt--1">
        <div class="wf-font_13-reg--lh140 wf-color--g-555 wf_flex wf_flex-col wf-space-y-2">
          <span
            >인증.검사 정보에 대한 책임은 판매자에게 있으며, <span class="wf-color--blue-4075-f-3 wf-underline">제품안정정보센터</span>를 &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; 통해 이증번호 조회가 가능합니다.</span
          >
        </div>
      </div>
    </div>
    <ProductDetailTableCertificate class="wf-mt--11 wf-mx-16" :infos="tableInfo" />
  </WelfareExpander>
</template>
