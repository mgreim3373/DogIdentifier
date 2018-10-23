import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, changePassword } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { Button, Input }  from 'mdbreact'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  changePassword = event => {
    event.preventDefault()

    const { oldPassword, newPassword } = this.state
    const { flash, history, user } = this.props

    changePassword(this.state, user)
      .then(handleErrors)
      .then(() => flash(messages.changePasswordSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='auth-form' onSubmit={this.changePassword}>
        <h3>Change Password</h3>

        <label htmlFor="oldpw">Old Password</label>
        <Input
          label="Type your old password"
          icon="lock"
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          onChange={this.handleChange}
        />
        <label htmlFor="newPassword">New Password</label>
        <Input
          label="Type your new password"
          icon="lock"
          required
          name="newPassword"
          value={newPassword}
          type="password"
          onChange={this.handleChange}
        />
        <Button type="submit">Change Password</Button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
