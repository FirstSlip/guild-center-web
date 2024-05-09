<template>
  <div class="settings">
    <div class="name">
      <h2 class="h4">Никнейм</h2>
      <UIInputSecondary
        fill
        placeholder="Никнейм"
        v-model="username"
      />
      <p class="p2">
        <span>Количество символов</span>
        <span>0/20</span>
      </p>
    </div>
    <div class="info">
      <div class="avatar">
        <h2 class="h4">Аватар</h2>
        <div class="preview">
          <div class="image">
            <WidgetsAvatar
              v-if="!avatarSrc"
              :avatar-url="user?.avatar"
              :name="user?.name || 'Error'"
            />
            <img v-else :src="avatarSrc" :alt="user?.name" />
          </div>
        </div>
        <p class="p2">
          <span>Рекомендуемое разрешение</span>
          <span>128 x 128</span>
        </p>
        <div class="buttons">
          <UIButton
            type="primary"
            font-type="h5"
            @click="() => openSelector('avatar')"
          >
            Изменить
          </UIButton>
          <input
            type="file"
            id="file-input"
            class="file-input"
            ref="avatarFileInput"
            accept="image/png, image/jpeg"
            @change="changeAvatar"
          />
          <UIButton
            type="blank"
            font-type="h5"
            @click="deleteAvatar"
          >
            Удалить
          </UIButton>
        </div>
      </div>
      <div class="about">
        <h2 class="h4">Обо мне</h2>
        <UITextarea
          fill
          v-model="about"
          name="about"
          id="about"
        />
        <p class="p2">
          <span>Количество символов</span>
          <span>0/40</span>
        </p>
      </div>
    </div>
    <div class="banner">
      <h2 class="h4">Баннер</h2>
      <div class="preview">
        <div
          class="image"
          v-if="!bannerSrc"
          :style="`background-color: ${bannerDefaultColor}`"
        ></div>
        <img v-else :src="bannerSrc" :alt="user?.name" />
      </div>
      <p class="p2">
        <span>Рекомендуемое разрешение</span>
        <span>850 x 170 (5:1)</span>
      </p>
      <div class="buttons">
        <UIButton
          type="primary"
          font-type="h5"
          @click="() => openSelector('banner')"
        >
          Изменить
        </UIButton>
        <input
          type="file"
          id="file-input"
          class="file-input"
          ref="bannerFileInput"
          accept="image/png, image/jpeg"
          @change="changeBanner"
        />
        <UIButton
          type="blank"
          font-type="h5"
          @click="deleteBanner"
        >
          Удалить
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';

const avatarFileInput = ref<HTMLInputElement | null>(null);
const bannerFileInput = ref<HTMLInputElement | null>(null);
const user = useProfile().user;

const openSelector = (type: 'avatar' | 'banner') => {
  if (type === 'avatar') {
    avatarFileInput.value?.click();
  } else if (type === 'banner') {
    bannerFileInput.value?.click();
  }
};

const deleteAvatar = () => {
  avatarSrc.value = null;
};

const deleteBanner = () => {
  bannerSrc.value = null;
};

/* const avatarSrc = ref<string | null>(null); */
/* const bannerSrc = ref<string | null>(null); */
const username = defineModel<string>('username', {
  default: ''
});
const avatarSrc = defineModel<string | null>('avatarSrc', {
  default: null
});
const about = defineModel<string>('about', {
  default: ''
});
const bannerSrc = defineModel<string | null>('bannerSrc', {
  default: null
});

watch(username, () => {
  console.log(username.value);
});

const changeAvatar = (e: Event) => {
  /* console.log(e.currentTarget?.files); */
  const [file] = (<HTMLInputElement>e.target).files || [];
  if (file) {
    avatarSrc.value = URL.createObjectURL(file);
  }
  /* var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
    }

    reader.readAsDataURL(file); */
};

const changeBanner = (e: Event) => {
  /* console.log(e.currentTarget?.files); */
  const [file] = (<HTMLInputElement>e.target).files || [];
  if (file) {
    bannerSrc.value = URL.createObjectURL(file);
  }
  /* var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
    }

    reader.readAsDataURL(file); */
};

const bannerDefaultColor = computed(() => {
  return generateAvatarColor(user.value?.name || 'Error');
});
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;

  .name {
    h2 {
      padding: 0.5rem 0rem;
    }

    p.p2 {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: space-between;

      padding: 0.25rem 0;

      span {
        color: $text-white-60;
      }
    }
  }

  .info {
    display: grid;
    grid-template-columns: 38% calc(62% - 1.125rem);
    gap: 1.125rem;
    margin: 1rem 0;

    .avatar {
      h2 {
        padding: 0.5rem 0rem;
      }

      .preview {
        position: relative;
        width: 100%;
        height: 10rem;

        background: #323232;
        border-radius: 0.25rem;

        .image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          width: 8.75rem;
          height: 8.75rem;
          border-radius: 100%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            background-size: cover;
          }
        }
      }

      p.p2 {
        padding: 0.25rem 0;
        margin-bottom: 0.75rem;
        display: flex;
        justify-content: space-between;

        span {
          color: $text-white-60;
        }
      }

      .buttons {
        display: flex;
        gap: 0.5rem;

        .file-input {
          display: none;
        }
      }
    }

    .about {
      h2 {
        padding: 0.5rem 0rem;
        text-align: center;
      }

      p.p2 {
        padding: 0.25rem 0;
        display: flex;
        justify-content: space-between;

        span {
          color: $text-white-60;
        }
      }
    }
  }

  .banner {
    h2 {
      padding: 0.5rem 0rem;
    }

    .preview {
      width: 100%;
      aspect-ratio: 5 / 1;
      margin-bottom: 0.75rem;

      .image {
        width: 100%;
        height: 100%;

        border-radius: 0.25rem;
      }

      img {
        width: 100%;
        height: 100%;
        /* background-size: cover; */

        border-radius: 0.25rem;
      }
    }

    p.p2 {
      padding: 0.25rem 0;
      display: flex;
      gap: 1.25rem;
      justify-content: flex-end;

      span {
        color: $text-white-60;
      }
    }

    .buttons {
      display: flex;
      gap: 0.5rem;

      .file-input {
        display: none;
      }
    }
  }
}
</style>
