<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { WelfareInput } from '@/components/uikit/input'
import WelfareListItems from '@/components/widgets/common/WelfareListItems.vue'
import { useAuthLoginCompanyForm } from '@/composables/auth/useAuthLoginCompanyForm'
import { AuthSearchCompanyType } from '@/models/auth/AuthModel'

const { type, keyword, companies, companySelected, handleChangeType, handleClickItem, handleSearch, showCompanies, handleChangeShowCompanies, handleToLogin } =
  useAuthLoginCompanyForm()
</script>

<template>
  <div :class="`wf_flex wf_flex-col wf-space-y-30 wf-mt-1 ${type === AuthSearchCompanyType.name ? 'wf-mb-114' : 'wf-mb-84'}`">
    <div class="wf_flex wf_flex-col wf-space-y-20">
      <div class="wf_flex">
        <WelfareButtonLine
          type="lg"
          :lg-state="type === AuthSearchCompanyType.name ? 'black-line' : 'grey-line'"
          :class="` wf_flex-1 ${type === AuthSearchCompanyType.url && 'wf_search-company-button'}`"
          :text="$t('auth.login.searchCompany.nameBtn')"
          @click="() => handleChangeType(AuthSearchCompanyType.name)"
        />
        <WelfareButtonLine
          type="lg"
          :lg-state="type === AuthSearchCompanyType.url ? 'black-line' : 'grey-line'"
          :class="` wf_flex-1 ${type === AuthSearchCompanyType.name && 'wf_search-company-button'}`"
          :text="$t('auth.login.searchCompany.urlBtn')"
          @click="() => handleChangeType(AuthSearchCompanyType.url)"
        />
      </div>
      <div class="wf_relative wf_flex wf_flex-col wf-space-y-13" v-click-outside="() => handleChangeShowCompanies(false)">
        <WelfareInput
          :placeholder="$t(`auth.login.searchCompany.${type === AuthSearchCompanyType.name ? 'namePlaceholder' : 'urlPlaceholder'}`)"
          class="wf_flex-1"
          :model-value="keyword"
          :clear-text="false"
          @update:model-value="(value: string) => handleSearch(value)"
          @focus="() => handleChangeShowCompanies(true)"
        />
        <div :class="`wf_search-company wf-show-scrollbar wf-br-1 wf-br--g-e-7 ${(companies.length === 0 || !showCompanies) && 'wf-hidden'}`">
          <WelfareListItems class="wf-font_15--reg wf-color--g-333" :items="companies" :active-item="companySelected">
            <template #item="{ item, active }">
              <div :class="`wf_search-company-item ${active && 'wf-active'}`" @click="() => handleClickItem(item)">
                {{ type === AuthSearchCompanyType.url ? item.customerDomainUrl : item.customerName }}
              </div>
            </template>
          </WelfareListItems>
        </div>
        <p class="wf_width-fit wf-font_13--reg wf-color--g-555 wf_text-center" v-if="type === AuthSearchCompanyType.url">
          <span class="wf-mr-3 wf-ml--2">&#x2022;</span>
          <span>{{ $t('auth.login.searchCompany.subUrlTitle') }}</span>
        </p>
      </div>
    </div>
    <WelfareButtonLine
      type="lg"
      lg-state="grey-line"
      class="wf_height-50"
      :active="true"
      :disabled="!companySelected"
      :text="$t('auth.login.searchCompany.submitBtn')"
      @click="handleToLogin"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/login/_welfare-search-company.scss');
</style>
