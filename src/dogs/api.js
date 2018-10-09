import DogNew from './components/DogNew'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const CreateDog = (dog, user) => {
  return fetch('http://localhost:4741/dogs', {
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
  return fetch('http://localhost:4741/dogs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
