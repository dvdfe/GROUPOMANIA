<script>
import Card from "../../components/ui/card/Card.vue"
import PostForm from "./PostForm.vue"
export default {
  name: "WallPage",
  components: {
      Card,
      PostForm,
  },

  beforeCreate(){
    const token = localStorage.getItem("token")
    if (token == null){
      this.$router.push("/login")
    }
  },
  mounted(){
    const url = "http://localhost:3001/posts"

    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    console.log(url, options)
    fetch(url, options)
    .then((res) => {
      if (res.status === 200){
        return res.json()
      } else {
        throw new Error("Echec du chargement des posts")
      }
    })
    .then((res) => { 
      const {email, posts} = res
      this.email = email
      this.posts = posts
      console.log("this.posts:", this.posts)
      })
    .catch((err) => console.log("err", err))
  },
  data(){
    return {
      posts: [],
      email: null
    }
  }

};
</script>

<template>
  <div v-if="email" class="container-sm">
      <PostForm ></PostForm>
      <div  v-for="post in posts">
    <Card :email="post.user" :title="post.title" :content ="post.content" :url="post.url" :comments="post.comments"> </Card >
    </div>
  </div>
</template>

<style >
input {
  display: none;
}
</style>
