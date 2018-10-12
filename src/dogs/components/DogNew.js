import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, IndexDog } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'

class DogCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      image: '',
      description: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  CreateDog = event => {
    event.preventDefault()
    const { image, description } = this.state
    const { flash, user, history } = this.props

    CreateDog(this.state, user)
      .then(() => history.push('/dogs'))
      .catch(() => flash(messages.newDogFailure, 'flash-error'))
  }

  render() {
    const {dog} = this.state
    return (
      <form className='auth-form' onSubmit={this.CreateDog}>
        <h3>New Dog</h3>
        <h5>Entering an incorrect image url can lead to long wait times.</h5>
        <input
          required
          type="string"
          name="image"
          value={this.state.image}
          placeholder="Image URL"
          onChange={this.handleChange}
        />
        <input
          required
          name="description"
          value={this.state.description}
          type="string"
          placeholder="Description"
          onChange={this.handleChange}
        />
        <button type="submit">Create Dog</button>
      </form>
    )}
}


export default withRouter(DogCreate)
