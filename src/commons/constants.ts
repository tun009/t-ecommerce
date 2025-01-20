import { EXHIBITION_DETAIL_GROUP } from "./router"

export const ENTER_KEY = 'Enter'
export const ESC_KEY = 'Escape'
export const NUMBER_KEY_0 = '0'
export const NUMBER_KEY_9 = '9'
export const DEFAULT_DEBOUNCE_TIME = 200
export const TIME_HIDDEN_HEART_POPUP = 3000
export const ID_CHECKBOX_ALL = 'all'

export const POPUP_NAME_TYPE_MAIN = '[메인]'
export const POPUP_NAME_TYPE_FLOAT = '[플로팅]'

export const ALERT_PROVIDE = 'alertProvide'

export const LOGIN_PARAM_CUSTOMER_KEY = 1

export const AXIOS_TIMEOUT = 60 * 1000

export const bannerAutoTime = 3000
export const bannerCarouselAutoTime = 2000
export const defaultTimeAlert = 5000
export const limitAlert = 3

export const timeProductStartCountDown = 36000000

export const MODAL_PROVIDE = 'MODAL_PROVIDE'
export const MODAL_BOTTOM_SHEET_PROVIDE = 'MODAL_BOTTOM_SHEET_PROVIDE'

export const DEFAULT_NUMBER_OF_STAR = 5
export const DEFAULT_DURATION_SWIPE_BUTTON_SHEET = 0.3

export const MAX_REVIEW_LIKE = 999
export const SIZE_FILE_REVIEW = 4
export const PAGE_SIZE = 10

export const PAGE_SIZE_12 = 12

export const PAGE_SIZE_20 = 20
export const SEARCH_RECENTLY_SIZE_20 = 20

export const DEFAULT_DATE_FORMAT_DOT = 'YYYY.MM.DD'
export const DEFAULT_DATE_FORMAT_DASH = 'YYYY-MM-DD'
export const DEFAULT_DATE_TIME_FORMAT_DOT = 'YYYY.MM.DD HH:mm'
export const DEFAULT_DATE_TIME_FORMAT_DASH_HOURS_MINUTES = 'YYYY-MM-DD HH:mm'
export const FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS = 'YYYY.MM.DD HH:mm:ss'

export const MINUTES_SECONDS_TIME_FORMAT = 'mm:ss'
export const HOURS_MINUTES_SECONDS_TIME_FORMAT = 'HH:mm:ss'

export const VERIFY_TIME = 600

export const HEIGHT_HEADER_MAIN_PAGE = 111

export const MINIMUM_TEXTAREA_LENGTH = 5

export const MAXIMUM_MAIN_BOTTOM_POPUP = 3

export const DAUM_POST_CODE_SCRIPT = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export const CODE_TEL_LIST = ['010', '011', '016', '017', '018', '019']
export const CODE_CONTACT_TEL_LIST = [
  '02',
  '031',
  '032',
  '033',
  '041',
  '042',
  '043',
  '044',
  '049',
  '051',
  '052',
  '053',
  '054',
  '055',
  '061',
  '062',
  '063',
  '064',
  '010',
  '011',
  '016',
  '017',
  '018',
  '019',
  '0130',
  '080',
  '070',
  '0502',
  '0503',
  '0504',
  '0505',
  '0506',
  '0507',
  '0303'
]

export const DEFAULT_REPLACE_TEXT = 'OOO'

export const SUCCESS_MESSAGE_API = '성공'

export const DEFAULT_RECEIVER_NAME = '김메가'
export const INPUT_DEFAULT_MESSAGE_ADDRESS = '직접입력'

export const MEGAZONE_LINK = 'https://megazone.digital/'
export const FTC_LINK = 'https://www.ftc.go.kr/'
export const POLICY_LINK = window.location.origin + '/main/privacy-policy'
export const TERM_LINK = window.location.origin + '/main/term-of-use'

export const DEFAULT_VIDEO = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

export const CATEGORY_TAP_CONTROLS = ['인기상품순', '이미지', '혜택']
export const ALL_CATEGORY = 'ALL'

export const SEARCH_TAP_CONTROLS = ['카테고리', '가격대', '이미지', '혜택', '브랜드', '인기상품순']

export const dataTabCategoryPage = [
  {
    id: '1',
    label: '신선제품'
  },
  {
    id: '2',
    label: '가공식품'
  },
  {
    id: '3',
    label: '건강식품'
  }
]

export const listLineTabCategoryPage = [
  {
    id: '1',
    label: '전체'
  },
  {
    id: '2',
    label: '김치'
  },
  {
    id: '3',
    label: '반찬류'
  },
  {
    id: '4',
    label: '수산'
  },
  {
    id: '5',
    label: '곡물'
  },
  {
    id: '6',
    label: '과일'
  },
  {
    id: '7',
    label: '복지안내'
  }
]

export const mypageProductTab = [
  {
    value: 'MyPageProductReviewWriteList',
    label: '상품평 작성하기'
  },
  {
    value: 'MyPageProductReview',
    label: '내가 작성한 상품평'
  }
]

// width icon
export const WIDTH_ICON_20 = 20
export const myPageMaxCountNumberItem = 999

export enum OrderChannel {
  WEB_MOBILE = 'WMO'
}

// Payment
export const USER_CODE: string = import.meta.env.VITE_IMP
export const TIER_CODE: string = import.meta.env.VITE_TIER_CODE
export const PG: string = 'kcp.AO09C'

export const EXCLUDE_SCROLL_TO_TOP_PAGE = [EXHIBITION_DETAIL_GROUP]