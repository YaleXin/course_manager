import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import('../components/Main.vue')
const Subject = () => import('../components/Subject.vue')
const Progress = () => import('../components/Progress.vue')
const Team = () => import('../components/Team.vue')
const Login = () => import('../components/Login.vue')
const InfoForm = () => import('../components/InfoForm.vue')
const InputSubject = () => import('../components/InputSubject.vue')

const routes = [
    {
        path: '',
        redirect: '/main',
    },
    {
        path: '/main',
        component: Main,
        beforeEnter: (to, from, next) => {
            console.log('进入main');
            next();
        }
    },
    {
        path: '/subject',
        component: Subject,
        beforeEnter: (to, from, next) => {
            console.log('进入subject');
            next();
        }
    },
    {
        path: '/progress',
        component: Progress,
        beforeEnter: (to, from, next) => {
            console.log('进入progress');
            next();
        }
    },
    {
        path: '/team',
        component: Team,
        beforeEnter: (to, from, next) => {
            console.log('进入team');
            next();
        }
    },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            console.log('进入登陆');
            next();
        }
    },
    {
        path: '/modify',
        component: InfoForm,
        beforeEnter: (to, from, next) => {
            console.log('进入修改');
            next();
        }
    },
    {
        path: '/addSubject',
        component: InputSubject,
        beforeEnter: (to, from, next) => {
            console.log('进入添加题目');
            next();
        }
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router