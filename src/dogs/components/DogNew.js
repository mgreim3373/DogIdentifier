import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, CreateDog, IndexDog } from '../api'

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
    const { user } = this.props

    CreateDog(this.state, user)
      .then(handleErrors)
      .then(() => history.push('/dogs'))
  }

  render() {
    const {dog} = this.state
    return (
      <form className='auth-form' onSubmit={this.CreateDog}>
        <h3>New Dog</h3>
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


export default DogCreate
