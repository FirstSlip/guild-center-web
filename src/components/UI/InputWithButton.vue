<template>
  <div class="inputWrapper" @keydown="keyDown">
    <label
      :id="id"
      :class="[
        'label',
        'default',
        fill && 'fill',
        type === 'password' && 'password'
      ]"
    >
      <div v-if="$slots['before-icon']" class="icon">
        <slot name="before-icon"></slot>
      </div>
      <div class="inputContainer">
        <input
          :class="[
            'input',
            font,
            String(model || '').length > 0 && 'entered'
          ]"
          v-model="model"
          :name="name"
          :autocomplete="autocomplete"
          :type="
            type === 'password'
              ? isHidden
                ? type
                : 'text'
              : type || 'text'
          "
          :placeholder="placeholder || 'Placeholder'"
          :readonly="readonly"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
      </div>
    </label>
    <button class="search" @click="$emit('click')">
      {{ buttonText || 'Поиск' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { FontType } from '@/ts/FontType';
import type { InputHTMLAttributes } from 'vue';

type Props = {
  id?: string;
  fill?: boolean;
  error?: string;
  validated?: boolean;

  type?: InputHTMLAttributes['type'];
  name?: InputHTMLAttributes['name'];
  placeholder?: InputHTMLAttributes['placeholder'];
  autocomplete?: InputHTMLAttributes['autocomplete'];
  readonly?: InputHTMLAttributes['readonly'];

  fontType?: FontType;
  buttonText?: string;
};

const props = defineProps<Props>();
const model = defineModel<string | number>();
defineSlots<{
  ['before-icon']: [];
}>();
const emit = defineEmits<{
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'click'): void;
}>();

const isHidden = ref(true);
const font = computed(() => props.fontType || 'p2');

const keyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emit('click');
  }
};
</script>

<style lang="scss" scoped>
.inputWrapper {
  position: relative;
  display: flex;
  height: fit-content;

  label.label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: $gray;

    color: $inputSecondaryColor;
    user-select: none;

    padding: 1rem 0.5rem;
    outline: none;
    border-radius: 0.75rem 0 0 0.75rem;
    transition: 0.15s ease;

    border: 1px solid $text-white-60;

    &:not(:has(input:read-only), :has(input:disabled)) {
      cursor: text;
    }

    &.fill {
      width: 100%;
    }

    .inputContainer {
      position: relative;
      width: 100%;
      height: 100%;
      color: currentColor;

      input.input {
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        width: 100%;

        color: currentColor;

        &::-webkit-input-placeholder {
          color: $inputSecondaryPlaceholderColor;
        }
        &:-moz-placeholder {
          color: $inputSecondaryPlaceholderColor;
        }
        &::-moz-placeholder {
          color: $inputSecondaryPlaceholderColor;
        }
        &:-ms-input-placeholder {
          color: $inputSecondaryPlaceholderColor;
        }
        &::placeholder {
          color: $inputSecondaryPlaceholderColor;
        }

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #08001a inset !important;
          -webkit-text-fill-color: $text-white !important;
        }
      }
    }

    &:has(.icons .icon.eye) {
      .icons .icon:not(.eye) {
        display: none;
      }
    }

    .icon {
      display: flex;
      align-items: center;
    }

    &:has(input:disabled, input:read-only) {
      user-select: none;
      -webkit-user-drag: none;
      cursor: default;

      * {
        cursor: default;
      }
    }

    &:hover {
      color: $inputSecondaryHoverColor;
    }

    &:has(input:focus) {
      color: $inputSecondaryActiveColor;
    }

    &:has(button:focus) {
      color: $inputSecondaryActiveColor;
    }

    &:has(button:active) {
      color: $inputSecondaryActiveColor;
    }
  }

  .after-text {
    margin-top: 0.25rem;
    display: flex;
    justify-content: space-between;

    &:not(:has(.error)) {
      justify-content: flex-end;
    }

    .error {
      color: $text-red;
      font-size: 0.75rem;
      line-height: 155%;
    }
  }

  button.search {
    padding: 0 4rem;
    background: #181818;

    border: 1px solid $text-white-60;
    border-left: none;
    border-radius: 0 0.75rem 0.75rem 0;

    cursor: pointer;
  }
}
</style>
