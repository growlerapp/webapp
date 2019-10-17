/**
 * Check json integrity
 * @param {object} json
 */
const isJSON = json => {
  try {
    if (json && typeof json === 'object' && json !== null) {
      return true
    }
  } catch (error) {
    return error
  }
}

export {
  isJSON
}
