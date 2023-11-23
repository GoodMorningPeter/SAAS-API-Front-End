import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldLJA from '@/components/HelloWorldLJA' // 新增行

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello-world-lja', // 新增行
      name: 'HelloWorldLJA', // 新增行
      component: HelloWorldLJA // 新增行
    }
  ]
})
