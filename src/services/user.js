import { isJSON } from '@/helpers'

/**
 * Get user geo from device
 * @return {Promise<Object>}
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
const getUserGeoDataFromDevice = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(result =>
        resolve({
          lat: result.coords.latitude,
          long: result.coords.longitude
        }), error => reject(parseError(error))
      )
      const parseError = error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            return {
              code: 0,
              message: 'User denied the request for geolocation.'
            }
          case error.POSITION_UNAVAILABLE:
            return {
              code: 1,
              message: 'Location information is unavailable.'
            }
          case error.TIMEOUT:
            return {
              code: 2,
              message: 'The request to get user location timed out.'
            }
          case error.UNKNOWN_ERROR:
            return {
              code: 3,
              message: 'An unknown error occurred.'
            }
        }
      }
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        code: 3,
        message: 'An unknown error occurred.'
      })
    }
  })
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
  try {
    return JSON.parse(localStorage.getItem('userGeoData'))
  } catch (err) {
    return null
  }
}

/**
 * Check if user has geo data
 */
const checkUserGeoData = () => {
  const data = getUserGeoDataFromStorage()
  return isJSON(data) && data.lat && data.long
}

/**
 * Get user data from storage or user device
 * @param {boolean} force
 * @return {Promise<object>} user geo data
 */
const getUserData = (force = false) => {
  try {
    if (force) {
      return fetchUserGeoData()
    } else {
      return checkUserGeoData()
        ? getUserGeoDataFromStorage()
        : fetchUserGeoData()
    }
  } catch (error) {
    return error
  }
}

export {
  getUserData,
  checkUserGeoData,
  checkHasJoined,
  setUserHasJoined,
  fetchUserGeoData
}
