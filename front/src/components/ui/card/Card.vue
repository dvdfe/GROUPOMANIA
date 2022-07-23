<script>
import Comment from "./Comment.vue";
import Avatar from "../Avatar.vue";
export default {
  name: "Card",
  components: {
    Comment,
    Avatar,
  },
  props: ["email", "title", "content", "url", "comments"]

  }
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
    </div>
    <img v-if="url" :src="url" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <div v-for="comment in comments">
        <Comment :email="comment.user" :content="comment.content"></Comment>
      </div>
      <div class="d-flex gap-1">
        <Avatar></Avatar>
        <input
          type="text"
          class="form-control"
          placeholder="Dire quelque chose..."
        />
        <button type="button" class="btn btn-primary ms-auto">Commenter</button>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 768px) {
  .card {
    width: 70%;
  }
}
.card-header img {
  width: 50px;
  margin-inline: 1rem;
}
</style>