import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, EditDog } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap'
import { Input, Button } from 'mdbreact'

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
    EditDog(this.state, user, this.props.location.state.dogId)
      .then(handleErrors)
      .then(() => history.push('/dogs/'))
  }

  render() {

    const {dog} = this.state
    return (
      <form className='auth-form' onSubmit={this.EditDog}>
        <h5 className="font-weight-bold">Update Title</h5>
        <Input
          label="Image title"
          required
          name="description"
          value={this.state.description}
          type="string"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <Button className="float-left" type="submit">Update</Button>
      </form>
    )}
}


export default withRouter(DogEdit)
