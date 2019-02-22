import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/game/:roomId/:player',
      name: 'game',
      props: true,
      component: () => import('./views/About.vue'),
      beforeEnter: (to, from, next) => {
        console.log(from, '==========> route FROM')
        console.log(to, '============> route TO')
        if (from.name !== null) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    }
  ]
})
