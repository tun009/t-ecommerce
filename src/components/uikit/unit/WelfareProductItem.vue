<script setup lang="ts">
import { BigSalePNG } from '@/assets/images'
import { PRODUCT_DETAIL_ROUTER } from '@/commons'
import IconCart from '@/components/icons/IconCart.vue'
import IconPlusCirce from '@/components/icons/IconPlusCirce.vue'
import IconStar from '@/components/icons/IconStar.vue'
import WelfareCountDown from '@/components/widgets/WelfareCountDown.vue'
import WelfareThumbCircle from '@/components/widgets/avatar/WelfareThumbCircle.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useProductDetailAddToCart } from '@/composables/products/detail/useProductDetailAddToCart'
import { useProductDetailHeart } from '@/composables/products/detail/useProductDetailHeart'
import { WelfareUnitProductEmits, WelfareUnitProductProps } from '@/models/uikits/WelfareProductTypes'
import WelfareButtonHeart from '../button/WelfareButtonHeart.vue'
import WelfareButtonLine from '../button/WelfareButtonLine.vue'
import WelfareButtonTap from '../button/WelfareButtonTap.vue'
import WelfareViewPercent from '../product/WelfareViewPercent.vue'
import WelfareViewPrice from '../product/WelfareViewPrice.vue'
import WelfareViewPriceBorderTop from '../product/WelfareViewPriceBorderTop.vue'
import { ProductDetailClassificationEnum, ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'
import { computed } from 'vue'
import { YesNoEnum } from '@/models/common'

const props = withDefaults(defineProps<WelfareUnitProductProps>(), {
  type: 'lg'
})
const emits = defineEmits<WelfareUnitProductEmits>()
const { handleChangeActiveHeart, isHeart: isActiveHeart } = useProductDetailHeart(props.data?.productLikeYn === YesNoEnum.Y)
const { processLink } = useBuildLink()
const { handleClickAddToCart } = useProductDetailAddToCart()
const handleClickAddToCartPassHeart = (key: number) => {
  handleClickAddToCart(key, isActiveHeart, handleChangeActiveHeart)
}
const isOnSale = computed(() => {
  return props.data.productSaleStatus === ProductDetailSaleStatus.onSale || !props.data.productSaleStatus
})
</script>
<template>
  <div class="">
    <div class="wf_unit-product-image">
      <figure class="wf_unit-product-image-item wf_relative">
        <div class="wf-bg--red-ff-3-b-4-f wf_unit-product-image-item-sale" v-if="props.isSale">
          <img :src="BigSalePNG" alt="big-sale" />
        </div>
        <router-link :class="{ 'wf-product-overlay': !isOnSale }" :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)">
          <WelfareImage
            :alt="props.data.name"
            :data-src="props.data.thumbnailProduct"
            :src="props.data.thumbnailProduct"
            :class-group="{ 'wf-image-link-p': type === 'lg' }"
          />
        </router-link>
      </figure>
      <WelfareCountDown :time-count="props.data.timeCount" :message="props.data.titleDayWarning" />
      <div v-if="props.data.thumbnailBo" class="wf_unit-product-image-relate">
        <span class="wf_unit-product-image-relate-icon">
          <IconPlusCirce />
        </span>
        <figure class="wf_unit-product-image-relate-item">
          <img alt="" :src="props.data.thumbnailBo" />
        </figure>
      </div>
    </div>
    <div>
      <div
        class="wf_flex wf-space-x-5 wf_justify-between"
        v-if="props.isCoupon || props.data.buyers || props.isHeart || props.isBuy || props.isCart"
        :class="[{ 'wf-mt-15': props.type === 'lg', 'wf-py-8 wf-br-b-1 wf-br--g-e-7': props.type !== 'lg' }]"
      >
        <div v-if="props.isCoupon || props.data.buyers" class="wf_flex wf-space-x-5 wf_items-center">
          <WelfareButtonTap
            v-if="props.isCoupon && props.data.productClassification === ProductDetailClassificationEnum.ticket"
            text="e쿠폰"
            class="wf_height-20 wf_width-44 wf-font_11--reg wf-font_11-i wf-p-0 wf_pointer-events-none"
            type="tapSquare"
          />
          <div
            v-if="props.data.buyers && props.data.buyers.length"
            class="wf_unit-product-group-buyer"
            :style="`--avatar-count: ${props.data.buyers.length > 3 ? 2 : props.data.buyers.length - 1}`"
          >
            <WelfareThumbCircle v-for="(item, index) in props.data.buyers" :key="index" :style="`--avatar-index: ${index}`" :url="item" />
          </div>
          <p v-if="props.data.buyerCount" class="wf-font_14-reg--lh130 wf-color--g-333 wf-mt--1">{{ props.data.buyerCount }}명 구매중</p>
        </div>
        <div v-else />
        <router-link
          :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)"
          v-if="props.isPrice && !props.isCoupon && !props.data.buyers"
          class="wf_flex wf_items-center wf_flex-wrap wf-space-y-5 wf-space-x-6"
        >
          <div class="wf_flex wf-space-x-8">
            <WelfareViewPercent
              classPercent="wf-mt-5"
              class="wf-color--f-95729"
              v-if="props.data.percent"
              :type="props.type === 'lg' ? 'lg' : 'sm'"
              :percent="props.data.percent"
            />
            <WelfareViewPrice :type="props.type === 'lg' ? 'lg' : 'sm'" :price="props.data.pricePromotion || props.data.price || 0" />
          </div>
          <WelfareViewPriceBorderTop :isLineThrough="props.isLineThrough" v-if="props.data.pricePromotion" :price="props.data.price ?? 0" />
        </router-link>
        <div
          v-if="props.isHeart || props.isBuy || props.isCart"
          class="wf_flex"
          :class="[{ 'wf-space-x-5': props.type === 'sm' || props.type === 'lg', 'wf-space-x-8': props.type === 'md' }]"
        >
          <WelfareButtonHeart
            :size="props.type !== 'lg' ? 24 : undefined"
            v-if="props.isHeart"
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
          <WelfareButtonLine
            v-if="props.isBuy"
            @click="handleClickAddToCartPassHeart(Number(props?.data?.id ?? 0))"
            class="wf_width-80 wf-font_15-important"
            type="sm"
            sm-sate
            :disabled="!isOnSale"
            :text="isOnSale ? '구매하기' : '일시품절'"
          />
          <button v-if="props.isCart" @click="handleClickAddToCartPassHeart(Number(props?.data?.id ?? 0))">
            <IconCart :width="24" :height="24" />
          </button>
        </div>
      </div>
      <div v-else class="wf_height-2" />
      <router-link
        :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)"
        v-if="!props.isPrice"
        class="wf-mt-10 wf_flex wf_items-center wf_flex-wrap wf-space-y-5"
        :class="[
          {
            'wf-space-x-6': props.type === 'lg',
            'wf-space-x-7': props.type !== 'lg',
            'wf-space-x-8--i': !props.isCoupon && !props.data.buyers && !props.isHeart && !props.isBuy && !props.isCart
          }
        ]"
      >
        <WelfareViewPercent v-if="props.data.percent" :type="props.type === 'lg' ? 'lg' : 'sm'" :percent="props.data.percent" />
        <WelfareViewPrice :type="props.type === 'lg' ? 'lg' : 'sm'" :price="props.data.pricePromotion || props.data.price || 0" />
        <WelfareViewPriceBorderTop :isLineThrough="props.isLineThrough" v-if="props.data.pricePromotion" :price="props.data.price ?? 0" />
      </router-link>
      <router-link
        :to="processLink(`${PRODUCT_DETAIL_ROUTER}?productKey=${props.data.id ?? 0}`)"
        v-if="props.data.name"
        class="wf_block"
        :class="[{ 'wf-mt-10': props.type !== 'ssm' }, { 'wf-mt-15': props.type === 'ssm' }]"
      >
        <p
          class="wf-font_17-reg--lh140 wf-color--g-333"
          :class="[
            { 'wf-font_15-mid--lh140': props.type !== 'lg' },
            { 'wf-line-clamp-1 ': props.type === 'ssm' },
            { 'line-clamp-2': props.type !== 'ssm' }
          ]"
          v-html="props.data.name"
        ></p>
      </router-link>
      <div
        v-if="props.data.rateStar || props.data.rateStar == 0"
        class="wf_flex wf_height-18 wf-mt-7 wf_items-end wf-space-x-10"
        :class="[{ 'wf-mt-10': props.type === 'md' }, { 'wf-mt-8': props.type !== 'md' }]"
      >
        <div class="wf_flex wf-space-x-4 wf_align-self-center">
          <IconStar :small="true" />
          <span class="wf-color--g-555 wf-font_14--reg wf_align-self-center">{{ props.data.rateStar.toFixed(1) }}</span>
        </div>
        <div class="wf-color--g-bbb wf-font_13--reg">|</div>
        <span class="wf-color--g-555 wf-font_14-reg--lh130 wf_align-self-center">{{ props.data.rateCountStar }}+건</span>
      </div>
      <div
        v-if="props.data.freeDeliveryYn === YesNoEnum.Y || props.data.freeInterestYn === YesNoEnum.Y"
        class="wf-mt-14 wf-font_14-reg--lh130 wf-color--g-777 wf-space-x-4 wf_flex wf_items-center"
      >
        <span v-if="props.data.freeDeliveryYn === YesNoEnum.Y">무료배송 여부</span>
        <span v-if="props.data.freeDeliveryYn === YesNoEnum.Y && props.data.freeInterestYn === YesNoEnum.Y" class="wf-color--g-bbb">•</span>
        <span v-if="props.data.freeInterestYn === YesNoEnum.Y">무이자 여부</span>
      </div>
    </div>
  </div>
</template>
