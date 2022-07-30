<script>
import Card from "../../components/ui/card/Card.vue";
import PostForm from "./PostForm.vue";
import { getUrlAndHeaders } from "./../services/fetchOptions";
import axios from 'axios';

export default {
  name: "WallPage",
  components: {
    Card,
    PostForm,
  },
  methods: {

    deleteUser: async function (email){
      const { url } = getUrlAndHeaders();
      const body = JSON.stringify({
        email,
        method: "DELETE",
      });
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      try {
        await axios.post(url + "deleteUser", body, options)
        localStorage.removeItem("token")
        this.$router.go("/login")
      } catch (error) {
        throw new Error("Erreur lors de la suppression du compte:" + error);
      }
    },
  },
  
  mounted() {
    const url = "http://localhost:3001/posts";

    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
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
      })
      .catch((err) => console.log("err", err))
      
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
    <span class="deleteUser" @click.prevent="
          () => deleteUser(this.currentUser, this.$router)">Supprimer mon compte</span>
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

.deleteUser {
  cursor: pointer;
}

.deleteUser:hover {
  color: red;
}
</style>
