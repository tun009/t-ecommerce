<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'

const data = [
  {
    label: 'Primary',
    des: 'Megazone Black은 GNB 및 공통 버튼의 컬러로 사용합니다. ',
    items: [
      {
        color: '#1F1F1F',
        text: 'Megazone Black',
        class: 'wf-bg-primary'
      }
    ]
  },
  {
    label: 'Primary',
    des: 'Orange는 강조 요소에 사용합니다. Blue는 차트의 Down 요소에만 사용합니다. Red는 Borad 강조text에 사용합니다. 대부분의 보조 컬러는 상품 설명과 그래픽요소등의 상품의 시각적 차이를 표현하기 위해 사용되었습니다.',
    items: [
      {
        color: '#F95729',
        text: 'Orange',
        class: 'wf-bg--f-95729'
      },
      {
        color: '#4075F3',
        text: 'Blue',
        class: 'wf-bg--blue-4075-f-3'
      },
      {
        color: '#FF3B4F',
        text: 'Red',
        class: 'wf-bg--red-ff-3-b-4-f'
      }
    ]
  },
  {
    label: 'Gray Scale',
    des: '그레이 스케일은 주로 텍스트와 작은 아이콘, 박스와 큰 아이콘이 혼용되기도 합니다.',
    items: [
      {
        color: '#111',
        text: 'Gray 1',
        class: 'wf-bg--g-111'
      },
      {
        color: '#333',
        text: 'Gray 2',
        class: 'wf-bg--g-333'
      },
      {
        color: '#555',
        text: 'Gray 3',
        class: 'wf-bg--g-555'
      },
      {
        color: '#777',
        text: 'Gray 4',
        class: 'wf-bg--g-777'
      },
      {
        color: '#999',
        text: 'Gray 5',
        class: 'wf-bg--g-999'
      },
      {
        color: '#bbb',
        text: 'Gray 6',
        class: 'wf-bg--g-bbb'
      },
      {
        color: '#ddd',
        text: 'Gray 7',
        class: 'wf-bg--g-ddd'
      },
      {
        color: '#FFF',
        text: 'Gray 8',
        class: 'wf-bg--g-fff'
      }
    ]
  },
  {
    label: 'Table Line',
    des: 'Table 및 컨텐츠 관련된 기본 컬러에 사용합니다.',
    items: [
      {
        color: '#bbb',
        text: 'System Gray 1',
        class: 'wf-bg--g-bbb'
      },
      {
        color: '#E7E7E7',
        text: 'System Gray 2',
        class: 'wf-bg--g-2-e-7-e-7'
      }
    ]
  },
  {
    label: 'Table BG',
    des: '컨텐츠 Bg 컬러 및 제품 썸네일 Gray 컬러에 사용합니다.',
    items: [
      {
        color: '#F5F5F5',
        text: 'System Gray 3',
        class: 'wf-bg--g-f-5-f-5-f'
      },
      {
        color: '#F8F8F8',
        text: 'System Gray 4',
        class: 'wf-bg--g-f-8-f-8'
      },
      {
        color: '#F5F6FA',
        text: 'System Gray 5',
        class: 'wf-bg--g-f-5-f-6-fa'
      },
      {
        color: '#F0F0F0',
        text: 'System Gray 6',
        class: 'wf-bg--g-f-0-f-0'
      }
    ]
  },
  {
    label: 'Button',
    des: '액션 버튼 및 컨텐츠 버튼에 사용합니다.',
    items: [
      {
        color: '#1F1F1F',
        text: 'BTN 1',
        class: 'wf-bg-primary'
      },
      {
        color: '#F95729',
        text: 'BTN 2',
        class: 'wf-bg--f-95729'
      },
      {
        color: '#1F1F1F',
        text: 'BTN 3',
        class: 'wf-br--g-primary'
      },
      {
        color: '#E7E7E7',
        text: 'BTN 4',
        class: 'wf-br--g-e-7'
      }
    ]
  },
  {
    label: 'Tag Color',
    des: 'Tag에 사용합니다.',
    items: [
      {
        color: '#D2E0FF',
        text: 'Tag blue',
        class: 'wf-bg--g-d-2-e-0-f'
      },
      {
        color: '#FCDCDF',
        text: 'Tag red',
        class: 'wf-bg--g-f-c-d-c-d-f'
      },
      {
        color: '#EEE',
        text: 'Tag grey',
        class: 'wf-bg--g-gray-ee'
      }
    ]
  }
]
</script>

<template>
  <WelfareContainer>
    <div>
      <div class="wf-cl-border wf-br--g-bbb wf_flex">
        <p class="wf_width-120 wf-font_21--bold">Color</p>
        <div>
          <h4 class="wf-font_16--bold">활용법</h4>
          <p class="wf-font_14-reg--lh130">
            성격에 맞는 컬러를 아래의 컬러러 가이드 내에서 사용합니다. Opacity가 없는 컬러를 권장하며, White(#FFFFFF) 컬러는 5%단위로 Opacity를 사용할
            수 있습니다.
          </p>
        </div>
      </div>
      <div class="wf_flex wf_flex-col wf-space-y-30 wf-mt-10">
        <div v-for="(item, index) in data" :key="index" class="wf_flex">
          <p class="wf_width-120 wf-font_16--bold">{{ item.label }}</p>
          <div>
            <p class="wf-font_13--reg">{{ item.des }}</p>
            <div class="wf_flex wf-space-x-10">
              <div v-for="(_item, _index) in item.items" :key="_index" class="wf-mt-12">
                <div class="wf-cl-box" :class="_item.class" />
                <div class="wf-mt-10">
                  <p class="wf-font_13--bold">{{ _item.text }}</p>
                  <p class="wf-font_13--reg wf-mt-2">{{ _item.color }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
<style lang="scss" scoped>
@import url('@/assets/styles/uikit/_welfare-common-review.scss');
</style>
