import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ReduxProvider from './redux/store'
import './styles/css/main.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)