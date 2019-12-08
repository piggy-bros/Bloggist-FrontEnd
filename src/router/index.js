import Vue from 'vue'
import Router from 'vue-router'
import ApiTest from '@/components/ApiTest'
import Register from '@/components/Register'
import SignIn from '@/components/SignIn'
import Home from '@/components/Home'
import BlogView from '@/components/BlogView'
import EditorView from '@/components/EditorView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: SignIn,
      meta: {
        title: 'Bloggist | Sign In'
      }
    },
    {
      path: '/test',
      name: 'API Test',
      component: ApiTest
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Bloggist | Register'
      }
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn,
      meta: {
        title: 'Bloggist | Sign In'
      }
    },
    {
      path: '/:username/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Bloggist | Home'
      }
    },
    {
      path: '/:username/home/blogs/:blogid',
      name: 'Blog',
      component: BlogView,
      meta: {
        title: 'Bloggist | Home'
      }
    },
    {
      path: '/:username/home/publish',
      name: 'Publish',
      component: EditorView,
      meta: {
        title: 'Bloggist | Publish'
      }
    }
  ]
})
