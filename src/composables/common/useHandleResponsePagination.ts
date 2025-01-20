// import type { ApiResponse } from 'src/api/types'
import { PAGE_SIZE } from '@/commons'
import { Ref, computed, ref } from 'vue'

/**
 * @author CuongPG
 * A hooks to handle pagination response, refresh and pull to refresh
 */
export type Response =
  | any
  | {
      data: any
    }
/**
 * A hooks to handle pagination response, refresh and pull to refresh
 * @param callback A callback will call refresh and load more event fire. it provide page token and page size for pagination api
 * @param pageSize config page size of each call api
 * @param hasContent the array content in contents object
 * @returns A promise contain response from pagination api
 */
export function useHandleResponsePagination<T>(
  callback: (pageToken: number, numberOfPageSize: number) => Promise<any>,
  pageSize: number = PAGE_SIZE,
  hasContent: boolean = false,
  initData?: T[]
) {
  /**
   *  A state store data that api return will save here
   */
  const data = ref<T[]>(initData ?? []) as Ref<T[]>
  /**
   * Current page token
   */
  let pageToken = 0
  let isLoadingRef = false
  /**
   * mark is calling api
   */
  const isLoading = ref(false)
  /**
   * mark is loading more
   */
  const isLoadMore = ref(false)
  // let isLoadMoreRef = false
  /**
   * mark the current page isn't latest page, can request a least one page to load more data
   */
  const hasMore = ref(false)

  const setHasMore = (value: boolean) => {
    hasMore.value = value
  }

  const setPageToken = (value: number) => {
    pageToken = value
  }

  const setLoadingRef = (value: boolean) => {
    isLoading.value = value
    isLoadingRef = value
  }

  const setLoadMoreRef = (value: boolean) => {
    isLoadingRef = value
  }

  const setData = (items: T[]) => {
    data.value = items
  }

  /**
   * handle response from api
   * @param response
   */

  const handleSuccessResponse = (response?: Response, fromLoadMore?: boolean) => {
    if (fromLoadMore && isLoading.value) return
    setLoadingRef(false)
    setLoadMoreRef(false)
    const result = (hasContent ? response?.data?.contents : response?.data) as T[]
    const length = (hasContent ? response?.data?.contents : response?.data)?.length ?? 0

    if (length === 0) {
      if (pageToken === 0) {
        setData(result)
      }
      setHasMore(false)
    } else if (pageToken === 0) {
      if (length < 1) {
        setHasMore(false)
        setData(result)
      } else {
        pageToken += 1
        setData(result)
        setHasMore(true)
      }
    } else if (length < 1) {
      setHasMore(false)
      setData((data.value ?? []).concat(result))
    } else {
      setPageToken(pageToken + 1)
      setData((data.value ?? []).concat(result))
      setHasMore(true)
    }
    // } else if (pageToken === 0) {
    //   setData([])
    //   setHasMore(false)
    // }

    if (response?.page && response?.page.totalCount < pageToken * pageSize) {
      setHasMore(false)
    }
  }

  const handleFailedResponse = (error: any) => {
    setHasMore(false)
    setLoadingRef(false)
    setLoadMoreRef(false)
    isLoadMore.value = false
  }

  /** reset all state to can refresh data */
  const reload = () => {
    // setLoading(false)
    isLoadMore.value = false
    setHasMore(false)
    setPageToken(0)
  }

  /** reset data state */
  const resetData = () => {
    setData([])
  }

  /**
   * handle response when get data from load more
   */
  const handleLoadMore = () => {
    // if (hasMore.value && !isLoadMore.value && !isLoadingRef && !isLoadMoreRef) {
    if (hasMore.value && !isLoadMore.value && !isLoadingRef) {
      setLoadMoreRef(true)
      if ((data.value?.length ?? 0) >= pageSize) {
        isLoadMore.value = true
      } else {
        isLoadMore.value = false
      }
      return callback(pageToken, pageSize)
        .then((response) => {
          handleSuccessResponse(response, true)
          return Promise.resolve(response)
        })
        .catch((ex) => {
          handleFailedResponse(ex)
          return Promise.reject(ex)
        })
        .finally(() => {
          isLoadMore.value = false
        })
    }
    return undefined
  }

  /**
   * refresh data in page in the first time open page
   */
  const refresh = () => {
    if (!isLoadingRef) {
      setLoadingRef(true)
      setPageToken(0)
      return callback(0, pageSize)
        .then((response) => {
          handleSuccessResponse(response, false)
          return Promise.resolve(response)
        })
        .catch((ex) => {
          handleFailedResponse(ex)
          return Promise.reject(ex)
        })
    }
    return undefined
  }

  /**
   * function will use when implementing pull to refresh content
   */

  const pullToRefresh = () => {
    reload()
    return refresh()
  }

  /**
   * a variable mark user is pull to refresh
   */
  const isRefreshing = computed(() => isLoading.value && data !== undefined)

  const isEmpty = computed(() => data !== undefined && data.value?.length === 0)

  return {
    data: data ?? [],
    isLoadMore,
    isLoading,
    isRefreshing,
    refresh,
    handleLoadMore,
    pullToRefresh,
    resetData,
    setData,
    isEmpty,
    setPageToken,
    setHasMore,
    pageToken,
    hasMore
  }
}
