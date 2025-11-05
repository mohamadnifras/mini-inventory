import './App.css'
import {BrowserRouter, Routes, Route} from "react-router"
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Home from './components/home/Home'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/sign-up' element={<SignUp />}></Route>
      <Route path='/sign-in' element={<SignIn />}></Route>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
