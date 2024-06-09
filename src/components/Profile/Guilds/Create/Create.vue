<template>
  <form class="create-guild" @submit.prevent>
    <div :class="['nav', currentStep === 1 && 'has-button']">
      <UIButton
        type="blank"
        font-type="p1"
        v-if="currentStep === 1"
      >
        Вернуться
      </UIButton>
      <p class="steps">
        <span class="title h5">Шаг</span>
        <transition name="step" mode="out-in">
          <span :key="currentStep" class="current-step h4">
            {{ currentStep }}
          </span>
        </transition>
        <span class="max-step h4">/5</span>
      </p>
    </div>
    <transition name="step-form" mode="out-in">
      <ProfileGuildsCreateFirst
        v-if="currentStep === 1"
        v-model:name="guildName"
        @next="addStep"
        @prev="reduceStep"
      />
      <ProfileGuildsCreateSecond
        v-else-if="currentStep === 2"
        v-model="selectedGames"
        @next="addStep"
        @prev="reduceStep"
      />
      <ProfileGuildsCreateThird
        v-else-if="currentStep === 3"
        v-model="selectedGameTypes"
        @next="addStep"
        @prev="reduceStep"
      />
      <ProfileGuildsCreateFourth
        v-else-if="currentStep === 4"
        v-model:age="age"
        v-model:privacy="privacy"
        @next="addStep"
        @prev="reduceStep"
      />
      <ProfileGuildsCreateFifth
        v-else-if="currentStep === 5"
        :guildName="guildName"
        :selected-games="selectedGames"
        :selected-game-types="selectedGameTypes"
        :age="age"
        @next="submit"
        @prev="reduceStep"
      />
    </transition>
  </form>
</template>

<script lang="ts" setup>
import { gamesArray } from '@/common/data/gamesArray';

const guildName = ref('');
const selectedGames = ref<string[]>([]);
const selectedGameTypes = ref<string[]>([]);
const privacy = ref<0 | 1>(0);
const age = ref({
  from: 12,
  to: 90
});

const currentStep = ref(1);
const addStep = () => currentStep.value++;
const reduceStep = () => currentStep.value--;

const submit = async () => {
  if (guildName.value.length <= 0) {
    return;
  }
  const finalGamesArray = gamesArray.filter((game) =>
    selectedGames.value.includes(game.name)
  );
  const response = await $api.guild.createGuild({
    name: guildName.value,
    avatar: 'https://i.pravatar.cc/300',
    games: finalGamesArray.map((game) => {
      return { name: game.name, genre: game.genres[0] };
    }),
    trends: selectedGameTypes.value,
    privacy: !!privacy.value,
    age: {
      min: age.value.from,
      max: age.value.to
    }
  });

  if ($api.utils.isSuccess(response)) {
    useRouter().push(`/guild/${response.data.guildId}`);
  }
};
</script>

<style lang="scss" scoped>
form.create-guild {
  width: 53.12rem;
  height: 50rem;
  /* height: 800px; */
  padding: 1.25rem 5rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background: $light-purple;

  border: 1px solid $white;
  border-radius: 0.75rem;

  .nav {
    height: 2.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    &.has-button {
      justify-content: space-between;

      button {
        padding: 0.25rem 1rem 0.25rem 0;
      }
    }

    .steps {
      box-sizing: content-box;
      width: 5rem;
      display: flex;
      align-items: center;

      span.title {
        margin-right: auto;
      }
    }
  }
}

.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.step-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.step-form-enter-active,
.step-form-leave-active {
  transition: all 0.3s ease;
}
.step-form-enter-from,
.step-form-leave-to {
  opacity: 0;
}
</style>
