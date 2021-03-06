import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, ShowDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import DogGraph from './DogGraph'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap'
import { Button, Input }  from 'mdbreact'
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
      dogGraphDisplay = <h2>Unknown dog!</h2>
    } else if (this.state.graphLabels[0] == 'Not a dog!') {
      dogGraphDisplay = <h2>Not a dog!</h2>
    } else if (this.state.graphLabels[0] !== 'Not a dog!') {
      dogGraphDisplay = <DogGraph graphLabels = {this.state.graphLabels} graphData = {this.state.graphData} />
    }
    const dogElement = dog && (
      <Card className="dog-card">
        <CardBody>
          <CardTitle>{dog.description}</CardTitle>
          <CardImg top width="100%" src={dog.image} alt="dog" className="img-responsive" />
          <CardText> {dogGraphDisplay} </CardText>
          <Link className="btn bg-dark editLink" to={{
            pathname: `/dogs/${dog._id}/edit`,
            state: { dogId: dog._id }
          }}>Edit Dogs</Link>
          <Button color="danger" className='delete-button' onClick={(e) => this.DogDelete(e, dog._id)}>Delete</Button>
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
