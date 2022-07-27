<script>
import { getUrlAndHeaders } from "./../pages/services/fetchOptions"
import axios from "axios"
export default {
  name: "LoginPage",
  data() {
    return {
      username: "david@gmail.com",
      password: "456456",
      confirmPassword: "456456",
      hasInvalidCredentials: false,
      error: null,
      isLoginMode: true
    }
  },
  methods: {
    loginUser,
    setFormValidity,
    toggleLoginMode() {
      this.isLoginMode = !this.isLoginMode
    },
    signUp: async function (email, password, confirmPassword, router) {
      const { url } = getUrlAndHeaders()
      const body = JSON.stringify({
        email,
        password,
        confirmPassword
      })
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      try {
        await axios.post(url + "auth/signup", body, options)
        console.log("router:", router)
        this.$router.go("/")
      } catch (err) {
        const error = err.response.data.error
        this.error = error
        throw new Error("Erreur lors de l'enregistrement du compte:" + error)
      }
    }
  },
  watch: {
    username(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    },
    password(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    }
  }
}
function setFormValidity(bool) {
  console.log("setFormValidity:", bool)
  this.hasInvalidCredentials = !bool
}
function loginUser(email, password,) {
  const { url } = getUrlAndHeaders()
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }
  fetch(url + "auth/login", options)
    .then((res) => {
      if (res.ok) return res.json()
      res.text().then((err) => {
        const { error } = JSON.parse(err)
        this.error = error
        throw new Error(error)
      })
    })
    .then((res) => {
      const token = res.token
      localStorage.setItem("token", token)
      let tokenInCache
      while (tokenInCache == null) {
        tokenInCache = localStorage.getItem("token")
      }
      this.$router.push("/home")
    })
    .catch((err) => {
      console.error(err)
    })
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

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="username"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingInput">Adresse email</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div v-if="!isLoginMode" class="form-floating">
        <input
          type="password"
          class="form-control"
          placeholder="Confirm password"
          v-model="confirmPassword"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div v-if="hasInvalidCredentials" class="error-msg">Les champs ne peuvent pas être vides</div>
      <div v-if="!hasInvalidCredentials && error" class="error-msg">{{ error }}</div>

      <button
        v-if="isLoginMode"
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="
          () => loginUser(this.username, this.password, this.$router, this.usersStore)
        "
        :disabled="hasInvalidCredentials"
      >
        Connexion
      </button>
      <button
        v-else
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="
          () => signUp(this.username, this.password, this.confirmPassword, this.$router)
        "
        :disabled="hasInvalidCredentials"
      >
        S'inscrire
      </button>
      <p class="mt-1 mb-1" @click.prevent="toggleLoginMode">
        <a href="">{{ this.isLoginMode ? "Créer un compte" : "Menu de connexion" }}</a>
      </p>
    </form>
  </main>
</template>
<style scoped>



.hasErrors input {
  border: 1px solid red;
}
.error-msg {
  color: red;
}
html,
body {
  align-items: center;
  padding-bottom: 40px;
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
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
button[type="submit"] {
  margin-block: 1rem;
  background-color: #ffd7d7;
  border: #ffd7d7;
  color: #4E5166;
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