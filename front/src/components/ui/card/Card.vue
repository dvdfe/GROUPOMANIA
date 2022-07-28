<script>
import Comment from "./Comment.vue";
import Avatar from "../Avatar.vue";
import { getUrlAndHeaders } from "./../../.././pages/services/fetchOptions";

export default {
  name: "Card",
  components: {
    Comment,
    Avatar,
  },
  props: ["email", "content", "url","title", "comments", "id", "currentUser"],
  data() {
    return {
      currentComment: null,
      admin: "admin@gmail.com"
    };
  },
  mounted() {},
  methods: {
    addComment(e) {
      const { url, headers } = getUrlAndHeaders()
      const options = {
        headers: { ...headers, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          comment: this.currentComment
        })
      }
      fetch(url + "posts/" + this.$props.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Erreur lors de la publication du commentaire")
          }
        })
        .then((res) => {
          this.$router.go()
        })
        .catch((err) => console.log("err:", err))
    },
 deletePost(e) {
      const { url, headers } = getUrlAndHeaders()
      fetch(url + "posts/" + this.$props.id, {
        headers: { ...headers, "Content-Type": "application/json" },
        method: "DELETE"
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Echec de la suppression de la publication")
          }
        })
        .then((res) => {
          this.$router.go()
        })
        .catch((err) => console.log("err:", err))    },
  },
};
</script>

<template>
  <div class="card mb-3 m-auto">
    <div class="card-header">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
        class="rounded-circle"
        alt="Avatar"
      />
      <span>{{ email }}</span>
      <i v-if="currentUser === email || currentUser === admin" class="bi bi-trash" @click="deletePost"></i>
    </div>
    <img v-if="url" :src="url" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <div v-for="comment in comments">
        <Comment :email="comment.user.email" :content="comment.content"></Comment>
      </div>
      <div class="d-flex gap-1">
        <Avatar></Avatar>
        <input
          type="text"
          class="form-control"
          placeholder="Dire quelque chose..."
          v-model="currentComment"
        />
        <button
          type="button"
          class="btn ms-auto"
          @click="addComment"
        >
          Commenter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .card {
    width: 70%;
  }
}
button {
  background-color: #ffd7d7;
  border: #ffd7d7;
  color: #4e5166
}

button:hover{
  background-color: #FD2D01;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.card-header img {
  width: 50px;
}

.bi-trash {
  margin-left: auto;
  font-size: 20px;
  height: 20px;
  width: 20px;
}
.bi-trash:hover {
  cursor: pointer;
  color: rgb(193, 57, 57);
  transform: scale(1.1);
}
.bi-trash::before {
  font-size: 20px;
}
</style>