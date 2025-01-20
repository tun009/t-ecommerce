import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import {
  SearchDetailBrandsEmits,
  SearchDetailBrandsProps,
  SearchDetailCategoriesEmits,
  SearchDetailCategoriesProps,
  SearchDetailRangeEmits,
  SearchDetailRangeProps
} from '../search/SearchDetailModel'
import { SearchFilterInfoModel } from '@/models/services/responses/search/SearchResponse'

export enum CategoryListProductSortType {
  POPULARITY_SORT = '인기상품순',
  PRICE_SORT_DESC = '높은가격순',
  PRICE_SORT_ASC = '낮은가격순',
  NEWEST_SORT = '신규상품순',
  RATING_SORT = '상품평순'
}

export enum SearchListProductSortType {
  RECOMMEND_SORT = '01',
  POPULARITY_SORT = '02',
  // RESGISTER_RECENT_SORT = '03',
  PRICE_SORT_DESC = '04',
  PRICE_SORT_ASC = '05',
  RATING_SORT = '06',
  // MOST_VIEW_SORT = '07'
}

export const SearchListProductSortValue = {
  [SearchListProductSortType.RECOMMEND_SORT]: '추천상품순',
  [SearchListProductSortType.POPULARITY_SORT]: '인기상품순',
  // [SearchListProductSortType.RESGISTER_RECENT_SORT]: '최근등록순',
  [SearchListProductSortType.PRICE_SORT_DESC]: '높은가격순',
  [SearchListProductSortType.PRICE_SORT_ASC]: '낮은가격순',
  [SearchListProductSortType.RATING_SORT]: '상품평순'
  // [SearchListProductSortType.MOST_VIEW_SORT]: '조회순'
}

export enum CategoryListProductBenefitType {
  FREE_DELIVERY,
  COUPON,
  FREE_INTEREST
}

export interface CategorySearchDetailBenefit {
  type: number
  title: string
  checked?: boolean
}

export interface CategoryDetailedSearchModalProps
  extends CategoryDetailedSearchImageListProps,
    CategoryDetailedSearchSortProps,
    SearchDetailedSearchSortProps,
    CategoryDetailedSearchBenefitsProps,
    SearchDetailBrandsProps,
    SearchDetailRangeProps,
    SearchDetailCategoriesProps {
  activated?: string
  searchFilterInfo?: SearchFilterInfoModel
}

export interface CategoryDetailedSearchModalWrapEmits
  extends CategoryDetailedSearchImageListEmits,
    CategoryDetailedSearchSortEmits,
    SearchDetailedSearchSortEmits,
    CategoryDetailedSearchBenefitsEmits,
    SearchDetailBrandsEmits,
    SearchDetailRangeEmits,
    SearchDetailCategoriesEmits {
  (e: 'close'): void

  (e: 'onChangeTap', tap: string): void
}

export type CategoryDetailedSearchBenefitsEmits = (e: 'saveBenefits:methodBenefits', currentBenefits: CategoryListProductBenefitType[]) => void

export interface CategoryDetailedSearchBenefitsProps {
  currentBenefits?: CategoryListProductBenefitType[]
  haveCoupon?: boolean
}

export type CategoryDetailedSearchImageListEmits = (e: 'updateDisplayType:methodDisplay', currentDisplay: CategoryListProductDisplayType) => void

export interface CategoryDetailedSearchImageListProps {
  currentMethodDisplay?: CategoryListProductDisplayType
}

export type CategoryDetailedSearchSortEmits = (e: 'updateSort:methodSort', currentSort: CategoryListProductSortType) => void

export interface CategoryDetailedSearchSortProps {
  currentSort?: CategoryListProductSortType
}

export type SearchDetailedSearchSortEmits = (e: 'updateSort:methodSortSearch', currentSortSearch: SearchListProductSortType) => void

export interface SearchDetailedSearchSortProps {
  currentSortSearch?: SearchListProductSortType
}

// Sort classification (01: Recommended products / 02: Popular products / 03: Recently registered / 04: High prices / 05: Low prices / 06: Product reviews)
export const CategorySearchProductSortOptions = [
  {
    label: '추천상품순',
    value: '01'
  },
  {
    label: '인기상품순',
    value: '02'
  },
  {
    label: '신규상품순',
    value: '03'
  },
  {
    label: '높은가격순',
    value: '04'
  },
  {
    label: '낮은가격순',
    value: '05'
  },
  {
    label: '상품평순',
    value: '06'
  }
]
