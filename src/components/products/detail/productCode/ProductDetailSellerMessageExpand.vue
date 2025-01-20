<script setup lang="ts">
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import { ProductDetailInfoDescriptionModel } from '@/models/services/responses/products/detail/ProductDetailProductCodeResponse'
import { productDetailProductCodeTabApi } from '@/services/api/products/detail/ProductDetailProductCodeTabApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const isExpanderOpen = ref(false)
const handleOpenExpander = () => {
  isExpanderOpen.value = !isExpanderOpen.value
}
const productItemInfoDescription = ref<ProductDetailInfoDescriptionModel>()
const router = useRoute()

onMounted(() => {
  if (router.query?.productKey) {
    productDetailProductCodeTabApi
      .getProductItemInfoDescription(Number(router.query.productKey))
      .then((res) => {
        productItemInfoDescription.value = res.data
      })
      .catch(() => {
        //hanlde error
      })
  }
})

defineProps<{ showImage: () => void }>()
</script>

<template>
  <!-- <div class="wf-my-20">
    <div class="wf-px-16 wf_flex wf_justify-center wf_width-full">
      <div
        class="wf_flex wf_items-center wf_justify-center wf-px-44 wf-py-14 wf_text-center wf-font_15--bold wf-color--g-333 wf-br-b-1 wf-br-t-1 wf-br-l-1 wf-br-r-1 wf-br--g-111"
      >
        판매자 공지사항
      </div>
      <div class="wf-px-50 wf-py-14 wf-font_15-mid--lh140 wf-color--g-5999 wf-br-b-1 wf-br-t-1 wf-br-l-1 wf-br-r-1 wf-bg--g-f-5-f-5-f">
        <span>2022.09.01</span>
      </div>
    </div>
  </div> -->
  <!-- <div class="wf-px-16 wf-pb-15 wf_flex wf_flex-col wf-space-y-6">
    <div class="wf-font_15-mid--lh157 wf-color--g-555">
      상품 입고문제로 인해 배송이 2-3일정도 늦어질 수 있습니다.&nbsp; &nbsp; &nbsp; 상품 입고문제로 인해 배송이 2-3일정도 늦어질 수 있습니다.
    </div>
  </div> -->
  <div class="wf-relative wf-button-blur wf-my-20" :class="`${isExpanderOpen ? 'wf-image-auto-height' : 'wf-image-preview'}`">
    <!-- <img :src="ProductCodeTabImage" alt="image" @dblclick="props.showImage" /> -->
    <div v-html="productItemInfoDescription?.mobileDetailHtmlContents"></div>
    <div v-html="productItemInfoDescription?.pcDetailHtmlContents"></div>
    <div class="wf-button-product-code-tab wf_width-full wf_flex wf_flex-center">
      <WelfareButtonFull
        @click="handleOpenExpander"
        :is-rotate="isExpanderOpen"
        class="wf-br--g-111 wf_product-btn-show-more"
        :text="`${isExpanderOpen ? '접기 ' : '상세설명 더보기'}`"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-product-code-tab.scss');
</style>
