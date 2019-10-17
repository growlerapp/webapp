/**
 * Check json integrity
 * @param {object} json
 */
const isJSON = json => {
  try {
    if (json && typeof json === 'object' && json !== null) {
      return true
    }
  } catch (err) {}
  return false
}

export default {
  isJSON
}
