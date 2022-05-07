<script>
import LoginVue from "./components/login.vue"
import Navbar from "./components/Navbar.vue"

export default{
    name:"App",
    components: {
        LoginVue,
        Navbar,
        Navbar
    }
}
</script>

<template>
<navbar />
<router-view></router-view>
</template>

<style>
</style>
