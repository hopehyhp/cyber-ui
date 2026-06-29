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
        path: 'select',
        name: 'Select',
        component: () => import('../demos/SelectDemo.vue'),
      },
      {
        path: 'switch',
        name: 'Switch',
        component: () => import('../demos/SwitchDemo.vue'),
      },
      {
        path: 'checkbox',
        name: 'Checkbox',
        component: () => import('../demos/CheckboxDemo.vue'),
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
      {
        path: 'typography',
        name: 'Typography',
        component: () => import('../demos/TypographyDemo.vue'),
      },
      {
        path: 'border',
        name: 'Border',
        component: () => import('../demos/BorderDemo.vue'),
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('../demos/TableDemo.vue'),
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('../demos/TagDemo.vue'),
      },
      {
        path: 'progress',
        name: 'Progress',
        component: () => import('../demos/ProgressDemo.vue'),
      },
      {
        path: 'tooltip',
        name: 'Tooltip',
        component: () => import('../demos/TooltipDemo.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

export default router
