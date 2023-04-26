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
import CreateCommunity from './pages/CreateCommunity'
import Communities from './pages/Communities'
import SingleCommunityPage from './pages/SingleCommunityPage'
import CommunityAskPage from './pages/CommunityAskPage'
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
        <Route path='/createCommunity' element={<CreateCommunity />} />
        <Route path='/communities' element={<Communities />} />
        <Route path='/singleCommunityPage/:communityID' element={<SingleCommunityPage />} />
        <Route path='/askCommunityPage/:communityID' element={<CommunityAskPage />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App
