<script setup lang="ts">
import GroupProductCustomer from '@/components/order/OrderGroupProductCustomer.vue'
import OrderProductNoteMemberGroupPolicy from '@/components/order/OrderProductNoteMemberGroupPolicy.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useOrderProductNotMember } from '@/composables/order/useOrderProductNotMember'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'

const { productCustomerList, policy, showModalAllowInfo, showModalTermUse, handleSave } = useOrderProductNotMember()
</script>
<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :displayBackIcon="true" :title="$t('cardOrder.orderNotMember.title')" />
    <GroupProductCustomer classButton="wf-mt--6" :product-list="productCustomerList" />
    <WelfareLineHorizontal class="wf-mt-2" />
    <WelfareBox>
      <OrderProductOrderTitle title="cardOrder.orderNotMember.titlePolicy" />
      <div class="wf-mt-20 wf_flex wf_flex-col wf-space-y-20">
        <OrderProductNoteMemberGroupPolicy @view-click="showModalTermUse" name="cardOrder.orderNotMember.termUse" v-model:checked="policy.termUse" />
        <OrderProductNoteMemberGroupPolicy
          @view-click="showModalAllowInfo"
          name="cardOrder.orderNotMember.allowInfo"
          v-model:checked="policy.allowInfo"
        />
      </div>

      <WelfareButtonLine
        @click="handleSave"
        type="lg"
        class="wf_width-full wf-mt-30"
        lg-state="default"
        :text="$t('cardOrder.orderNotMember.btnCertificate')"
      />
    </WelfareBox>
  </div>
</template>
