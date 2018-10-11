let apiUrl
const apiUrls = {
  production: 'https://pure-wildwood-82080.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export { apiUrl }
