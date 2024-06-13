<template>
  <div class="new-rule">
    <div class="main">
      <h2 class="h4">Загаловок</h2>
      <UIInputSecondary
        type="text"
        placeholder="Придумайте назавние для правила"
        fill
        v-model="title"
      />
      <h2 class="h4 description">Описание</h2>
      <UITextarea
        fill
        :rows="12"
        placeholder="Введите описание правила"
        v-model="description"
      />
    </div>
    <div class="buttons">
      <UIButton
        type="primary"
        fontType="h5"
        :disabled="title.length <= 0"
      >
        Сохранить
      </UIButton>
      <UIButton
        type="blank"
        fontType="h5"
        html-type="button"
        @click="$emit('close')"
      >
        Отмена
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'close'): void;
}>();

const title = defineModel<string>('title', { default: '' });
const description = defineModel<string>('description', {
  default: ''
});
</script>

<style lang="scss" scoped>
.new-rule {
  .main {
    h2 {
      padding: 0.5rem 0;

      &.description {
        margin-top: 0.5rem;
      }
    }
  }

  .buttons {
    width: 100%;
    margin-top: 2.5rem;

    display: flex;
    justify-content: flex-end;

    gap: 0.5rem;
  }
}
</style>
