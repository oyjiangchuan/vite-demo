import { createRouter, createWebHistory } from 'vue-router'
import routes from './route'
import { setupRouterGuard } from './guard'

let router

export function setupRouter(app) {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
  })

  app.use(router)
  setupRouterGuard(router)
  return app
}

export async function isReady() {
  if (!router) return
  await router.isReady()
}
