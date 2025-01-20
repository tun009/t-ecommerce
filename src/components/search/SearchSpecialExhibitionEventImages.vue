<script setup lang="ts">
import IconArrowRightLink from '@/components/icons/IconArrowRightLink.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import { useI18n } from 'vue-i18n'
import { SearchExhibitionModel } from '@/models/services/responses/search/SearchResponse'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
interface SearchSpecialExhibitionEventImagesProps {
  specialExhibitionEventImages: SearchExhibitionModel[]
  isExpanded: boolean
  searchRelatedProducts: WelfareUnitProductModel[]
  size: number
}

type SearchSpecialExhibitionEventImagesEmits = (e: 'toggle-expand') => () => void
const props = defineProps<SearchSpecialExhibitionEventImagesProps>()
const emit = defineEmits<SearchSpecialExhibitionEventImagesEmits>()
const { t } = useI18n()
</script>

<template>
  <div v-if="props.specialExhibitionEventImages.length > 0">
    <h3 class="wf-font_19--bold wf-color--g-111 wf-pt-28 wf-mx-16 wf_inline-flex wf_items-center">
      {{ t('search.sections.exhibitionEvents.title') }}&nbsp;
      <IconArrowRightLink />
    </h3>
    <div
      v-for="(event, index) in !props.isExpanded ? props.specialExhibitionEventImages.slice(0, size) : specialExhibitionEventImages"
      :key="index"
      class="wf_flex wf_flex-row wf-space-y-20 wf-my-16 wf_w-full"
    >
      <img :src="event.imageUrl" :alt="event.exhibitionName" class="wf-mb-3" />
    </div>
    <div class="wf-mx-16 wf-mb-20">
      <WelfareButtonFull
        v-if="props.searchRelatedProducts.length > props.size"
        @click="emit('toggle-expand')"
        :isRotate="props.isExpanded"
        :text="
          props.isExpanded
            ? t('search.sections.exhibitionEvents.close')
            : t('search.sections.exhibitionEvents.more') + '(' + (searchRelatedProducts.length - size) + ')'
        "
        class="wf-color--g-111-important"
        active
      />
    </div>
  </div>
</template>
