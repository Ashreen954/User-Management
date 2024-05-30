import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AddUsers from './components/adduser/Adduser'
import Users from './components/users/Users';
import Removedusers from './components/removedusers/Removedusers'
import ErrorPage from './components/ErrorPage'

function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          path:"/",
          element:<AddUsers/>
          },
        {
        path:"/users",
        element:<Users/>
        },
        {
          path:"/removed-users",
          element:<Removedusers/>
          }
      ]
    }
  ])
  return (
    <div>
    <RouterProvider router={routerObj}/>

    </div>
  );
}

export default App;
