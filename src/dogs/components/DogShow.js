import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, ShowDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class DogShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dog: null
    }

  }

  DogDelete = (event, dogId) => {
    event.preventDefault()
    const { user } = this.props
    DeleteDog(user, dogId)
      .then((res)=> console.log('booo'))
  }

  async componentDidMount () {
    const { history, user } = this.props
    const res = await ShowDog(user, this.props.location.state.dogId)
    const resJson = await res.json()
    console.log('sdfjksldj', resJson.dog)

    this.setState({dog: resJson.dog})

  }

  render() {
    const{dog} = this.state
    const dogElement = dog && (
      <div className='auth-form' key={dog._id}>
        <h3>Dogs</h3>
        <img src={dog.image} alt="dog" className="img-responsive"/>
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
    )

    return (
      <div>
        {dogElement}
      </div>
    )
  }
}

export default withRouter(DogShow)