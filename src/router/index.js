import Vue from 'vue'
import Router from 'vue-router'
/*
import Login from '../pages/Login/template.vue'
import Create from '../pages/Create/template.vue'
import Detail from '../pages/Detail/template.vue'
import Index from '../pages/Index/template.vue'
import My from '../pages/My/template.vue'
import User from '../pages/User/template.vue'
import Register from '../pages/Register/template.vue'
import Edit from '../pages/Edit/template.vue'
*/

import store from '../store'

window.store = store
Vue.use(Router)

/*
const router = new Router({
  routes: [
    {
      path:'/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name: 'Login',
      component: Login     
    },
    {
      path:'/create',
      name: 'Create',
      component: Create,
      meta: { requiresAuth:true }       
    },
    {
      path:'/detail/:blogId',
      name: 'Detail',
      component: Detail   
    },
    {
      path:'/my',
      name: 'My',
      component: My,
      meta: { requiresAuth:true }      
    },
    {
      path:'/user/:userId',
      name: 'User',
      component: User     
    },
    {
      path:'/register',
      name: 'Register',
      component: Register     
    },
    {
      path:'/edit/:blogId',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth:true }  
    }
    
  ]
})
*/

const router = new Router({
  routes: [
    {
      path: '/',
      component: ()=> import('@/pages/Index/template.vue')
    },
    {
      path: '/login',
      component: ()=> import('@/pages/Login/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: ()=> import('@/pages/Detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: ()=> import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/create',
      component: ()=> import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/user/:userId',
      component: ()=> import('@/pages/User/template.vue')
    },
    {
      path: '/my',
      component: ()=> import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: ()=> import('@/pages/Register/template.vue')
    }
    
  ]
})

router.beforeEach((to,from,next)=> {
  if(to.matched.some(record=>record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if(!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath}
        })
      }else {
        next()
      }
    })
  }else {
    next()
  }
})

export default router