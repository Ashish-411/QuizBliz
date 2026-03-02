import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InGameQuiz from "./pages/InGameQuiz";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

  return (
    <>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>  
          <Route path="/in-game" element={<InGameQuiz/>}/>  
        </Route>
      </Routes>    
    </>
  )
}

export default App
