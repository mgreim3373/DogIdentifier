import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, EditDog } from '../api'

class DogEdit extends React.Component {

  constructor(props) {

    super(props)
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
    EditDog(this.state, user, this.props.location.state.dogId)
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


export default withRouter(DogEdit)
