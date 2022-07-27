<script>
import Card from "../../components/ui/card/Card.vue";
import PostForm from "./PostForm.vue";
import { getUrlAndHeaders } from "./../services/fetchOptions";

export default {
  name: "WallPage",
  components: {
    Card,
    PostForm,
  },
  methods: {
    async redirectToLoginIfNoToken() {
      const token = await Promise.resolve(localStorage.getItem("token"));
      if (token == null) {
        this.$router.push("/login");
      }
    },
    deleteUser(e){
      const { url, headers } = getUrlAndHeaders()
      console.log("url:", headers)
      fetch(url + "deleteUser", {
        headers: { ...headers, "Content-Type": "application/json" },
        method: "DELETE"
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Echec de la suppression du compte")
          }
        })
        .then((res) => {
          console.log("res:", res)
          this.$router.go()
        })
        .catch((err) => console.log("err:", err)) 
    }
  },
  mounted() {
    this.redirectToLoginIfNoToken();

    const url = "http://localhost:3001/posts";

    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log(url, options);
    fetch(url, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Echec du chargement des posts");
        }
      })
      .then((res) => {
        const { email, posts } = res;
        this.posts = posts;
        this.currentUser = email;
        console.log("this.posts:", this.posts);
      })
      .catch((err) => console.log("err", err));
  },
  data() {
    return {
      posts: [],
      currentUser: null,
    };
  },
};
</script>

<template>
  <div v-if="currentUser" class="container-sm">
    <span class="deleteUser" @click="deleteUser">Supprimer mon compte</span>
    <div class="col-sm-12">
      <h4 class="text-center">Bienvenue, {{ currentUser }}</h4>
    </div>
    <PostForm></PostForm>
    <div v-if="posts.length === 0">
      Pas encore de publication, à toi de jouer !
    </div>
    <div v-for="post in posts">
      <Card
        :currentUser="currentUser"
        :email="post.user.email"
        :content="post.content"
        :url="post.imageUrl"
        :comments="post.comments"
        :id="post.id"
      >
      </Card>
    </div>
  </div>
</template>

<style >
input {
  display: none;
}

.deleteUser{
  cursor: pointer;
}

.deleteUser:hover{
  color: red;
}


</style>
