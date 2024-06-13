<template>
  <div class="first-step">
    <div class="title">
      <h1 class="h3">Персонализируйте вашу Гильдию!</h1>
      <p class="p1">
        Придумайте назавние Гильдии и загрузить аватар, вы
        сможете сменить их в любой момент.
      </p>
    </div>
    <button
      class="avatar"
      @click="openSelector"
      :style="avatarSrc && `background-image: url(${avatarSrc})`"
    >
      <div class="description" v-if="!avatarSrc">
        <SVGCamera />
        <p class="h4">Загрузить</p>
      </div>
      <input
        type="file"
        id="file-input"
        class="file-input"
        ref="avatarFileInput"
        accept="image/png, image/jpeg"
        @change="changeAvatar"
      />
    </button>
    <div class="name">
      <UIInput
        placeholder="Придумайте название гильдии"
        v-model="name"
      />
      <UIButton type="primary" fill @click="$emit('next')">
        Продолжить
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { resizeImage } from '@/common/func/resizeImage';

defineEmits<{
  (e: 'next'): void;
}>();

const avatarSrc = defineModel<string>('avatarSrc', {
  default: null
});
const name = defineModel<string>('name', { default: '' });

const openSelector = () => {
  avatarFileInput.value?.click();
};
const avatarFileInput = ref<HTMLInputElement | null>(null);

const changeAvatar = async (e: Event) => {
  const [file] = (<HTMLInputElement>e.target).files || [];
  if (file) {
    /* const base64 = await toBase64(file);
    if (typeof base64 === 'string') {
      avatarSrc.value = base64;
      emit('changeAvatar', base64);
    } */
    try {
      const resizedImage = await resizeImage(file, 128, 128);
      avatarSrc.value = resizedImage;
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  }
};
</script>

<style lang="scss" scoped>
.first-step {
  height: 100%;
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    text-align: center;

    h1 {
      margin-bottom: 0.5rem;
    }
  }

  .avatar {
    background: none;
    background-size: 100% 100%;
    width: 16.5rem;
    height: 16.5rem;
    margin: 0 auto;

    display: flex;
    align-items: center;

    border: 4px dashed $white;

    cursor: pointer;

    .description {
      margin: auto;
      text-align: center;
    }

    .file-input {
      display: none;
    }
  }

  .name {
    margin: 0 auto;
    width: 22rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
