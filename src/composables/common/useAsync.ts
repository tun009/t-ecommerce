import { reactive, ref, Ref } from 'vue'
import { BaseModelResponse, ListeModelResponse } from '@/models/services/responses/BaseModelResponse'

interface UseAsyncOptions<T> {
  apiCall: () => Promise<BaseModelResponse<T>> | Promise<ListeModelResponse<T>>
}

export default function useAsync<T>({ apiCall }: UseAsyncOptions<T>) {
  const loading = ref(true)
  const error = ref<Error | null>(null)
  const data: Ref<T | null> = ref(null)
  const code = ref('')
  const pageInfo = reactive({
    pageNum: 0,
    totalCount: 0
  })
  const fetchData = async () => {
    try {
      loading.value = true
      const response = await apiCall()
      data.value = response.data as T
      if (response.code) {
        code.value = response.code
      }
      if ('page' in response) {
        pageInfo.pageNum = response.page?.pageNum || 0
        pageInfo.totalCount = response.page?.totalCount || 0
      }
      return data
    } catch (e) {
      console.error(e)
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  return {
    fetchData,
    data,
    error,
    loading,
    code,
    pageInfo
  }
}
