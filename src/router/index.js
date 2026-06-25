import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import(/* webpackChunkName: "about" */ '../views/ComponentView.vue'),
    children: [
      {
        path: '',
        name: 'ComponentsIndex',
        component: () => import('../views/ComponentsIndex.vue')
      },
      {
        path: 'button',
        name: 'Button',
        component: () => import('../lib/components/ButtonDemo.vue')
      },
      {
        path: 'input',
        name: 'Input',
        component: () => import('../lib/components/CInput.vue')
      },
      {
        path: 'badge',
        name: 'Badge',
        component: () => import('../lib/components/CBadge.vue')
      },
      {
        path: 'palette',
        name: 'Palette',
        component: () => import('../lib/components/PaletteShowcase.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
