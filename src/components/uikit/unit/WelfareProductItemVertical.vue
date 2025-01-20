<script setup lang="ts">
import { WelfareUnitProductEmits, WelfareUnitProductProps } from '@/models/uikits/WelfareProductTypes'
import WelfareViewPercent from '../product/WelfareViewPercent.vue'
import WelfareViewPrice from '../product/WelfareViewPrice.vue'
import WelfareViewPriceBorderTop from '../product/WelfareViewPriceBorderTop.vue'
import IconStar from '@/components/icons/IconStar.vue'
import WelfareButtonTap from '../button/WelfareButtonTap.vue'
import WelfareButtonHeart from '../button/WelfareButtonHeart.vue'
import IconCart from '@/components/icons/IconCart.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import { PRODUCT_DETAIL_ROUTER, formatNumberDot } from '@/commons'
import { useProductDetailHeart } from '@/composables/products/detail/useProductDetailHeart'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useProductDetailAddToCart } from '@/composables/products/detail/useProductDetailAddToCart'
import { ProductDetailClassificationEnum } from '@/models/views/products/ProductDetailReviewModel'
import { YesNoEnum } from '@/models/common'

const props = withDefaults(defineProps<WelfareUnitProductProps>(), {
  isCoupon: true,
  isHeart: true,
  isCart: true,
  rateStarClass: 'wf-mt-auto'
})
const emits = defineEmits<WelfareUnitProductEmits>()
const { isHeart: isActiveHeart, handleChangeActiveHeart } = useProductDetailHeart(props.data?.productLikeYn === YesNoEnum.Y)
const { processLink } = useBuildLink()
const { handleClickAddToCart } = useProductDetailAddToCart()
const handleClickAddToCartPassHeart = (key: number) => {
  handleClickAddToCart(key, isActiveHeart, handleChangeActiveHeart)
}
</script>

<template>
  <div class="">
    <div class="wf_flex wf-space-x-15 wf-pb-10">
      <!-- <figure>
        <img class="wf-unit_product-vertical--image" :src="props.data.thumbnailProduct" alt="" />
      </figure> -->
      <router-link :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)">
        <WelfareImage
          :alt="props.data.name"
          :data-src="props.data.thumbnailProduct"
          :src="props.data.thumbnailProduct"
          :class-group="'wf-unit_product-vertical--image'"
        />
      </router-link>
      <div
        :class="`wf_width-full wf_flex wf_flex-col 
          ${!props.isCoupon && !props.data.benefits && !props.isHeart && !props.isCart ? 'wf-mt-16' : 'wf-mt-10'}
        }`"
      >
        <div>
          <router-link :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)">
            <div class="wf_flex wf-space-x-8">
              <WelfareViewPercent v-if="props.data.percent" type="sm" :percent="props.data.percent ?? 0" />
              <WelfareViewPrice type="sm" :price="props.data.pricePromotion ?? props.data.price ?? 0" />
              <span v-if="props.data.inventoryQuantity" class="wf-font_13--light wf_letter-spacing--1"
                >/ {{ formatNumberDot(props.data.inventoryQuantity) }} 개</span
              >
            </div>
            <WelfareViewPriceBorderTop
              :isLineThrough="props.isLineThrough"
              v-if="props.data.pricePromotion"
              class="wf-mt-6 wf-font_14-reg--lp1"
              :price="props.data.price ?? 0"
            />
          </router-link>
        </div>
        <div class="wf-mt-10 wf_flex-1 wf_flex wf_flex-col wf_width-full">
          <router-link :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)" v-if="props.data.name">
            <p class="wf-font_15-mid--lh140 wf-color--g-333 line-clamp-2">{{ props.data.name }}</p>
          </router-link>
          <!-- <div v-if="props.data.rateStar" class="wf_flex wf-mt-12 wf_items-end wf_justify-end wf-space-x-10">
            <div class="wf_flex wf-space-x-4">
              <IconStar :small="true" />
              <span class="wf-color--g-555 wf_align-self-center wf-font_14-reg">{{ props.data.rateStar.toFixed(1) }}</span>
            </div>
            <span class="wf-color--g-ddd wf-font_12--reg">|</span>
            <span class="wf-color--g-555 wf_align-self-center wf-font_14-reg">{{ props.data.rateCountStar }}+건</span>
          </div> -->
          <div
            v-if="props.data.rateStar || props.data.rateStar == 0"
            class="wf_flex wf_height-18 wf_items-end wf_justify-end wf-space-x-5"
            :class="`${props.rateStarClass}`"
          >
            <div class="wf_flex wf-space-x-4 wf_align-self-center">
              <IconStar :small="true" />
              <span class="wf-color--g-555 wf-font_14-reg--lp1 wf_align-self-center">{{ props.data.rateStar.toFixed(1) }}</span>
            </div>
            <div class="wf-color--g-bbb wf-font_13--reg">|</div>
            <span class="wf-color--g-555 wf-font_14-reg--lh130 wf_align-self-center">{{ props.data.rateCountStar }}+건</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="props.isCoupon || props.data.benefits || props.isHeart || props.isCart"
      class="wf-pt-9 wf_flex wf_justify-between wf-br-t-1 wf-br--g-e-7"
    >
      <div class="wf_flex wf_items-center wf-space-x-12">
        <WelfareButtonTap
          v-if="props.isCoupon && props.data.productClassification === ProductDetailClassificationEnum.ticket"
          text="e쿠폰"
          class="wf_height-20 wf_width-44 wf-font_11--reg wf-font_11-i wf-p-0"
          type="tapSquare"
        />
        <div v-if="props.data.benefits" class="wf-font_14-reg--lh130 wf-color--g-777 wf-space-x-5 wf_flex wf_items-center">
          <span>무료배송</span>
          <span class="wf-color--g-bbb">•</span>
          <span>무이자</span>
        </div>
      </div>
      <div v-if="props.isHeart || props.isCart" class="wf_flex wf-space-x-8">
        <WelfareButtonHeart
          v-if="props.isHeart"
          :size="24"
          type="lg"
          :is-active="isActiveHeart"
          @update:is-active="
            () => {
              try {
                handleChangeActiveHeart(props.data?.id ?? '')
                emits('is-heart', props.data?.id || '')
              } catch {
                // empty
              }
            }
          "
        />
        <button v-if="props.isCart" @click="handleClickAddToCartPassHeart(Number(props?.data?.id ?? 0))">
          <IconCart :width="24" :height="24" />
        </button>
      </div>
    </div>
  </div>
</template>
