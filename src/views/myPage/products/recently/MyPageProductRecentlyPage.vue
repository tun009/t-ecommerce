<script setup lang="ts">
import { Ref, ref, computed, watch } from 'vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageProductActionCard from '@/components/myPage/products/common/MyPageProductActionCard.vue'
import MyPageNotFound from '@/components/myPage/products/common/MyPageNotFound.vue'
import MyPageCheckbox from '@/components/myPage/products/common/MyPageCheckbox.vue'
import IconCart from '@/components/icons/IconCart.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { useRouter } from 'vue-router'
import { MyPageRecentlyProduct } from '@/models/views/myPage/MyPageProductReview'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useMyPagePrd } from '@/composables/myPage/useMyPagePrd'
import { useRecentlyItemStore } from '@/stores/recentlyPrd'
import useInfiniteScroll from '@/composables/common/useInfinteScroll'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'
import { onBeforeMount } from 'vue'
import WelfareFooter from '@/components/layout/WelfareFooter.vue'

const { t } = useI18n()
const router = useRouter()
const page = ref(1)
const targetRef: Ref<HTMLDivElement | null> = ref(null)
const intersecting = useInfiniteScroll(targetRef)
const store = useRecentlyItemStore()
const { selectedList, closeAllModal, cartLikePrd, oepnModalConfirm } = useMyPagePrd<MyPageRecentlyProduct>()
const { openModal } = useModalNotification()

const prdLists = computed(() => {
  return store.prdList.slice(0, page.value * 5)
})

const isAllChecked = computed({
  get: () => {
    if (!prdLists.value) return []
    return prdLists.value.length > 0 && selectedList.value.length === prdLists.value.length ? ['all'] : []
  },
  set: (val) => {
    if (val[0] === 'all') {
      selectedList.value = prdLists.value.map((item) => item.productKey)
    } else {
      selectedList.value = []
    }
  }
})

watch(intersecting, (val) => {
  if (page.value * 5 > prdLists.value.length) return

  if (val) {
    page.value++
  }
})

const seletedDeletedPrd = () => {
  const productKeyList = selectedList.value.map((productKey) => productKey)
  store.deletePrdInfo(productKeyList)
  closeAllModal?.()
  selectedList.value = []
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
    content: '해당 상품을 삭제하시겠습니까?',
    onConfirm: () => seletedDeletedPrd()
  })
}

onBeforeMount(() => {
  store.filterDaysAgoPrdInfo()
})
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="t('myPage.recently.title')" class="wf-px-20--i" />

  <div class="prd-like-header wf-py-20 wf-px-16">
    <div class="prd-like-header-left">
      <MyPageCheckbox v-model="isAllChecked" input-id="all" value="all" />
      <p class="wf-font_13--bold">
        {{ t('common.prd') }} <span v-if="prdLists" class="wf-color--red-ff-3-b-4-f wf-pl-2">{{ store.prdList.length }}개</span>
      </p>
    </div>
    <div class="prd-like-header-right">
      <WelfareButtonLine type="sm" :text="t('myPage.button.title3')" @click="seletedDeleteProcess" />
    </div>
  </div>
  <WelfareLineHorizontal />

  <div v-if="prdLists?.length > 0" class="prd-like-content wf-py-20 wf-px-16">
    <MyPageProductActionCard
      v-for="item in prdLists"
      :product-key="item.productKey"
      :key="item.productKey"
      :fo-attach-file-list="item.foAttachFileList"
      :sale-price="item.salePrice"
    >
      <template #header>
        <div class="prd-like-card">
          <MyPageCheckbox :value="item.productKey" inputId="prdList" v-model="selectedList" />
          <span class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140"> {{ item.productName }}</span>
        </div>

        <button
          class="wf_height-14 wf-pr-10"
          @click="
            () =>
              oepnModalConfirm({
                content: t('myPage.button.title2'),
                onConfirm: () => {
                  selectedList = []
                  store.deletePrdInfo([item.productKey])
                  closeAllModal?.()
                }
              })
          "
        >
          <IconTrash />
        </button>
      </template>
      <template #footer>
        <div class="prd-like-cart">
          <div class="prd-like-cart-icon"><IconCart :width="15" :height="15" /></div>
          <WelfareButtonLine
            type="sm"
            lg-state="black-line"
            class="wf_flex-1 prd-like-cart-button"
            :text="$t('common.cart')"
            @click="
              () =>
                oepnModalConfirm({
                  content: t('myPage.button.title4'),
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

  <MyPageNotFound v-else :desc="t('myPage.recently.title2')">
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

<style lang="scss">
@import url('@/assets/styles/views/myPage/product/_welfare-my-page-like.scss');
</style>
