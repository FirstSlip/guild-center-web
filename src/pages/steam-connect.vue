<template>
  <div class="steam-connect">
    <div class="steam">
      <div class="loader" v-if="isLoading"></div>
      <p class="h3" v-else-if="!isError">Успешно</p>
      <p class="h3" v-else>Произошла ошибка</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = computed<string>(() => route.query.id || '');

const isLoading = ref(true);
const isError = ref(true);

const profile = useProfile().user;

const verifySteam = async () => {
  const response = await $api.user.verifySteam(id.value);
  isLoading.value = false;
  if ($api.utils.isSuccess(response)) {
    isError.value = false;
    await useProfile().loadProfile();
  }
  setTimeout(() => {
    useRouter().push(`/profile_${profile.value?.tag || ''}`);
  }, 2000);
};

if (id.value.length > 0) {
  verifySteam();
}
watch(id, () => {
  if (id.value.length > 0) {
    verifySteam();
  }
});
</script>

<style lang="scss" scoped>
.steam-connect {
  width: 100%;
  height: 100%;
  .steam {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30rem;
    height: 22rem;

    border: 1px solid $white-60;
    border-radius: 0.5rem;
    background-color: $light-purple;

    .loader {
      width: 6rem;
      height: 6rem;

      border: 5px solid white;
      border-radius: 100%;
      border-right-color: transparent;

      animation: rotate 1s infinite linear;

      @keyframes rotate {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
