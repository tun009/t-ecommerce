import { DummyImage, ProductDetail2 } from '@/assets/images'
import BankN from '@/assets/images/banks/bankN.svg'
import BankPay from '@/assets/images/banks/bankPay.svg'
import LPay from '@/assets/images/banks/lpay.png'
import Pay2 from '@/assets/images/banks/pay2.svg'
import PayApple from '@/assets/images/banks/payApple.svg'
import { PayMethod } from '@/models/common'
import { OrderPaymentCompleteModel, OrderPaymentCouponCompleteModel } from '@/models/services/responses/order/OrderProductCartResponse'
import { OrderDeliveryAddressBasePrimary, OrderDeliveryAddressCode } from '@/models/views/order/OrderProductPageModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export const dataOrderPage = {
  productCustomer: {
    id: 0,
    productName: '[폴스미스] 남성 디노 맨투맨 블랙 두줄로 제목이길게 나온다고 하면 이렇게 나옵니다람쥐 길면계속가가제목제목제목제목제목제...',
    productImage: DummyImage,
    pricePromotion: 9999999,
    quantity: 55,
    state: ProductDetailSaleStatus.onSale,
    nameOption: '옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션명옵션 ...',
    config: {
      name: '추가구성',
      des: '양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ 양말세트/ ...'
    },
    gift: {
      name: '사은품',
      des: ['블랙 비니']
    }
  },
  optionsInstallmentMonth: [
    {
      value: 1,
      label: '일시불'
    },
    {
      value: 2,
      label: '02개월(무이자)'
    },
    {
      value: 3,
      label: '03개월(무이자)'
    },
    {
      value: 4,
      label: '04개월'
    },
    {
      value: 5,
      label: '05개월'
    },
    {
      value: 6,
      label: '06개월'
    },
    {
      value: 7,
      label: '07개월'
    },
    {
      value: 8,
      label: '08개월'
    },
    {
      value: 9,
      label: '09개월'
    },
    {
      value: 10,
      label: '10개월'
    },
    {
      value: 11,
      label: '11개월'
    },
    {
      value: 12,
      label: '12개월'
    }
  ],
  optionsPaymentMethod: [
    {
      value: PayMethod.KPay,
      label: 'KB국민카드'
    },
    {
      value: 3,
      label: '신한카드'
    },
    {
      value: 5,
      label: '롯데카드'
    },
    {
      value: 4,
      label: 'BC카드'
    },
    {
      value: 5,
      label: '현대카드'
    },
    {
      value: 6,
      label: '삼성카드'
    },
    {
      value: 7,
      label: 'NH카드'
    },
    {
      value: 8,
      label: '하나카드'
    },
    {
      value: 9,
      label: '우리BC카드'
    },
    {
      value: 10,
      label: '우리카드'
    },
    {
      value: 11,
      label: '씨티카드'
    },
    {
      value: 12,
      label: '광주카드'
    }
  ],
  dataBanks: [
    {
      name: 'cardOrder.paymentMethod.bankList.creditCard',
      value: PayMethod.Card,
      notes: {
        title: '삼성카드 15% 할인 (청구할인가 : 35,000원)',
        list: ['현금영수증과 세금계산서 중 하나만 발행이 가능합니다.']
      }
    },
    {
      image: BankPay,
      value: PayMethod.KakaoPay,
      notes: {
        title: '[카카오페이 이용안내]',
        list: [
          'KakaoPay는 카카오톡 안에 개인 신용/체크카드를 등록하여 간단한 비밀번호만으로도 결제가능한 모바일 간편결제 서비스입니다.',
          '본인명의 휴대폰에 본인명의 카드로 결제 시에만 사용가능 합니다.',
          '지원카드 : 모든 신용/체크카드 (BC카드 중 신한BC, KB국민 BC, 하나 BC 사용불가)',
          '무이자 혜택은 당사/카드사 사정에 따라 일부 상품에 한해 적용되며, 예고 없이 변경되거나 중단될 수 있습니다.'
        ]
      }
    },
    {
      image: BankN,
      value: PayMethod.NaverPay,
      notes: {
        title: '[네이버페이 이용안내]',
        list: [
          '네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버페이 비밀번호로 결제할 수 있는 간편결제 서비스입니다.',
          '결제가능 카드 : 신한, 삼성, 현대, BC, 국민, 하나, 롯데, NH농협, 씨티, 카카오뱅크',
          '결제가능 은행 : NH농협, 국민, 신한, 우리, 기업, SC제일, 부산 , 경남, 수협, 우체국, 미래에셋대우, 광주, 대구, 전북, 새마을 금고, 제주은행, 신협, 하나은행, 케이뱅크',
          '단, 네이버페이로 결제할 경우 네이버페이에서 제공하는 카드사별 무이자, 청구할인 혜택만 제공됩니다.',
          '무이자 할부도 네이버페이 기준으로 적용됩니다.',
          '네이버페이 정책상 원결제 취소로 처리되며 환불계좌/예치금 등의 환불은 불가합니다.',
          '네이버페이 결제금액분의 현금영수증 발행은 별도 네이버페이를 통해 신청을 하셔야 합니다.',
          '네이버페이 결제분의 신용카드 영수증은 [네이버페이 > 결제 상세정보] 영역에서 확인 가능합니다.'
        ]
      }
    },
    // {
    //   image: TossPay,
    //   value: 5
    // },
    // {
    //   image: PayCo,
    //   value: 6
    // },
    {
      image: LPay,
      value: PayMethod.LPay
    },
    // {
    //   image: PayCo,
    //   value: PayMethod.Payco
    // },
    {
      image: Pay2,
      value: PayMethod.Samsung,
      notes: {
        title: '[삼성페이 이용안내]',
        list: [
          '삼성페이는 보유한 카드를 등록하여 지문 또는 비밀번호 인증을 통해 안전하게 결제가능한 간편결제 수단입니다.',
          '스마트폰 명의자와 카드 명의자가 동일한 경우에만 삼성페이 서비스에 카드 등록이 가능합니다.',
          "삼성페이를 지원가능한 단말기는 아래 '삼성페이 사용안내' 를 통해 확인가능합니다.",
          {
            title: '결제 가능한 카드',
            list: ['삼성페이 : 신한,하나,삼성,현대,롯데 ', '삼성페이 미니 : 하나,삼성,현대,롯데']
          }
        ]
      }
    },
    {
      image: PayApple,
      value: PayMethod.ApplePay
    }
  ],
  typeAddressDelivery: [
    { label: '자택', value: OrderDeliveryAddressCode.home },
    { label: '직장', value: OrderDeliveryAddressCode.company },
    { label: '기타', value: OrderDeliveryAddressCode.etc }
  ],
  codeTelList: [
    { label: '010', value: '010' },
    { label: '011', value: '011' },
    { label: '016', value: '016' },
    { label: '017', value: '017' },
    { label: '018', value: '018' },
    { label: '019', value: '019' }
  ],
  voucher: {
    welPointInput: 1200000,
    pointInput: 45000,
    savePointInput: 87900
  },
  deliveryAddress: {
    deliveryAddressKey: 3,
    deliveryAddressCode: OrderDeliveryAddressCode.home,
    deliveryAddressBaseYn: OrderDeliveryAddressBasePrimary.yes,
    deliveryAddressName: '홍길동',
    deliveryZipCode: '63235',
    deliveryLoadNameAddress: '서울시 강남구 논현로85길 46 메가존빌딩',
    deliveryLoadLotBasedAddress: '10층',
    deliveryDetailedAddress: '(역삼동 735-22, 메가존빌딩 10층)',
    deliveryTelNumber: '02-1233-4567',
    deliveryCellphoneNumber: '010-1234-1234'
  },
  infoPaymentList: [
    {
      method: '신용카드',
      cardCompany: '신한카드 (할부 2개월)'
    },
    {
      method: '네이버 페이',
      cardCompany: '현대카드 (할부 2개월)'
    },
    {
      method: '카카오 페이',
      cardCompany: '현대카드 (일시불)'
    }
  ],
  relateProduct: {
    name: '[솔트레인] 극세모 칫솔  4개입 2종 (택1)',
    price: 99999999,
    pricePromotion: 99999999,
    percent: 99,
    thumbnailProduct: ProductDetail2,
    benefits: [],
    rateStar: 0,
    rateCountStar: 0
  },
  priceBill: {
    totalPrice: 99999999,
    costDelivery: 6000,
    priceVoucher: 4000,
    priceSavePoint: 30000,
    discounts: [
      {
        title: '즉시할인',
        value: 10000
      },
      {
        title: '일시불할인',
        value: 10000
      },
      {
        title: '쿠폰할인',
        value: 10000
      }
    ],
    usePointDiscounts: [
      {
        title: '복지포인트',
        value: 2000
      },
      {
        title: '포인트',
        value: 1000
      },
      {
        title: '적립금',
        value: 1000
      }
    ]
  },
  receiver: {
    nameTitle: '받는 분',
    name: '김메가',
    phone: '010-1234-1234',
    describe: '생일을 축하합니다. 행복한 시간보내세요. 생일을 축하합니다. </br> 행복한 시간보내세요. 화이팅!'
  }
}

