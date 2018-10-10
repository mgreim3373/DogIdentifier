import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, IndexDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'

class DogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dogs: []
    }

  }

  async componentDidMount () {
    const { history, user } = this.props
    const res = await IndexDog(user)
    const resJson = await res.json()

    this.setState({dogs: resJson.dogs})
  }

  DogDelete = (event, dogId) => {
    event.preventDefault()
    const { user } = this.props
    DeleteDog(user, dogId)
      .then((res)=> console.log('booo'))
  }

  render() {
    const dog = this.state.dogs.map(dog => {
      return (
        <div className='auth-form' key={dog._id}>
          <h3>Dogs</h3>
          <Link to={{
            pathname: `/dogs/${dog._id}/show`,
            state: { dogId: dog._id }
          }}><img src={dog.image} alt="dog" className="img-responsive"/></Link>
          <p>{dog.description}</p>
          {dog.label.map((label, index) => {
            return (
              <div key={dog._id + index}>
                <p>{label.description}</p>
                <p>{label.probability}</p>
              </div>
            )
          })}
          <Link to={{
            pathname: `/dogs/${dog._id}/edit`,
            state: { dogId: dog._id }
          }}>Edit Dogs</Link>
          <button onClick={(e) => this.DogDelete(e, dog._id)}>X</button>
        </div>
      )}
    )

    return (
      <div>
        {dog}
      </div>
    )
  }
}

export default DogIndex
