<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageProductActionCard from '@/components/myPage/products/common/MyPageProductActionCard.vue'
import MyPageNotFound from '@/components/myPage/products/common/MyPageNotFound.vue'
import MyPageCheckbox from '@/components/myPage/products/common/MyPageCheckbox.vue'
import IconCart from '@/components/icons/IconCart.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { onMounted, computed, watch, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { MyPageLikeProduct } from '@/models/views/myPage/MyPageProductReview'
import { myPageProductShopApi } from '@/services/api/myPage/MyPageProduct'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import MyPageLoadingBoundary from '@/components/myPage/common/MyPageLoadingBoundary.vue'
import useAsync from '@/composables/common/useAsync'
import { useMyPagePrd } from '@/composables/myPage/useMyPagePrd'
import useInfiniteScroll from '@/composables/common/useInfinteScroll'
import { useI18n } from 'vue-i18n'
import { productDetailApi } from '@/services/api/products/detail/ProductDetailApi'
import WelfareFooter from '@/components/layout/WelfareFooter.vue'

const { t } = useI18n()
const prdList: Ref<MyPageLikeProduct[]> = ref([])
const router = useRouter()
const page = ref(1)
const targetRef: Ref<HTMLDivElement | null> = ref(null)
const intersecting = useInfiniteScroll(targetRef)
const { selectedList, openModal, cartLikePrd, oepnModalConfirm, closeAllModal } = useMyPagePrd<MyPageLikeProduct>()

const { fetchData, pageInfo, data, loading } = useAsync<MyPageLikeProduct[]>({
  apiCall: () => myPageProductShopApi.getWelfarePrdLikeList(page.value)
})

const firstLoading = computed(() => loading && page.value === 1)

const deletedProductInit = () => {
  selectedList.value = []
  closeAllModal?.()
  openModal({
    content: t('myPage.button.title')
  })
}

const deleteLikePrd = (productKey: number) => {
  productDetailApi
    .deleteItemLike(productKey)
    .then(() => {
      fetchData()
      prdList.value = prdList.value.filter((item) => item.productKey !== productKey)
      deletedProductInit()
    })
    .catch((e) => console.error(e))
}

const seletedDeletedPrd = async () => {
  const productKeyList = selectedList.value.map((productKey) => ({ productKey }))
  try {
    await myPageProductShopApi.deleteLikeProductList(productKeyList)
    await fetchData()
    prdList.value = prdList.value.filter((item) => !selectedList.value.includes(item.productKey))
    deletedProductInit()
  } catch (error) {
    console.error(error)
  }
}

const seletedDeleteProcess = () => {
  const isSeleted = selectedList.value.length > 0

  if (!isSeleted) {
    openModal({
      content: t('myPage.button.title1')
    })
    return
  }
  oepnModalConfirm({
    content: t('myPage.button.title2'),
    onConfirm: () => seletedDeletedPrd()
  })
}

const isAllChecked = computed({
  get: () => {
    if (!data.value) return []
    return data.value.length > 0 && selectedList.value.length === prdList.value.length ? ['all'] : []
  },
  set: (val: string[]) => {
    if (val[0] === 'all' && prdList.value) {
      selectedList.value = prdList.value.map((item) => item.productKey)
    } else {
      selectedList.value = []
    }
  }
})

watch(intersecting, (val) => {
  if (data.value && page.value * 5 > pageInfo?.totalCount) return

  if (val) {
    page.value++
    init()
  }
})

const init = async () => {
  const data = await fetchData()
  if (!data?.value) return
  prdList.value = prdList.value.concat(data.value)
}

onMounted(() => {
  init()
})
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="t('myPage.like.title')" class="wf-px-20--i">
    <div class="prd-like-header wf-py-20 wf-px-16">
      <div class="prd-like-header-left">
        <MyPageCheckbox v-model="isAllChecked" input-id="all" value="all" />
        <p class="wf-font_13--bold">
          {{ $t('common.prd') }}
          <span v-if="pageInfo?.totalCount" class="wf-color--red-ff-3-b-4-f wf-pl-2">{{ pageInfo.totalCount }}개</span>
        </p>
      </div>
      <div class="prd-like-header-right">
        <WelfareButtonLine type="sm" :text="$t('myPage.button.title3')" @click="seletedDeleteProcess" />
      </div>
    </div>
  </WelfareTitleTextStickyTop>

  <WelfareLineHorizontal />

  <MyPageLoadingBoundary :loading="firstLoading && loading">
    <template #content>
      <div v-if="prdList && prdList?.length > 0" class="prd-like-content wf-py-20 wf-px-16">
        <MyPageProductActionCard
          v-for="item in prdList"
          :product-key="item.productKey"
          :key="item.productName"
          :sale-price="item.salePrice"
          :product-discount-rate="item.productDiscountRate"
          :fo-attach-file-list="item.foAttachFileList"
          :immediately-product-discount-amount="item.immediatelyProductDiscountAmount"
        >
          <template #header>
            <div class="prd-like-card">
              <MyPageCheckbox :value="item.productKey" inputId="prdList" v-model="selectedList" />
              <span
                class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140"
                @click="item.productKey && router.push(`/product-detail?productKey=${item.productKey}`)"
              >
                {{ item.productName }}</span
              >
            </div>

            <button
              class="wf_height-14 wf-pr-10"
              @click="() => oepnModalConfirm({ content: t('myPage.button.title2'), onConfirm: () => deleteLikePrd(item.productKey) })"
            >
              <IconTrash />
            </button>
          </template>
          <template #footer>
            <div class="prd-like-cart">
              <div class="prd-like-cart-icon">
                <IconCart :width="15" :height="15" />
              </div>
              <WelfareButtonLine
                type="sm"
                lg-state="black-line"
                class="wf_flex-1 prd-like-cart-button"
                :text="$t('common.cart')"
                @click="
                  () =>
                    oepnModalConfirm({
                      content: $t('myPage.button.title4'),
                      onConfirm: () => {
                        cartLikePrd(item.productKey)
                        closeAllModal?.()
                      }
                    })
                "
              />
            </div>
          </template>
        </MyPageProductActionCard>
        <div ref="targetRef" />
      </div>

      <MyPageNotFound v-else :desc="$t('myPage.notFound.likeTitle')">
        <template #content>
          <WelfareButtonLine
            type="md"
            lg-state="black-line"
            :text="$t('myPage.button.title5')"
            @click="() => router.push('/my-page/products/recently')"
          />
        </template>
      </MyPageNotFound>

      <WelfareFooter :is-hide-navigation="false" />
    </template>
  </MyPageLoadingBoundary>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/product/_welfare-my-page-like.scss');
</style>
