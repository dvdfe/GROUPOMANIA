<script>
function checkCredentials(email, password) {
  console.log({ email, password });

  if (email !== "string@string.string") throw new Error("email invalide");
  if (password !== "456456") throw new Error("mot de passe invalide");

  const token = "my token";
  localStorage.setItem("token", token);
  this.$router.push("/home");
}

export default {
  name: "LoginPage",
  data,
  methods: { checkCredentials, isFormInvalid },
  watch: {
    username(value) {
      const isValueEmpty = value === ""
      this.isFormInvalid(!isValueEmpty);
    },
    password(value) {
      const isValueEmpty = value === ""
      this.isFormInvalid(!isValueEmpty);
    },
  },
};

function isFormInvalid(bool) {
  this.hasInvalidCredentials = !bool;
}

function data() {
  return {
    username: "string@string.string",
    password: "456456",
    hasInvalidCredentials: false,
  };
}
</script>
<template>
  <main class="form-signin">
    <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
      <img
        class="mb-4 d-block mx-auto"
        src="/assets/icon-left-font-monochrome-black.png"
        alt=""
        width="300"
        height="300"
      />
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="username"
          required="true"
          @invalid="isFormInvalid"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required="true"
          @invalid="isFormInvalid"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <span v-if="hasInvalidCredentials" class="error-msg">Remplissez tous les champs</span>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="() => checkCredentials(this.username, this.password)"
        :disabled="hasInvalidCredentials"
      >
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">Value: {{ username }}</p>
      <p class="mt-5 mb-3 text-muted">Value: {{ password }}</p>
    </form>
  </main>
</template>
<style scoped>

.error-msg{
  color: red;
}

.hasErrors input{
  border: 1px solid red;
}

html,
body {
  height: 100%;
}

body {
  align-items: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
