<template>
  <div :class="['code-input', fill && 'fill']">
    <input
      v-model="code[item - 1]"
      class="digit"
      maxlength="1"
      autocomplete="off"
      ref="digitRefs"
      v-for="item in codeLength"
      @input="focusNext(item - 1)"
      @paste.prevent="handlePaste($event, item - 1)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  length?: number;
  fill?: boolean;
}>();

const codeLength = computed(() => props.length || 4);

const code = ref(Array(codeLength.value).fill(''));
const digitRefs = ref<Array<HTMLInputElement | null>>([]);

const focusNext = (index: number) => {
  if (isNaN(code.value[index])) {
    code.value[index] = '';
    return;
  }
  if (
    code.value[index].length === 1 &&
    digitRefs.value[index + 1]
  ) {
    digitRefs.value[index + 1]?.focus();
  }
  if (
    code.value[index].length === 0 &&
    digitRefs.value[index - 1]
  ) {
    digitRefs.value[index - 1]?.focus();
  }
};
const handlePaste = (event: ClipboardEvent, index: number) => {
  const pastedData = event.clipboardData?.getData('text') || '';
  const pastedDigits = pastedData
    .split('')
    .filter((digit) => !isNaN(parseInt(digit)));
  for (
    let i = 0;
    i < pastedDigits.length && i < codeLength.value;
    i++
  ) {
    console.log(code.value[i], pastedDigits[i]);
    code.value[i + index] = pastedDigits[i];
  }
};
</script>

<style lang="scss" scoped>
.code-input {
  display: flex;
  gap: 1.25rem;

  &.fill {
    width: 100%;
    justify-content: center;
  }

  .digit {
    width: 3.5rem;
    height: 4.375rem;
    padding: 1.25rem;

    border-radius: 0.94rem;
    border: 1px solid;
    border-color: $inputStroke;

    background-color: black;

    font-size: 1.25rem;
    text-align: center;
    color: $inputColor;

    transition: 0.15s ease;

    &:hover {
      border-color: $inputHoverStroke;
      color: $inputHoverColor;
    }

    &:focus {
      border-color: $inputActiveStroke;
      color: $inputActiveColor;
    }
  }
}
</style>
