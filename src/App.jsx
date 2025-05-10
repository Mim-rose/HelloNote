
import './App.css'
import Navbar from './components/Navbar'
import ViewPaste from './components/ViewPaste'
import Paste from './components/Paste'
import Home from './components/Home'
import EditPaste from './components/EditPaste'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(

[
{
path: '/',
element:
<div>

<Navbar />
<Home />
</div>
},

{

  path: '/pastes',
  element:
  <div>
    <Navbar />
    <Paste />

    </div>


},

{

  path: '/pastes/:id',
  element:
  <div>

    <Navbar />
    <ViewPaste />


    </div>

},
{
  path: '/edit/:id',
  element: (
    <div>
      <Navbar />
      <EditPaste />
    </div>
  ),
}




]

)

function App() {
  

  return (
    <div>


   <RouterProvider router={router}/>

    </div>
  )
}

export default App