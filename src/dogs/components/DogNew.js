import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, IndexDog } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'

import S3FileUpload from 'react-s3'
import { uploadFile } from 'react-s3'

const config = {
  bucketName: 'dog-identifier',
  region: 'us-east-1',
  accessKeyId: 'AKIAJ73SAFYPQM4RTXJA',
  secretAccessKey: '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',
}

class DogCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      image: '',
      description: ''
    }
  }

  upload = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data)=> {
        this.setState({
          image: data.location
        })
      })
      .catch( (err)=>{
        console.log(err)
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  CreateDog = event => {
    event.preventDefault()
    const { image, description } = this.state
    const { flash, user, history } = this.props

    console.log('help', this.state)

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
          type="file"
          onChange={this.upload}
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
