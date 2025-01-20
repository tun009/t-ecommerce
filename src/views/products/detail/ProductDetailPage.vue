<!-- FO_MC_IT011000 -->
<script setup lang="ts">
import { getNumberMoney } from '@/commons'
import IconClock from '@/components/icons/IconClock.vue'
import ProductDetailGroupImage from '@/components/products/detail/ProductDetailGroupImage.vue'

import ProductDetailFloatBottomButton from '@/components/products/detail/ProductDetailFloatBottomButton.vue'
import WelfareButtonHeart from '@/components/uikit/button/WelfareButtonHeart.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareProductDetail from '@/components/uikit/product/WelfareProductDetail.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import ProductDetailImageZoomPage from './productCodeTab/ProductDetailImageZoomPage.vue'
import { ProductCodeTabImage } from '@/assets/images'
import ProductDetailTabPage from './productCodeTab/ProductDetailTabPage.vue'
import { useProductDetailPage } from '@/composables/products/detail/useProductDetailPage'
import { ProductDetailClassificationEnum, ProductDetailOptionTypeEnum } from '@/models/views/products/ProductDetailReviewModel'

const {
  productDetail,
  handleShowModalChooseOption,
  isHeart,
  handleChangeActiveHeart,
  productKey,
  percentDiscount,
  isDisabledButtonBuy,
  textButtonBuy,
  handleClickAddToCart,
  listSellerShipments,
  productBaseInfoCount,
  handleModalInfoDiscount,
  handleGetCouponClicked,
  goToHome,
  showImage,
  openImage,
  handleLinkProductInformation,
  refExpander,
  remainingTime,
  productQATabInfo
} = useProductDetailPage()
</script>
<template>
  <div>
    <div class="wf-relative wf-bg--g-fff" v-if="!showImage">
      <WelfareTitleTextStickyTop
        @on-click-home-right="goToHome"
        display-back-icon
        display-menu-icon
        display-home-right-icon
        display-search-icon
        display-cart-icon
      />
      <div v-if="remainingTime" class="wf_height-50 wf_flex wf_justify-center wf-bg--g-f-5-f-6-fa wf-space-x-12 wf_items-center">
        <div class="wf_flex wf_items-center wf-space-x-5">
          <IconClock />
          <span class="wf-color--blue-4075-f-3 wf-font_17--bold">오늘의 특가</span>
        </div>
        <p class="wf-font_17--mid wf-color--g-111">{{ remainingTime }}</p>
      </div>
      <div>
        <ProductDetailGroupImage
          v-if="productDetail?.foAttachFileList && productDetail?.foAttachFileList.length"
          :listBanner="productDetail?.foAttachFileList"
        />
        <WelfareBox :is-padding-vertical="false" :is-padding-horizontal="false">
          <WelfareProductDetail
            @link-click="handleLinkProductInformation"
            class="wf-px-16"
            :sale-price="productDetail?.salePrice ?? 0"
            :product-discount-amount="getNumberMoney(productDetail?.immediatelyProductDiscountAmount)"
            :percent="percentDiscount"
            :name="productDetail?.productName ?? ''"
            :review-count="productBaseInfoCount?.reviewCount ?? 0"
            :review-star-point="productBaseInfoCount?.reviewStarPoint ?? 0"
            :productClassificationCode="productDetail?.productClassificationCode ?? ''"
            @question-click="handleModalInfoDiscount"
            @get-coupon="handleGetCouponClicked"
            :is-approximately="productDetail?.optionType ? productDetail?.optionType !== ProductDetailOptionTypeEnum.singleOption : false"
          />
        </WelfareBox>
      </div>
      <!-- <WelfareBox class="wf-pt-32 wf-pb-30" :is-padding-vertical="false"> -->
      <!-- <div class="wf_flex wf_items-center wf-space-x-19">
          <div class="wf_flex wf_items-center wf-space-x-7">
            <span class="wf-font_15--bold wf-color--g-333">청구할인</span>
            <IconQuestionGreyCircle />
          </div>
          <div v-if="productDetail?.deliveryFee > 0" class="wf_flex wf-space-x-6">
            <div class="wf_flex wf-font_13--mid wf-color--g-333">
              <WelfareViewPrice :price="productDetail?.deliveryFee ?? 0" class="wf-font_13--mid wf-color--g-333"
                class-price="wf-font_15--bold" /><span>~</span>
            </div>
            <button class="wf_flex wf_items-start">
              <IconArrowDownCircle />
            </button>
          </div>
        </div> -->
      <!-- Spec out -->
      <!-- <div class="wf-my-20 wf-p-20 wf_flex wf_flex-col wf-bg--g-f-5-f-6-fa wf-space-y-10">
          <ProductDetailGroupDiscountBank title="삼성카드 10%" />
          <ProductDetailGroupDiscountBank title="국민카드 7%" />
          <ProductDetailGroupDiscountBank title="현대카드 5%" />
        </div> -->

      <!-- Spec out -->
      <!-- <div class="wf_flex wf_flex-col wf-space-y-20 wf-mt-20">
          <div class="wf_flex wf-space-x-60 wf-color--g-333">
            <span class="wf-font_15--bold wf_width-25">적립</span>
            <span class="wf-font_15--reg">적립 2% 최대 {{ pointInfo?.maxSavingAmount }}원적립 </span>
          </div>
          <div class="wf_flex wf-space-x-60 wf-color--g-333">
            <div class="wf_width-25">
              <span class="wf-font_15--bold wf_width-25 wf_block">혜택</span>
            </div>
            <div>
              <p v-if="pointInfo?.benefitType === ProductDetailBenefitType.FLAT_RATE" class="wf-font_15-reg--lh140">{{ pointInfo?.useMinOrderAmount }}개(100,000원)이상 주문시 개당 10% 할인</p>
              <p v-else-if="pointInfo?.benefitType === ProductDetailBenefitType.FIXED_RATE" class="wf-font_15-reg--lh140 wf-mt-5">{{ pointInfo?.useMinOrderAmount }}개(100,000원)이상 주문시 개당 {{ pointInfo?.benefitValue }}원 할인</p>
            </div>
          </div>
          <div class="wf_flex wf-space-x-60 wf-color--g-333">
            <div class="wf_width-25">
              <span class="wf-font_15--bold wf_width-25 wf_block wf-mt-10">배송</span>
            </div>
            <div class="wf_flex-1 wf_flex wf-space-x-20">
              <div>
                <div v-if="listSellerShipments?.deliveryShipment?.deliveryGuideContent"
                  class="wf_flex wf_items-center wf_justify-between wf-font_15-reg--lh140 wf-color--g-333"
                  v-html="listSellerShipments?.deliveryShipment?.deliveryGuideContent ?? ''"></div>
                <div v-if="listSellerShipments?.deliveryShipment?.deliveryGuideContent" class="wf-font_15-reg--lh140">
                  <span
                    v-if="listSellerShipments?.deliveryShipment.deliveryFeeType !== SellerCompanyShipmentDeliveryStatus.free">배송비
                    {{ formatNumberDot(listSellerShipments?.deliveryShipment.defaultDeliveryFee) }}원</span>
                  <p v-if="listSellerShipments?.deliveryShipment.deliveryFeeType === SellerCompanyShipmentDeliveryStatus.conditional"
                    class="wf-mt-5">
                    ({{ formatNumberDot(listSellerShipments?.deliveryShipment.freeAvailableAmount) }}원이상 무료배송)
                  </p>
                </div>
                <a href="#"
                  class="wf_flex wf_items-center wf-space-x-6 wf-mt-10 wf-font_15--reg wf-color--g-111">
                  <span>도서/제주지역송비</span>
                  <IconArrowRight />
                </a>
              </div>
              <WelfareButtonLine class="wf_max-width-95" type="sm" sm-sate text="배송비 절약하기" />
            </div>
          </div>
        </div> -->

      <!-- </WelfareBox> -->
      <WelfareLineHorizontal />

      <!-- Spec out -->
      <!-- <WelfareBox :is-padding-vertical="false" class="wf_flex wf-py-30 wf_flex-col wf-space-y-10">
        <WelfareBannerImageProduct v-for="(item, index) in listBannerProduct" :key="index" :image="item.image"
          :title="item.title" :description="item.description" />
      </WelfareBox> -->

      <!-- Spec out -->
      <!-- <WelfareLineHorizontal />
      <WelfareBox :is-padding-vertical="false" :is-padding-horizontal="false" class="wf-py-30 wf-pl-16">
        <ProductDetailGroupRelate class="wf-mt-45" :data="dataRelated" title="다른 고객이 함께 본 상품" />
        <ProductDetailGroupRelate class="wf-mt-30" :data="dataRelated" title="카테고리 인기상품" />
      </WelfareBox> -->
      <WelfareLineHorizontal />
      <ProductDetailTabPage
        ref="refExpander"
        :product-detail="productDetail"
        :listSellerShipments="listSellerShipments"
        :show-image="openImage"
        :productCountTab="productQATabInfo"
      />
      <ProductDetailFloatBottomButton />
    </div>
    <ProductDetailImageZoomPage v-else :image-link="ProductCodeTabImage" :open-image="openImage" />
  </div>
  <WelfareBox class="wf_flex-order-999 wf_flex wf-space-x-10 wf-sticky-bottom wf_zIndex-10 wf-bg--white">
    <WelfareButtonHeart type="sm" :is-active="isHeart" @update:is-active="handleChangeActiveHeart(productKey)" />
    <WelfareButtonLine
      v-if="productDetail?.productClassificationCode !== ProductDetailClassificationEnum.ticket && !isDisabledButtonBuy"
      @click="handleClickAddToCart"
      class="wf_flex-1"
      text="장바구니"
      type="lg"
      lg-state="black-line"
    />
    <WelfareButtonLine
      @click="handleShowModalChooseOption"
      class="wf_flex-1"
      :disabled="isDisabledButtonBuy"
      :text="textButtonBuy"
      type="lg"
      lg-state="default"
    />
  </WelfareBox>
</template>
