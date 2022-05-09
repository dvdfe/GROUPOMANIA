<script>
import Card from "../../components/ui/card/Card.vue"
import PostForm from "./PostForm.vue"
export default {
  name: "WallPage",
  components: {
      Card,
      PostForm,
  }
};
</script>

<template>
  <div class="container-sm">
      <PostForm />
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
