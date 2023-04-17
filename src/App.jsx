import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import { useAuth0 } from '@auth0/auth0-react'
import NavigationBar from './components/Navbar'
import BottomNav from './components/BottomNav'
import AskPage from './pages/AskPage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import SingleAnswerDefaultQuestion from './pages/SingleAnswerDefaultQuestion'
function App() {


  let { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={!isAuthenticated && !isLoading ? <Register /> : <Home />} />
        <Route path='/ask' element={!isAuthenticated && !isLoading ? <Register /> : <AskPage />} />
        <Route path='/readDefaultQuestion/:questionID' element={<SingleQuestionPage />} />
        <Route path='/answerDefaultQuestion/:questionID' element={<SingleAnswerDefaultQuestion />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App
