<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { ConfirmModalProps } from '@/models/widgets/modal'

withDefaults(defineProps<ConfirmModalProps>(), {
  content: '',
  type: 'default',
  buttonCancelLabel: '취소',
  buttonConfirmLabel: '확인',
  onCancel: () => {},
  onConfirm: () => {}
})
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-30 wf-pb-20-important">
    <WelfareTitleModal title="배송지변경" class="wf-pt-10 wf-pb-15" classTitle=" wf_letter-spacing--0745 " @close="$props.onCancel" />
    <div class="wf_flex wf_flex-col wf-space-y-20 wf_width-full wf-mt-2">
      <div class="wf_width-full">
        <WelfareInput placeholder="홍길동" />
        <div class="wf_flex wf-mt-10">
          <WelfareButtonLine type="lg" class="wf_flex-1 wf_height-49 wf_min-width-initial" text="기본배송지" />
          <WelfareButtonLine lg-state="grey-line" type="lg" class="wf_flex-1 wf_height-49 wf_min-width-initial" text="신규배송지" />
          <WelfareButtonLine lg-state="grey-line" type="lg" class="wf_flex-1 wf_height-49 wf_min-width-initial" text="배송지목록" />
        </div>
      </div>

      <div class="wf_flex wf_flex-col wf-space-y-15">
        <div class="wf_flex wf_justify-between wf_width-full">
          <span class="wf-font_15--bold wf-color--g-333 wf-mt-2">홍길동 (회사) </span>
          <WelfareColorTag active text="기본배송지" />
        </div>
        <div class="wf-font_15--reg wf-color--g-333">
          <div class="">63235</div>
          <div class="wf-mt-5">서울시 강남구 논현로85길 46 메가존빌딩</div>
          <div class="wf-mt-5">10층 (역삼동 735-22, 메가존빌딩 10층)</div>
          <div class="wf-mt-5 wf_flex wf_justify-between wf-space-x-10 wf-font_13--reg wf-color--g-999 wf_width-fit">
            <span>010-1234-1234</span>
            <span>|</span>
            <span class="wf-ml--1">02-123-4567</span>
          </div>
        </div>
      </div>

      <div class="wf_flex wf_flex-col wf-space-y-10">
        <WelfareSelect placeholder="배송 메시지를 선택해 주세요" class="wf_letter-spacing--2-7 wf-mt-1" />
        <WelfareInput
          placeholder="직접 입력이 가능합니다. (한글 20자 이내)"
          class="wf_letter-spacing--1-15"
          class-wrap="wf-pt-2-important"
          :max-length="20"
        />
      </div>

      <div class="wf_flex wf_flex-col wf-space-y-10 wf-mb-1">
        <div class="wf_flex wf_items-center wf-space-x-5 wf-font_13--reg wf-color--g-777">
          <span>
            <IconDot />
          </span>
          <span>배송 메시지는 택배사/택배기사님에게 노출되는 메시지입니다.</span>
        </div>
        <div class="wf_flex wf_items-center wf-space-x-5 wf-font_13--reg wf-color--g-777">
          <span class="wf_height-18">
            <IconDot />
          </span>
          <span class="wf_line-height-17"
            >도서/제주지역은 상품에 따라 <span class="wf-color--red-ff-3-b-4-f">추가배송비, 배송불가</span> 안내가 있을 수 있습니다.</span
          >
        </div>
      </div>
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full">
      <WelfareButtonLine lg-state="grey-line" type="lg" class="wf_flex-1" :text="$props.buttonCancelLabel" @click="$props.onCancel" />
      <WelfareButtonLine type="lg" class="wf_flex-1" :text="$props.buttonConfirmLabel" @click="$props.onConfirm" />
    </div>
  </div>
</template>
