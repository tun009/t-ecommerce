import { formatTimeWithDot } from '@/commons'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { HomeTermOfUseDetailModel, HomeTermOfUseModel, HomeTermOfUseType } from '@/models/views/home/HomeTermOfUseModel'
import { homePageTermOfUseApi } from '@/services/api/home/HomePageTermOfUseApi'
import { onBeforeMount, ref } from 'vue'

export const useHomePageTermOfUse = (type: HomeTermOfUseType) => {
  const dataSelectTerms = ref<WelfareSelectDataModel[]>([])
  const selectedOption = ref<WelfareSelectDataModel>()
  const dataTermDetail = ref<HomeTermOfUseDetailModel>()

  const fetchDataDetail = async (key: number | string) => {
    const res = await homePageTermOfUseApi.getDetailTermOfUse(key)
    dataTermDetail.value = res.data
  }
  const mappingOption = (option: HomeTermOfUseModel) => {
    return {
      label: `${option.effectiveDate ? formatTimeWithDot(option.effectiveDate) : ''} ${option.termsName}`,
      value: option.termsKey
    }
  }

  onBeforeMount(() => {
    homePageTermOfUseApi
      .getListTermOfUse(type)
      .then((term) => {
        fetchDataDetail(term.data[0].termsKey)
        dataSelectTerms.value = term.data.map((item) => {
          return mappingOption(item)
        })
        selectedOption.value = mappingOption(term.data[0])
      })
      .catch(() => {})
  })

  return { dataSelectTerms, selectedOption, dataTermDetail, fetchDataDetail }
}
