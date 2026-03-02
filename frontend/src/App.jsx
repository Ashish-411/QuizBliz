import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InGameQuiz from "./pages/InGameQuiz";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home/> 
          </Layout>}/>  
        <Route path="/in-game" element={
          <Layout>
            <InGameQuiz/> 
          </Layout>}/>  
      </Routes>    
    </>
  )
}

export default App
