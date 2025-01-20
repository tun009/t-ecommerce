import { ref, Ref, reactive, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { myPageCustomer, myPageInquiryOrder } from '@/services/api/myPage/MyPageCustomerApi'
import {
  MyPageInquiryMember,
  MyPageInquiryProduct,
  SearchProductCode,
  WelfareProductCodeProps,
  WelfareModalProductCodeProps,
  Tab
} from '@/models/views/myPage/MyPageCustomerInfo'
import { MyPageStatusDeliveryOrder, myPageListMessageStatusDelivery } from '@/models/views/myPage/MyPageMainMemberModel'
import { BaseContentConfirmModalEmits } from '@/models/widgets/modal'
import { myPageInquiryProduct } from '@/services/api/myPage/MyPageCustomerApi'
import type { Component } from 'vue'
import Member from '@/components/myPage/inquiry/list/MyPageInquiry.vue'
import Product from '@/components/myPage/inquiry/list/MyPageProductInquiry.vue'
import MyPagePopupProductCode from '@/components/myPage/inquiry/modal/MyPagePopupProductCode.vue'
import { useModal } from '@/composables/common/useModal'
import useInfiniteScroll from '@/composables/common/useInfinteScroll'
import useAsync from '@/composables/common/useAsync'
import { getImageProduct } from '@/commons/common'
import { PAGE_SIZE } from '@/commons/constants'
import router from '@/router'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import MypageInquiryProductcode from '@/components/myPage/inquiry/modal/MyPageInquiryProductCode.vue'
import MyPageModalInquiryOrderNumber from '@/components/myPage/inquiry/modal/MyPageModalInquiryOrderNumber.vue'
import PopupFileUpload from '@/components/widgets/modal/popup/PopupFileUpload.vue'
import { formatTimeWithDot } from '@/commons'

interface fileType {
  src: string
  name: string
  type: string
}
interface fileListType {
  [key: string]: fileType
}
interface CategoryTab {
  [key: string]: string
}

export const useMyPageInquiryList = () => {
  const { t } = useI18n()
  const route = useRoute()
  const checkType = () => {
    if (route.query.type == 'member' || route.query.type == 'product') {
      return route.query.type
    } else {
      return 'member'
    }
  }
  const currentTab = ref(checkType())

  const myPageInquiryTab = [
    {
      value: 'member',
      label: t('myPage.detailInquiry.tab.label1')
    },
    {
      value: 'product',
      label: t('myPage.detailInquiry.tab.label2')
    }
  ]

  const tabs: { [key in typeof currentTab.value]: Component } = {
    member: Member,
    product: Product
  }

  return {
    currentTab,
    myPageInquiryTab,
    tabs
  }
}

export const useMyPageInquiryMember = () => {
  const { t } = useI18n()
  const page = ref(1)
  const targetRef: Ref<HTMLDivElement | null> = ref(null)
  const intersecting = useInfiniteScroll(targetRef)
  const inquiryList = ref<MyPageInquiryMember[]>([])
  const checkAnswer = (item: MyPageInquiryMember) => {
    return !!(item.answeredDate && item.answerTitle && item.answerContents)
  }

  const categoryTab: CategoryTab = {
    DLVR: t('myPage.inquiryWrite.inquiryType1'),
    EXCNG: t('myPage.inquiryWrite.inquiryType2'),
    EVNT: t('myPage.inquiryWrite.inquiryType3'),
    PAY: t('myPage.inquiryWrite.inquiryType4'),
    MBR: t('myPage.inquiryWrite.inquiryType5'),
    SITE: t('myPage.inquiryWrite.inquiryType6'),
    ETC: t('myPage.inquiryWrite.inquiryType7')
  }

  const { fetchData, data, pageInfo } = useAsync<MyPageInquiryMember[]>({
    apiCall: () => myPageCustomer.getWelfareInquiryMember(page.value)
  })

  const init = async () => {
    const data = await fetchData()
    if (!data?.value) return

    inquiryList.value = inquiryList.value.concat((data.value || []).map((v) => ({ ...v, show: false })))
  }

  watch(intersecting, (val) => {
    if (data.value && page.value * 5 > pageInfo?.totalCount) return

    if (val) {
      page.value++
      init()
    }
  })

  onMounted(() => {
    init()
  })

  return {
    categoryTab,
    targetRef,
    inquiryList,
    checkAnswer
  }
}

export const useMyPageInquiryProduct = () => {
  const page = ref(1)
  const targetRef: Ref<HTMLDivElement | null> = ref(null)
  const intersecting = useInfiniteScroll(targetRef)
  const inquiryList = ref<MyPageInquiryProduct[]>([])
  const checkAnswer = (item: MyPageInquiryProduct) => {
    return !!(item.answeredDate && item.answerTitleName && item.answerContents)
  }

  const { fetchData, data, pageInfo } = useAsync<MyPageInquiryProduct[]>({
    apiCall: () => myPageCustomer.getWelfareInquiryPorduct(page.value)
  })

  const init = async () => {
    const data = await fetchData()
    if (!data?.value) return

    inquiryList.value = inquiryList.value.concat((data.value || []).map((v) => ({ ...v, show: false })))
  }

  watch(intersecting, (val) => {
    if (data.value && page.value * 5 > pageInfo?.totalCount) return

    if (val) {
      page.value++
      init()
    }
  })

  onMounted(() => {
    init()
  })

  return {
    targetRef,
    inquiryList,
    checkAnswer
  }
}

export const useMyPageInquiryWrite = () => {
  const { t } = useI18n()
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { showModal, closeModal } = useModalBottomSheet()
  const { showModal: showPop, closeModalByPop: closePop } = useModal()
  const categoryTab = ref<Tab[]>([])
  const { openModal } = useModalNotification()
  const orderTicketProductCase = ref({})

  const modalProperty = {
    // 주문번호 조회/ 상품코드 조회 공통
    type: ModalBottomSheetType.swipeFitContent,
    events: { close: closeModal }
  }

  /* 초기화용 */
  const defaultResult = {
    productName: '',
    price: 0,
    pricePromotion: 0,
    percent: 0,
    thumbnailProduct: '',
    optionName: '',
    receiverName: '',
    receiverPhoneNumber: '',
    receiverAddress: '',
    date: '',
    orderKey: 0,
    productCode: 0,
    productKey: 0,
    receiverProductOrderKey: 0,
    orderDeliveryKey: 0,
    state: '',
    key: 0,
    type: ''
  }

  /* 주문, 상품 조회 결과 */
  const searchResult = reactive({ data: defaultResult })

  /* 화면 구성, params  */
  const inquiryWriteData = reactive({
    inquiryType: { id: '', label: '' },
    title: '',
    contents: '',
    inquirerPhoneNum: account.value?.cellphoneNumber.replace(/-/g, '') || '',
    inquirerEmail: account.value?.memberId || '',
    smsReceiveYn: 'N',
    emailReceiveYn: 'N',
    attachmentFileList: []
  })

  /* 업로드 파일 default */
  const uploadFileList = reactive<fileListType>({
    file0: { src: '', name: '', type: '' },
    file1: { src: '', name: '', type: '' },
    file2: { src: '', name: '', type: '' },
    file3: { src: '', name: '', type: '' }
  })

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hour}:${minute}:00`
  }

  /* 주문번호 조회 */
  const handleShowOrderNumber = async ({ ...other }) => {
    const { title } = other
    const currentDate = new Date()
    const previousYear = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes()
    )

    const res = await myPageInquiryOrder.getWelfareInquiryOrderNumber({
      pageNum: 1,
      rowSize: PAGE_SIZE,
      fromDate: formatDate(previousYear),
      toDate: formatDate(currentDate)
    })
    if (searchResult.data.productName) {
      openConfirm({
        content: t('myPage.inquiryWrite.alert')
      })
    } else {
      showModal?.({
        ...modalProperty,
        component: MyPageModalInquiryOrderNumber,
        props: { title, data: res.data },
        events: {
          onAccept: (result: any) => (searchResult.data = { ...result, type: 'order' }),
          close: modalProperty.events.close
        }
      })
    }
  }

  /* 상품코드 조회 */
  const handleShowProductCode = ({ ...other }) => {
    const { title } = other

    if (searchResult.data.productName) {
      openConfirm({
        content: t('myPage.inquiryWrite.alert')
      })
    } else {
      showModal?.({
        ...modalProperty,
        component: MypageInquiryProductcode,
        props: { title, searchResult }
      })
    }
  }

  /* 1:1 문의 등록 */
  const submitInquiry = async () => {
    if (inquiryWriteData.inquiryType.id === '') {
      openNotification({
        content: t('myPage.inquiryWrite.alert1')
      })
    } else if (inquiryWriteData.title == '') {
      openNotification({
        content: t('myPage.inquiryWrite.alert2')
      })
    } else if (inquiryWriteData.contents == '') {
      openNotification({
        content: t('myPage.inquiryWrite.alert3')
      })
    } else {
      const file = Object.keys(uploadFileList).reduce<string[]>((a, c) => {
        const data = uploadFileList[c].name ? [uploadFileList[c].name] : []
        return [...a, ...data]
      }, [])

      //주문 - 티켓상품
      if (searchResult.data.receiverPhoneNumber) {
        orderTicketProductCase.value = {
          orderKey: searchResult.data.orderKey,
          receiverProductOrderKey: searchResult.data.receiverProductOrderKey
        }
        //주문 - 배송상품
      } else if (searchResult.data.receiverAddress) {
        orderTicketProductCase.value = {
          orderKey: searchResult.data.orderKey,
          orderDeliveryKey: searchResult.data?.orderDeliveryKey
        }
        //상품코드
      } else if (searchResult.data.productCode) {
        orderTicketProductCase.value = {
          productKey: searchResult.data.productKey
        }
      }

      const params = {
        ...inquiryWriteData,
        ...orderTicketProductCase.value,
        inquiryType: inquiryWriteData.inquiryType.id,
        attachmentFileList: file
      }

      await myPageCustomer.getWelfareInquiryRegister(params)
      openNotification({
        content: t('myPage.inquiryWrite.alert4'),
        onAccept: () => {
          closeModalByPop?.()
          router.push('/my-page/customer')
        },
        onClose: () => {
          router.push('/my-page/customer')
        }
      })
    }
  }

  // 파일 업로드 벨리데이션
  const validateFile = (file: File) => {
    const { type, size } = file
    const maxImageSize: number = 5 * 1024 * 1024 // 5MB
    const maxVideoSize: number = 300 * 1024 * 1024 // 300MB
    const isImg = ['image/jpeg', 'image/png', 'image/jpg'].includes(type)
    const isVideo = ['video/mp4', 'video/quicktime'].includes(type)

    const isImgSize = isImg && size > maxImageSize // 이미지 파일 사이즈 체크
    const isVideoSize = isVideo && size > maxVideoSize // 동영상 파일 사이즈 체크

    if ((!isImg && !isVideo) || isImgSize || isVideoSize) {
      openModal({
        content: t('myPage.fileUpload.notice')
      })
      return false
    }

    return true
  }

  const handleUpload = async (file: File, target: string | number) => {
    const formData = new FormData() as FormData
    if (file && validateFile(file)) {
      formData.append(file.type.includes('image') ? 'imageFile' : 'videoFile', file)
      const res = await myPageCustomer.uploadInquiriesFile(formData)
      uploadFileList[target].name = res.data.filename
      uploadFileList[target].src = URL.createObjectURL(file)
      uploadFileList[target].type = file.type
      // const downloadRes = await myPageCustomer.downloadInquiriesFile(uploadRes.data.filename)
      // uploadFileList.file0 = downloadRes
    }
  }

  // 파일 업로드 팝업
  const openFileUploadPopup = (target: string) => {
    showPop?.({
      component: PopupFileUpload,
      events: {
        onChange: (file: File) => handleUpload(file, target),
        onClose: closePop
      }
    })
  }

  // 업로드 파일 리셋
  const resetFileUpload = () => {
    openConfirm({
      content: t('myPage.inquiryWrite.reset'),
      onConfirm: () => {
        if (uploadFileList) {
          ;(Object.keys(uploadFileList) || []).forEach((v) => {
            uploadFileList[v] = { src: '', name: '', type: '' }
          })
        }
        closeModalByPop?.()
      }
    })
  }

  const resultReset = () => {
    searchResult.data = defaultResult
  }

  const init = async () => {
    categoryTab.value = [
      {
        id: 'DLVR',
        label: t('myPage.inquiryWrite.inquiryType1')
      },
      {
        id: 'EXCNG',
        label: t('myPage.inquiryWrite.inquiryType2')
      },
      {
        id: 'EVNT',
        label: t('myPage.inquiryWrite.inquiryType3')
      },
      {
        id: 'PAY',
        label: t('myPage.inquiryWrite.inquiryType4')
      },
      {
        id: 'MBR',
        label: t('myPage.inquiryWrite.inquiryType5')
      },
      {
        id: 'SITE',
        label: t('myPage.inquiryWrite.inquiryType6')
      },
      {
        id: 'ETC',
        label: t('myPage.inquiryWrite.inquiryType7')
      }
    ]
  }

  onMounted(() => {
    init()
  })

  return {
    inquiryWriteData,
    categoryTab,
    searchResult,
    uploadFileList,
    handleShowOrderNumber,
    handleShowProductCode,
    resultReset,
    submitInquiry,
    handleUpload,
    openFileUploadPopup,
    resetFileUpload
  }
}

export const useMyPageInquiryProductCode = (props: WelfareProductCodeProps, emit: BaseContentConfirmModalEmits<SearchProductCode>) => {
  const { showModal, closeModalByPop } = useModal()

  // 상품 코드 관련 데이터
  const productCodeData = reactive({
    searchText: '', //검색어
    result: props.searchResult //검색어에 대한 데이터
  })

  // 상품 코드 조회하기
  const getProductCode = async ({ ...other }) => {
    const { title } = other
    const { data } = await myPageInquiryProduct.getWelfareInquiryProductDetail(productCodeData.searchText) // 상품 코드 검색 API

    emit('close')
    showModal?.({
      component: MyPagePopupProductCode,
      props: { title, searchValue: productCodeData.searchText, productCode: data },
      events: {
        onAccept: (result: SearchProductCode) => (productCodeData.result.data = { ...result, type: 'product' }),
        close: closeModalByPop
      }
    })
  }

  return {
    productCodeData,
    getProductCode
  }
}

export const useMyPageInquiryPopupProductCode = (props: WelfareModalProductCodeProps, emit: BaseContentConfirmModalEmits<SearchProductCode>) => {
  //pricePromotion : 판매가격
  //price: 할인율

  const productForm = ({ ...other }) => {
    const { productName, productDiscountAmount, productKey, salePrice, immediatelyProductDiscountAmount, productDiscountRate, foAttachFileList } =
      other

    return {
      productName: productName,
      price: productDiscountAmount,
      pricePromotion: salePrice,
      percent: productDiscountRate,
      thumbnailProduct: getImageProduct(foAttachFileList?.[0]?.attachfilePathName, foAttachFileList?.[0]?.attachfileName),
      productKey: productKey,
      immediatelyProductDiscountAmount: immediatelyProductDiscountAmount
    }
  }

  // 이전 bottomSheet창 조회하기 할떄 들어갈 데이터
  const productCodeData = reactive({
    searchText: props.searchValue,
    view: productForm(props.productCode)
  })

  // 상품코드 조회하기
  const getProductCode = async () => {
    const { data } = await myPageInquiryProduct.getWelfareInquiryProductDetail(productCodeData.searchText)
    productCodeData.view = productForm(data)
  }

  const selectedProductCode = () => {
    // 선택
    emit('onAccept', { ...productCodeData.view, productCode: Number(productCodeData.searchText), orderKey: 0 })
    emit('close')
  }

  return {
    getProductCode,
    productCodeData,
    selectedProductCode
  }
}

export const useMyPageInquiryOrderCode = (emit: BaseContentConfirmModalEmits<SearchProductCode>) => {
  const orderDeliveryForm = ({ ...other }) => {
    const { createdDatetime, orderKey, deliveryOrderResponse } = other

    const product = {
      productName: deliveryOrderResponse?.deliveryProductResponses[0]?.productResponse?.productName,
      price: deliveryOrderResponse?.deliveryProductResponses[0]?.orderQuantity,
      pricePromotion: deliveryOrderResponse?.deliveryProductResponses[0]?.productResponse?.productPrice,
      thumbnailProduct: getImageProduct(
        deliveryOrderResponse?.deliveryProductResponses[0]?.productResponse?.attachfilePathName,
        deliveryOrderResponse?.deliveryProductResponses[0]?.productResponse?.attachfileName
      ),
      optionName: deliveryOrderResponse?.deliveryProductResponses[0]?.productResponse?.productOptionResponses[0]?.optionLargeName,
      receiverName: deliveryOrderResponse?.deliveryResponse?.receiverName,
      receiverPhoneNumber: deliveryOrderResponse?.deliveryResponse?.receiverPhoneNumber,
      receiverAddress: deliveryOrderResponse?.deliveryResponse?.deliveryStreetAddress,
      date: formatTimeWithDot(createdDatetime),
      state: mapReturnOrderDeliveryStatus(
        deliveryOrderResponse?.claimProcessStatus == 'NOCLAM' ? deliveryOrderResponse?.finalOrderStatus : deliveryOrderResponse?.claimProcessStatus
      ),
      key: orderKey
    }

    return product
  }

  const orderTicketForm = ({ ...other }) => {
    const { createdDatetime, orderKey, ticketOrderReceiverResponse } = other

    const product = {
      productName: ticketOrderReceiverResponse?.receiverProductResponse?.productResponse?.productName,
      price: ticketOrderReceiverResponse?.receiverProductResponse?.orderQuantity,
      pricePromotion: ticketOrderReceiverResponse?.receiverProductResponse?.productResponse?.productPrice,
      thumbnailProduct: getImageProduct(
        ticketOrderReceiverResponse?.receiverProductResponse?.productResponse?.attachfilePathName,
        ticketOrderReceiverResponse?.receiverProductResponse?.productResponse?.attachfileName
      ),
      optionName: ticketOrderReceiverResponse?.receiverProductResponse?.productResponse?.productOptionResponses?.optionLargeName,
      receiverName: ticketOrderReceiverResponse?.receiverName,
      receiverPhoneNumber: ticketOrderReceiverResponse?.receiverPhoneNumber,
      receiverAddress: ticketOrderReceiverResponse?.receiverAddress,
      date: formatTimeWithDot(createdDatetime),
      state: mapReturnOrderDeliveryStatus(
        ticketOrderReceiverResponse?.claimProcessStatus == 'NOCLAM'
          ? ticketOrderReceiverResponse?.finalOrderStatus
          : ticketOrderReceiverResponse?.claimProcessStatus
      ),
      key: orderKey
    }

    return product
  }

  const selectTicketOrder = (v: any) => {
    emit('onAccept', {
      ...orderTicketForm(v),
      orderKey: Number(v.orderKey),
      receiverProductOrderKey: v.ticketOrderReceiverResponse?.receiverProductOrderKey
    })
    emit('close')
  }

  const selectDeliveryOrder = (v: any) => {
    emit('onAccept', { ...orderDeliveryForm(v), orderKey: Number(v.orderKey), orderDeliveryKey: v.deliveryOrderResponse?.orderDeliveryKey })
    emit('close')
  }

  const mapReturnOrderDeliveryStatus = (status: MyPageStatusDeliveryOrder): string => {
    return myPageListMessageStatusDelivery[status]
  }

  return {
    orderDeliveryForm,
    orderTicketForm,
    selectTicketOrder,
    selectDeliveryOrder,
    mapReturnOrderDeliveryStatus
  }
}
