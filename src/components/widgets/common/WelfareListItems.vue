<script setup lang="ts">
interface WelfareListItemsProps {
  class?: string
  items: any[]
  activeItem: any
}

defineProps<WelfareListItemsProps>()
</script>

<template>
  <div :class="$props.class">
    <slot
      name="item"
      :item="item"
      :active="item === activeItem"
      v-for="(item, index) in $props.items"
      v-bind:key="index"
    />
  </div>
</template>
