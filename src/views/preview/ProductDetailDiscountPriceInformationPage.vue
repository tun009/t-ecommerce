<script setup lang="ts">
import { useModal } from '@/composables/common/useModal'
import { onMounted } from 'vue'
import ProductDetailDiscountPriceInformationModal from '../products/detail/modal/ProductDetailDiscountPriceInformationModal.vue'

const { showModal, closeModalByPop } = useModal()

const handleShowDiscountPriceInfoModal = () => {
  showModal?.({
    component: ProductDetailDiscountPriceInformationModal,
    props: {
      onCancel: closeModalByPop
    }
  })
}

onMounted(() => {
  handleShowDiscountPriceInfoModal()
})
</script>
<template>
  <div>Test modal FO_MC_IT011002P</div>
</template>
