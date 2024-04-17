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
        <div
          :class="[
            'placeholder',
            String(model || '').length > 0 && 'entered'
          ]"
        >
          {{ placeholder || 'Placeholder' }}
        </div>
        <input
          :class="[
            'input',
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
        <div class="validation">
          <SVGCross v-if="error" />
          <SVGCheck v-else-if="validated" />
        </div>
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
};

const props = defineProps<Props>();
const model = defineModel<string | number>();
defineSlots<{
  ['before-icon']: [];
  ['after-text']: [];
}>();
defineEmits(['focus', 'blur']);

const isPassword = computed(() => props?.type === 'password');
const afterTextPositionComputed = computed(
  () => props.afterTextPosition || 'default'
);
const isHidden = ref(true);

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

    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    color: $inputColor;
    user-select: none;

    padding: 0.375rem 1rem;
    border: 1px solid;
    border-color: $inputStroke;
    border-radius: 0.75rem;
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
      padding: calc(1rem - 0.375rem) 0;
      transition: padding 0.15s ease;
      color: currentColor;

      .placeholder {
        position: absolute;
        top: 0;
        max-width: 100%;
        margin-top: calc(1rem - 0.375rem);
        white-space: nowrap;
        text-overflow: ellipsis;
        color: currentColor;

        transition:
          margin 0.15s ease,
          font-size 0.15s ease;

        &:has(+ input:focus) {
          font-size: 0.75rem;
          margin-top: 0;
        }

        &.entered {
          font-size: 0.75rem;
          margin-top: 0;
        }
      }

      input.input {
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        width: 100%;
        font-size: inherit;

        color: currentColor;

        &::-webkit-input-placeholder {
          /* WebKit browsers */
          color: transparent;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: transparent;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: transparent;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: transparent;
        }
        &::placeholder {
          color: transparent;
        }

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #08001a inset !important;
          -webkit-text-fill-color: $text-white !important;
        }
      }

      &:has(input.input:focus) {
        padding: calc((1rem - 0.375rem) * 2) 0 0;
        border-color: $inputActiveStroke;
      }

      &:has(input.input:hover) {
        border-color: $inputHoverStroke;
      }

      &:has(input.input.entered) {
        padding: calc((1rem - 0.375rem) * 2) 0 0;
      }
    }

    &:has(.icons .icon.eye) {
      .icons .icon:not(.eye) {
        display: none;
      }
    }

    &:has(.icons button:focus) .inputContainer {
      padding: calc((1rem - 0.375rem) * 2) 0 0;
      border-color: $inputActiveStroke;

      .placeholder {
        font-size: 0.75rem;
        margin-top: 0;
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

      .validation {
        display: flex;
        align-items: center;
      }

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
      color: $inputHoverColor;
      border-color: $inputHoverStroke;
    }

    &:has(input:focus) {
      color: $inputActiveColor;
      border-color: $inputActiveStroke;
    }

    &:has(button:focus) {
      color: $inputActiveColor;
      border-color: $inputActiveStroke;
    }

    &:has(button:active) {
      color: $inputActiveColor;
      border-color: $inputActiveStroke;
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
