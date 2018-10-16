import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, EditDog } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'

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
    const { history, user } = this.props
    console.log('hihi', this.state, 'dobetter', user.user, 'help',this.props.location.state.dogId)
    EditDog(this.state, user.user, this.props.location.state.dogId)
      .then(handleErrors)
      .then(() => history.push('/dogs/'))
  }

  render() {

    const {dog} = this.state
    return (
      <form className='auth-form' onSubmit={this.EditDog}>
        <h3>Edit Dog</h3>
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
