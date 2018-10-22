import React, { Component } from 'react'
import * as constants from '../../constants'
import { handleErrors, IndexDog, DeleteDog } from '../api'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import messages from '../messages'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'

class DogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dogs: []
    }

  }

  async componentDidMount () {
    const { history, user } = this.props
    const res = await IndexDog(user)
    const resJson = await res.json()

    this.setState({dogs: resJson.dogs})
  }

  DogDelete = (event, dogId) => {
    event.preventDefault()
    const { user, history } = this.props
    DeleteDog(user, dogId)
      .then(handleErrors)
      .then(() => history.push('/'))
  }

  render() {
    const dog = this.state.dogs.map(dog => {

      return (
        <Card key={dog._id}>
          <Link to={{
            pathname: `/dogs/${dog._id}/show`,
            state: { dogId: dog._id }
          }}><CardImg top width="100%" src={dog.image} alt="dog" className="img-responsive"/></Link>
          <CardBody>
            <CardTitle>{dog.description}</CardTitle>
          </CardBody>
        </Card>
      )
    }
    )

    return (
      <div>
        {dog}
      </div>
    )
  }
}

export default withRouter(DogIndex)
