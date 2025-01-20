import { AUTH_LOGIN_ROUTER, FTC_LINK, MEGAZONE_LINK, POLICY_LINK, TERM_LINK } from '@/commons'
import { useAccountStore } from '@/stores/account'
import { ref, watch, reactive } from 'vue'

export const useFooterLayout = () => {
  const accountStore = useAccountStore()

  const select = ref()
  const footerLinks = reactive([
    {
      link: '',
      text: '고객센터'
    },
    {
      link: '',
      text: ''
    },
    {
      link: AUTH_LOGIN_ROUTER,
      text: !accountStore.isLogin ? '로그인' : '로그아웃'
    },
    {
      link: '',
      text: ''
    },
    {
      link: '',
      text: '앱알림설정'
    }
  ])
  const footerAboutLinks = [
    {
      link: MEGAZONE_LINK,
      text: '회사소개'
    },
    {
      link: FTC_LINK,
      text: '사업자정보확인'
    },
    {
      link: POLICY_LINK,
      text: '개인정보처리방침'
    },
    {
      link: TERM_LINK,
      text: '이용약관'
    }
  ]

  watch(
    () => accountStore.isLogin,
    () => {
      if (!accountStore.isLogin) {
        footerLinks[2].text = '로그인'
      } else {
        footerLinks[2].text = '로그아웃'
      }
    }
  )

  return { select, footerLinks, footerAboutLinks, logout: accountStore.logout }
}
