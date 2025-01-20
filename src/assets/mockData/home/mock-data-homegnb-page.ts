import { ProductNews1, ItemCategory1, ItemCategory2, ItemCategory, ProductDetail2, ProductRelateImage, ProductItemImage } from '@/assets/images'
import bannerItemSLide from '@/assets/images/banner-item-slide.png'

export const dataHomePage = {
  dataTab: [
    {
      id: '1',
      label: '전체'
    },
    {
      id: '2',
      label: '생활&주방'
    },
    {
      id: '3',
      label: '뷰티&잡화'
    },
    {
      id: '4',
      label: '스포츠&레저'
    },
    {
      id: '5',
      label: '랭킹'
    }
  ],
  dataProductNews: [
    {
      name: '디올 new 2023 홀리데이 컬렉션',
      thumbnail: ProductNews1
    },
    {
      name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
      thumbnail: ProductNews1
    },
    {
      name: '디올 new 2023 홀리데이 컬렉션',
      thumbnail: ProductNews1
    },
    {
      name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
      thumbnail: ProductNews1
    },
    {
      name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
      thumbnail: ProductNews1
    }
  ],
  productOrders: [
    {
      name: '디올 new 2023 홀리데이 컬렉션',
      thumbnail: ProductNews1,
      percent: 99,
      pricePromotion: 99999999,
      price: 99999999
    },
    {
      name: '디올 new 2023 홀리데이 컬렉션',
      thumbnail: ProductNews1,
      percent: 99,
      pricePromotion: 99999999,
      price: 99999999
    },
    {
      name: '디올 new 2023 홀리데이 컬렉션',
      thumbnail: ProductNews1,
      percent: 99,
      pricePromotion: 99999999,
      price: 99999999
    }
  ],
  homeCategory: [
    {
      name: '오늘의특가',
      image: ItemCategory1
    },
    {
      name: '테크',
      image: ItemCategory2
    },
    {
      name: '스포츠',
      image: ItemCategory
    },
    {
      name: '뷰티',
      image: ItemCategory
    },
    {
      name: '가전',
      image: ItemCategory
    },
    {
      name: '리빙',
      image: ItemCategory
    },
    {
      name: '펫',
      image: ItemCategory
    },
    {
      name: '컬처',
      image: ItemCategory
    },
    {
      name: '8월 혜택',
      image: ItemCategory
    },
    {
      name: '안녕 여름',
      image: ItemCategory
    }
  ],
  productLg1: {
    name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
    benefits: ['무료배송', '무이자'],
    price: 99999999,
    pricePromotion: 99999999,
    percent: 99,
    thumbnailProduct: ProductDetail2
  },
  productLg: {
    name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
    price: 99999999,
    pricePromotion: 99999999,
    percent: 99,
    buyerCount: 9999,
    thumbnailBo: ProductRelateImage,
    thumbnailProduct: ProductItemImage,
    buyers: [
      'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
      'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
      'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain'
    ],
    benefits: ['무료배송', '무이자'],
    titleDayWarning: '종료 3일전'
  },
  productMd: {
    benefits: ['무료배송', '무이자'],
    rateStar: 4,
    rateCountStar: 999,
    name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
    price: 99999999,
    pricePromotion: 99999999,
    percent: 99,
    thumbnailProduct: ProductDetail2
  },
  productOrderToday: {
    name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
    price: 99999999,
    pricePromotion: 99999999,
    percent: 99,
    thumbnailProduct: ProductDetail2
  },
  productSm: {
    name: '다이슨 에어랩 멀티...',
    price: 99999999,
    pricePromotion: 999999,
    percent: 99,
    thumbnailProduct: ProductItemImage
  },
  bannerTopImage: {
    image: bannerItemSLide
  }
}
