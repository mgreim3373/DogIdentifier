import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, IndexDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import messages from '../messages'

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
    const { user, history } = this.props
    DeleteDog(user, dogId)
      .then(handleErrors)
      .then(() => history.push('/'))
  }

  render() {
    const dog = this.state.dogs.map(dog => {
      return (
        <div className='auth-form' key={dog._id}>
          <h3>Dog</h3>
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

export default withRouter(DogIndex)
