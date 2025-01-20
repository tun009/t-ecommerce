import { AuthSearchCompanyType } from '@/models/auth/AuthModel'
import { ref } from 'vue'
import { useDebounce } from '../common/useDebounce'
import { authApi } from '@/services/api/auth/AuthApi'
import { AuthSearchCompanyModelRequest } from '@/models/services/requests/auth/AuthLoginRequest'
import { AuthSearchCompanyData } from '@/models/services/responses/auth/AuthLoginResponse'
import { useRouter } from 'vue-router'
import { AUTH_LOGIN_ROUTER, LOGIN_PARAM_CUSTOMER_KEY } from '@/commons'
import { useBuildLink } from '../common/useBuildLink'

export const useAuthLoginCompanyForm = () => {
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { debounce } = useDebounce()
  const type = ref(AuthSearchCompanyType.name)
  const showCompanies = ref<boolean>(false)
  const keyword = ref<string>('')
  const companySelected = ref<AuthSearchCompanyData>()
  const companies = ref<AuthSearchCompanyData[]>([])

  const handleChangeType = (typeSearch: AuthSearchCompanyType) => {
    type.value = typeSearch
    handleReset()
  }

  const handleClickItem = (value: AuthSearchCompanyData) => {
    companySelected.value = value
    keyword.value = (type.value === AuthSearchCompanyType.name ? value.customerName : value.customerDomainUrl) ?? ''
    showCompanies.value = false
  }

  const handleChangeShowCompanies = (value: boolean) => {
    showCompanies.value = value
  }

  const handleSearch = (keywordInput: string) => {
    keyword.value = keywordInput
    debounce(() => {
      if (keywordInput.length == 0) {
        handleReset()
      } else {
        showCompanies.value = true
        const request: AuthSearchCompanyModelRequest = {
          searchType: type.value,
          searchWord: keywordInput
        }
        authApi
          .searchCompanies(request)
          .then((response) => {
            companies.value = response.data
            companySelected.value = undefined
          })
          .catch(() => {})
      }
    })
  }

  const handleToLogin = () => {
    if (companySelected.value) {
      router.push(processLink(AUTH_LOGIN_ROUTER + '?customerKey=' + (companySelected.value?.customerKey ?? LOGIN_PARAM_CUSTOMER_KEY)))
    }
  }

  const handleReset = () => {
    companies.value = []
    keyword.value = ''
    companySelected.value = undefined
    showCompanies.value = false
  }

  return {
    type,
    keyword,
    companies,
    companySelected,
    handleChangeType,
    handleClickItem,
    handleSearch,
    showCompanies,
    handleChangeShowCompanies,
    handleToLogin
  }
}
