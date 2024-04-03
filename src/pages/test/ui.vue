<template>
  <div class="ui-test">
    <div class="buttons">
      <UIButton type="primary">primary</UIButton>
      <UIButton type="secondary">secondary</UIButton>
      <UIButton type="primary" transparent>
        primary transparent
      </UIButton>
      <UIButton type="secondary" transparent>
        secondary transparent
      </UIButton>
      <UIButton type="primary" fill>primary filled</UIButton>
      <UIButton type="secondary" fill>secondary filled</UIButton>
      <UIButton type="primary" transparent fill>
        primary transparent filled
      </UIButton>
      <UIButton type="secondary" transparent fill>
        secondary transparent filled
      </UIButton>
    </div>
    <div class="links">
      <p>
        <UILink type="primary" to="/test/ui">
          ссылка основная
        </UILink>
      </p>
      <p>
        <UILink type="secondary" to="/test/ui">
          ссылка дополнительная
        </UILink>
      </p>
      <p>
        Что-то там
        <UILink type="primary" to="/test/ui">
          ссылка основная
        </UILink>
        что-то там
      </p>
      <p>
        Что-то там
        <UILink type="primary" to="/test/ui" inherit-font>
          ссылка основная, наследует шрифт
        </UILink>
        что-то там
      </p>
    </div>
    <div class="inputs">
      <UIInput />
      <UIInput type="password" placeholder="Password" />
      <UIInput
        type="password"
        placeholder="Password"
        error="Error"
      />
      <UIInput error="Error" />
      <UIInput validated />
    </div>
    <div class="inputs">
      <p>asdasd</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.ui-test {
  width: 100%;

  .buttons {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
    border: 1px solid white;
    border-radius: 10px;
  }
  .inputs {
    background-color: #121729;
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
    border: 1px solid white;
    border-radius: 10px;

    p {
      padding: 1rem;
      color: white;
      transition: 0.15s ease;

      &:hover {
        color: $text-white-60;
      }
    }
  }

  .links {
    background-color: #121729;
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;

    border: 1px solid white;
    border-radius: 10px;
  }
}
</style>
