<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { BaseModalEmits } from '@/models/widgets/modal'

interface WelfareModalContentProps {
  title: string
}

defineEmits<BaseModalEmits>()
const props = defineProps<WelfareModalContentProps>()
</script>

<template>
  <div class="wf_modal-width wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important">
    <WelfareTitleModal class="wf-pt-10 wf-pb-15" classTitle=" wf_letter-spacing--0745 " :title="props.title" @click="$emit('onClose')" />
    <div>
      <dl class="wrap-agreement-contents wf-color--g-333 wf-bg--g-f-5-f-5-f">
        <dt class="wf-font_15--bold">수집항목</dt>
        <dd class="wf-font_13--reg wf-mt-10">이름, 휴대폰번호, 이메일, 주소</dd>
        <dt class="wf-font_15--bold wf-mt-20">수집목적</dt>
        <dd class="wf-font_13--reg wf-mt-10">광고성 정보제공, 이벤트 참여기회 부여, 설문참여</dd>
        <dt class="wf-font_15--bold wf-mt-20">보유기간</dt>
        <dd class="wf-font_13--reg wf-mt-10">동의 철회 시 까지</dd>
      </dl>
      <p class="agreement-desc wf-mt-10 wf_flex wf_items-start">
        <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
        <span class="wf-font_13-reg--lh130 wf-color--g-555">
          정보주체는 개인정보 수집에 동의를 거부할 권리가 있습니다.<br />다만, 서비스 이용 필수 항목에 대한 동의를 거부할 시<br />제공되는 서비스를
          이용 할 수 없습니다.
        </span>
      </p>
    </div>
    <WelfareButtonLine class="wf_w-full" type="lg" text="확인" @click="$emit('onClose')" />
  </div>
</template>

<style scoped lang="scss">
.wrap-agreement-contents {
  padding: 20px;

  dd {
    letter-spacing: -1px;
  }
}
// .agreement-desc {
//   letter-spacing: -1px;
// }
</style>
