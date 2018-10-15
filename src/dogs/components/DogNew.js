import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, IndexDog } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'

import S3FileUpload from 'react-s3'
import { uploadFile } from 'react-s3'
import Dropzone from 'react-dropzone'

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {return item.trim()})
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

  verifyFile = (files) => {
    if (files && files.length > 0){
      const currentFile = files[0]
      const currentFileType = currentFile.type
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
        S3FileUpload.uploadFile(files[0], config)
          .then((data)=> {
            this.setState({
              image: data.location
            })
          })
          .catch( (err)=>{
            console.log(err)
          })
      }
    }
  }


  /*upload = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data)=> {
        this.setState({
          image: data.location
        })
      })
      .catch( (err)=>{
        console.log(err)
      })
  }*/

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
