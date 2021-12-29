export const testPositiveFloat = (value) => {
  if (value === '') {
    return true
  } else {
    try {
      const floatValue = parseFloat(value)
      return floatValue > 0
    } catch {
      return false
    }
  }
}
