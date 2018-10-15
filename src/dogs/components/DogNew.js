import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, IndexDog, UploadAS3 } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'
const axios = require('axios')
import { apiUrl } from '../../apiConfig'

import Dropzone from 'react-dropzone'

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {return item.trim()})

class DogCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      image: '',
      description: '',
      file: null
    }
  }

  verifyFile = (files) => {
    if (files && files.length > 0){
      const currentFileType = files[0].type
      if(!acceptedFileTypesArray.includes(currentFileType)){
        alert('do better')
        return false
      }
      return true
    }
  }

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0){
      this.verifyFile(rejectedFiles)
    }

    if (files && files.length > 0){
      const isVerified = this.verifyFile(files)
      if (isVerified){
        console.log('kh', files)
        const fd = new FormData()
        fd.append('image', files[0], files[0].name)
        axios.post(apiUrl + '/image-upload', fd)
          .then((data)=> {
            this.setState({
              image: data.data.imageUrl
            })
          })
          .catch( (err)=>{
            console.log(err)
          })
      }
    }
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
        <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes}>hi</Dropzone>
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
