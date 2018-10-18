import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, ShowDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import DogEdit from './DogEdit'
import DogGraph from './DogGraph'


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
    const dogElement = dog && (
      <div className='auth-form' key={dog._id}>
        <h3>{dog.description}</h3>
        <img src={dog.image} alt="dog" className="img-responsive"/>
        <DogEdit user = {this.props} />
        <button onClick={(e) => this.DogDelete(e, dog._id)}>X</button>
      </div>
    )
    let dogGraphDisplay
    if (this.state.graphLabels[0] == 'Unknown Dog') {
      dogGraphDisplay = <p>Unknown dog!</p>
    } else if (this.state.graphLabels[0] == 'Not a dog!') {
      dogGraphDisplay = <p>Not a dog!</p>
    } else if (this.state.graphLabels[0] !== 'Not a dog!') {
      dogGraphDisplay = <DogGraph graphLabels = {this.state.graphLabels} graphData = {this.state.graphData} />
    }

    return (
      <div>
        {dogElement}
        {dogGraphDisplay}
      </div>
    )
  }
}

export default withRouter(DogShow)
