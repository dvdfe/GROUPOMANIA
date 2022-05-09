<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
export default {
  name: "Card",
  components: {
      Comment,
      Avatar,
  }
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
      Kévin
    </div>
    <img src="https://picsum.photos/400/200" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Projet 7</h5>
      <p class="card-text">
        Les résultats de l'équipe marketing d'aujourd'hui !
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
        <Comment></Comment>
        <Comment></Comment>
<div class="d-flex gap-1">
    <Avatar></Avatar>
    <input type="text" class="form-control" placeholder="Dire quelque chose..."/>
    <button type="button" class="btn btn-primary ms-auto">Reply</button>
</div>
    </div>
  </div>
</template>

<style>
@media (min-width: 768px){
    .card {
      width: 70%;
    }
}
.card-header img {
  width: 50px;
}
</style>