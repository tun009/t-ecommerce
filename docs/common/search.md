This document describe the common function related to Kakao search.


**Table of Contents**

[TOC]

### Open frame search address from Kakao 
You can view detail in file ***validationRules.ts***

```js
export const execDaumPostcode = (
  wfDaumLayer: Ref<any>,
  onComplete: (data: DaumPostcodeSearchResponse) => void,
  options: {
    width: number
    height: number
    borderWidth: number
  } = {
    width: window.innerWidth >= 500 ? 500 : window.innerWidth,
    height: 542,
    borderWidth: 1
  }
  // detailAddressRef?: Ref<any>
) => {
  const initLayerPosition = () => {
    wfDaumLayer.value.style.position = 'fixed'
    wfDaumLayer.value.style.paddingTop = '44px'
    wfDaumLayer.value.style.display = 'block'
    wfDaumLayer.value.style.backgroundColor = 'white'
    wfDaumLayer.value.style.borderRadius = '4px'
    wfDaumLayer.value.style.width = options.width + 'px'
    wfDaumLayer.value.style.height = options.height + 'px'
    wfDaumLayer.value.style.border = options.borderWidth + 'px solid'
    wfDaumLayer.value.classList.add('wf-custom-scrollbar')
  }
  // @ts-ignore
  new daum.Postcode({
    oncomplete: function (data: DaumPostcodeSearchResponse) {
      console.log({ data })
      onComplete(data)
      wfDaumLayer.value.style.display = 'none'
    },
    options: '100%',
    height: '100%',
    width: '100%',
    maxSuggestItems: 5
  }).embed(wfDaumLayer.value)

  wfDaumLayer.value.style.display = 'block'

  initLayerPosition()
}

```

### Mount search form to DOM 

You can view detail in file ***validationRules.ts***

```js
export const mountDaumCode = () => {
  const script = document.createElement('script')
  script.src = DAUM_POST_CODE_SCRIPT
  script.async = true
  document.head.appendChild(script)
}

```

### Handle click outside of search form

You can view detail in file ***validationRules.ts***

```js
export const handleClickOutsideIframe = (closeIframe: () => void, iframeRef: Ref<any>, event: Event) => {
  if (iframeRef.value && event.target instanceof Node && !iframeRef.value.contains(event.target)) {
    closeIframe()
  }
}
```