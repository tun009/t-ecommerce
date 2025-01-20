<script setup lang="ts">
import SearchDetailedGroupButton from '../common/SearchDetailedGroupButton.vue'
import WelfareTag from '@/components/uikit/tag/WelfareTag.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { defaultColor } from '@/commons'
import Tree from 'primevue/tree'
import IconSubcategory from '@/components/icons/IconSubcategory.vue'
import { useSearchDetailedCategory } from '@/composables/search/useSearchDetailedCategory'
import { CategoryDetailedSearchModalProps, CategoryDetailedSearchModalWrapEmits } from '@/models/views/categories/CategorySearchDetailModel'
import { SearchDetailCategoryDeepth } from '@/models/views/search/SearchDetailModel'

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}

const props = defineProps<CategoryDetailedSearchModalProps>()
defineEmits<CategoryDetailedSearchModalWrapEmits>()
const {
  selectedCategory,
  expandedKeys,
  categories,
  handleRemoveSelected,
  isDisplayIconClose,
  selectedNode,
  expandNode,
  closeExpandNode,
  findLabelByKey
} = useSearchDetailedCategory(props)
</script>

<template>
  <div class="wf_flex wf_justify-center wf_items-center wf_flex-col wf-space-y-20 wf-mt--18">
    <div class="wf_width-full wf-color--g-333 wf_max-height-300 wf_overflow-y-auto">
      <Tree v-model:expandedKeys="expandedKeys" :value="categories" selectionMode="multiple" meta-key-selection>
        <template #default="slotProps">
          <!-- Deep of tree > 2 then padding left span  -->
          <div
            class="wf_width-full wf_grid-span-2 wf_flex wf_items-center wf_justify-between wf-py-20 wf-space-x-20 wf-border-width-b-1 wf-br--g-e-6"
            :class="`${slotProps.node.level === SearchDetailCategoryDeepth.DEPTH3 ? 'wf-pl-16' : ''}`"
          >
            <div class="wf_width-full wf_flex wf_items-center wf-space-x-8" @click="expandNode(slotProps.node)">
              <!-- Deep of tree > 1 then display icon subcategory  -->
              <IconSubcategory v-if="!(slotProps.node.level === SearchDetailCategoryDeepth.DEPTH1)" />
              <div @click="selectedNode(slotProps.node)">
                <span
                  class="wf_letter-spacing--1-4 wf_width-full wf-color--g-333 wf_text-wrap"
                  :class="getClass(isDisplayIconClose(slotProps.node.key ?? ''))"
                  >{{ `${slotProps.node.label} ${slotProps.node.count ? `(${slotProps.node.count})` : ''}` }}</span
                >
              </div>
            </div>
            <IconClose
              v-show="(expandedKeys as any)[slotProps.node.key!] === true"
              :color="defaultColor.primary"
              @click="closeExpandNode(slotProps.node)"
            />
          </div>
        </template>
      </Tree>
    </div>
  </div>
  <div class="wf_width-full wf-py-20 wf_box-shadow-horizontal">
    <div v-if="selectedCategory" class="wf_flex wf-space-x-8 wf-space-y-8 wf_overflow-x-auto">
      <WelfareTag
        v-for="(category, indexActive) in Object.keys(selectedCategory)"
        :class="`normal wf-space-x-1 wf_letter-spacing--1-4 wf-color--g-333`"
        :active="true"
        :key="indexActive"
        :text="findLabelByKey(categories, category)"
        @close="handleRemoveSelected(category)"
      />
    </div>
    <SearchDetailedGroupButton
      :button-title="$t('search.searchCommon.buttonView')"
      :on-click-reset="() => handleRemoveSelected()"
      :on-click-button="
        () => {
          $emit('saveCategories:methodCategory', Object.keys(selectedCategory))
        }
      "
    />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/search/_welfare-search-detailed-category.scss');
</style>
