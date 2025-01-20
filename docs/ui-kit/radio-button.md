This documents describe radio button component . The buttons is extended from **Radio button** components from PrimeVue UI-Kit collection.
You can read more about it [here](https://primevue.org/radiobutton/)

<img src="../captures/radiobutton.jpg">

The CSS class was written in file **\_welfare-radio.scss**. The Vue component is **WelfareRadio**.
You can see detail more in file **RadioView**.

```html
<WelfareRadio name="radio1" v-model="radioOne" :value="true" />
<WelfareRadio name="radio1" v-model="radioOne" :value="false" />
<WelfareRadio name="radio2" disabled v-model="radioSecond" :value="true" />
<WelfareRadio name="radio2" disabled v-model="radioSecond" :value="false" />
```

#### Props

We extends [**Checkbox**](https://primevue.org/radiobutton/) props (PrimeVue) (exclude: aria-labelledby,aria-label). Below, we add some additional props properties in **WelfareRadio** component.

| Name     | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| gapRadio | number | The space between radio and text |
| label    | string | Label of the radio.              |

#### Emits

Defines valid emits in **WelfareRadio** component.

| Name              | Parameters  | ReturnType | Description                                      |
| ----------------- | ----------- | ---------- | ------------------------------------------------ |
| change            | event:Event | void       | Callback to invoke on radio button value change. |
| click             | event:Event | void       | Callback to invoke on radio button click.        |
| update:modelValue | value:any   | void       | Emitted when the value changes.                  |

You also can using **WelfareRadioGroup** with collect of radio button
