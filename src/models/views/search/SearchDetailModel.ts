import { SearchFilterInfoModel } from '@/models/services/responses/search/SearchResponse'

export interface SearchDetailBrand {
  id: string
  title: string
  count: number
  checked?: boolean
}

export interface SearchDetailCategory {
  key: string
  label: string
  icon?: any
  value: string
  count?: number
  index?: number
  level: SearchDetailCategoryDeepth
  children?: SearchDetailCategory[]
}

export interface SearchDetailBrandsProps {
  currentBrands?: string[]
  searchFilterInfo?: SearchFilterInfoModel
}

export interface SearchDetailCategoriesProps {
  currentCategories?: string[]
  searchFilterInfo?: SearchFilterInfoModel
}

export enum SearchDetailCategoryDeepth {
  DEPTH1 = 'TREE_DEEP1',
  DEPTH2 = 'TREE_DEEP2',
  DEPTH3 = 'TREE_DEEP3'
}

export type SearchDetailCategoriesEmits = (e: 'saveCategories:methodCategory', currentCategories: string[]) => void

export type SearchDetailBrandsEmits = (e: 'saveBrands:methodBrands', currentBrands: string[]) => void

export interface SearchDetailRangeProps {
  currentRange?: number[]
  searchFilterInfo?: SearchFilterInfoModel
}

export type SearchDetailRangeEmits = (e: 'saveRange:methodRange', currentRange: number[]) => void
