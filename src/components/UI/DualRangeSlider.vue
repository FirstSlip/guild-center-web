<template>
  <div class="slider">
    <div class="controls">
      <div class="wrapper">
        <span class="p3">от</span>
        <input
          type="number"
          class="p3"
          :min="from"
          :max="to"
          v-model="displayedFromValue"
          @blur="updateFromValue"
        />
      </div>
      <div class="wrapper">
        <span class="p3">до</span>
        <input
          type="number"
          class="p3"
          :min="from"
          :max="to"
          v-model="displayedToValue"
          @blur="updateToValue"
        />
      </div>
    </div>
    <div class="sliders_control">
      <input
        id="fromSlider"
        type="range"
        :min="from"
        :max="to"
        v-model="fromValue"
        @change=""
      />
      <input
        id="toSlider"
        type="range"
        :min="from"
        :max="to"
        v-model="toValue"
      />
    </div>
    <!-- {{ fromValue }} - {{ toValue }} -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  from: number;
  to: number;
}>();
const model = defineModel<{ to: number; from: number }>({
  default: { to: 0, from: 100 }
});

const fromValue = ref(props.from);
const toValue = ref(props.to);

const displayedFromValue = ref(props.from);
const displayedToValue = ref(props.to);

const updateFromValue = () => {
  if (Number(displayedFromValue.value) < props.from) {
    displayedFromValue.value = props.from;
  }
  if (Number(displayedFromValue.value) > props.to) {
    displayedFromValue.value = props.to;
  }
  if (
    Number(displayedFromValue.value) >
    Number(displayedToValue.value)
  ) {
    displayedFromValue.value = displayedToValue.value;
  }
  fromValue.value = displayedFromValue.value;
  model.value.from = Number(fromValue.value);
};

const updateToValue = () => {
  if (Number(displayedToValue.value) < props.from) {
    displayedToValue.value = props.from;
  }
  if (Number(displayedToValue.value) > props.to) {
    displayedToValue.value = props.to;
  }
  if (
    Number(displayedToValue.value) <
    Number(displayedFromValue.value)
  ) {
    displayedToValue.value = displayedFromValue.value;
  }
  toValue.value = displayedToValue.value;
  model.value.to = Number(toValue.value);
};

watch(fromValue, () => {
  if (Number(fromValue.value) < props.from) {
    fromValue.value = props.from;
  }
  if (Number(fromValue.value) > Number(toValue.value)) {
    toValue.value = fromValue.value;
  }
  displayedFromValue.value = fromValue.value;
  displayedToValue.value = toValue.value;
  model.value.from = Number(fromValue.value);
  model.value.to = Number(toValue.value);
});

watch(toValue, () => {
  if (Number(toValue.value) > props.to) {
    toValue.value = props.to;
  }
  if (Number(toValue.value) < Number(fromValue.value)) {
    fromValue.value = toValue.value;
  }
  displayedFromValue.value = fromValue.value;
  displayedToValue.value = toValue.value;
  model.value.from = Number(fromValue.value);
  model.value.to = Number(toValue.value);
});
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: column;
  width: 100%;

  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.875rem;

    .wrapper {
      border: 2px solid $white;
      border-radius: 0.625rem;
      padding: 0.25rem 0.75rem;
      width: 7.5rem;

      display: flex;
      gap: 0.25rem;

      span.p3 {
        color: $text-white-60;
      }

      input[type='number'] {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;

        appearance: textfield;
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
}

.sliders_control {
  box-sizing: content-box;
  position: relative;
  /* min-height: 50px; */
  height: 10px;
  padding: 10px 0;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 30px;
  height: 30px;
  background-color: $main;
  border-radius: 50%;
  border: 6px solid $white;
  cursor: pointer;

  /*  box-shadow: 10px 5px 5px red; */
}

input[type='range']::-moz-range-thumb {
  appearance: textfield;
  -webkit-appearance: none;
  pointer-events: all;
  width: 30px;
  height: 30px;
  background-color: $main;
  border-radius: 50%;
  border: 6px solid $white;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb:hover {
  scale: 1.15;
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 100%;
  position: absolute;
  background-color: $main;
  pointer-events: none;

  border-radius: 0.5rem;
}

#fromSlider {
  height: 0;
  transform: translateY(5px);
  z-index: 1;
}
</style>
