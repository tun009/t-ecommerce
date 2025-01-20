<script setup lang="ts">
import { reactive, computed } from 'vue'

import { useMyPageCheckPassword } from '@/composables/myPage/useMyPageCheckPassword' // check password hook

import { UseMyPageCheckPasswordModel } from '@/models/views/myPage/MyPageEditMemberInfo' // hook type

import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue' // header component
import MyPageCheckPassword from '@/components/myPage/editMemberInfo/MyPageCheckPassword.vue' // check password component
import MyPageEditInfo from '@/components/myPage/editMemberInfo/MyPageEditInfo.vue' // edit info component

const hookMyPageCheckPassword = reactive<UseMyPageCheckPasswordModel>(useMyPageCheckPassword())

const currentPage = computed(() => (hookMyPageCheckPassword.isCheckPassword ? MyPageEditInfo : MyPageCheckPassword)) // 비밀번호 확인 여부에 따른 페이지 분기
const pageTitle = computed(() => `myPage.editMemberInfo.${hookMyPageCheckPassword.isCheckPassword ? 'editMemberInfo' : 'checkPassword'}.title`) // 비밀번호 확인 여부에 따른 페이지 타이틀 분기
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :title="$t(pageTitle)" display-back-icon />
    <component :is="currentPage" :hookMyPageCheckPassword="hookMyPageCheckPassword" />
  </div>
</template>
