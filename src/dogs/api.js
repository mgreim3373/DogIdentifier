import DogNew from './components/DogNew'
import { apiUrl } from '../apiConfig'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const CreateDog = (dog, user) => {
  return fetch(apiUrl + '/dogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      dogs: {
        image: dog.image,
        description: dog.description,
      }
    })
  })
}

export const IndexDog = (user) => {
  return fetch(apiUrl + '/dogs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const EditDog = (dog, user, _id) => {
  return fetch(apiUrl + '/dogs/' + _id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      dog: {
        image: dog.image,
        description: dog.description
      }
    })
  })
}

export const DeleteDog = (user, _id) => {
  return fetch(apiUrl + '/dogs/' + _id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
  })
}

export const ShowDog = (user, _id) => {
  return fetch(apiUrl + '/dogs/' + _id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
  })
}
