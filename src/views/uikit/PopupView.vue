<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import PopupConfirmDeliveryAddress from '@/components/widgets/modal/popup/PopupConfirmDeliveryAddress.vue'
import PopupConfirmText from '@/components/widgets/modal/popup/PopupConfirmText.vue'
import PopupNotification from '@/components/widgets/modal/popup/PopupNotification.vue'
</script>

<template>
  <WelfareContainer>
    <WelfareTitleInfo title="Popup" des="활용법" subDes="배경 DIM컬러는 #000000, 50%를 적용합니다." />
    <div class="wf-bg--g-f-3-f-3 wf_grid wf-space-x-20 wf_grid-cols-3 wf-py-20 wf-px-16">
      <div class="wf-m-auto">
        <span class="wf-font_16--bold">Alert</span>
        <div class="mz_pad-top30"></div>
        <PopupNotification content="고객정보가 수정되었습니다." />
      </div>
      <div class="wf-m-auto">
        <span class="wf-font_16--bold">Alert</span>
        <div class="mz_pad-top30"></div>
        <PopupConfirmText
          content="지금까지 작성하셨던 주문/배송지가 초기화 됩니다. </br>
                <div class='wf-mt-1'>진행하시겠습니까?</div>"
        />
      </div>
      <div class="wf-bg--white">
        <div class="wf_flex wf_items-center wf_justify-center wf-px-16 wf_height-812 wf-bg-black-05">
          <PopupConfirmDeliveryAddress />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
