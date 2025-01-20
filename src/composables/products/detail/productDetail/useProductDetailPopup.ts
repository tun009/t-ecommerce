import { useModal } from '@/composables/common/useModal'
import ProductDetailPointInfoModal from '@/views/products/detail/modal/ProductDetailPointInfoModal.vue'
import ProductDetailAdditionalShippingCostInformationModal from '@/views/products/detail/modal/ProductDetailAdditionalShippingCostInformationModal.vue'
import ProductDetailInterestFreeInstallmentMonthInfoModal from '@/views/products/detail/modal/ProductDetailInterestFreeInstallmentMonthInfoModal.vue'
import ProductDetailExchangeReturnByCategoryModal from '@/views/products/detail/modal/ProductDetailExchangeReturnByCategoryModal.vue'
import { orderApi } from '@/services/api/order/OrderApi'
import { onMounted, ref } from 'vue'
import { memberApi } from '@/services/api/member/memberApi'
export const useProductDetailPopup = () => {
  const islandOne = ref<number>()
  const islandTwo = ref<number>()
  const clothes = [
    '상품을 착용하였거나 세탁, 수선한 경우 반품이 불가합니다.',
    '일부 세트 상품의 부분 반품 및 교환이 불가합니다.',
    '상품특성상 측정방법에 따라 표기된 사이즈의 오차가 있을 수 있습니다.',
    '인터넷 판매의 특성상 수선 서비스가 불가합니다.',
    '일부상품은 트러블 발생 시 소견서, 진료 확인서 중 1가지를\n 첨부하셔야 반품이 가능합니다.\n (단, 기타 제반 비용은 고객님의 부담입니다.)'
  ]

  const cosmetics = [
    '일부상품은 트러블 발생 시 소견서, 진료 확인서 중 1가지를\n 첨부하셔야 반품이 가능합니다.\n (단, 기타 제반 비용은 고객님의 부담입니다.)',
    '치료비 지급은 해당 상품과의 인과관계가 성립되어야 하며 자의로 행한 성형, 미용관리 목적으로 인한 경우에는 지급하지 않습니다.',
    '일부 화장품은 특정 고객님의 피부에 맞지 않을 수 있으며, 이는 상품자체 품질의 문제로 볼 수 없습니다.',
    '인터넷 판매의 특성상 수선 서비스가 불가합니다.',
    '일부 상품의 경우 보호씰 또는 내부 포장 제거 시 반품이 불가합니다.'
  ]

  const stuff = [
    '상품을 사용 또는 착용하였을 경우 반품이 불가합니다.',
    '상품에 주름 및 형태의 변형이 있거나 상품 표면에 스크래치가 생긴 경우 반품이 불가합니다.',
    '상품특성상 측정방법에 따라 표기된 사이즈의 오차가 있을 수 있으며, 이로 인한 반품 및 교환은 제한될 수 있습니다.',
    '상품을 시범 착용시에도 화장품이나 향수에 의해 변색될 수 있으니 주의하시기 바랍니다. (단, 보석류 중 랩핑포장 상품은 시범착용이 일부 제한될 수 있습니다.',
    '구성품의 일부를 사용하거나 분실한 경우 해당 누락분에 해당되는 비용은 고객님 부담입니다.'
  ]

  const householdGoods = [
    '상품을 사용(조립/설치)하였거나 세탁, 수선 한 경우 반품이 불가합니다.',
    '배송 당일 배송현장의 특수성으로 인한 추가적으로 발생하는 비용은 고객님 부담입니다. (엘리베이터 이용료 및 사다리차 이용료등)',
    '기상이변이나 악천후로 인하여 배송이 지연될 수 있습니다.',
    '일부 상품은 제주도 및 도서지역은 배송이 불가하며, 배송난이 지역은 2~3일 가량 배송일정이 늦어질 수 있습니다.'
  ]

  const homeAppliances = [
    '상품을 설치하였거나 전원을 켜고 사용한 경우 반품 기간 이내라도 반품이 제한될 수 있습니다.',
    '상품설명서에 기재된 주의사항을 지키지 않았을 경우 반품이 불가합니다.',
    '상품을 분해 또는 개조한 경우 반품이 불가합니다.',
    '잉크/토너 등의 소모성 상품의 경우, 보호씰 또는 내부 포장을 제거하였을 경우 반품이 불가합니다.',
    '상품의 외관 및 사양 등은 제품개선을 위해 사전 예고없이 변경될 수 있습니다.',
    '복제가 가능한 상품 등의 포장(봉인라벨 및 랩핑/비닐)을 훼손한 경우 반품이 불가합니다. (예: 도서, DVD, CD 등 복제가능한 상품)',
    '데이터는 보증처리 되지 않습니다.',
    '자체 A/S센터가 있는 상품은 해당 A/S센터에서 불량 판정을 받으신 후 반품 신청 해주시기 바랍니다.',
    '가스밸브 연결은 지역가스 취급소와 도시가스 공급업체에서 유료로 설치 가능합니다.'
  ]

  const otherNotes = [
    '상품의 불량에 의한 반품, 교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은 소비자분쟁해결기준 (공정거래위원회 고시)에 따라 적용받으실 수 있습니다.',
    '대금 환불 및 환불 지연에 따른 배상금 지급조건, 절차 등은 「전자상거래 등에서의 소비자 보호에 관한 법률」 제18조 (청약철회등의 효과)에 따라 처리합니다.',
    '전기용품 및 어린이용품 등은 「전기용품 및 생활용품 안전관리법」 에 의거하여 미인증 상품 또는 제품에 기재된 안전인증 정보가 사실과 다를 경우 고객님은 환불 또는 반품의 권리가 있음을 알려드립니다.',
    '상세 안전인증번호는 제품에 부착된 라벨(Tag)을 통해 확인하실 수 있습니다.'
  ]
  const { showModal, closeModalByPop } = useModal()

  const getPointInfo = (productKey: string, orderChannel: string) => {
    orderApi
      .getPointInfo(productKey, orderChannel)
      .then((res) => {
        // console.log('res', res)
      })
      .catch(() => {
        // empty
      })
  }

  const getSellerCompanyShipment = (keyList: number[]) => {
    memberApi
      .getSellerCompanyShipment(keyList)
      .then((res) => {
        const data = res.data.deliveryShipment
        islandOne.value = data.isolatedAreaDeliveryFee
        islandTwo.value = data.jejuDeliveryFee
      })
      .catch(() => {
        // empty
      })
  }

  const openPointInfoPopup = () => {
    showModal?.({
      component: ProductDetailPointInfoModal,
      props: {
        onCancel: closeModalByPop
      }
    })
  }

  const openAdditionalShippingCostInfoPopup = (isData?: boolean) => {
    if (isData) {
      showModal?.({
        component: ProductDetailAdditionalShippingCostInformationModal,
        props: {
          onCancel: closeModalByPop,
          islandOne,
          islandTwo
        }
      })
    } else {
      showModal?.({
        component: ProductDetailAdditionalShippingCostInformationModal,
        props: {
          onCancel: closeModalByPop,
          islandOne: undefined,
          islandTwo: undefined
        }
      })
    }
  }

 
  const openInterestFreeInstallmentMonthInfoPopup = () => {
    showModal?.({
      component: ProductDetailInterestFreeInstallmentMonthInfoModal,
      props: {
        onCancel: closeModalByPop
      }
    })
  }

  const openExchangeReturnByCategoryPopup = () => {
    showModal?.({
      component: ProductDetailExchangeReturnByCategoryModal,
      props: {
        onCancel: closeModalByPop,
        clothes,
        cosmetics,
        stuff,
        householdGoods,
        homeAppliances,
        otherNotes
      }
    })
  }

  onMounted(() => {
    // hard code to mapping api, the product items screen is building, not completed
    getPointInfo('1', 'WPC')
    getSellerCompanyShipment([1])
  })

  return {
    openPointInfoPopup,
    openAdditionalShippingCostInfoPopup,
    openInterestFreeInstallmentMonthInfoPopup,
    openExchangeReturnByCategoryPopup
  }
}
