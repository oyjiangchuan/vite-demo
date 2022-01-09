import { flatMap } from 'lodash-es'
import { isArray } from '@/util/is'
import { moduleFilter } from '@/util/helper'

/**
 * 遍历moduleRoutes
 * @returns
 */
const findModuleRoutes = () => {
  const modules = moduleFilter(import.meta.globEager('./modules/*/index.js'))

  return flatMap(
    Object.keys(modules).map((key) => {
      const module = modules[key]
      return isArray(module) ? module : [module]
    })
  )
}

const moduleRoutes = findModuleRoutes()

export const routes = [
  ...moduleRoutes,
  {
    path: '/',
    redirect: '/home'
  }
]

export default routes
