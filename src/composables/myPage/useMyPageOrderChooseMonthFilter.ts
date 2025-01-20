import MyPageOrderCalendarMonth from '@/components/myPage/common/MyPageOrderCalendarMonth.vue'
import { MyPageOrderChooseMonthFilterEmits, MyPageOutputCalenderChooseMonthModel } from '@/models/views/myPage/MyPageMainMemberModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalBottomSheet } from '../common/useModalBottomSheet'
import { useModalNotification } from '../widgets/modal/useModalNotification'

export const useMyPageOrderChooseMonthFilter = (emits:MyPageOrderChooseMonthFilterEmits) => {
  const defaultDate = new Date()
  const defaultMonth = (defaultDate.getMonth() + 1).toString()
  const defaultYear = defaultDate.getFullYear().toString()

  const fromDate = reactive<MyPageOutputCalenderChooseMonthModel>({
    month: defaultMonth,
    year: defaultYear
  })
  const toDate = reactive<MyPageOutputCalenderChooseMonthModel>({
    month: defaultMonth,
    year: defaultYear
  })
  const currentState = ref(1)
  const { t } = useI18n()

  const { showModal, closeModal } = useModalBottomSheet()
  const { openModal, closeModalByPop } = useModalNotification()
  const isShowAboutTime = ref(false)
  const handleShowCalendarStart = () => {
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: MyPageOrderCalendarMonth,
      props: {
        type: 'start',
        month: fromDate.month,
        year: fromDate.year
      },
      events: {
        save: (data: MyPageOutputCalenderChooseMonthModel) => {
          fromDate.year = data.year
          fromDate.month = data.month
        },
        close: closeModal
      }
    })
  }

  const handleShowCalendarEnd = () => {
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: MyPageOrderCalendarMonth,
      props: {
        type: 'end',
        month: toDate.month,
        year: toDate.year
      },
      events: {
        save: (data: MyPageOutputCalenderChooseMonthModel) => {
          toDate.year = data.year
          toDate.month = data.month
        },
        close: closeModal
      }
    })
  }

  const handleClickButton = (value: number) => {
    currentState.value = value
    if (value === -1) {
      isShowAboutTime.value = true
      return
    }
    isShowAboutTime.value = false
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const toMonth = currentMonth.toString()
    const toYear = currentDate.getFullYear().toString()
    const monthPre = currentMonth - value > 0 ? currentMonth - value : 12 - value
    const yearPre = currentMonth - value <= 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()
    emits('save', {
      fromDate: {
        month: monthPre.toString(),
        year: yearPre.toString()
      },
      toDate: {
        month: toMonth,
        year: toYear
      },
      state: value
    })
    // emits('close')
  }

  const stringFromDate = computed(() => {
    return fromDate.month && fromDate.year ? `${fromDate.year}.${`00${fromDate.month}`.slice(-2)}` : '시작일'
  })

  const stringToDate = computed(() => {
    return toDate.month && toDate.year ? `${toDate.year}.${`00${toDate.month}`.slice(-2)}` : '시작일'
  })

  const handleSaveAboutTime = () => {
    if (!fromDate.month || !fromDate.year || !toDate.month || !toDate.year) {
      openModal({
        content: t('message.emptyDate'),
        onAccept: closeModalByPop
      })

      return
    }

    if (Number(`${fromDate.year}${fromDate.month}`) > Number(`${toDate.year}${toDate.month}`)) {
      openModal({
        content: t('message.fromDateGreaterThanToDate'),
        onAccept: closeModalByPop
      })

      return
    }
    emits('save', {
      fromDate,
      toDate,
      state: -1
    })
    // emits('close')
  }

  return {
    fromDate,
    toDate,
    handleShowCalendarStart,
    handleShowCalendarEnd,
    handleClickButton,
    isShowAboutTime,
    stringFromDate,
    stringToDate,
    handleSaveAboutTime,
    currentState
  }
}
