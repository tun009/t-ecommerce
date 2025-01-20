import { useModalBottomSheet } from '../common/useModalBottomSheet'
import { SearchDetailRangeEmits, SearchDetailRangeProps } from '@/models/views/search/SearchDetailModel'
import { onMounted, ref, watch } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'
import { useHandleKeyPress } from '../common/useHandleKeyPress'
import { isAndroid, isIos, spaceRegex } from '@/commons'

export const useSearchDetailedPriceRange = (props: SearchDetailRangeProps, emits: SearchDetailRangeEmits) => {
  const { isShow } = useModalBottomSheet()
  const { openModal, closeModalByPop } = useModalNotification()
  const { t } = useI18n()

  const initValue = () => {
    return props.currentRange ?? [props.searchFilterInfo?.minPrice ?? 0, props.searchFilterInfo?.maxPrice ?? 0]
  }

  //Init value of slider and range max and min of slider price
  const range = ref<number[]>(initValue())
  const minValue = ref(props.searchFilterInfo?.minPrice ?? 0)
  const maxValue = ref(props.searchFilterInfo?.maxPrice ?? 0)
  const sliderRef = ref()
  const divSliderRef = ref<HTMLElement>()

  watch(
    () => props.currentRange,
    () => {
      range.value = initValue()
    }
  )

  watch([isShow], ([newValue]) => {
    if (!newValue) range.value = initValue()
  })

  //Focus last character on span
  const handleClickSpan = (event: Event) => {
    const spanHtml = event.target as HTMLSpanElement
    spanHtml.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (spanHtml) {
      const rangeSpan = document.createRange()
      const sel = window.getSelection()
      rangeSpan.setStart(spanHtml.childNodes[0], spanHtml.innerText.length)
      rangeSpan.collapse(true)
      sel?.removeAllRanges()
      sel?.addRange(rangeSpan)
      spanHtml.focus()
    }
  }

  //check mobile device then add css when focus tool tip to prevent keyboard cover input area
  onMounted(() => {
    if (isAndroid || isIos) {
      divSliderRef.value?.classList.add('wf-span-tooltip-focus')
    }
  })

  //emit values when press enter
  useHandleKeyPress(() => {
    closeModalByPop?.()
    emits('saveRange:methodRange', range.value)
  })

  const handleError = (spanHtml: HTMLSpanElement, indexToolTip: number) => {
    spanHtml.innerText = range.value[indexToolTip].toString()
    sliderRef.value?.setValue(range.value)
    closeModalByPop?.()
    openModal({ content: t('search.searchPriceRange.invalidRange') })
  }

  const handlePasteValue = (e: ClipboardEvent, indexToolTip: number) => {
    e.preventDefault()
    const spanHtml = e.target as HTMLSpanElement
    const pastedData = e.clipboardData?.getData('Text')
    spanHtml.innerText = pastedData?.trim() ?? spanHtml.innerText
    const valueOfSpan = Number(spanHtml.innerText)
    if (valueOfSpan > maxValue.value || isNaN(valueOfSpan)) {
      handleError(spanHtml, indexToolTip)
    }
  }

  const handleInputSpan = (event: Event, indexToolTip: number) => {
    const spanHtml = event.target as HTMLSpanElement
    if (!spanHtml) return
    const valueOfSpan = Number(spanHtml.innerText)
    if (isNaN(valueOfSpan)) {
      handleError(spanHtml, indexToolTip)
    }

    /* Check Range Of Price

      indexToolTip = 0: tooltip min
      indexToolTip = 1: tooltip max
      valueOfSpan > range.value[1]: validate tooltip min value
      valueOfSpan < range.value[0]: validate tooltip max value
      valueOfSpan > maxValue.value: validate max value
      valueOfSpan < minValue.value: validate min value
    */
    if (
      (indexToolTip === 0 && valueOfSpan > range.value[1]) ||
      (indexToolTip === 1 && valueOfSpan < range.value[0]) ||
      valueOfSpan > maxValue.value ||
      valueOfSpan < minValue.value
    ) {
      handleError(spanHtml, indexToolTip)
      return
    }

    range.value[indexToolTip] = valueOfSpan
    sliderRef.value?.setValue(range.value)
  }

  //Allow to input number and check if value of span is greater than max value then do not allow to input
  const rangeInputNumber = (event: KeyboardEvent | ClipboardEvent, indexToolTip: number) => {
    const spanHtml = event.target as HTMLSpanElement
    const valueOfSpan = Number(spanHtml.innerText)

    //remove space in span text
    if (spaceRegex.test(spanHtml.innerText)) {
      spanHtml.innerText = spanHtml.innerText.trim().replace(spaceRegex, '')
    }

    if (valueOfSpan > maxValue.value || isNaN(valueOfSpan)) {
      handleError(spanHtml, indexToolTip)
      return false
    }
    return true
  }

  return {
    range,
    minValue,
    maxValue,
    sliderRef,
    divSliderRef,
    handleClickSpan,
    handleInputSpan,
    initValue,
    rangeInputNumber,
    handlePasteValue
  }
}