export const dataOrderPage2: OrderPaymentCompleteModel = {
  orderKey: 411,
  createdDatetime: '2024-01-05T13:11:12',
  myPageOrderEntryResponses: [
    {
      deliveryOrderResponse: {
        orderDeliveryKey: 70,
        deliveryResponse: {
          deliveryAddressCode: OrderDeliveryAddressCode.company,
          receiverName: '홍길동',
          deliveryZipCode: '06235',
          deliveryStreetAddress: '서울 강남구 테헤란로20길 16',
          deliveryLotAddress: '역삼동 735-35',
          deliveryDetailAddress: '금정빌딩 8층',
          deliveryCellPhone: '01064254268',
          deliveryTelephone: '',
          deliveryRequestType: 'CALL',
          deliveryRequestContent: ''
        },
        warehouseResponse: {
          name: '기본출고지',
          zipCode: '04784',
          streetAddress: '서울특별시 성동구 성수이로10길 14',
          lotAddress: '서울특별시 성동구 성수동2가 269-25 에이스 하이엔드 성수타워',
          detailAddress: '904호',
          telephone1: '01012341234',
          telephone2: '',
          combinedDeliveryPossible: 'Y',
          deliveryGuideContents: '',
          deliveryFeeKindCode: '01',
          freeDeliveryPossibleBuyAmount: '',
          baseDeliveryFee: '',
          islandMountainDeliveryFee: null,
          jejuDeliveryFee: null
        },
        invoiceNumber: '',
        deliveryRequiredDays: 9,
        lastOrderDeliveryStatus: '',
        orderProcessStatus: 'PAYCMP',
        claimProcessStatus: 'NOCLAM',
        finalOrderStatus: 'PAYCMP',
        productPreparationInstructionDate: '',
        deliveryRequestDate: '',
        invoiceRegistrationDate: '',
        deliveryCompletionDate: '',
        lastDeliveryCompletionDate: '',
        deliveryFeeAmount: 0,
        deliveryFeeDiscountAmount: 0,
        deliveryFeePaymentAmount: 0,
        deliveryFeeMemberCouponKey: 0,
        deliveryProductResponses: [
          {
            orderDeliveryProductKey: 58,
            productKey: 136,
            optionKey: 178,
            productResponse: {
              productKey: 136,
              productName: '테스트 상품',
              sellerProductCode: null,
              productClassification: null,
              attachfilePathName: DummyImage,
              attachfileName: null,
              productPrice: 10000,
              sellerKey: null,
              subcontractKey: null,
              minimumPurchaseQuantityYn: null,
              minimumPurchaseQuantity: null,
              maximumPurchaseQuantityYn: null,
              maximumPurchaseQuantity: null,
              lastProductStatsCode: null,
              sellerDeliveryFeeKey: null,
              shippingPointCombinedDeliveryPossibleYn: null,
              immediatelyDiscountResponse: null,
              productOptionResponses: [
                {
                  optionKey: 178,
                  optionLargeName: '블랙',
                  optionMediumName: 'S',
                  optionSmallName: '90사이즈',
                  optionPrice: null
                }
              ]
            },
            productTypeTargetDatetime: null,
            orderQuantity: null,
            refundQuantity: null,
            rewardPointResponse: null,
            expectedAccumulationAmount: null,
            productUseYn: null,
            orderProductPaymentResponse: {
              rewardPaymentAmount: 9,
              totalProductAmount: 2,
              immediatelyDiscountAmount: 2,
              couponDiscountAmount: 2,
              welfarePointPaymentAmount: 2,
              pgPaymentAmount: 3,
              creditCardPaymentAmount: 3,
              accountTransferPaymentAmount: 3,
              tossPayPaymentAmount: 3,
              megazonePayPaymentAmount: 3,
              naverPayPaymentAmount: 3,
              kakaoPayPaymentAmount: 3,
              etcPaymentAmount: 3,
              productAmount: 3,
              orderDeliveryAmount: 3,
              lastProductAmount: 3,
              lastPaymentAmount: 3
            },
            orderProductRefundResponse: null
          },
          {
            orderDeliveryProductKey: 58,
            productKey: 136,
            optionKey: 178,
            productResponse: {
              productKey: 136,
              productName: '테스트 상품',
              sellerProductCode: null,
              productClassification: null,
              attachfilePathName: DummyImage,
              attachfileName: null,
              productPrice: 10000,
              sellerKey: null,
              subcontractKey: null,
              minimumPurchaseQuantityYn: null,
              minimumPurchaseQuantity: null,
              maximumPurchaseQuantityYn: null,
              maximumPurchaseQuantity: null,
              lastProductStatsCode: null,
              sellerDeliveryFeeKey: null,
              shippingPointCombinedDeliveryPossibleYn: null,
              immediatelyDiscountResponse: null,
              productOptionResponses: [
                {
                  optionKey: 178,
                  optionLargeName: '블랙',
                  optionMediumName: 'S',
                  optionSmallName: '90사이즈',
                  optionPrice: null
                }
              ]
            },
            productTypeTargetDatetime: null,
            orderQuantity: null,
            refundQuantity: null,
            rewardPointResponse: null,
            expectedAccumulationAmount: null,
            productUseYn: null,
            orderProductPaymentResponse: {
              rewardPaymentAmount: 9,
              totalProductAmount: 2,
              immediatelyDiscountAmount: 2,
              couponDiscountAmount: 2,
              welfarePointPaymentAmount: 2,
              pgPaymentAmount: 3,
              creditCardPaymentAmount: 3,
              accountTransferPaymentAmount: 3,
              tossPayPaymentAmount: 3,
              megazonePayPaymentAmount: 3,
              naverPayPaymentAmount: 3,
              kakaoPayPaymentAmount: 3,
              etcPaymentAmount: 3,
              productAmount: 3,
              orderDeliveryAmount: 3,
              lastProductAmount: 3,
              lastPaymentAmount: 3
            },
            orderProductRefundResponse: null
          },
          {
            orderDeliveryProductKey: 58,
            productKey: 136,
            optionKey: 178,
            productResponse: {
              productKey: 136,
              productName: '테스트 상품',
              sellerProductCode: null,
              productClassification: null,
              attachfilePathName: DummyImage,
              attachfileName: null,
              productPrice: 10000,
              sellerKey: null,
              subcontractKey: null,
              minimumPurchaseQuantityYn: null,
              minimumPurchaseQuantity: null,
              maximumPurchaseQuantityYn: null,
              maximumPurchaseQuantity: null,
              lastProductStatsCode: null,
              sellerDeliveryFeeKey: null,
              shippingPointCombinedDeliveryPossibleYn: null,
              immediatelyDiscountResponse: null,
              productOptionResponses: [
                {
                  optionKey: 178,
                  optionLargeName: '블랙',
                  optionMediumName: 'S',
                  optionSmallName: '90사이즈',
                  optionPrice: null
                }
              ]
            },
            productTypeTargetDatetime: null,
            orderQuantity: null,
            refundQuantity: null,
            rewardPointResponse: null,
            expectedAccumulationAmount: null,
            productUseYn: null,
            orderProductPaymentResponse: {
              rewardPaymentAmount: 9,
              totalProductAmount: 2,
              immediatelyDiscountAmount: 2,
              couponDiscountAmount: 2,
              welfarePointPaymentAmount: 2,
              pgPaymentAmount: 3,
              creditCardPaymentAmount: 3,
              accountTransferPaymentAmount: 3,
              tossPayPaymentAmount: 3,
              megazonePayPaymentAmount: 3,
              naverPayPaymentAmount: 3,
              kakaoPayPaymentAmount: 3,
              etcPaymentAmount: 3,
              productAmount: 3,
              orderDeliveryAmount: 3,
              lastProductAmount: 3,
              lastPaymentAmount: 3
            },
            orderProductRefundResponse: null
          }
        ]
      },
      ticketOrderReceiverResponse: null
    }
  ],
  orderPaymentResponse: {
    orderAmount: 20000,
    orderDeliveryAmount: 10000,
    deliveryDiscountAmount: 0,
    totalProductAmount: 20000,
    immediatelyDiscountAmount: 0,
    couponDiscountAmount: 0,
    lastOrderAmount: 20000,
    lastPaymentAmount: 20000,
    welfarePointPaymentAmount: 20000,
    pgPaymentAmount: 0,
    creditCardPaymentAmount: 0,
    tossPayPaymentAmount: 0,
    megazonePayPaymentAmount: 0,
    naverPayPaymentAmount: 0,
    kakaoPayPaymentAmount: 0,
    accountTransferPaymentAmount: 0,
    etcPaymentAmount: 0,
    installment: 0
  },
  senderMessage: '',
  ordererName: 'John Doe',
  orderChannel: 'WMO',
  cartKey: 0,
  cartProductKeys: []
}

