import { MyPageOrderCalendarMonthEmits, MyPageOrderCalendarMonthProps } from '@/models/views/myPage/MyPageMainMemberModel'
import { ref, computed } from 'vue'

export const useMyPageOrderCalendarMonth = (props: MyPageOrderCalendarMonthProps, emits: MyPageOrderCalendarMonthEmits) => {
  const defaultDate = new Date()
  const defaultMonth = defaultDate.getMonth() + 1
  const defaultYear = defaultDate.getFullYear()

  const currentYear = ref(props.year ? +props.year : defaultYear)
  const currentMonth = ref(props.month ? +props.month : defaultMonth)

  const isDisabledPre = computed(() => {
    return +currentYear.value <= defaultYear - 3
  })

  const isDisabledNext = computed(() => {
    return currentYear.value === defaultYear
  })

  const handleSave = () => {
    emits('save', { year: currentYear.value.toString(), month: currentMonth.value.toString() })
    emits('close')
  }

  return {
    currentYear,
    currentMonth,
    defaultYear,
    isDisabledPre,
    isDisabledNext,
    handleSave,
    defaultMonth
  }
}
