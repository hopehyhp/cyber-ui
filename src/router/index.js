import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import(/* webpackChunkName: "about" */ '../views/ComponentView.vue'),
    children: [
      {
        path: '',
        name: 'ComponentsIndex',
        component: () => import('../views/ComponentsIndex.vue'),
      },
      {
        path: 'button',
        name: 'Button',
        component: () => import('../demos/ButtonDemo.vue'),
      },
      {
        path: 'input',
        name: 'Input',
        component: () => import('../demos/InputDemo.vue'),
      },
      {
        path: 'badge',
        name: 'Badge',
        component: () => import('../demos/BadgeDemo.vue'),
      },
      {
        path: 'palette',
        name: 'Palette',
        component: () => import('../demos/PaletteShowcase.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
