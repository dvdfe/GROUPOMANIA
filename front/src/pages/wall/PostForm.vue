<script>
export default {
  name: "PostForm",
  data() {
    return {
      content: "",
      selectedImage: null,
    };
  },
  methods: {
    handleNewFile(e) {
      this.selectedImage = e.target.files[0];
    },
    handleClick() {
      const url = "http://localhost:3001/posts";

      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("selectedImage", this.selectedImage);

      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      };
      fetch(url, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(" Echec de la publication");
          }
        })
        .then(() => {
          this.$router.go();
        })
        .catch((err) => console.log("err:", err));
    },
  },
};
</script>

<template>
  <div class="form-floating mt-3">
    <input class="form-control py-3" v-model="content" />
  </div>

  <div class="d-flex">
    <label for="file-input" class="btn btn-secondary mt-1"
      >Ajouter une image</label
    >
    <span v-if="selectedImage">{{ selectedImage.name }}</span>
    <input id="file-input" type="file" @change="handleNewFile"/>
    <button
      @click="handleClick"
      type="button"
      class="btn btn-primary mt-1 ms-auto"
    >
      Publier
    </button>
  </div>

  <hr class="dropdown-divider mt-4" />
</template>

<style scoped>
#file-input {
  display: none;
}
label {
  display: grid;
  place-content: center;
}
div span {
  margin: 1rem;
}
body {
  background-color: #5f5f5f1a !important;
}
.form-floating > div.form-control {
  height: auto;
  min-height: 5rem;
}
.form-floating > div.form-control:empty:not(:focus)::before {
  content: "Leave a comment here";
  color: #a0a0a0;
  display: block;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}
</style>