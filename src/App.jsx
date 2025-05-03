import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {

  
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      
        <Routes>
          <Route path = "/" element= {<Home/>}/>
          <Route path = "/dashboard" element= {<Dashboard/>}/>
        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App