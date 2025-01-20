<script setup lang="ts">
import { useFormSearchAddress } from '@/composables/common/useFormSearchAddress'
import { FormAddressEmits } from '@/models/widgets/form/FormAddressModel'
import IconClose from '../icons/IconClose.vue'
const emits = defineEmits<FormAddressEmits>()

const { closeDaumPostcode, wfDaumLayer, handleClickOutside, handleExecDaumPostcode, refModal } = useFormSearchAddress(emits)
defineExpose({
  open: handleExecDaumPostcode,
  close: closeDaumPostcode
})
</script>
<template>
  <div class="overlay" ref="refModal" @click="handleClickOutside">
    <div ref="wfDaumLayer" class="wf-search-address-modal">
      <div class="wf_flex wf_flex-row wf_items-center wf_search-address-header">
        <p class="wf_text-center">우편번호/주소 찾기</p>
        <button @click="closeDaumPostcode" class="wf_search-address-close">
          <IconClose :width="20" :height="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/form/welfare-form-address.scss');
</style>
