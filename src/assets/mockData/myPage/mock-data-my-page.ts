import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'

export const MockDataMyPage = {
  orderKey: 47,
  createdDatetime: '2023-11-08T14:01:00',
  orderProductResponses: [
    {
      orderProductPaymentResponse: {
        totalProductAmount: 30000,
        immediatelyDiscountAmount: 3000,
        couponDiscountAmount: 0,
        welfarePointPaymentAmount: 27000,
        pgPaymentAmount: 0,
        creditCardPaymentAmount: 0,
        accountTransferPaymentAmount: 0,
        tossPayPaymentAmount: 0,
        megazonePayPaymentAmount: 0,
        naverPayPaymentAmount: 0,
        kakaoPayPaymentAmount: 0,
        etcPaymentAmount: 0,
        productAmount: 10000,
        orderDeliveryAmount: 0,
        lastProductAmount: 27000,
        lastPaymentAmount: 27000
      },
      orderDeliveryResponses: [
        {
          receiverProductOrderKey: 212,
          receiverName: '이순신',
          receiverPhoneNumber: '0102227979',
          productName: '해피머니상품권',
          productPrice: 10000,
          quantity: 1,
          ticketCouponNumber: '760163549625',
          ticketImageUrl: 'https://image.multicon.co.kr/createimage/?pin=284791329820',
          orderProcessStatus: 'REFDCP',
          issueDate: '2023-11-15T16:00:00',
          expireDate: '2024-01-14T23:59:00'
        },
        {
          receiverProductOrderKey: 213,
          receiverName: '이순신',
          receiverPhoneNumber: '0102227979',
          productName: '해피머니상품권',
          productPrice: 10000,
          quantity: 1,
          ticketCouponNumber: '760163549625',
          ticketImageUrl: 'https://image.multicon.co.kr/createimage/?pin=284791329820',
          orderProcessStatus: 'REFDCP',
          issueDate: '2023-11-15T16:00:00',
          expireDate: '2024-01-14T23:59:00'
        }
      ]
    }
  ],
  orderPaymentResponse: {
    orderAmount: 27000,
    orderDeliveryAmount: 0,
    totalProductAmount: 30000,
    immediatelyDiscountAmount: 3000,
    lastOrderAmount: 27000,
    lastPaymentAmount: 9000,
    welfarePointPaymentAmount: 27000,
    creditCardPaymentAmount: 0,
    tossPayPaymentAmount: 0,
    megazonePayPaymentAmount: 0,
    naverPayPaymentAmount: 0,
    kakaoPayPaymentAmount: 0,
    accountTransferPaymentAmount: 0,
    etcPaymentAmount: 0,
    installment: 0
  },
  historyData: [
    {
      title: '교환접수',
      createDate: '2023.11.15 15:00:00',
      content: '정상적으로  반품접수 되었습니다.'
    },
    {
      title: '회수지시',
      createDate: '2023.11.15 15:00:00',
      content: '택배사에 상품수거를 요청하였습니다.'
    },
    {
      title: '상품수거',
      createDate: '2023.11.15 15:00:00',
      content: '택배사에서 상품을 수령하였습니다.',
      des: ['롯데택배 / 245268766735']
    },
    {
      title: '입고완료',
      createDate: '2023.11.15 15:00:00',
      content: '상품이 업체에 도착하였습니다.'
    },
    {
      title: '환불완료',
      createDate: '2023.11.15 15:00:00',
      content: '환불처리 되었습니다.',
      des: ['현금환불 48시간 이내', '카드취 소 영업일 기준 5일 이내']
    },
    {
      title: '반품완료',
      createDate: '2023.11.15 15:00:00',
      content: '반품이 완료되었습니다.'
    }
  ],
  refundStatusData: [
    {
      title: '반품접수',
      createDate: '2023.11.15 15:00:00',
      content: '정상적으로  반품접수 되었습니다.'
    },
    {
      title: '회수지시',
      createDate: '2023.11.15 15:00:00',
      content: '택배사에 상품수거를 요청하였습니다.'
    },
    {
      title: '상품수거',
      createDate: '2023.11.15 15:00:00',
      content: '택배사에서 상품을 수령하였습니다.',
      des: ['롯데택배 / 245268766735']
    },
    {
      title: '입고완료',
      createDate: '2023.11.15 15:00:00',
      content: '상품이 업체에 도착하였습니다.'
    },
    {
      title: '환불완료',
      createDate: '2023.11.15 15:00:00',
      content: '환불처리 되었습니다.',
      des: ['현금환불 48시간 이내', '카드취 소 영업일 기준 5일 이내']
    },
    {
      title: '반품완료',
      createDate: '2023.11.15 15:00:00',
      content: '반품이 완료되었습니다.'
    }
  ],
  statusDeliveryData: {
    infoDelivery: {
      productName: '세척 못난이 사과 4kg (18~30)/10kg(46~65 과) 세척 못난이 사과 4kg/10kg(46~65과)…',
      recipient: '선우*덕',
      statusDelivery: '배송중 (2023.11.15)',
      companyDelivery: {
        name: '롯데택배',
        phone: '1588-1111'
      },
      billNumber: '245268766735'
    },
    detailDelivery: [
      {
        createDate: '2023.11.15 15:00:00',
        location: '',
        situation: '집하처리'
      },
      {
        createDate: '2023.11.15 14:00:00',
        location: '군포 TML',
        situation: '간선하차'
      },
      {
        createDate: '2023.11.15 13:00:00',
        location: '안양우편물류센터',
        situation: '간선상차'
      },
      {
        createDate: '2023.11.15 12:00:00',
        location: '메가동(대)',
        situation: '배송출발'
      }
    ]
  },
  listOrderDeliveryData: {
    nameCompany: 'CJ대한통운',
    numberBill: '344539007973',
    statusDelivery: MyPageStatusDeliveryOrder.DELIVERY
  }
}