export const dataOrderCouponCompleted: OrderPaymentCouponCompleteModel = {
  orderKey: 100068,
  createdDatetime: '2024-01-05T13:11:12',
  orderChannel: 'WMO',
  productClassification: '01',
  myPageOrderEntryResponses: [
    {
      deliveryOrderResponse: null,
      ticketOrderReceiverResponse: {
        receiverProductOrderKey: 143,
        receiverName: '홍길동',
        receiverPhoneNumber: '0101231234',
        ticketCouponNumber: null,
        ticketImageUrl: null,
        orderProcessStatus: 'ISSUFL',
        claimProcessStatus: 'NOCLAM',
        finalOrderStatus: 'ISSUFL',
        ticketUseStatus: 'N',
        issueDate: null,
        expireDate: null,
        usedDate: null,
        issueDelayReason: null,
        issueDelayMemoContents: null,
        expectedAccumulationAmount: null,
        receiverProductResponse: {
          productOrderKey: null,
          productResponse: {
            productKey: 2,
            productName: '해피머니상품권',
            sellerProductCode: null,
            productClassification: null,
            attachfilePathName: DummyImage,
            attachfileName: null,
            productPrice: 10000,
            sellerKey: null,
            subcontractKey: null,
            minimumPurchaseQuantityYn: null,
            minimumPurchaseQuantity: null,
            maximumPurchaseQuantityYn: null,
            maximumPurchaseQuantity: null,
            lastProductStatsCode: null,
            sellerDeliveryFeeKey: null,
            shippingPointCombinedDeliveryPossibleYn: null,
            immediatelyDiscountResponse: null,
            productOptionResponses: null
          },
          orderQuantity: null,
          expectedAccumulationAmount: null,
          productUseYn: null,
          orderProductPaymentResponse: {
            totalProductAmount: 30000,
            immediatelyDiscountAmount: 3000,
            couponDiscountAmount: 0,
            rewardPaymentAmount: null,
            welfarePointPaymentAmount: 27000,
            pgPaymentAmount: 0,
            creditCardPaymentAmount: 0,
            tossPayPaymentAmount: 0,
            megazonePayPaymentAmount: 0,
            naverPayPaymentAmount: 0,
            kakaoPayPaymentAmount: 0,
            accountTransferPaymentAmount: 0,
            etcPaymentAmount: 0,
            productAmount: 10000,
            lastProductAmount: 27000,
            lastPaymentAmount: 27000
          },
          orderProductRefundResponse: {
            orderTotalRefundAmount: 9000,
            orderProductRefundAmount: 9000,
            orderRefundCouponDiscountAmount: 0,
            refundRewardPaymentAmount: null,
            orderRefundWelfarePoint: 9000,
            creditCardRefundAmount: 0,
            accountTransferRefundAmount: 0,
            tossPayRefundAmount: 0,
            etcRefundAmount: 0,
            megazonePayRefundAmount: 0,
            naverPayRefundAmount: 0,
            kakaoPayRefundAmount: 0,
            refundQuantity: null
          }
        }
      }
    },
    {
      deliveryOrderResponse: null,
      ticketOrderReceiverResponse: {
        receiverProductOrderKey: 143,
        receiverName: '홍길동',
        receiverPhoneNumber: '0101231234',
        ticketCouponNumber: null,
        ticketImageUrl: null,
        orderProcessStatus: 'ISSUFL',
        claimProcessStatus: 'NOCLAM',
        finalOrderStatus: 'ISSUFL',
        ticketUseStatus: 'N',
        issueDate: null,
        expireDate: null,
        usedDate: null,
        issueDelayReason: null,
        issueDelayMemoContents: null,
        expectedAccumulationAmount: null,
        receiverProductResponse: {
          productOrderKey: null,
          productResponse: {
            productKey: 2,
            productName: '해피머니상품권',
            sellerProductCode: null,
            productClassification: null,
            attachfilePathName: DummyImage,
            attachfileName: null,
            productPrice: 10000,
            sellerKey: null,
            subcontractKey: null,
            minimumPurchaseQuantityYn: null,
            minimumPurchaseQuantity: null,
            maximumPurchaseQuantityYn: null,
            maximumPurchaseQuantity: null,
            lastProductStatsCode: null,
            sellerDeliveryFeeKey: null,
            shippingPointCombinedDeliveryPossibleYn: null,
            immediatelyDiscountResponse: null,
            productOptionResponses: null
          },
          orderQuantity: null,
          expectedAccumulationAmount: null,
          productUseYn: null,
          orderProductPaymentResponse: {
            totalProductAmount: 30000,
            immediatelyDiscountAmount: 3000,
            couponDiscountAmount: 0,
            rewardPaymentAmount: null,
            welfarePointPaymentAmount: 27000,
            pgPaymentAmount: 0,
            creditCardPaymentAmount: 0,
            tossPayPaymentAmount: 0,
            megazonePayPaymentAmount: 0,
            naverPayPaymentAmount: 0,
            kakaoPayPaymentAmount: 0,
            accountTransferPaymentAmount: 0,
            etcPaymentAmount: 0,
            productAmount: 10000,
            lastProductAmount: 27000,
            lastPaymentAmount: 27000
          },
          orderProductRefundResponse: {
            orderTotalRefundAmount: 9000,
            orderProductRefundAmount: 9000,
            orderRefundCouponDiscountAmount: 0,
            refundRewardPaymentAmount: null,
            orderRefundWelfarePoint: 9000,
            creditCardRefundAmount: 0,
            accountTransferRefundAmount: 0,
            tossPayRefundAmount: 0,
            etcRefundAmount: 0,
            megazonePayRefundAmount: 0,
            naverPayRefundAmount: 0,
            kakaoPayRefundAmount: 0,
            refundQuantity: null
          }
        }
      }
    }
  ],
  orderPaymentResponse: {
    orderAmount: 27000,
    orderDeliveryAmount: 0,
    deliveryDiscountAmount: 0,
    totalProductAmount: 30000,
    immediatelyDiscountAmount: 3000,
    couponDiscountAmount: 0,
    lastOrderAmount: 27000,
    lastPaymentAmount: 27000,
    welfarePointPaymentAmount: 17000,
    pgPaymentAmount: 1000,
    creditCardPaymentAmount: 0,
    tossPayPaymentAmount: 0,
    megazonePayPaymentAmount: 0,
    naverPayPaymentAmount: 0,
    kakaoPayPaymentAmount: 0,
    accountTransferPaymentAmount: 0,
    etcPaymentAmount: 0,
    installment: 0
  },
  orderRefundResponse: null,
  senderMessage: '생일 축하합니다.',
  ordererName: '김유신',
  quantity: 3,
  refundQuantity: null
}
