export const buildDimension = (dimensions) => {
  let started = false
  let result = ''

  for (const key in dimensions) {
    if (dimensions[key]) {
      if (!started) {
        result += '('
        started = true
      }

      result += `${dimensions[key]}, `
    } else if (started) {
      result += ' -, '
    }
  }

  result = result.substring(0, result.length - 2) + ')'

  return result
}
