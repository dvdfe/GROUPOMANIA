import WallPage from '../pages/wall/WallPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import EditProfile from '../pages/EditProfile.vue'

import {createRouter, createWebHistory} from 'vue-router'



const routes = [
    {path: '/login', component: LoginPage},
    {path: '/signup', component: LoginPage},
    { path: '/home', component: WallPage},
    { path: '/profile', component: ProfilePage},
    { path: '/edit-profile', component: EditProfile},
    { path: '/', redirect: "/home"},

]
const router = createRouter({history: createWebHistory(), routes})

router.beforeEach((to, from) => {
if (isLoginRequired(to)){
    return router.push("/login")
}
})

function isLoginRequired(to){
    if (!isPrivatePage(to)) return false
    if (!isTokenInCache(to)) return true
    if (!isTokenValid(to)) return true
    return false
}

function isPrivatePage(to){
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
}

function isTokenInCache(to){
    return localStorage.getItem("token") != null
}

function isTokenValid(){
    const token = localStorage.getItem("token")
    return token === "my token"
}
export  {router}