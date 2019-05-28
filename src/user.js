/**
 * Get user geo from device
 * @return {Promise<Object>}
 */
const getUserGeoDataFromDevice = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(
        new Error('geo error')
      )
    } else {
      navigator.geolocation.getCurrentPosition(result => {
        const data = {
          lat: result.coords.latitude,
          long: result.coords.longitude
        }
        return resolve(data)
      })
    }
  })
}

/**
 * Set flag if user has joined to app
 */
const setUserHasJoined = () => {
  localStorage.setItem('userHasJoined', JSON.stringify(true))
}

/**
 * Check if user has joined to app
 */
const checkHasJoined = () => {
  return !!localStorage.getItem('userHasJoined')
}

/**
 * Set user geo data
 * @param {object} data
 */
const setUserGeoDataToStorage = data => {
  localStorage.setItem('userGeoData', JSON.stringify(data))
}

/**
 * Get user geo data from localstorage
 */
const getUserGeoDataFromStorage = () => {
  return JSON.parse(localStorage.getItem('userGeoData'))
}

/**
 * Check if user has geo data
 */
const checkUserGeoData = () => {
  return !!localStorage.getItem('userGeoData')
}

/**
 * Fetch user geo data
 * @return {object} user geo data
 */
const fetchUserGeoData = async () => {
  const data = await getUserGeoDataFromDevice()
  setUserGeoDataToStorage(data)
  return data
}

/**
 * Get user data from storage or user device
 * @param {boolean} force
 * @return {Promise<object>} user geo data
 */
const getUserData = async (force = false) => {
  if (force) {
    return fetchUserGeoData()
  } else {
    return checkUserGeoData()
      ? getUserGeoDataFromStorage()
      : fetchUserGeoData()
  }
}

export default {
  getUserData,
  checkUserGeoData,
  checkHasJoined,
  setUserHasJoined
}
