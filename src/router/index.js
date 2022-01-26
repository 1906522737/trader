import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    // hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // }
  // {
  //   path: '/demo',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/demo/index'),
  //       name: '测试',
  //       meta: {
  //         title: '测试',
  //         icon: 'home'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/home',
    component: Layout,
    // meta: {
    //   title: '首页'
    // },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: {
          title: '首页',
          icon: 'home'
        }
      }
    ]
  },
  {
    path: '/back-test',
    component: Layout,
    // meta: {
    //   title: '回测'
    // },
    children: [
      {
        path: '',
        component: () => import('@/views/backTest/index'),
        name: '回测',
        meta: {
          title: '回测',
          icon: 'back-test'
        }
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
