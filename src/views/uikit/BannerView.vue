<script setup lang="ts">
import {
  ImgBanner,
  Banner342_85_1,
  Banner343_164,
  Banner375_180,
  Banner375_180_2,
  Banner343_85,
  Banner342_85_2,
  Banner375_85_3,
  Banner375_180_3,
  Banner375_180_4,
  Banner375_180_5,
  Banner_323_81,
  Banner_323_81_1
} from '@/assets/images'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareBannerImage from '@/components/uikit/banner/WelfareBannerImage.vue'
import WelfareCarouselMultipleBanner from '@/components/uikit/carousel/WelfareCarouselMultipleBanner.vue'
</script>

<template>
  <WelfareContainer title="BANNER">
    <div class="wf-mt--10">
      <div class="wf_flex">
        <div class="wf_ui-kit-title wf-mr-53">각종 배너 구좌</div>
        <div>
          <p class="wf-font_16--bold">활용법</p>
          <p class="wf_ui-kit-sub-title wf-mt-16">각종 카테고리에 사용된 배너 구좌를 바열합니다. 하나의 리소스로 다양한 구좌에 활용이 가능합니다.</p>
          <p class="wf_ui-kit-sub-title wf-mt-5">실제 원 소스는 정사이즈에서 3배수 이상 사용을 권장 합니다.</p>
        </div>
      </div>
      <hr class="wf_ui-kit-breake-line-BBB wf-mt-25" />
      <div class="wf_flex wf-mt-48">
        <div class="wf_w-642 wf_height-371">
          <div class="wf-pl-26">
            <WelfareCarouselMultipleBanner />
          </div>
        </div>
        <div class="wf_flex-1 wf-pl-58">
          <p class="wf_ui-kit-sub-title wf-mt-177">메인에 사용된 프로모션 구좌 입니다. 최대 5개 까지 노출 됩니다.</p>
        </div>
      </div>

      <div class="wf_flex wf_flex-row wf-mt-23 wf-space-x-58 wf-mb-87">
        <div class="wf_w-642 wf-pl-22">
          <div class="wf_flex wf_items-center">
            <div class="wf_width-343">
              <WelfareBannerImage :images="[ImgBanner]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*85</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-57">
            <div class="wf_width-323 wf_min-height-80-04">
              <WelfareBannerImage :images="Array.from({ length: 10 }).fill(Banner_323_81_1)" :hideAmount="false" />
            </div>
            <span class="wf-font_36--semi wf-pl-65">323*80.04</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-51">
            <div class="wf_width-323 wf_min-height-80-04">
              <WelfareBannerImage :images="Array.from({ length: 10 }).fill(Banner_323_81)" :hideAmount="false" />
            </div>
            <span class="wf-font_36--semi wf-pl-65">323*80.04</span>
          </div>
        </div>
        <div class="wf_flex-1 wf_ui-kit-sub-title">
          메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
        </div>
      </div>

      <div class="wf_ui-kit-line"></div>

      <div class="wf_flex wf_flex-row wf-mt-23 wf-space-x-58 wf-mt-60 wf-mb-46">
        <div class="wf_w-642 wf-pl-22">
          <div class="wf_flex wf_items-center">
            <div class="wf_width-343">
              <WelfareBannerImage :images="[Banner342_85_1]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*85</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-10">
            <div class="wf_width-343">
              <WelfareBannerImage :images="[Banner342_85_2]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*85</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-10">
            <div class="wf_width-343">
              <WelfareBannerImage :images="[Banner375_85_3]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*85</span>
          </div>
        </div>
        <div class="wf_flex-1 wf_ui-kit-sub-title">
          메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
        </div>
      </div>

      <div class="wf_ui-kit-line"></div>

      <div class="wf_flex wf_flex-row wf-space-x-58 wf-mt-52 wf-mb-46">
        <div class="wf_w-642 wf-pl-22">
          <div class="wf_flex wf_items-center">
            <div class="wf_width-343 wf_height-164-64">
              <WelfareBannerImage :images="[Banner343_164]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*164.64</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-40">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="Array.from({ length: 15 }).fill(Banner375_180)" :hideControlMedia="false" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-40">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="Array.from({ length: 15 }).fill(Banner375_180_2)" :hideControlMedia="false" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
        </div>

        <div class="wf_flex-1 wf_ui-kit-sub-title">
          메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
        </div>
      </div>

      <div class="wf_ui-kit-line"></div>

      <div class="wf_flex wf_flex-row wf-space-x-58 wf-mt-52 wf-mb-46">
        <div class="wf_w-642 wf-pl-22">
          <div class="wf_flex wf_items-center">
            <div class="wf_width-343 wf_min-height-85">
              <WelfareBannerImage classMediaControl="wf-pt-3 wf-pl-10" :images="Array.from({ length: 2 }).fill(Banner343_85)" :hideAmount="false" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">343*85</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-40">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="[Banner375_180_3]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
        </div>
        <div>
          <div class="wf_flex-1 wf_ui-kit-sub-title">
            메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
          </div>
          <div class="wf_flex-1 wf-mt-140 wf_ui-kit-sub-title">
            메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
          </div>
        </div>
      </div>

      <div class="wf_ui-kit-line"></div>

      <div class="wf_flex wf_flex-row wf-space-x-58 wf-mt-52 wf-mb-46">
        <div class="wf_w-642 wf-pl-22">
          <div class="wf_flex wf_items-center">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="[Banner375_180]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-40">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="[Banner375_180_4]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
          <div class="wf_flex wf_items-center wf-mt-40">
            <div class="wf_width-375 wf_height-180">
              <WelfareBannerImage :images="[Banner375_180_5]" />
            </div>
            <span class="wf-font_36--semi wf-pl-45">375*180</span>
          </div>
        </div>
        <div class="wf_flex-1 wf_ui-kit-sub-title">
          메인에 사용된 프로모션 구좌 입니다. <br />가장 큰 사이즈 배너를 리사이징 하여 사용할수 있습니다.
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
