import WallPage from '../pages/wall/WallPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

import {createRouter, createWebHistory} from 'vue-router'



const routes = [
    {path: '/login', component: LoginPage},
    { path: '/home', component: WallPage},
    { path: '/profile', component: ProfilePage},
]
const router = createRouter({history: createWebHistory(), routes})

export  {router}