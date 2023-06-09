import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './context/global'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-v8jrao5e6b41otbz.us.auth0.com"
          clientId="JPbPmvNPqS3gykqAo1NTa1AmCueMqIK9"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>

      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>

)
