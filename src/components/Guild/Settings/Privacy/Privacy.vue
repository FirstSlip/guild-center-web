<template>
  <div class="privacy">
    <h2 class="h4">Уровни приватности гильдии</h2>
    <div class="privacy-selector opened">
      <div class="icon">
        <SVGPrivacyOpened />
      </div>
      <div class="info">
        <p class="h4">Открытая</p>
        <p class="p2">
          Вступить в гильдию сможет любой желающий.
        </p>
      </div>
      <UICheckbox v-model="isPublic" />
    </div>
    <div class="privacy-selector closed">
      <div class="icon">
        <SVGPrivacyClosed />
      </div>
      <div class="info">
        <p class="h4">Закрытая</p>
        <p class="p2">
          Пользователи смогут найти гильдию в поиске и отправить
          заявку на вступление, также им можно отправить
          приглашение.
        </p>
      </div>
      <UICheckbox v-model="isPrivate" />
    </div>
    <div class="age-selector">
      <h2 class="h4">Возрастной диапазон</h2>
      <div class="ages">
        <UIDualRangeSlider :from="12" :to="90" v-model="ages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isPrivate = ref(false);

const isPublic = ref(true);
const ages = ref({
  from: 12,
  to: 90
});

watch(isPrivate, () => {
  isPublic.value = !isPrivate.value;
});

watch(isPublic, () => {
  isPrivate.value = !isPublic.value;
});
</script>

<style lang="scss" scoped>
.privacy {
  width: 100%;
  min-height: calc(50dvh + 4.625rem);

  h2.h4 {
    margin-bottom: 0.5rem;
  }

  .privacy-selector {
    padding: 1rem;

    display: flex;
    align-items: center;
    gap: 1.75rem;

    .icon {
      width: 2rem;
      height: 2rem;
      min-width: 2rem;
      min-height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      margin-right: auto;
    }
  }

  .age-selector {
    padding: 1.25rem 0;
    border-top: 1px solid $white;
  }
}
</style>
