import { computed, ref, onMounted } from 'vue'
import { defaultTimeAlert } from '@/commons'
import { WelfareAlertProps } from '@/models/uikits/WelfareAlertTypes'
import { useAlert } from '@/composables/common/useAlert'

export const useAlertItem = (data: WelfareAlertProps, onClosed: () => void) => {
  const { closeAlert } = useAlert()
  const className = computed(() => {
    const classItem = {
      success: 'wf-bg--blue-4075-f-3',
      error: 'wf-bg--red-ff-3-b-4-f',
      information: 'wf-bg-primary'
    }
    return classItem[data.type]
  })

  const isHideAlert = ref(false)

  onMounted(() => {
    let defaultTime = defaultTimeAlert
    const timeOut = setInterval(() => {
      defaultTime -= 100
      if (defaultTime === 0) {
        isHideAlert.value = true
        clearInterval(timeOut)
        setTimeout(() => {
          handleClose()
        }, 200)
      }
    }, 100)
  })

  const handleClose = () => {
    closeAlert?.(data.id ?? '')
    onClosed()
  }
  return {
    className,
    handleClose,
    isHideAlert
  }
}
