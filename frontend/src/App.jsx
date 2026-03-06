import {Routes,Route, PrefetchPageLinks} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InGameQuiz from "./pages/InGameQuiz";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateQuiz from "./pages/createQuiz";
import MyQuizzes from "./pages/MyQuizzes";
function App() {

  return (
    <>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>  
          <Route path="/in-game" element={<InGameQuiz/>}/>  
          <Route path="/create-quiz" element={
            <ProtectedRoute>
              <CreateQuiz/>
            </ProtectedRoute>
          }/>  
          <Route path="/my-quizzes" element={
            <ProtectedRoute>
              <MyQuizzes/>
            </ProtectedRoute>
          }/>  
          
        </Route>
      </Routes>    
    </>
  )
}

export default App
