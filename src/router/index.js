import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldWXY from '@/components/HelloWorldWXY' // 新增行

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello-world-wxy', // 新增行
      name: 'HelloWorldWXY', // 新增行
      component: HelloWorldWXY // 新增行
    }
  ]
})
