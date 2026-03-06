import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import MyQuizCard from "../components/MyQuizCard";

function MyQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleBackClick(e){
        e.preventDefault();
        navigate("/");
    }

    async function fetchQuizzes() {
        try {
            setLoading(true);
            const res = await api.get("api/quiz/get-allquizzes/me");
            setQuizzes(res.data.quizzes);
        } catch(err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, []);

    if (loading) return (
        <section className="w-full h-screen bg-bg flex items-center justify-center">
            <Loader />
        </section>
    );

    return (
        <section className="w-full min-h-screen bg-bg px-4 sm:px-8 py-10">
             <button 
                onClick={handleBackClick}
                className="self-start ml-4 flex items-center gap-2 px-4 py-2 rounded-full
                    border border-white/10 text-muted text-sm font-bold
                    hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                ↩ Back
            </button>

            {/* Header */}
            <div className="max-w-[900px] mx-auto mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-[Bangers] text-4xl tracking-widest text-text">
                        My Quizzes 📚
                    </h1>
                    <p className="text-muted text-sm font-semibold mt-1">
                        Add Questions and play your created quizzes
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <p className="text-accent1 text-xs font-bold text-center
                    bg-[rgba(255,77,109,0.1)] border border-accent1/30
                    rounded-[8px] px-4 py-2 max-w-[900px] mx-auto mb-4">
                    ✘ {error}
                </p>
            )}

            {/* Empty state */}
            {quizzes.length === 0 && !error && (
                <div className="max-w-[900px] mx-auto flex flex-col items-center
                    justify-center gap-4 py-24 text-center">
                    <div className="text-6xl">📭</div>
                    <h2 className="font-[Bangers] text-3xl tracking-widest text-text">
                        No Quizzes Yet
                    </h2>
                    <p className="text-muted text-sm font-semibold">
                        You haven't created any quizzes. Start by making one!
                    </p>
                    <button
                        onClick={() => navigate("/create-quiz")}
                        style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                        className="px-6 py-3 rounded-full text-white font-extrabold text-sm
                            hover:-translate-y-1 transition-all duration-200">
                        Create Your First Quiz →
                    </button>
                </div>
            )}

            {/* Quiz Grid — maps over quizzes and renders MyQuizCard */}
            <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
                {quizzes.map((quiz) => (
                    <MyQuizCard key={quiz._id} quiz={quiz} />
                ))}
            </div>

        </section>
    );
}

export default MyQuizzes;