<script>
export default {
  name: "PostForm",
};
</script>
<template>
  <div class="form-floating mt-4">
    <div
      contenteditable
      class="form-control py-3"
      placeholder="Quoi de neuf?"
      id="floatingTextarea"
    ></div>
  </div>
  <div class="d-flex">
    <label for="file-input" class="btn btn-secondary mt-1">Ajouter une image</label>
    <input id="file-input" type="file" />
    <button type="button" class="btn btn-primary mt-1 ms-auto">Post</button>
  </div>
  <hr class="dropdown-divider mt-4" />
</template>
<style scoped>
input {
  display: none;
}

body{
    background-color: #ced4da !important;
}

.form-floating > .form-control, .form-floating > .form-select{
  height: auto !important;
  min-height: 5rem;
}

div[contenteditable]:empty:not(:focus)::before{
  content:attr(placeholder);
  color: #a0a0a0;
  display: block;
}
</style>