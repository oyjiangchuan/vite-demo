import { isString, isArray, isObject, isNil } from '../is'

export const awaitWrapper = (promise) => promise.then((data) => [null, data]).catch((err) => [err, null])

export function snakeNameWithObject(data, encode = false) {
  if (isString(data)) {
    return data
  }

  if (isArray(data)) {
    data.forEach((item, index) => {
      // @ts-ignore
      data[index] = snakeNameWithObject(item, encode)
    })
  } else if (isObject(data)) {
    data = Object.assign({}, data)

    for (const key in data) {
      if (isObject(data[key])) {
        // @ts-ignore
        data[key] = snakeNameWithObject(data[key], encode)
      }

      const newKey = encode
        ? key.replace(/([A-Z])/g, '_$1').toLowerCase()
        : key.replace(/_(\w)/g, ($0, $1) => {
            return $1.toUpperCase()
          })

      if (newKey !== key) {
        // @ts-ignore
        data[newKey] = data[key]
        // @ts-ignore
        delete data[key]
      }
    }
  }
  return data
}

/**
 * 转换
 * @param uri
 * @param query
 */
export const queryFormat = (uri, query) => {
  const keys = Object.keys(query || {})
  if (!keys.length) return uri

  const joiner = uri.lastIndexOf('?') === -1 ? '?' : uri.indexOf('?') === uri.length - 1 ? '' : '&'

  return (
    uri +
    joiner +
    keys
      .map((item) => {
        if (isNil(query[item])) {
          return ' '
        }

        if (!isArray(query[item])) {
          return `${item}=${query[item]}`
        }

        if (isArray(query[item])) {
          if (!query[item].length) {
            return ''
          }
          //  如果当前为数组,那么就解析数组参数
          return query[item]
            .map((d, i) => `${item}[${i}]=${d}`)
            .filter((item) => item !== '')
            .join('&')
        }
      })
      .filter((item) => item !== '')
      .join('&')
      .replace(/ /g, '')
      .replace(/&&/g, '&')
  )
}

/**
 * modules 过滤
 * @param modules
 * @param filter
 * @param de 是否只需要默认导出
 * @returns 模块  key:文件名称, value:default:模块 或当前文件所有模块列表
 */
export const moduleFilter = (modules, filter = /^\.\/.*$/, de = true) => {
  return Object.keys(modules)
    .filter((filename) => {
      return (
        modules[filename] &&
        modules[filename][Symbol.toStringTag] === 'Module' &&
        filter.test(filename) &&
        // 当只获取default模块时, 判断其是否存在
        (de ? modules[filename].default : true)
      )
    })
    .reduce((accumulator, filename) => {
      accumulator[filename] = de ? modules[filename].default : modules[filename]
      return accumulator
    }, {})
}
