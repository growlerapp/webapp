// get user geo
const getUserGeo = () => {
  if (!navigator.geolocation) {
    return false
  }

  navigator.geolocation.getCurrentPosition(data => {
    setUserData(data)
  })
}

// set user data
const setUserData = data => {
  const userData = {
    lat: data.coords.latitude,
    long: data.coords.longitude
  }

  localStorage.setItem('userData', JSON.stringify(userData))

  setTimeout(() => window.location.replace('/#/home'), 300)
}

// check geo
const checkUserData = () => {
  return !!localStorage.getItem('userData')
}

// get user data
const getUserData = () => {
  return checkUserData() ? JSON.parse(localStorage.getItem('userData')) : getUserGeo()
}

export default {
  getUserData,
  checkUserData
}
