<!-- FO_MC_MY011004P -->

<script setup lang="ts">
import MyPageStatusOrderModalContainer from '@/components/myPage/common/MyPageStatusOrderModalContainer.vue'
import { MyPageStatusDataOrderModel } from '@/models/views/myPage/MyPageStatusOrderModal'

interface Props {
  data: MyPageStatusDataOrderModel[]
}

const props = defineProps<Props>()
</script>
<template>
  <div>
    <MyPageStatusOrderModalContainer
      title="myPage.refundStatus.title"
      description="myPage.refundStatus.description"
      title-table="myPage.refundStatus.titleTable"
      :data="props.data"
    />
  </div>
</template>
