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
      <UIButton type="back">back</UIButton>
      <UIButton type="primary" fill>primary filled</UIButton>
      <UIButton type="secondary" fill>secondary filled</UIButton>
      <UIButton type="primary" transparent fill>
        primary transparent filled
      </UIButton>
      <UIButton type="secondary" transparent fill>
        secondary transparent filled
      </UIButton>
      <UIButton type="back" fill>back</UIButton>
      <UIButton type="primary" fill disabled>disabled</UIButton>
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
        <UILink
          type="primary"
          to="/test/ui"
          font-type="inherited"
        >
          ссылка основная, наследует шрифт
        </UILink>
        что-то там
      </p>
      <p>
        <UILink to="/test/ui" font-type="h1">H1 link</UILink>
      </p>
      <p>
        <UILink to="/test/ui" font-type="h4">H4 link</UILink>
      </p>
      <p>
        <UILink to="/test/ui" font-type="p1">P1 link</UILink>
      </p>
      <p>
        <UILink to="/test/ui" font-type="p4">P4 link</UILink>
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
      <UIInputSecondary />
      <UIInputSecondary type="password" placeholder="Password" />
      <UIInputSecondary
        type="password"
        placeholder="Password"
        error="Error"
      />
      <UIInputSecondary error="Error" />
      <UIInputSecondary validated />
    </div>
    <div class="code-inputs">
      default
      <UICodeInput />
      filled
      <UICodeInput fill />
      length = 5
      <UICodeInput :length="5" />
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

  .code-inputs {
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
    text-align: center;
  }
}
</style>
