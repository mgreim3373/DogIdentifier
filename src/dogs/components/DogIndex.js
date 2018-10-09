import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, IndexDog } from '../api'

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

  render() {
    const dog = this.state.dogs.map(dog => {
      return (
        <div className='auth-form' key={dog.id}>
          <h3>Dogs</h3>
          <img src={dog.image} alt="dog" className="img-responsive"/>
          <p>{dog.description}</p>
          {dog.label.map(label => {
            return (
              <div key={dog.id}>
                <p>{label.description}</p>
                <p>{label.probability}</p>
              </div>
            )
          })}
          <button type="submit">Edit Dog</button>
          <button type="submit">Delete Dog</button>
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
