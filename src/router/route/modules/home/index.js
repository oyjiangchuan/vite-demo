import Demo1Router from './demo1'
import { HomeRouterName } from './const'

const router = {
  path: '/home',
  name: HomeRouterName.HOME_ROUTER,
  component: () => import(`@/page/home/index.vue`),
  meta: {
    auth: true
  },
  children: [
    {
      path: '',
      redirect: { name: HomeRouterName.HOME_DEMO1_ROUTER }
    },
    Demo1Router,
    {
      path: 'demo2',
      name: HomeRouterName.HOME_DEMO2_ROUTER,
      component: () => import(`@/page/home/demo2/index.vue`)
    }
  ]
}

export default router
