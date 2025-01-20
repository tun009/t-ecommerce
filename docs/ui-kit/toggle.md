This documents describe checkbox component . The buttons is extended from **InputSwitch** components from PrimeVue UI-Kit collection.
You can read more about it [here](https://primevue.org/inputswitch/)

The CSS class was written in file **\_welfare-toggle.scss**. The Vue component is **WelfareToggle**.
You can see detail more in file **ToggleView**.

```html
<WelfareToggle />
```

#### Props

We extends [**InputSwitch**](https://primevue.org/inputswitch/) props (PrimeVue) (exclude: aria-labelledby,aria-label). Below, we add some additional props properties in **WelfareToggle** component.
Name | Type | Description
------------- | ------------- | -------------
modelValue | boolean | The toggle active or not.

#### Emits

Defines valid emits in **WelfareToggle** component.

| Name              | Parameters | ReturnType | Description                     |
| ----------------- | ---------- | ---------- | ------------------------------- |
| update:modelValue | value:any  | void       | Emitted when the value changes. |
