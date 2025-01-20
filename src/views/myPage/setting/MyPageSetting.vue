<!-- FO_MC_MY082001-->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareButtonSimple from '@/components/uikit/button/WelfareButtonSimple.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import IconArrowRightLink from '@/components/icons/IconArrowRightLink.vue'
import { useMyPageSetting } from '@/composables/myPage/useMyPageSetting'
import { defaultColor } from '@/commons'

const { accountStore, account, notificationEnabled, checkUserAgent, settingData, toggleNotification } = useMyPageSetting()

</script>

<template>
  <WelfareTitleTextStickyTop :displayBackIcon="true" :title="$t('myPage.setting.title')" class="wf-px-20--i"/>
  <!-- 아이디 -->
  <div class="wf_flex wf_justify-between wf_items-center wf-px-16 wf-p-20">
     <template v-if="account?.memberId">
        <div>{{ account.memberId }}</div>
    </template>
    <template v-else>
        <div class="wf-font_15--reg wf-color--g-999">{{ $t('myPage.setting.loginRequest') }}</div>
    </template>
    <WelfareButtonSimple type="md" :text="account?.memberId ? $t('myPage.setting.logout') : $t('myPage.setting.login')" class="inquiry_box" @click="accountStore.logout()" />
  </div>
  <WelfareLineHorizontal />
  <template v-if="checkUserAgent">
    <!-- 자동로그인 -->
    <template v-if="settingData.autoLogin">
      <div class="wf-px-16 wf-p-20">
        <div class="wf-font_17--bold wf-pb-15">{{ $t('myPage.setting.autoLogin.title') }} <span class="wf-color--red-ff-3-b-4-f">ON</span></div>
        <div class="wf-font_15--reg wf_line-height-20 wf-color--g-555" v-html="$t('myPage.setting.autoLogin.description')"></div> 
      </div>
      <WelfareLineHorizontal />
    </template>
    <!-- 앱알림 -->
    <div class="wf-px-16 wf-p-20">
      <div class="wf-pb-25 wf_flex wf_justify-between wf_items-center">
        <div class="wf-font_17--bold">{{ $t('myPage.setting.appAlarm.title') }}</div>
        <div>
        <input
          id="notification-toggle"
          type="checkbox"
          class="toggle-checkbox"
          v-model="notificationEnabled"
          @change="toggleNotification"
        />
        <label class="toggle-label" for="notification-toggle">{{ $t('myPage.setting.appAlarm.label') }}</label>
        </div>
      </div>
      <ul class="wf-font_15--reg wf_line-height-20 wf-color--g-555">
        <li class="wf-pb-15">
          <div class="wf_flex wf_items-start wf-ml--3">
            <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
            <span>{{ $t('myPage.setting.appAlarm.description1') }}</span>
          </div>
        </li>
        <li class="wf-pb-15">
          <div class="wf_flex wf_items-start wf-ml--3">
            <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
            <span>{{ $t('myPage.setting.appAlarm.description2') }}</span>
          </div>
        </li>
        <li>
          <div class="wf_flex wf_items-start wf-ml--3">
            <span class="wf-mr-4 wf-color--g-777 wf-mt--6">.</span>
            <span>{{ $t('myPage.setting.appAlarm.description3') }}</span>
          </div>
        </li>
      </ul>
    </div>
    <WelfareLineHorizontal />
    <!-- 간편결제 -->
    <!-- <div class="wf-px-16 wf-p-20">
      <div class="wf-pb-20 wf-font_17--bold">{{ $t('myPage.setting.easyPayment.title') }}</div>
      <div class="wf_flex wf_justify-between wf_items-center">
        <div class="wf-font_15--reg wf-color--g-555 wf_line-height-20">{{ $t('myPage.setting.easyPayment.description1') }}</div>
        <WelfareButtonLine class="wf_width-62" type="sm" :text="$t('myPage.setting.easyPayment.modifyRegistration')" />
      </div>
    </div> -->
    <!-- <WelfareLineHorizontal /> -->
    <!-- 앱 접근 권한 -->
    <div class="wf-px-16 wf-p-20">
      <div class="wf-pb-20 wf_flex wf_justify-start wf_items-center">
        <div class="wf-font_17--bold wf-mr-10">{{ $t('myPage.setting.appAccessPermissions.title') }}</div>
        <IconArrowRightLink :height="12" :color="defaultColor.gray1" />
      </div>
      <div class="wf-font_15--reg wf-color--g-555 wf_line-height-20">{{ $t('myPage.setting.appAccessPermissions.description1') }}</div>
    </div>
    <WelfareLineHorizontal />
    <!-- 버전 정보 -->
    <div class="wf-px-16 wf-p-20">
      <div class="wf-pb-20 wf-font_17--bold">{{ $t('myPage.setting.versionInformation.title') }}</div>
      <div class="wf_flex wf_justify-between wf_items-center">
        <div class="wf-font_15--reg wf-color--g-555 wf_line-height-20 wf_flex wf_justify-between wf_items-center">
          <div class="wf-font_17--reg wf-color--red-ff-3-b-4-f">v1.7.7</div>
          <div class="wf-mx-10 wf-color--g-bbb"> | </div>
          <div class="wf-font_15--reg">{{ $t('myPage.setting.versionInformation.description1') }}: v{{ settingData.appVersion }}</div>
        </div>
        <WelfareButtonLine class="wf_width-62" type="sm" :text="$t('myPage.setting.versionInformation.update')" />
      </div>
    </div>
    <WelfareLineHorizontal />
  </template>
  <!-- 회원 탈퇴 -->
  <!-- <div class="wf-px-16 wf-p-20">
    <div class="wf-pb-20 wf_flex wf_justify-start wf_items-center">
      <div class="wf-font_17--bold wf-mr-10">{{ $t('myPage.setting.membershipWithdrawal.title') }}</div>
      <IconArrowRightLink :height="12" :color="defaultColor.gray1" />
    </div>
  </div> -->
</template>

<style scoped>
.toggle-checkbox {
  display: none;
}

.toggle-label {
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: #ddd;
  transition: all .15s cubic-bezier(0, 0, 0.2, 1);
  border-radius: 30px;
  position: relative;
  text-indent: -9999px;
}

.toggle-label:before {
  content: '';
  position: absolute;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: white;
  top: 50%;
  left: 3px;
  transition: all .3s cubic-bezier(0, 0, 0.2, 1);
  transform: translateY(-50%);
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #1f1f1f;
}

.toggle-checkbox:checked + .toggle-label:before {
  left: calc(100% - 22px);
}
</style>