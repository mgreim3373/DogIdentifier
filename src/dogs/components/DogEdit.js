import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, CreateDog, EditDog } from '../api'

class DogEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      image: '',
      description: '',
      _id: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  EditDog = event => {
    event.preventDefault()
    const { image, description, _id } = this.state
    const { user } = this.props
    console.log('state', this.state, 'user', user,'id', _id)
    EditDog(this.state, user, _id)
      .then((res)=> this.setState({}))
  }

  render() {
    const {dog} = this.state
    return (
      <form className='auth-form' onSubmit={this.EditDog}>
        <h3>Edit Dog</h3>
        <input
          required
          type="string"
          name="_id"
          value={this.state.id}
          placeholder="Id"
          onChange={this.handleChange}
        />
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
        <button type="submit">Edit Dog</button>
      </form>
    )}
}


export default DogEdit
