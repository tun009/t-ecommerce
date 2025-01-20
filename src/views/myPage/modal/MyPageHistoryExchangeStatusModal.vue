<!-- FO_MC_MY011005P -->

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
      title="myPage.exchangeStatus.title"
      description="myPage.exchangeStatus.description"
      title-table="myPage.exchangeStatus.titleTable"
      :data="props.data"
    />
  </div>
</template>
