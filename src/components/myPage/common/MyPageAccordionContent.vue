<script setup lang="ts">
interface AccordionContent {
  contents: string
}

const props = defineProps<AccordionContent>()
</script>

<template>
  <div v-html="props.contents"></div>
</template>
