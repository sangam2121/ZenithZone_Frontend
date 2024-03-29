import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

//importing all pages
import Home from './pages/Home'
import Journal from './pages/Journal'
import Library from './pages/Library'
import Chat from './pages/Chat'
import Book_Psychiatrist from './pages/Book_Psychiatrist'
import Error from './pages/Error'
import Login from './components/Login'
import UserDashboard from './pages/UserDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import ReadJournal from './pages/ReadJournal'
import DoctorDetails from './components/DoctorDetails'
import RegisterModal from './components/RegisterModal'
import DoctorProfileSetup from './pages/DoctorProfileSetup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/journal" element={<Journal/>}></Route>
        <Route path="/library" element={<Library/>}></Route>
        <Route path="/contact" element={<Chat/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/book-psychiatrist" element={<Book_Psychiatrist/>}></Route>
        <Route path='/register' element={<RegisterModal/>}></Route>
        <Route path='/doctor-profile-setup' element={<DoctorProfileSetup/>}></Route>
        <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
        <Route path='/doctor-detail/:doctorUserId' element={<DoctorDetails/>}></Route>
        <Route path='/read-journal/' element={<ReadJournal/>}></Route>
        <Route path='/read-journal/:journalId' element={<ReadJournal/>}></Route>

        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
 
  )
}

export default App