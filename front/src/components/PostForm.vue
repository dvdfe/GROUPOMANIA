<script>
export default {
  name: "PostForm",
};
</script>
<template>
  <div class="form-floating mt-4">
    <div
      contenteditable
      class="form-control"
      placeholder="Leave a comment here"
      id="floatingTextarea"
    ></div>
    <label for="floatingTextarea">Quoi de neuf?</label>
  </div>
  <div class="d-flex">
    <label for="file-input" class="btn btn-secondary mt-1">Add image</label>
    <input id="file-input" type="file" />
    <button type="button" class="btn btn-primary mt-1 ms-auto">Post</button>
  </div>
  <hr class="dropdown-divider mt-4" />
</template>
<style module>
input {
  display: none;
}

body{
    background-color: #ced4da !important;
}
</style>