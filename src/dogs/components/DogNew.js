import React, { Component } from 'react'
import * as constants from '../../constants'
import { withRouter } from 'react-router-dom'
import { handleErrors, CreateDog, IndexDog, UploadAS3 } from '../api'
import { Redirect } from 'react-router-dom'
import messages from '../messages'
const axios = require('axios')
import { apiUrl } from '../../apiConfig'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap'
import { Button, Input }  from 'mdbreact'


import Dropzone from 'react-dropzone'

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {return item.trim()})

class DogCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      description: '',
      file: null,
      imgSrc: null
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
        const currentFile = files[0]
        const reader = new FileReader()
        reader.addEventListener('load', ()=>{
          this.setState({
            imgSrc: reader.result
          })
        }, false)
        reader.readAsDataURL(currentFile)
        const fd = new FormData()
        fd.append('image', files[0], files[0].name)
        axios.post(apiUrl + '/image-upload', fd)
          .then((data)=> {
            this.setState({
              image: data.data.imageUrl
            })
          })
          .catch( (err)=>{
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
    const {imgSrc} = this.state
    return (

      <form className='auth-form dogNewForm mt-5' onSubmit={this.CreateDog}>
        <Card className="dog-cards">
          {imgSrc !== null ?
            <CardImg top width="100%" src={imgSrc} />:
            <Dropzone width="100%" onDrop={this.handleOnDrop} accept={acceptedFileTypes}>Drag and drop image or click to select</Dropzone>}
          <CardBody>
            <CardTitle></CardTitle>
            <CardText>
              <Input
                label=" Image Title"
                required
                name="description"
                value={this.state.description}
                type="string"
                onChange={this.handleChange}
                placeholder="Title"
              />
            </CardText>
            <Button type="submit">Identify</Button>
          </CardBody>
        </Card>
      </form>
    )}
}


export default withRouter(DogCreate)
