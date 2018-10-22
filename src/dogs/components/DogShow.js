import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, ShowDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import DogEdit from './DogEdit'
import DogGraph from './DogGraph'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'
import './DogShow.scss'


class DogShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dog: null,
      graphLabels: [],
      graphData: []
    }

  }

  DogDelete = (event, dogId) => {
    event.preventDefault()
    const { user, history } = this.props
    DeleteDog(user, dogId)
      .then(handleErrors)
      .then(() => history.push('/'))
  }

  async componentDidMount () {
    const { history, user } = this.props
    const res = await ShowDog(user, this.props.location.state.dogId)
    const resJson = await res.json()
    const dogData = {
      graphLabels: [],
      graphData: []
    }

    resJson.dog.label.map((label, index) => {
      dogData.graphLabels.push(label.description)
      dogData.graphData.push(label.probability)
      return label
    })

    this.setState({dog: resJson.dog,
      graphLabels: dogData.graphLabels,
      graphData: dogData.graphData})
  }

  render() {
    const{dog, graphLabels, graphData} = this.state
    let dogGraphDisplay
    if (this.state.graphLabels[0] == 'Unknown Dog') {
      dogGraphDisplay = <p>Unknown dog!</p>
    } else if (this.state.graphLabels[0] == 'Not a dog!') {
      dogGraphDisplay = <p>Not a dog!</p>
    } else if (this.state.graphLabels[0] !== 'Not a dog!') {
      dogGraphDisplay = <DogGraph graphLabels = {this.state.graphLabels} graphData = {this.state.graphData} />
    }
    const dogElement = dog && (
      <Card className="dog-card">
        <CardBody>
          <CardTitle>{dog.description}</CardTitle>
          <CardImg top width="100%" src={dog.image} alt="dog" className="img-responsive" />
          <CardText> {dogGraphDisplay} </CardText>
          <DogEdit user = {this.props} />
          <Button onClick={(e) => this.DogDelete(e, dog._id)}>X</Button>
        </CardBody>
      </Card>
    )

    return (
      <div>
        {dogElement}
      </div>
    )
  }
}

export default withRouter(DogShow)
