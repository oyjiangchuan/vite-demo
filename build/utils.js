import path from 'path'

export const root = process.cwd()

/**
 * 配置文件所在路径
 */
export const configPath = resolve('config')

export function resolve(dir) {
  return path.join(root, dir)
}

export function moduleAlias(modules, prefixPath = 'src') {
  return modules.reduce((accumulator, current) => {
    accumulator[current] = resolve(prefixPath + '/' + current)
    return accumulator
  }, {})
}

// 转换配置文件数据
export function wrapperEnv(envConf) {
  return Object.keys(envConf)
    .map((envName) => {
      const value = envConf[envName].replace(/\\n/g, '\n')

      //  布尔值
      if (/(true|false)/.test(value)) {
        return {
          envName: envName,
          value: value === 'true'
        }
      }

      // 数值
      if (/^\d+$/.test(value)) {
        return {
          envName: envName,
          value: Number(value)
        }
      }

      // 数组或对象
      if (/^[{\[].*[}\]]$/.test(value)) {
        let realValue = value
        try {
          realValue = JSON.parse(value)
        } catch (error) {}
        return {
          envName: envName,
          value: realValue
        }
      }

      //  字符串
      return {
        envName: envName,
        value: value
      }
    })
    .reduce((prev, current) => {
      prev[current.envName] = current.value
      return prev
    }, {})
}
