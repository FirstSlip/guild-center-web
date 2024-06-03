<template>
  <div
    :class="['select', otherOptionsOpened && 'active']"
    @click.stop="$emit('click')"
  >
    <button
      :class="['button', 'h5']"
      @click="otherOptionsOpened = !otherOptionsOpened"
    >
      <span>{{ titles[selected || 0] }}</span>
      <SVGDownArrow />
    </button>
    <div class="other-options" v-if="otherOptionsOpened">
      <button
        v-for="(title, index) in titlesWithoutSelected"
        :key="index"
        :class="['option']"
        @click="select(title)"
      >
        <SVGPrivacyOpened v-if="title === 'Открытая'" />
        <SVGPrivacyClosed v-else />
        <div class="text">
          <span class="h4">{{ title }}</span>
          <span class="h5">{{ descriptions[index] }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', index: number): void;
  (e: 'click'): void;
}>();
const selected = defineModel<number>();

const titles = ['Открытая', 'Закрытая'];
const descriptions = [
  'Вступить в гильдию сможет любой желающий.',
  'Пользователи смогут найти гильдию в поиске и отправить заявку на вступление, также им можно отправить приглашение.'
];
const otherOptionsOpened = defineModel<boolean>('opened', {
  default: false
});

const titlesWithoutSelected = computed(() =>
  titles.filter((title, index) => index !== selected.value)
);

const select = (title: string) => {
  selected.value = titles.indexOf(title);
  otherOptionsOpened.value = false;
  emit('change', selected.value);
};
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  background: none;
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;

  button.button {
    background: none;
    width: 100%;
    padding: 0.875rem;
    border: 1px solid $white-60;
    border-radius: 0.75rem;

    background: #181818;

    cursor: pointer;

    color: $selectColor;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    &:hover {
      color: $selectHoverColor;
    }
  }

  &.active {
    background-color: #303d4d;
  }

  .other-options {
    width: 100%;
    display: flex;
    flex-direction: column;

    background-color: transparent;

    z-index: 1;

    button.option {
      width: 100%;
      padding: 0.75rem 1.25rem;
      background: transparent;

      color: $white;
      text-align: left;

      border-radius: 0.75rem;
      border: none;

      cursor: pointer;

      display: flex;
      align-items: center;
      gap: 1.25rem;

      svg {
        width: 1.25rem;
        height: 1.25rem;
        min-width: 1.25rem;
        min-height: 1.25rem;
      }

      .text {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
