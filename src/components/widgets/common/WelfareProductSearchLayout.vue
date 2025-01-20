<script setup lang="ts">
import { ref } from 'vue'
import IconLayoutImage from '@/components/icons/IconLayoutImage.vue'
import IconLayoutList from '@/components/icons/IconLayoutList.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'

interface WelfareProductSearchLayoutProps {
  result: string
  selectOptions: string[]
}

interface WelfareProductSearchLayoutEmits {
  (e: 'onChangeLayout', value: boolean): void
  (e: 'onChangeSort', value: boolean): void
}

const props = defineProps<WelfareProductSearchLayoutProps>()
const emit = defineEmits<WelfareProductSearchLayoutEmits>()
const select = ref()
const layoutRef = ref(true)

const handleChangeLayout = () => {
  layoutRef.value = !layoutRef.value
  emit('onChangeLayout', layoutRef.value)
}

const handleChangeSort = (value: any) => {
  emit('onChangeSort', value)
}
</script>

<template>
  <div>
    <div class="wf_flex wf_justify-between wf_items-center wf-pb-8 wf-br--g-e-7 wf-border-width-b-1">
      <div class="wf-font_15--mid wf-color--g-333">{{ props.result }}</div>
      <div class="wf_flex wf_justify-center wf_items-center wf-space-x-20">
        <WelfareSelect
          v-model="select"
          placeholder="인기상품순"
          class="wf_select-sort"
          @update:model-value="handleChangeSort"
          :options="props.selectOptions"
        />
        <button @click="handleChangeLayout">
          <IconLayoutImage v-if="layoutRef" />
          <IconLayoutList v-else />
        </button>
      </div>
    </div>

    <slot />
  </div>
</template>
