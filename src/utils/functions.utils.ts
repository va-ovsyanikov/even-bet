export const getDynamicUrl = (url: string, params: string[] = []): string => {
  if (params.length === 0) {
    console.log('Необходимо передать параметры замены')
    return url
  }

  return replaceValues(url, params)
}
/**
 * Замена значений в строке из массива данных, заменяет от 1-...
 * @param {string} str - Строка в которой находятся ключи $
 * @param {string[]} values - Массив значений для замены
 * */
function replaceValues(str: string, values: string[]): string {
  return str.replace(/\$(\d+)/g, (_, index) => values[index - 1] || '')
}
