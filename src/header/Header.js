import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
import { Navbar, NavItem}  from 'mdbreact'


const authenticatedOptions = (
  <React.Fragment>
    <Link className="text-white" to="/dogs/new">Identify Dog</Link>
    <Link className="text-white" to="/dogs">View Dogs</Link>
    <Link className="text-white" to="/sign-out">Sign Out</Link>
    <Link className="text-white" to="/change-password">Change Password</Link>


  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className="text-white" to="/sign-in">Sign In</Link>
    <Link className="text-white" to="/sign-up">Sign Up</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/"></Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header dogNav">
    <h1>DogIdentifier</h1>
    <navbar className="dogNav">
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </navbar>
  </header>
)

export default Header
