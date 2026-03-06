import {Routes,Route, PrefetchPageLinks} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InGameQuiz from "./pages/InGameQuiz";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateQuiz from "./pages/createQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import CustomQuiz from "./pages/CustomQuiz";
import CustomQuestionView from "./pages/CustomQuestionView";
function App() {

  return (
    <>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>  
          <Route path="/in-game" element={<InGameQuiz/>}/> 
            <Route element={<ProtectedRoute/>}>
              <Route path="/create-quiz" element={<CreateQuiz/>}/>  
              <Route path="/my-quizzes" element={<MyQuizzes/>}/>  
              <Route path="/customquiz/:id" element={<CustomQuiz/>}/>  
              <Route path="/customquiz-view/:id/question" element={<CustomQuestionView/>}/>  
            </Route> 
          
        </Route>
      </Routes>    
    </>
  )
}

export default App
