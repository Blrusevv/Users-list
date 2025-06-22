import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './routes/routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
