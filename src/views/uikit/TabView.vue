<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
const list = [
  {
    id: '1',
    label: '전체'
  },
  {
    id: '2',
    label: '절임/조림'
  },
  {
    id: '3',
    label: '젓갈'
  },
  {
    id: '4',
    label: '볶음/부각/튀각'
  },
  {
    id: '5',
    label: '조미김'
  },
  {
    id: '6',
    label: '반찬세트'
  },
  {
    id: '7',
    label: '기타반찬류'
  }
]

const listLineTab = [
  {
    id: '1',
    label: '홈'
  },
  {
    id: '2',
    label: '제습&쿨링'
  },
  {
    id: '3',
    label: '떠나요바캉스'
  },
  {
    id: '4',
    label: '오늘의 특가'
  },
  {
    id: '5',
    label: '랭킹'
  },
  {
    id: '6',
    label: '패션'
  },
  {
    id: '7',
    label: '복지안내'
  }
]

const listBox1Tab = [
  {
    id: '1',
    label: '전체'
  },
  {
    id: '2',
    label: '생활&주방'
  },
  {
    id: '3',
    label: '뷰티&잡화'
  },
  {
    id: '4',
    label: '스포츠&레저'
  }
]

const listBox2Tab = [
  {
    id: '1',
    label: '전체'
  },
  {
    id: '2',
    label: '반찬류'
  },
  {
    id: '3',
    label: '수산'
  },
  {
    id: '4',
    label: '곡물'
  },
  {
    id: '5',
    label: '과일'
  },
  {
    id: '6',
    label: '김치'
  }
]

const updateView = (item: WelfareTabDataType) => {
  console.log(item)
}
</script>

<template>
  <WelfareContainer title="COMPONENT">
    <WelfareTitleInfo
      title="Tabs"
      des="활용법"
      subDes=" 성격에 맞는 컬러를 아래의 컬러러 가이드 내에서 사용합니다. Opacity가 없는 컬러를 권장하며, White(#FFFFFF) 컬러는 5%단위로 Opacity를 사용할
            수 있습니다."
    />
    <div class="wf-bg--g-f-3-f-3 wf_flex wf_flex-col wf_justify-center wf_items-center wf-pb-20">
      <div class="wf-mt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-1120">
        <span class="wf-font_15--mid wf-color--g-777">Line Tabs</span>
      </div>

      <div class="wf-pt-4 wf_grid wf_grid-cols-2 wf_width-1120">
        <WelfareTab :items="list" @onChange="updateView" :default="listLineTab[0]" name="line-tab" class="wf-pt-16">
          <template #2>
            <span class="wf-font_12--bold wf-color--f-95729 wf-tab-sub-label"
              >5<span class="wf-font_9--bold">%</span>+5<span class="wf-font_9--bold">%</span></span
            >
          </template>
        </WelfareTab>
      </div>

      <div class="wf-mt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-1120">
        <span class="wf-font_15--mid wf-color--g-777">Line Tabs</span>
        <span class="wf-font_15--mid wf-color--g-777">Example</span>
      </div>

      <div class="wf-pt-20 wf_grid wf_grid-cols-2 wf_width-1120">
        <WelfareTab :items="listLineTab" @onChange="updateView" :default="listLineTab[0]" name="line-tab-1" />
        <div class="wf_width-375 wf-bg-primary wf-px-16 wf-pt-4 wf-pb-2">
          <WelfareTab :items="listLineTab" @onChange="updateView" :default="listLineTab[0]" name="line-tab-2" type="line-white" />
        </div>
      </div>

      <div class="wf-mt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-1120">
        <span class="wf-font_15--mid wf-color--g-777">Box Tabs 1</span>
        <span class="wf-font_15--mid wf-color--g-777">Example</span>
      </div>

      <div class="wf-pt-20 wf_grid wf_grid-cols-2 wf_width-1120">
        <WelfareTab :items="listBox1Tab" @onChange="updateView" :default="listBox1Tab[0]" name="box-tab-1" type="box" />
        <div class="wf_width-375 wf-bg--white wf-pl-16 wf-pr-6 wf-py-6">
          <WelfareTab :items="listBox1Tab" @onChange="updateView" :default="listBox1Tab[0]" name="box-tab-2" type="box-small" />
        </div>
      </div>

      <div class="wf-mt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-1120">
        <span class="wf-font_15--mid wf-color--g-777">Box Tabs 2</span>
        <span class="wf-font_15--mid wf-color--g-777">Example</span>
      </div>

      <div class="wf-pt-20 wf_grid wf_grid-cols-2 wf_width-1120">
        <WelfareTab :items="listBox2Tab" @onChange="updateView" :default="listBox2Tab[0]" name="round-tab-1" type="round" />
        <div class="wf_width-375 wf-bg--white wf-pl-16 wf-py-6">
          <WelfareTab :items="listBox2Tab" @onChange="updateView" :default="listBox2Tab[0]" name="round-tab-2" type="round" />
        </div>
      </div>

      <div class="wf-mt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-1120">
        <span class="wf-font_15--mid wf-color--g-777">Text Tabs</span>
        <span class="wf-font_15--mid wf-color--g-777">Example</span>
      </div>

      <div class="wf-pt-20 wf_grid wf_grid-cols-2 wf_width-1120">
        <WelfareTab :items="list" @onChange="updateView" :default="list[4]" name="text-tab-1" type="text" />
        <div class="wf_width-375 wf-bg--white wf-py-6">
          <WelfareTab :items="list" @onChange="updateView" :default="list[4]" name="text-tab-2" type="text" />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
