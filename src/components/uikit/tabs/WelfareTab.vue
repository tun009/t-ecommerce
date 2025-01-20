<script setup lang="ts">
import { WelfareTabDataType, WelfareTabEmits, WelfareTabProps } from '@/models/uikits/WelfareTabTypes'
import { ref, defineEmits, computed, onMounted } from 'vue'

const props = defineProps<WelfareTabProps>()
const emit = defineEmits<WelfareTabEmits>()

const selectedTab = ref<WelfareTabDataType | undefined>(props.default)
const refDiv = ref<HTMLDivElement>()

const onChangeTab = (item: WelfareTabDataType) => {
  emit('on-change', item)
  selectedTab.value = item
  handleScrollTab(item)
}

const classBoxType = computed(() => {
  return `wf-tab wf-${props.type}-tab`
})

onMounted(() => {
  emit('onMounted')
})

const handleScrollTab = (newTab: WelfareTabDataType) => {
  const distanceBetweenTab = 10
  const paddingLeftItem = 8
  const amountWidthActiveScroll = 200
  const items = refDiv?.value?.querySelectorAll(`.wf-tab-item`) ?? []
  if (refDiv.value) {
    const index = props.items.findIndex((item) => item.id === newTab?.id)
    let widthScroll = 0

    items.forEach((item, _index) => {
      if (_index <= index) {
        widthScroll += item.clientWidth + distanceBetweenTab
      }
    })
    if (widthScroll > window.innerWidth - amountWidthActiveScroll) {
      refDiv.value.scrollLeft = widthScroll - window.innerWidth / 2 - items[index].clientWidth / 2 + paddingLeftItem
    } else {
      refDiv.value.scrollLeft = 0
    }
  }
}

defineExpose({
  setSelectTab: (tab: WelfareTabDataType) => {
    selectedTab.value = tab
    handleScrollTab(tab)
  }
})
</script>

<template>
  <div ref="refDiv" v-if="props?.items?.length > 0" :class="`wf-tab-container ${props.class}`">
    <ul :class="`${classBoxType}  ${$props.classWrapSpace}`">
      <li v-for="item in props.items" :key="item.id" :class="`wf-tab-item-${item.id}`" class="wf-tab-item">
        <input :id="props.name + item.id" v-model="selectedTab" type="radio" :value="item" :name="props.name" @change="() => onChangeTab(item)" />
        <label :for="props.name + item.id"><slot :name="item.id" />{{ item.label }}</label>
      </li>
    </ul>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-tabs.scss');
</style>
