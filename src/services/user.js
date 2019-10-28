import { isJSON } from '@/helpers'

/**
 * Parse any errors from PositionError callback
 * @param {object} error
 * @return {object}
 */
const parsePositionError = error => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return {
        code: 1,
        message: 'User denied the request for geolocation.'
      }
    case error.POSITION_UNAVAILABLE:
      return {
        code: 2,
        message: 'Location information is unavailable.'
      }
    case error.TIMEOUT:
      return {
        code: 3,
        message: 'The request to get user location timed out.'
      }
  }
}

/**
 * Get user geo from device
 * @return {Promise<Object>}
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
const getUserGeoDataFromDevice = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        resolve(coords), error => reject(parsePositionError(error))
      )
    }
  })
}

/**
 * Fetch user geo data
 * @return {object} user geo data
 */
const fetchUserGeoData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getUserGeoDataFromDevice()
      data = {
        lat: data.latitude,
        long: data.longitude
      }
      setUserGeoDataToStorage(data)
      resolve(data)
    } catch (error) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(error)
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
