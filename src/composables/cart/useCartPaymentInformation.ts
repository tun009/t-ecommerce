import { CartPaymentInformationProps } from '@/components/cart/CartPaymentInformation.vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'
import { YesNoEnum } from '@/models/common'
import { useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { ORDER_PRODUCT_ROUTER } from '@/commons'

export const useCartPaymentInformation = (props: CartPaymentInformationProps) => {
  const { t } = useI18n()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { openModal: openNotification, closeAllModal } = useModalNotification()

  const handleClickOrderProducts = (cartKey: number, cartProductKeys: number[]) => {
    // NOTE: Check is order the first since register account => Go to screen confirm information (Spec out)
    // NOTE: Check If contains a product that cannot purchased by people under 19 year olds
    if (props.selectedProducts.find((product) => product.adultCertificationProductYn === YesNoEnum.Y)) {
      openModalComingSoon(t('cart.modalText.ageVerify'))
    } else {
      router.push(processLink(`${ORDER_PRODUCT_ROUTER}?member=yes&cartKey=${cartKey}&cartProductKeys=${cartProductKeys}`))
    }
  }

  const openModalComingSoon = (text: string) => {
    openNotification({
      content: text,
      onAccept() {
        closeAllModal?.()
      },
      onClose() {
        closeAllModal?.()
      }
    })
  }

  return {
    handleClickOrderProducts
  }
}
