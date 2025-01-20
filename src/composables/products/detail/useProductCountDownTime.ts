import { onMounted } from 'vue'
import { useCountDownTime } from './../../common/useCountDownTime'
import { timeProductStartCountDown } from '@/commons'
// if the time of the product is less than 3600 then countdown it
export const useProductCountDownTime = (time: string) => {
  if (+time >= timeProductStartCountDown) return { times: { value: 0 } }
  const { times, start } = useCountDownTime(+time)

  onMounted(() => {
    start()
  })

  return {
    times
  }
}
