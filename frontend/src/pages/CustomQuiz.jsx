import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CustomQuiz() {
    const { state: quiz } = useLocation();
    const navigate = useNavigate();
    function handleQuestionView(e){
        e.preventDefault();
        navigate(`/customquiz-view/${quiz._id}/question`, {state: quiz.questions});   
    }

    return (
        <section className="w-full min-h-screen bg-bg flex flex-col items-center
            justify-center px-4 gap-8">

            {/* Quiz Info */}
            <div className="text-center flex flex-col items-center gap-3">
                <span className="bg-[rgba(67,97,238,0.15)] border border-accent4/30
                    text-accent4 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    {quiz.questions.length} Questions
                </span>
                <h1 className="font-[Bangers] text-5xl sm:text-6xl tracking-widest text-text">
                    {quiz.title}
                </h1>
                <p className="text-muted text-sm font-semibold">
                    Created {new Date(quiz.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col w-full max-w-[420px] gap-4">

                {/* Play Quiz */}
                <button
                    style={{ background: 'linear-gradient(135deg, #ff4d6d, #ff6b35)' }}
                    className="w-full flex items-center justify-between px-6 py-4
                        rounded-[16px] text-white font-extrabold text-base tracking-wide
                        shadow-[0_8px_24px_rgba(255,77,109,0.4)]
                        hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,77,109,0.6)]
                        transition-all duration-200">
                    <span>Play Quiz</span>
                    <span className="text-white/60 text-sm font-semibold">
                        {quiz.questions.length === 0 ? "No questions yet" : `${quiz.questions.length} Qs`}
                    </span>
                </button>

                {/* Add Question */}
                <button
                    onClick={() => navigate(`/customquiz/${quiz._id}/add-question`, { state: quiz })}
                    style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                    className="w-full flex items-center justify-between px-6 py-4
                        rounded-[16px] text-white font-extrabold text-base tracking-wide
                        shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                        hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(67,97,238,0.6)]
                        transition-all duration-200">
                    <span> Add Question</span>
                    <span className="text-white/60 text-sm font-semibold">Build your quiz</span>
                </button>

                {/* View Questions */}
                <button
                    onClick={handleQuestionView}
                    style={{ background: 'linear-gradient(135deg, #06d6a0, #0096c7)' }}
                    className="w-full flex items-center justify-between px-6 py-4
                        rounded-[16px] text-white font-extrabold text-base tracking-wide
                        shadow-[0_8px_24px_rgba(6,214,160,0.35)]
                        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(6,214,160,0.55)]
                        transition-all duration-200">
                    <span> View Questions</span>
                    <span className="text-white/60 text-sm font-semibold">See all questions</span>
                </button>

            </div>

            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                    border border-white/10 text-muted text-sm font-bold
                    hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                ↩ Back
            </button>

        </section>
    );
}

export default CustomQuiz;