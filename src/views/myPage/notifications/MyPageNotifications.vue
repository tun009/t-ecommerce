<!-- FO_MC_MY091001-->
<script setup lang="ts">
import { defaultColor } from '@/commons'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareButtonSimple from '@/components/uikit/button/WelfareButtonSimple.vue'
import IconMessageMyPage from '@/components/icons/myPage/IconMessageMyPage.vue'
import WelfareFormTitle from '@/components/uikit/form/WelfareFormTitle.vue'

</script>

<template>
  <WelfareTitleTextStickyTop :displayBackIcon="true" :title="$t('myPage.notifications.title')" class="wf-px-20--i"/>
  <div class="wf-px-16 wf-p-20">
    <ul class="wf_line-height-20">
      <li class="wf-pb-15">
        <div class="wf_flex wf_items-start wf-ml--3">
          <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
          <span class="wf-font_13--reg wf-color--g-555">{{ $t('myPage.notifications.instructions1') }}</span>
        </div>
      </li>
      <li>
        <div class="wf_flex wf_items-start wf-ml--3">
          <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
          <span class="wf-font_13--reg wf-color--g-555">{{ $t('myPage.notifications.instructions2') }}</span>
        </div>
      </li>
    </ul>
  </div>
  <WelfareLineHorizontal />
  <div class="wf-px-16 wf-py-16">
    <div class="wf-bg--3-f-5-f-6-fa wf-px-50 wf-py-30 wf_flex wf_items-center md-column">
      <div class="wf-pb-15">
        <IconMessageMyPage :width="23" :height="21" :color="defaultColor.gray1"/>
      </div>
      <p class="wf-font_21--bold wf-pb-13">{{ $t('myPage.notifications.appNotificationSettingsGuide1') }}</p>
      <p class="wf-font_15--reg wf-color--g-333 wf_line-height-20 wf-pb-20" v-html="$t('myPage.notifications.appNotificationSettingsGuide2')"></p>
      <router-link to="/my-page/setting" class="wf_button-action wf_myPage-hover-link">
        <WelfareButtonSimple type="md" text="앱알림 설정 바로가기" class="inquiry_box" @click="() => { }" />
      </router-link>
    </div>
  </div>
  <WelfareLineHorizontal />
  <div class="wf-px-16 wf-py-20">
    <div class="wf-pb-15 wf-font_15--reg wf-color--g-999">
      11.25 18:45
    </div>
    <WelfareFormTitle title="푸쉬알림 제목을 노출합니다." :required="false" class="wf_block wf-pb-10"/>
    <div class="wf-font_15--reg wf-color--g-333 wf-pb-20">
      내용을 노출합니다. 내용을 노출합니다. <br/>
      내용을 노출합니다. 내용을 노출합니다. 
    </div>
    <div class="wf-border-width-b-1 wf-br--g-e-7  wf-pb-18">
      <img src="/src/assets/images/banner-343x164.png" alt="image" />
    </div> 
  </div>
</template>