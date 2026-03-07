import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import QuizCard from "../components/QuizCard";
import Loader from "../components/Loader";
function CustomQuizPlay(){
    const {state: quiz} = useLocation();
    const navigate = useNavigate();


    const [currentQuestion,setCurrentQuestion] = useState(null);
    const [answeredIds, setAnsweredIds] = useState([]);
    const [answered , setAnswered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [finished, setFinished] = useState();

    useEffect(() =>{
        if(!quiz || quiz.questions.length === 0) return;
        pickRandomQuestion([]);
    },[]);

    function pickRandomQuestion(usedIds){
        const remaining = quiz.questions.filter(q => !usedIds.includes(q._id));
        if(remaining.length === 0){
            setFinished(true);
            return;
        }
        const random = remaining[Math.floor(Math.random() * remaining.length)];
        setCurrentQuestion(random);
    }

    function handleAnswer(selectedIndex){
        if(answered) return;
        setAnswered(true);
        setSelectedIndex(selectedIndex);
        const newAnsweredIds = [...answeredIds, currentQuestion._id];
        setAnsweredIds(newAnsweredIds);

        setTimeout(() => {
            setAnswered(false);
            setSelectedIndex(null);
            pickRandomQuestion(newAnsweredIds);
        }, 2000);
    }

    // No questions
    if (!quiz || quiz.questions.length === 0) return (
        <section className="w-full h-screen bg-bg flex flex-col items-center justify-center gap-6">
            <div className="text-6xl">📭</div>
            <h2 className="font-[Bangers] text-4xl tracking-widest text-text">
                No Questions Yet
            </h2>
            <p className="text-muted text-sm font-semibold">
                Add some questions to your quiz first.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full
                    border border-white/10 text-muted text-sm font-bold
                    hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                ↩ Back
            </button>
        </section>
    );
    // All questions answered
    if (finished) return (
        <section className="w-full h-screen bg-bg flex flex-col items-center justify-center gap-6">
            <div className="text-6xl">🎉</div>
            <h2 className="font-[Bangers] text-4xl tracking-widest text-text">
                All Done!
            </h2>
            <p className="text-muted text-sm font-semibold">
                You've answered all {quiz.questions.length} questions.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => {
                        setAnsweredIds([]);
                        setFinished(false);
                        setAnswered(false);
                        setSelectedIndex(null);
                        pickRandomQuestion([]);
                    }}
                    style={{ background: 'linear-gradient(135deg, #ff4d6d, #ff6b35)' }}
                    className="px-6 py-3 rounded-full text-white font-extrabold text-sm
                        shadow-[0_8px_24px_rgba(255,77,109,0.4)]
                        hover:-translate-y-1 transition-all duration-200">
                    🔄 Play Again
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 rounded-full border border-white/10
                        text-muted text-sm font-bold
                        hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                    ↩ Back
                </button>
            </div>
        </section>
    );
    // Loading question
    if (!currentQuestion) return (
        <section className="w-full h-screen bg-bg flex items-center justify-center">
            <Loader />
        </section>
    );
     return (
        
        <section className="w-full py-[15px] h-screen bg-bg flex flex-col items-center
            justify-start gap-5 overflow-y-auto relative">
                {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className=" absolute pb-[20px] left-[30%] flex justify-center gap-2 px-4 py-2 rounded-full
                    border border-white/10 text-muted text-sm font-bold
                    hover:border-accent1/50 hover:text-accent1 transition-all duration-200">
                ↩ Back
            </button>

            {/* Title + progress */}
            <div className="w-full max-w-[700px] mt-[50px]">
                <div className="flex items-center justify-between">
                    <h1 className="font-[Bangers] text-3xl tracking-widest text-text">
                        {quiz.title}
                    </h1>
                    <span className="text-muted font-bold text-sm">
                        {answeredIds.length} / {quiz.questions.length}
                    </span>
                </div>
            </div>

            {/* Quiz Card */}
            <QuizCard
                questionData={currentQuestion}
                onAnswer={handleAnswer}
                answered={answered}
                selectedIndex={selectedIndex}
            />

            

        </section>
    );
}
export default CustomQuizPlay;