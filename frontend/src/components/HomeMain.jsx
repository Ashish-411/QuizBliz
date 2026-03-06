import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function HomeMain() {
    const navigate = useNavigate();
    const {logout} = useAuth();

    function handleInGameQuiz(e){
        e.preventDefault();
        navigate("/in-game");
    }
    function handleCreateQuiz(e){
        e.preventDefault();
        navigate("create-quiz");
    }
    function handleMyQuizzes(e){
        e.preventDefault();
        navigate("/my-quizzes");
    }
    function handleLogout(e){
        e.preventDefault();
        logout();
        navigate("/login");

    }
    return (
        <section className="grid grid-cols-2 gap-[20px] w-full max-w-[560px] mx-auto">

            {/* Play Game - full width */}
            <button style={{ background: 'linear-gradient(135deg, #ff4d6d, #ff6b35)' }}
                className="col-span-2 flex flex-row items-center gap-5 px-9 py-7
                rounded-[20px] border-none cursor-pointer text-white shadow-[0_8px_32px_rgba(255,77,109,0.4)]
                transition-all duration-200 hover:-translate-y-1.5 hover:scale-[1.03]
                hover:shadow-[0_12px_48px_rgba(255,77,109,0.6)]"
                onClick={handleInGameQuiz}>
                <div className="text-[2.4rem] leading-none">🎮</div>
                <div className="text-left">
                    <div className="text-[1.3rem] font-extrabold tracking-wide">Play Game</div>
                    <div className="text-[0.75rem] font-semibold opacity-70 mt-[-2px]">Play Pre_Loaded Quiz</div>
                </div>
            </button>

            {/* Create Quiz */}
            <button style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                className="flex flex-col items-center gap-2 px-6 py-8
                rounded-[20px] border-none cursor-pointer text-white shadow-[0_8px_28px_rgba(67,97,238,0.4)]
                transition-all duration-200 hover:-translate-y-1.5 hover:scale-[1.03]
                hover:shadow-[0_12px_40px_rgba(67,97,238,0.6)]"
                onClick={handleCreateQuiz}>
                <div className="text-[2.4rem] leading-none">✏️</div>
                <div className="text-[1.05rem] font-extrabold">Create Quiz</div>
                <div className="text-[0.75rem] font-semibold opacity-70 mt-[-4px]">Build your own</div>
            </button>

            {/* My Quizzes */}
            <button style={{ background: 'linear-gradient(135deg, #06d6a0, #0096c7)' }}
                className="flex flex-col items-center gap-2 px-6 py-8
                rounded-[20px] border-none cursor-pointer text-white shadow-[0_8px_28px_rgba(6,214,160,0.35)]
                transition-all duration-200 hover:-translate-y-1.5 hover:scale-[1.03]
                hover:shadow-[0_12px_40px_rgba(6,214,160,0.55)]"
                onClick={handleMyQuizzes}>
                <div className="text-[2.4rem] leading-none">📚</div>
                <div className="text-[1.05rem] font-extrabold">My Quizzes</div>
                <div className="text-[0.75rem] font-semibold opacity-70 mt-[-4px]">View your library</div>
            </button>

            {/* Exit */}
            <button className="col-span-2 flex flex-row items-center justify-center gap-3
                px-6 py-4 rounded-[14px] cursor-pointer bg-transparent
                border-2 border-white/10 text-muted text-[0.9rem] font-extrabold
                transition-all duration-200 hover:border-[rgba(255,77,109,0.5)] hover:text-accent1"
            onClick={handleLogout}>
                <span className="text-[1.2rem]">🚪</span>
                Exit
            </button>

        </section>
    );
}

export default HomeMain;