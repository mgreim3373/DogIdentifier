import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, ShowDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import DogEdit from './DogEdit'

class DogShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dog: null
    }

  }

  DogDelete = (event, dogId) => {
    event.preventDefault()
    const { user, history } = this.props
    DeleteDog(user, dogId)
      .then(handleErrors)
      .then(() => history.push('/'))
  }

  async componentDidMount () {
    const { history, user } = this.props
    const res = await ShowDog(user, this.props.location.state.dogId)
    const resJson = await res.json()

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
        <DogEdit user = {this.props} />
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
