import dayjs from 'dayjs'

/**
 * 日期格式化
 * @param date
 * @param template
 */
export function dateFormat(date, template = 'YYYY-MM-DD HH:mm:ss') {
  return date ? dayjs(date).format(template) : ''
}
