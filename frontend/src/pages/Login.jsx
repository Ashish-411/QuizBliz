import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const [activeTab,setActiveTab] = useState("signin");
    const navigate = useNavigate();
    return(
        <section className="w-full min-h-screen bg-bg relative">
            <button style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full text-white
                    font-extrabold text-sm shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                    hover:-translate-y-1 transition-all duration-200"
            onClick={() => navigate("/")}>
                ↩ Back To Home
            </button>
        {
            activeTab === "signin" ?
            (<SignIn setActiveTab={setActiveTab}/>):
            (<SignUp setActiveTab={setActiveTab}/>)
        }
        </section>
    );

}
export default Login;