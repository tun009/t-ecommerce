import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { VueDaumPostcodeCompleteResult } from 'vue-daum-postcode'
import { InvalidSubmissionContext, useForm } from 'vee-validate'

import { emailRegex, phoneWithCharacterRegex } from '@/commons/regex'

import { YesNoEnum } from '@/models/common'
import { AccountModel } from '@/models/services/responses/commons/AccountResponse'
import { ChangePasswordResponse } from '@/models/services/responses/member/MemberResponse'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { ChangeMemberInfoRequestModel } from '@/models/services/requests/member/MemberRequest'

import { useAccountStore } from '@/stores/account'

import { myPageEditMemberInfoApi } from '@/services/api/myPage/MyPageEditMemberInfo'

import { useModal } from '@/composables/common/useModal'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { useLoading } from '@/composables/common/useLoading'

import MyPageChangePasswordModal from '@/components/myPage/editMemberInfo/MyPageChangePasswordModal.vue'
import MyPageChangeAddressModal from '@/components/myPage/editMemberInfo/MyPageChangeAddressModal.vue'
import MyPageAgreeModal from '@/components/myPage/editMemberInfo/MyPageAgreeModal.vue'

// TODO: 다국어 적용

interface ChangePasswordParams {
  password: string
}

export const useMyPageEditMemberInfo = ({ csrfToken }: { csrfToken: string }) => {
  const accountStore = useAccountStore()
  const router = useRouter()
  const { t } = useI18n()

  const { account, handleSaveProfile } = reactive(accountStore)

  const { setLoading } = useLoading()
  const { showModal, closeModalByPop, closeAllModal } = useModal()
  const { openModal: showAlertModal, closeModalByPop: closeAlertModal } = useModalNotification()
  const { showModal: showBottomSheetModal, closeModal: closeBottomSheetModal } = useModalBottomSheet()

  // 벨리데이션 스키마
  const validationSchema = {
    cellphoneNumber: yup
      .string()
      .required(t('myPage.editMemberInfo.editMemberInfo.errorCellphone'))
      .matches(phoneWithCharacterRegex, t('myPage.editMemberInfo.editMemberInfo.errorCellphone')),
    email: yup
      .string()
      // .required(t('myPage.editMemberInfo.editMemberInfo.errorEmail'))
      .matches(emailRegex, t('myPage.editMemberInfo.editMemberInfo.errorEmail'))
    // deliveryDetailedAddress: yup.string().required(t('myPage.editMemberInfo.editMemberInfo.errorAddress')) // 요청에 의해 필수값이 아니도록 변경
  }

  // 벨리데이션 세팅
  const {
    values: memberInfo,
    setFieldValue: setMemberInfo,
    handleSubmit
  } = useForm({
    initialValues: { ...account } as AccountModel,
    validationSchema: yup.object(validationSchema)
  })

  // 약관 동의 체크박스 YN 리턴
  const getYn = (target: string): YesNoEnum => memberInfo.agreement[target].code

  // 약관 동의 체크박스 YN 세팅
  const setYn = (target: any, yn: YesNoEnum): void => {
    const targets = ['smsAgreeYn', 'emailAgreeYn', 'kakaoAgreeYn']
    const isMarketingAgree = target === 'marketingAgreeYn'

    const setData = (target: any, yn: YesNoEnum) =>
      setMemberInfo('agreement', {
        ...memberInfo.agreement,
        [target]: {
          code: yn,
          title: yn === 'Y' ? t('myPage.editMemberInfo.editMemberInfo.agreementY') : t('myPage.editMemberInfo.editMemberInfo.agreementN')
        }
      })

    setData(target, yn)

    isMarketingAgree // 마케팅 정보 수집 이용동의 변경 시
      ? targets.forEach((t) => setData(t, yn)) // 하위항목 전부 동일한 데이터로 변경
      : setData('marketingAgreeYn', (targets.some((v) => memberInfo.agreement[v].code === 'Y') ? 'Y' : 'N') as YesNoEnum) // 하위항목이 한개라도 Y일 경우 마케팅 정보 수집 이용동의도 Y로 변경, 외에는 N으로 변경
  }

  // 비밀번호 변경 요청
  const putChangePassword = async ({ password }: ChangePasswordParams): Promise<ChangePasswordResponse> => {
    const params = {
      password,
      csrfToken
    }
    const res = await myPageEditMemberInfoApi.putChangePassword(params)

    return res
  }

  // Alert 노출
  const handleShowAlert = (msg: string, callback?: () => void): void => {
    const action = callback || closeAlertModal

    showAlertModal?.({
      content: msg,
      buttonLabel: t('myPage.editMemberInfo.editMemberInfo.alertDone'),
      onAccept: action,
      onClose: action
    })
  }

  interface CellphoneCheckList {
    [key: string]: {
      allowCondition: boolean
      message: string
    }
  }

  // 전화번호 변경
  const handleCellphoneNumber = () => {
    const checkList: {
      [key: string]: {
        allowCondition: boolean
        message: string
      }
    } = {
      isEmpty: {
        allowCondition: !!memberInfo.cellphoneNumber,
        message: t('myPage.editMemberInfo.editMemberInfo.errorCellphone1')
      },
      isCorrect: {
        allowCondition: phoneWithCharacterRegex.test(memberInfo.cellphoneNumber),
        message: t('myPage.editMemberInfo.editMemberInfo.errorCellphone1')
      },
      isChanged: {
        allowCondition: account?.cellphoneNumber !== memberInfo.cellphoneNumber,
        message: t('myPage.editMemberInfo.editMemberInfo.errorCellphone2')
      }
    }

    const errKey = Object.keys(checkList).find((v: string) => !checkList[v]?.allowCondition)

    if (errKey) {
      handleShowAlert(checkList[errKey]?.message)
    } else {
      // TODO: PASS 앱 연동 가능한 시점 이후 추가 작업 필요.
      handleShowAlert('성공:: 추후 PASS 연동작업 필요')
    }
  }

  // 비밀번호 변경 요청 로직
  const handleChangePassword = async ({ password }: ChangePasswordParams) => {
    try {
      // setLoading?.(true)

      const { code, message } = await putChangePassword({ password })
      const isChanged = code === '0000'

      if (isChanged) closeAllModal?.()
      handleShowAlert(isChanged ? t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.saveAlertDone') : message || '')
    } catch (error: any) {
      handleShowAlert(error.data?.message || t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.saveFailAlertDone'))
    } finally {
      // setLoading?.(false)
    }
  }

  const handleChangeAddress = (data: VueDaumPostcodeCompleteResult) => {
    const { address, zonecode } = data

    setMemberInfo('deliveryZipCode', zonecode || '')
    setMemberInfo('deliveryLoadNameAddress', address || '')
    setMemberInfo('deliveryDetailedAddress', '')
  }

  //
  const handleShowChangePassword = (): void => {
    showModal?.({
      component: MyPageChangePasswordModal,
      props: {
        title: t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.title')
      },
      events: {
        onClose: closeModalByPop,
        onDone: handleChangePassword
      }
    })
  }

  const handleShowChangeAddress = (): void => {
    showBottomSheetModal?.({
      type: ModalBottomSheetType.click,
      component: MyPageChangeAddressModal,
      props: {
        title: t('myPage.editMemberInfo.editMemberInfo.changeAddressModal.title')
      },
      events: {
        onClose: closeBottomSheetModal,
        onDone: handleChangeAddress
      }
    })
  }

  const handleShowAgreement = (): void => {
    showModal?.({
      component: MyPageAgreeModal,
      props: {
        title: t('myPage.editMemberInfo.editMemberInfo.agreementModal.title')
      },
      events: {
        onClose: closeModalByPop
      }
    })
  }

  const handleValidFail = ({ errors }: InvalidSubmissionContext) => {
    const getErrorMsg = Object.values(errors)[0] || ''
    handleShowAlert(getErrorMsg)
  }

  const handleDone = handleSubmit(async (values, { resetForm }) => {
    const { email, deliveryZipCode, deliveryLoadNameAddress, deliveryDetailedAddress } = values
    const getAgreementYn = (key: string) => account?.agreement[key].code || 'N'
    const goMypageMain = () => {
      router.push('/my-page/main')
      resetForm()
    }
    const params: ChangeMemberInfoRequestModel = {
      csrfToken,
      email,
      deliveryZipCode, // api에 추가 예정
      deliveryLoadNameAddress, // api에 추가 예정
      deliveryDetailedAddress, // api에 추가 예정
      agreement: Object.keys(values.agreement).reduce((p, v) => ({ ...p, [v]: values?.agreement?.[v]?.code || 'N' }), {
        marketingAgreeYn: getAgreementYn('marketingAgreeYn'),
        emailAgreeYn: getAgreementYn('emailAgreeYn'),
        smsAgreeYn: getAgreementYn('smsAgreeYn'),
        kakaoAgreeYn: getAgreementYn('kakaoAgreeYn')
      })
    }

    try {
      setLoading?.(true)
      await myPageEditMemberInfoApi.putChangeMemberInfo(params) // 유저 정보 저장
      await handleSaveProfile() // 저장 성공 이후 유저 데이터 재조회 및 세팅

      handleShowAlert(t('myPage.editMemberInfo.editMemberInfo.saveAlertDone'), goMypageMain) // 저장 성공 이후 마이페이지 메인으로 이동
    } catch (error: any) {
      handleShowAlert(error.data?.message || t('myPage.editMemberInfo.editMemberInfo.saveFailAlertDone'))
      console.error(error)
    } finally {
      setLoading?.(false)
    }
  }, handleValidFail)

  return {
    getYn,
    setYn,
    memberInfo,
    setMemberInfo,
    handleCellphoneNumber,
    handleShowChangePassword,
    handleShowChangeAddress,
    handleShowAgreement,
    handleDone
  }
}
