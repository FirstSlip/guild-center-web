<template>
  <div class="inputWrapper">
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
      <div class="icons">
        <button
          v-if="isPassword"
          @click="toggleEye"
          type="button"
        >
          <SVGEyeClosed
            v-if="isHidden"
            :class="['icon', 'eye']"
          />
          <SVGEye v-else :class="['icon', 'eye']" />
        </button>
      </div>
    </label>
    <div class="after-text" v-if="error || $slots['after-text']">
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <slot name="after-text"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FontType } from '@/ts/FontType';
import type { InputHTMLAttributes } from 'vue';

type AfterTextPositionType = 'default' | 'error-overflow';

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
  afterTextPosition?: AfterTextPositionType;

  fontType?: FontType;
};

const props = defineProps<Props>();
const model = defineModel<string | number>();
defineSlots<{
  ['before-icon']: [];
  ['after-text']: [];
}>();
defineEmits(['focus', 'blur']);

const isPassword = computed(() => props?.type === 'password');
const isHidden = ref(true);
const font = computed(() => props.fontType || 'p2');

function toggleEye() {
  isHidden.value = !isHidden.value;
}
</script>

<style lang="scss" scoped>
.inputWrapper {
  position: relative;

  label.label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: $gray;

    color: $inputSecondaryColor;
    user-select: none;

    padding: 0.625rem 0.5rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    transition: 0.15s ease;

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

    .icons {
      $size: 1.125rem;
      height: 100%;
      flex-shrink: 0;

      color: $inputStroke;

      display: flex;
      gap: 0.5rem;
      align-items: center;

      button {
        height: 100%;
        background: none;
        border: none;

        display: flex;
        align-items: center;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .icon.eye {
        margin-left: auto;
        cursor: pointer;

        path[stroke]:not([stroke~='none']) {
          stroke: currentColor;
        }
        path[fill]:not([fill~='none']) {
          fill: currentColor;
        }
      }

      * {
        color: currentColor;
      }
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
}
</style>
