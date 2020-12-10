import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import('../components/Main.vue')
const Subject = () => import('../components/Subject.vue')
const Progress = () => import('../components/Progress.vue')

const routes = [
    {
        path: '',
        redirect: '/main',
    },
    {
        path: '/main',
        component: Main,
    },
    {
        path: '/subject',
        component: Subject,
    },
    {
        path: '/progress',
        component: Progress,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router