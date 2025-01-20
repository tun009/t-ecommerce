import { execDaumPostcode, handleClickOutsideIframe, mountDaumCode } from '@/commons/daumPostCodeUltils'
import { DaumPostcodeSearchResponse } from '@/models/services/responses/commons/DaumPostcodeSearchResponse'
import { FormAddressEmits } from '@/models/widgets/form/FormAddressModel'
import { onMounted, ref } from 'vue'

export const useFormSearchAddress = (emits: FormAddressEmits) => {
  const wfDaumLayer = ref()
  const refModal = ref()

  const isDisplayIframe = ref(false)

  const handleEmitData = (data: DaumPostcodeSearchResponse) => {
    refModal.value.style.display = 'none'
    emits('update:modelValue', {
      address: {
        basicRoad: data.roadAddress,
        basicJibun: data.autoJibunAddress !== '' ? data.autoJibunAddress : data.jibunAddress,
        zipCode: data.zonecode,
      }
    })
  }

  onMounted(() => {
    mountDaumCode()
  })

  const closeDaumPostcode = () => {
    wfDaumLayer.value.style.display = 'none'
    refModal.value.style.display = 'none'
  }

  const handleClickOutside = (event: Event) => {
    handleClickOutsideIframe(closeDaumPostcode, wfDaumLayer, event)
  }

  const handleExecDaumPostcode = () => {
    refModal.value.style.display = 'flex'
    execDaumPostcode(wfDaumLayer, handleEmitData)
  }
  return {
    closeDaumPostcode,
    wfDaumLayer,
    handleClickOutside,
    isDisplayIframe,
    handleExecDaumPostcode,
    refModal
  }
}
