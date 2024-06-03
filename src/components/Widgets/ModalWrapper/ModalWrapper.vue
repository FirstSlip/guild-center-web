<template>
  <div class="modal-wrapper">
    <form class="form" @submit.prevent="submit">
      <div class="modal-header">
        <div class="title">
          <slot name="icon"></slot>
          <h1><slot name="title"></slot></h1>
        </div>
        <button class="close" @click="close">
          <SVGCross color="#fff" />
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();

defineSlots<{
  ['icon']: [];
  ['title']: [];
  ['body']: [];
}>();

const close = () => {
  emit('close');
};

const submit = () => {
  emit('submit');
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  form.form {
    width: 62.5rem;
    max-width: calc(100% - 2rem);
    padding: 1.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: $light-purple;

    border: 1px solid $white;
    border-radius: 0.75rem;

    .modal-header {
      display: flex;
      justify-content: space-between;

      margin-bottom: 0.625rem;

      .title {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        h1 {
          font-weight: 700;
          font-size: 2.25rem;
          line-height: 150%;
        }
      }

      button.close {
        background: none;
        border: none;
        width: 1.5rem;
        height: 1.5rem;

        cursor: pointer;
      }
    }
  }
}
</style>
