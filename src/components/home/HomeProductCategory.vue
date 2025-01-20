<script lang="ts" setup>
import { HomeCategoryProps } from '@/models/views/home/HomeGnbProductModel'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { CATEGORY_ROUTER } from '@/commons'

const { processLink } = useBuildLink()
const props = defineProps<HomeCategoryProps>()
</script>

<template>
  <div class="wf-border-radius">
    <div class="wf-py-30 wf-px-16">
      <div class="wf-item-category">
        <template v-for="(item, index) in props.dataCategory" :key="item.displayCategoryId + index">
          <div class="wf_flex wf_flex-col wf-space-y-20" v-if="(index + 1) % 2 !== 0">
            <router-link :to="processLink(`${CATEGORY_ROUTER}?category1=${item.displayCategoryId}`)" class="wf-item-category-group">
              <div class="wf-item-category-img-group">
                <div class="wf-item-category-img">
                  <img loading="lazy" :src="item.linkUrl" :alt="item.displayCategoryName" class="wf-image-link-category" />
                </div>
              </div>
              <span class="wf-font_13--reg wf-item-name wf-color--g-33 wf-line-clamp-1">{{ item.displayCategoryName }}</span>
            </router-link>
            <div v-if="props.dataCategory[index + 1]" class="wf-item-category-group">
              <router-link
                :to="processLink(`${CATEGORY_ROUTER}?category1=${props.dataCategory[index + 1].displayCategoryId}`)"
                class="wf-item-category-img-group"
              >
                <div class="wf-item-category-img">
                  <img
                    loading="lazy"
                    :src="props.dataCategory[index + 1].linkUrl"
                    :alt="props.dataCategory[index + 1].displayCategoryName"
                    class="wf-image-link-category"
                  />
                </div>
              </router-link>
              <span class="wf-font_13--reg wf-item-name wf-color--g-33 wf-line-clamp-1">{{ props.dataCategory[index + 1].displayCategoryName }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="wf-br"></div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/home/_welfare-home-category.scss');
</style>
