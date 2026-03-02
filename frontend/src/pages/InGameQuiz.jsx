import { useState, useEffect } from "react";
import api from "../utils/api";
import Loader from "../components/Loader";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";

function InGameQuiz() {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentQuestion,setCurrentQuestion] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [answeredIds,setAnsweredIds] = useState([]);   
    const navigate = useNavigate();     
    async function fetchInGameQuiz() {
        try {
            setLoading(true);
            const res = await api.get("api/quiz/ingame");
            setQuiz(res.data[0]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
        fetchInGameQuiz();
    }, []);
    useEffect(() =>{
        if(!quiz) return;
        pickRandomQuestion([]);
    },[quiz]);
    
    function pickRandomQuestion(usedIds){
        if(!quiz) return;
        const remaining = quiz.questions.filter(q => !usedIds.includes(q._id));
        if(remaining.length === 0) return;
        const random = remaining[Math.floor(Math.random() * remaining.length)];
        setCurrentQuestion(random);
    }

    function handleAnswer(selectedIdx) {
        if (answered) return;
        setAnswered(true);
        setSelectedIndex(selectedIdx);
        const newAnsweredIds = [...answeredIds, currentQuestion._id];
        setAnsweredIds(newAnsweredIds);

        //timeout for 2 seconds
        setTimeout(() =>{
            setAnswered(false);
            setSelectedIndex(null);
            pickRandomQuestion(newAnsweredIds);
        },2000);
    }
    function handleBackClick(e){
        e.preventDefault();
        navigate(-1);

    }
    if (loading) return (
        <section className="w-full h-screen bg-bg flex items-inbetween justify-center">
            <Loader />
        </section>
    );
    if(!quiz || !currentQuestion) return null;
    return (
        <section className="w-full min-h-screen bg-bg flex flex-col items-center
            justify-start px-4 py-10 gap-4">
            <button 
                onClick={handleBackClick}
                className="self-start ml-4 flex items-center gap-2 px-4 py-2 rounded-full
                    border border-white/10 text-muted text-sm font-bold
                    hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                ↩ Back
            </button>
            {/* Top — Title + progress */}
            <div className="w-full max-w-[700px] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="font-[Bangers] text-3xl tracking-widest text-text">
                        {quiz.title}
                    </h1>
                </div>

               
            </div>

            {/* Quiz Card */}
            <QuizCard
                questionData={currentQuestion}
                onAnswer={handleAnswer}
                answered={answered}
                selectedIndex={selectedIndex}
            />

            {/* Footer — createdAt */}
            <p className="text-muted text-xs font-semibold tracking-wider">
                Quiz created on {new Date(quiz.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })}
            </p>

        </section>
    );
}

export default InGameQuiz;