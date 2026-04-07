// 监听路由变化，判断是否为子应用
export const isSubApp = () => {
  return ['/subapp'].some(route => window.location.pathname.startsWith(route));
}

/**
 * 获取当前时间，返回格式化字符串
 * @param format - 时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export const getCurrentTime = (format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const date = new Date()
  
  const padZero = (num: number): string => num.toString().padStart(2, '0')
  
  const year = date.getFullYear().toString()
  const month = padZero(date.getMonth() + 1)
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 将对象转换为数组格式，用于下拉选项等场景
 * @param obj - 需要转换的对象，格式为 {key: value}
 * @returns 转换后的数组，格式为 [{label: string, value: any}]
 * @example
 * objectToArray({ male: '男', female: '女' })
 * // 返回: [{label: 'male', value: '男'}, {label: 'female', value: '女'}]
 */
export const objectToArray = (obj: Record<string, any>): Array<{label: string; value: any}> => {
  if (!obj || typeof obj !== 'object') {
    return []
  }
  
  return Object.entries(obj).map(([key, value]) => ({
    label: key,
    value
  }))
}
