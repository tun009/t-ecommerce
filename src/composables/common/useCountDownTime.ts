import { ref, onUnmounted } from 'vue'

export const useCountDownTime = (totalTime: number, step = 1000) => {
  let timerVariableId: NodeJS.Timeout | null = null
  const times = ref(totalTime)
  const isPaused = ref(false)

  const stop = () => {
    if (timerVariableId) {
      clearInterval(timerVariableId)
      timerVariableId = null
      resume()
    }
  }

  const start = () => {
    stop()
    if (!timerVariableId) {
      timerVariableId = setInterval(() => {
        if (!isPaused.value) {
          if (times.value - step <= 0) {
            times.value = 0
            if (timerVariableId) {
              clearInterval(timerVariableId)
            }
          } else {
            times.value -= step
          }
        }
      }, step)
    }
  }

  const pause = () => {
    isPaused.value = true
  }

  const resume = () => {
    isPaused.value = false
  }

  const restart = () => {
    times.value = totalTime
    if (timerVariableId) {
      clearInterval(timerVariableId)
    }
    start()
  }

  onUnmounted(() => {
    if (timerVariableId) {
      clearInterval(timerVariableId)
    }
  })

  return {
    start,
    stop,
    pause,
    resume,
    isPaused,
    times,
    totalTime,
    restart
  }
}
