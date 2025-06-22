import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './routes/routes'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
