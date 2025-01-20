This documents describe input text component.

**Table of Contents**

[TOC]

## Input text (WelfareInput)

The CSS class was written in file **\_welfare-input.scss**. The Vue component is **WelfareInput**.

```html
<WelfareInput class="wf_letter-spacing--1-2" placeholder="우편번호 찾기를 이용해주세요." disabled />
<WelfareInput class="wf_letter-spacing--1-2" placeholder="상세 주소를 입력하세요." disabled />
<WelfareInput searchIcon placeholder="검색어를 입력해주세요" v-model="input3" />
```

#### Props

Defines valid props in **WelfareInput** component.

| Name           | Type                          | Description                        |
| -------------- | ----------------------------- | ---------------------------------- |
| searchIcon     | boolean                       | Mark search icon visible or not    |
| class          | string                        | The CSS class of the container     |
| passwordIcon   | boolean                       | Mark password icon visible or not  |
| classWrap      | string                        | The CSS class of the wrap input    |
| classWrapInput | string                        | The CSS class of the wrap input    |
| classWrapTitle | string                        | The CSS class of the title text    |
| modelValue     | string                        | The value of input                 |
| title          | string                        | The title text of input            |
| placeholder    | string                        | The place holder text of input     |
| required       | string                        | Mark the input required enter text |
| disabled       | boolean                       | Disable enter text to input        |
| readonly       | boolean                       | The input text is only read or not |
| maxLength      | number                        | The max length of input            |
| showMaxLength  | boolean                       | Mark show max length text or not   |
| errorText      | string                        | The error text                     |
| autofocus      | boolean                       | Mark auto focus                    |
| clearText      | boolean                       | Mark show clear text icon or not   |
| type           | string                        | The type of input                  |
| autocomplete   | 'off' , 'on' , 'new-password' | The auto completed options         |

#### Emits

Defines valid emits in **WelfareInput** component.

| Name              | Parameters          | ReturnType | Description                             |
| ----------------- | ------------------- | ---------- | --------------------------------------- |
| update:modelValue | value:any           | void       | Emitted when the value changes.         |
| focus             | value:any           | void       | Emitted when fire focus event.          |
| blur              | value:any           | void       | Emitted when input change to blur state |
| keyup             | value:KeyboardEvent | void       | Emitted when enter key up               |

## Input number (WelfareInputNumber)

The CSS class was written in file **\_welfare-input.scss**. The Vue component is **WelfareInputNumber**.

```html
<WelfareInputNumber class="wf_letter-spacing--1-2" placeholder="우편번호 찾기를 이용해주세요." disabled />
<WelfareInputNumber class="wf_letter-spacing--1-2" placeholder="상세 주소를 입력하세요." />
```

#### Props

We extends [**InputNumber**](https://primevue.org/inputnumber/) props (PrimeVue) (exclude: aria-labelledby,aria-label). Below, we add some additional props properties in **WelfareInputNumber** component.

| Name        | Type                | Description                                                                                         |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| modelValue  | string              | The value of input                                                                                  |
| class       | string              | The CSS class of the container                                                                      |
| inputClass  | string              | The CSS class of the input                                                                          |
| inputProps  | InputHTMLAttributes | The input props of text input                                                                       |
| useGrouping | boolean             | Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. |
| locale      | string              | Locale to be used in formatting.                                                                    |

#### Emits

Defines valid emits in **WelfareInput** component.

| Name              | Parameters          | ReturnType | Description                             |
| ----------------- | ------------------- | ---------- | --------------------------------------- |
| update:modelValue | value:any           | void       | Emitted when the value changes.         |
| focus             | value:any           | void       | Emitted when fire focus event.          |
| blur              | value:any           | void       | Emitted when input change to blur state |
| keyup             | value:KeyboardEvent | void       | Emitted when enter key up               |

## Input mask (InputMask)

The CSS class was written in file **\_welfare-input.scss**. The Vue component is **WelfareInputNumber**.

```html
<WelfareInputMark class="wf_letter-spacing--1-2" placeholder="우편번호 찾기를 이용해주세요." disabled />
<WelfareInputMark class="wf_letter-spacing--1-2" placeholder="상세 주소를 입력하세요." />
```

#### Props

We extends [**InputMask**](https://primevue.org/inputmask/) props (PrimeVue) (exclude: aria-labelledby,aria-label). Below, we add some additional props properties in **WelfareInputMark** component.

| Name       | Type   | Description        |
| ---------- | ------ | ------------------ |
| modelValue | string | The value of input |
| inputId    | string | The id of input    |
| mask       | string | Mask pattern.      |

#### Emits

Defines valid emits in **WelfareInputMark** component.

| Name              | Parameters          | ReturnType | Description                             |
| ----------------- | ------------------- | ---------- | --------------------------------------- |
| update:modelValue | value:any           | void       | Emitted when the value changes.         |
| focus             | value:any           | void       | Emitted when fire focus event.          |
| blur              | value:any           | void       | Emitted when input change to blur state |
| keyup             | value:KeyboardEvent | void       | Emitted when enter key up               |
