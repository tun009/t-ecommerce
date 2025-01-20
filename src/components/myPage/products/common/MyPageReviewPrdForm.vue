<script setup lang="ts">
import { useMyPageReviewPrd } from '@/composables/myPage/useMyPageReviewPrd'
import WelfareStarRating from '@/components/uikit/score/WelfareStarRating.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageFileInput from '@/components/myPage/common/MyPageFileInput.vue'
import MyPageProductReviewPreview from '@/components/myPage/products/review/MyPageProductReviewPreview.vue'
import { MyProductReviewFileResponses } from '@/models/views/myPage/MyPageProductReview'
import { computed } from 'vue'
import { getImageOrderFullPath } from '@/commons'
interface MyPageReviewPrdForm {
  review?: string
  reviewStarPoint?: number
  productReviewFileResponses?: MyProductReviewFileResponses[]
}

const { review, reviewStarPoint, productReviewFileResponses } = withDefaults(defineProps<MyPageReviewPrdForm>(), {})

const { textLength, productReviewRequest, isEdit, saveProcess, handleClickRating, uploadReviewFile, removeFile, previewFiles } = useMyPageReviewPrd({
  review,
  reviewStarPoint
})
const previewData = computed(() => {
  return isEdit
    ? productReviewFileResponses?.map(({ attachFileType, reviewFullPath }) => {
        return {
          type: attachFileType === '02' ? 'video' : 'image',
          src: getImageOrderFullPath(reviewFullPath)
        }
      })
    : previewFiles.value
})
</script>
<template>
  <div class="wf-py-20 wf-px-16">
    <div class="prd-container wf-br--g-e-7 wf-br-b-1">
      <div class="prd-title">
        <span class="wf-font_15--reg">{{ $t('myPage.reviewForm.starTitle') }}</span>
      </div>
      <div class="prd-star_box"><WelfareStarRating :rating="productReviewRequest.reviewStarPoint" @handleClickRating="handleClickRating" /></div>
      <div class="prd-content">
        <div class="textarea-box">
          <textarea maxlength="200" :placeholder="$t('myPage.reviewForm.placeholder')" v-model="productReviewRequest.review" />
          <p>
            <span>{{ textLength }}</span>
            <span>/200</span>
          </p>
        </div>
      </div>

      <div class="prd-desc">
        <p>{{ $t('myPage.reviewPolicy.description3') }}</p>
        <p>{{ $t('myPage.reviewPolicy.description4') }}</p>
      </div>
    </div>
    <div class="prd-media-box">
      <div class="prd-media-picture">
        <MyPageFileInput
          :is-disabled="!!isEdit"
          :label="$t('myPage.reviewForm.mediaText1')"
          :type="'image'"
          :id="'upload-image'"
          @handle-img-upload="uploadReviewFile"
        />
        <span class="wf-font_13--reg"> {{ $t('myPage.reviewForm.mediaDesc1') }}</span>
      </div>
      <div class="prd-media-video">
        <MyPageFileInput
          :is-disabled="!!isEdit"
          :label="$t('myPage.reviewForm.mediaText2')"
          :type="'video'"
          :id="'upload-video'"
          @handle-img-upload="uploadReviewFile"
        />
        <span class="wf-font_13--reg">{{ $t('myPage.reviewForm.mediaDesc2') }}</span>
      </div>
    </div>

    <MyPageProductReviewPreview v-if="previewData && previewData?.length > 0" :data="previewData" :is-edit="isEdit" @remove-file="removeFile" />

    <div class="prd-footer">
      <WelfareButtonLine type="lg" :text="$t('button.registration')" @click="saveProcess" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-write.scss');
</style>
