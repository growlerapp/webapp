// Get user geo
const getUserGeo = () => {
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

        localStorage.setItem('userData', JSON.stringify(data))
        return resolve(data)
      })
    }
  })
}

// Set flag if user has joined to app
const setUserHasJoined = () => {
  localStorage.setItem('userHasJoined', JSON.stringify(true))
}

// Check if user has joined to app
const checkHasJoined = () => {
  return !!localStorage.getItem('userHasJoined')
}

// Check geo
const checkUserData = () => {
  return !!localStorage.getItem('userData')
}

// Get user data
const getUserData = async () => {
  return checkUserData()
    ? JSON.parse(localStorage.getItem('userData'))
    : getUserGeo()
}

export default {
  getUserData,
  checkUserData,
  getUserGeo,
  checkHasJoined,
  setUserHasJoined
}
