import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useHandleResponsePagination } from '../common/useHandleResponsePagination'
import { HomeProductMdModel } from '@/models/views/home/HomeGnbProductModel'
import { homeApi } from '@/services/api/home/HomeGnbApi'

export const useProductRankedListOfBest = () => {
  const productMd = ref<HomeProductMdModel>()
  const listBox2Tab = ref<WelfareTabDataType[]>([
    {
      id: '1',
      label: '전체'
    },
    {
      id: '2',
      label: '반찬류'
    },
    {
      id: '3',
      label: '수산'
    },
    {
      id: '4',
      label: '곡물'
    },
    {
      id: '5',
      label: '과일'
    },
    {
      id: '6',
      label: '김치'
    }
  ])

  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: Array.from({ length: 10 })
        })
      }, 300)
    })
  }

  const { data, handleLoadMore, refresh } = useHandleResponsePagination(fetchData)

  onMounted(() => {
    refresh()
  })

  onBeforeMount(() => {
    homeApi
      .getListProductMd()
      .then((data) => {
        productMd.value = data.data
      })
      .catch(() => {})
  })

  const load = () => {
    try {
      handleLoadMore()
    } catch (err) {
      console.log(err)
    }
  }
  return { listBox2Tab, data, handleLoadMore, refresh, productMd, load }
}
