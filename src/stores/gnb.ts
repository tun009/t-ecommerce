import { onBeforeMount, ref } from 'vue'
import { defineStore } from 'pinia'
import { HomeGNBModel, HomeGNBType } from '@/models/views/home/HomeGnbProductModel'
import { useLoading } from '@/composables/common/useLoading'
import { homeApi } from '@/services/api/home/HomeGnbApi'
import { HOMEPAGE_ROUTER } from '@/commons'

export const useGNBStore = defineStore('fo-gnb', () => {
  const { setLoading } = useLoading()
  const listGNBData = ref<HomeGNBModel[]>([])

  onBeforeMount(() => {
    getGNBHome()
  })

  const getGNBHome = async () => {
    try {
      setLoading?.(true)
      const data = await homeApi.getListGNBHome()
      listGNBData.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading?.(false)
    }
  }

  const getIndexByType = (type: HomeGNBType) => {
    if (listGNBData.value) {
      return listGNBData.value.findIndex(i => i.gnbGroupType == type)
    }
    return -1
  }

  const getLinkRedirectTo = (type: HomeGNBType) => {
    const index = getIndexByType(type)
    return `${HOMEPAGE_ROUTER}?idx=${index}`
  }

  return {
    listGNBData,
    getIndexByType,
    getLinkRedirectTo
  }
})
