// get user geo
const getUserGeo = () => {
  if (!navigator.geolocation) {
    return false
  }

  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(result => {
      const data = {
        lat: result.coords.latitude,
        long: result.coords.longitude
      }

      resolve(data)
      localStorage.setItem('userData', JSON.stringify(data))
    })
  })
}

// check geo
const checkUserData = () => {
  return !!localStorage.getItem('userData')
}

// get user data
const getUserData = async () => {
  return checkUserData() ? JSON.parse(localStorage.getItem('userData')) : await getUserGeo()
}

export default {
  getUserData,
  checkUserData,
  getUserGeo
}
