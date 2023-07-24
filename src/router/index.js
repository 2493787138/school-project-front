import Vue from 'vue'
import VueRouter from 'vue-router'

//创建路由组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/register.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import OptionCollection from '../views/Option-collection.vue'
import Relationship from '../views/Relationship.vue'
import Timeline from '../views/Timeline.vue'
Vue.use(VueRouter)


//将路由与组件映射
const routes = [
    {
        path:'/',
        //主路由
        component:Main,
        name:'Main',
        redirect:'/home',
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/register',
        name:'register',
        component:Register
    },
    {
        path:'/forgetPassword',
        name:'forgetPassword',
        component:ForgetPassword
    }
    
]

//创建router实例
const router =new VueRouter({
    routes
})

export default router