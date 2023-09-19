import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './routes/auth/login.jsx'
import { Register } from './routes/auth/register.jsx'
import { MainAppLayout } from './components/layouts/mainApp.jsx'
import Protected from './utils/protected.jsx'
import { Home } from './routes/app/home.jsx'
import { Tags } from './routes/app/tags.jsx'
import { Favorites } from './routes/app/favs.jsx'
import { SearchResults } from './routes/app/search.jsx'
import { Provider } from 'react-redux'
import { Landing } from './routes/auth/landing.jsx'
import { store } from './auth/store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: 'app',
    element:
      <Protected>
        <MainAppLayout />
      </Protected>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tags',
        element: <Tags />
      },
      {
        path: 'favorites',
        element: <Favorites />
      },
      {
        path: 'find/tag',
        element: <SearchResults />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
