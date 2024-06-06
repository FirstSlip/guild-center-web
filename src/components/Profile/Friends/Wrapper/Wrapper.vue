<template>
  <section class="friends-wrapper">
    <h1 class="h3">Друзья</h1>
    <div class="tabs">
      <UITabGroup
        :tabs="tabs.slice(0, tabs.length - 1)"
        tabsType="secondary"
        :activeTab="currentTab"
        @click="(index) => $emit('switchTab', index)"
      />
      <UIButton
        :type="buttonType"
        font-type="h5"
        class="add"
        @click="$emit('switchTab', tabs.length - 1)"
      >
        {{ tabs[tabs.length - 1] }}
      </UIButton>
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentTab: number;
  tabs: string[];
}>();
defineEmits<{
  (e: 'switchTab', index: number): void;
}>();

const buttonType = computed<'primary' | 'blank'>(() =>
  props.currentTab === props.tabs.length - 1
    ? 'blank'
    : 'primary'
);
</script>

<style lang="scss" scoped>
section.friends-wrapper {
  max-width: 58.125rem;
  min-height: 80dvh;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 1.5rem 2.5rem;

  overflow: hidden;

  background: $light-purple;

  h1.h3 {
    padding-bottom: 1rem;
  }

  .tabs {
    width: 100%;
    border-bottom: 1px solid $stroke-white;
    margin-bottom: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .find {
      padding: 0.25rem 2.5rem;

      font-weight: 700;
      font-size: 1rem;
      line-height: 155%;
      color: $text-dark;
    }

    .add {
      margin-bottom: 0.25rem;
    }
  }

  .main {
    width: 100%;
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
