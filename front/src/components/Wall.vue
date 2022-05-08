<script>
import Card from "./Card.vue"
export default {
  name: "Wall",
  components: {
      Card
  }
};
</script>

<template>
  <h1>HOME PAGE</h1>
  <div class="container-sm">
    <div class="form-floating">
      <div
        contenteditable
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
      ></div>
      <label for="floatingTextarea">Comments</label>
    </div>
    <div class="d-flex">
      <label for="file-input" class="btn btn-secondary mt-1">Add image</label>
      <input id="file-input" type="file" />
      <button type="button" class="btn btn-primary mt-1 ms-auto">Post</button>
    </div>
    <hr class="dropdown-divider mt-4">
    <Card />
    <Card />
    <Card />
  </div>
</template>

<style >
input {
  display: none;
}
</style>
