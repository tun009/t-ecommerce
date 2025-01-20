<script setup lang="ts">
import { getImageProduct } from '@/commons'
import { useRouter } from 'vue-router'

interface WelfareProductItem {
  src: string
  alt: string
  productKey?: number
}
const router = useRouter()
const { src, alt, productKey } = withDefaults(defineProps<WelfareProductItem>(), {})
</script>
<template>
  <div class="prd-item">
    <div class="prd-item-left inquiry_image_wrapper" @click="productKey && router.push(`/product-detail?productKey=${productKey}`)">
      <img :src="getImageProduct(src, alt)" :alt="alt" />
    </div>
    <div class="prd-item-right">
      <slot name="item" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-content.scss');
.inquiry_image_wrapper {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
