<script setup lang="ts">
interface MyPageTab {
  modelValue: string
  tabList: {
    label: string
    value: string
  }[]
}
const { modelValue, tabList } = defineProps<MyPageTab>()
</script>
<template>
  <ul class="prd-tab-box wf_flex">
    <li v-for="(product, index) in tabList" :key="index">
      <input
        :id="product.value"
        :name="product.value"
        :value="product.value"
        :checked="product.value === modelValue"
        type="radio"
        @input="(event: any) => modelValue && $emit('update:modelValue', event.target.value)"
      />
      <label :for="product.value">
        {{ product.label }}
      </label>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul.prd-tab-box {
  display: flex;
  li {
    width: 100%;
    display: flex;
    text-align: center;

    input {
      display: none;
    }
    label {
      width: 100%;
      padding: 18px 10px 18px 10px;
      font-size: 15px;
      line-height: 15px;
      letter-spacing: -1px;
      border: 1px solid #e7e7e7;
      background-color: #f5f5f5;
      color: #999999;
    }

    input[type='radio']:checked + label {
      font-weight: 700;
      border: 1px solid #000;
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
