import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Homepage from './Pages/Public/Homepage';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import Priv1 from './Pages/Private/Priv1';
import Priv2 from './Pages/Private/Priv2';
import Password from './Pages/Auth/Password';
import Authuser from './Pages/Auth/Authuser';
import Pagebound from './Pagebound';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element = {<Pagebound/>}> */}
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/password' element={<Password />} />
            <Route path='/authuser' element={<Authuser />} />
            {/* </Route> */}
          {/* ----------------------------------------- */}
          <Route path='Priv1/:id' element={<Priv1 />} />
          <Route path='Priv2' element = {<Priv2/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App