import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Header(){
    const navigate = useNavigate();
    const {isAuthenticated,user,logout} = useAuth();
    function handleClick(e){
        e.preventDefault();
        navigate("/login");
    }
     return (
        <header className="w-full bg-bg border-b border-white/10 flex items-center
            justify-between px-4 sm:px-8 py-3">

            {/* Logo */}
            <div className="quiz-logo text-[1.8rem] sm:text-[2.2rem] tracking-[2px] cursor-pointer"
                onClick={() => navigate("/")}>
                ⚡QUIZBLIZ
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                    <button
                        onClick={handleClick}
                        className="bg-transparent text-white border border-white/30
                            rounded-full px-4 py-2 text-sm font-bold
                            hover:border-accent2 hover:text-accent2
                            transition-all duration-200
                            disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-white/10"
                        disabled={isAuthenticated}>
                        SignUp / SignIn
                    </button>
            </div>
        </header>
    );

}
export default Header;