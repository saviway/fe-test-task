import ReactDOM from 'react-dom'
import {App} from './App'
import { StrictMode } from 'react'

// common styles
import './styles/common.css'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)