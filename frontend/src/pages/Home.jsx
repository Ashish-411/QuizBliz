import api from "../utils/api";
import { useState,useEffect } from "react";
function Home(){
    const [questions,setQuestions] = useState(null);
    const [loading,setLoading] = useState(false);
    async function fetchInGameQuiz(){
        try{
            setLoading(true);
            const res = await api.get("api/quiz/ingame");
            console.log(res.data);
        }catch(err){
            console.log(err);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchInGameQuiz();
    },[]);
    return(
        <>
        This is home page
        </>
    );

}
export default Home;