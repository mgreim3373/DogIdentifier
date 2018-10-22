import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)
ReactDOM.render(appJsx, document.getElementById('root'))
