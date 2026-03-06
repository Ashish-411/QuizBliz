import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

const CATEGORIES = [
    "General Knowledge","Science","Mathematics","History",
    "Geography", "Sports", "Technology","Music","Movies & TV",
    "Literature","Politics","Current Affairs"
    ];
function CustomQuestionAdd(){
    const{state: quiz} = useLocation();
    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");
    const [options, setOptions] = useState(["","","",""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    function handleOptionChange(index,value){
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!question.trim() || !category) {
            setError("Question and category are required");
            return;
        }
        if (options.some(o => o.trim() === "")) {
            setError("All 4 options are required");
            return;
        }
        if (correctAnswer === "") {
            setError("Please select the correct answer");
            return;
        }
        try {
            setLoading(true);
            setError("");
            await api.post(`api/quiz/${quiz._id}/question`, {
                question,
                category,
                options,
                correctAnswer: Number(correctAnswer)
            });
            setQuestion("");
            setCategory("");
            setOptions(["", "", "", ""]);
            setCorrectAnswer("");
        } catch(err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }


     const selectClass = `bg-bg border border-white/10 rounded-[12px] px-4 py-3
        text-text text-sm font-semibold focus:outline-none focus:border-accent4
        transition-all duration-200 cursor-pointer appearance-none`;

    return(
        <section className="w-full min-h-screen bg-bg flex justify-center">
            <div className="w-full max-w-[620px] bg-card rounded-[24px] p-8 sm:p-10
                border border-white/10 shadow-[0_8px_48px_rgba(0,0,0,0.4)]
                flex flex-col gap-6">
                 {/* Header */}
                <div>
                    <h1 className="font-[Bangers] text-4xl tracking-widest text-text">
                        Add Question:
                    </h1>
                    <p className="text-muted text-sm font-semibold mt-1">
                        Adding to: <span className="text-accent4 font-extrabold">{quiz.title}</span>
                    </p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    {/* Question */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Question
                        </label>
                        <textarea
                            value={question}
                            onChange={e => { setQuestion(e.target.value); setError(""); }}
                            placeholder="e.g. Which country hosted the G20 Summit in 2023?"
                            rows={3}
                            className="bg-bg border border-white/10 rounded-[12px] px-4 py-3
                                text-text text-sm font-semibold placeholder:text-muted/50
                                focus:outline-none focus:border-accent4 transition-all duration-200
                                resize-none"
                        />
                    </div>

                    {/* Category dropdown */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={e => { setCategory(e.target.value); setError(""); }}
                            className={selectClass}>
                            <option value="" disabled className="bg-card">
                                Select a category
                            </option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} className="bg-card">
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Options
                        </label>
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                            {options.map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-muted text-xs font-extrabold w-5 shrink-0">
                                        {['A', 'B', 'C', 'D'][i]}.
                                    </span>
                                    <input
                                        type="text"
                                        value={opt}
                                        onChange={e => { handleOptionChange(i, e.target.value); setError(""); }}
                                        placeholder={`Option ${['A','B','C','D'][i]}`}
                                        className="w-full bg-bg border border-white/10 rounded-[12px]
                                            px-4 py-3 text-text text-sm font-semibold
                                            placeholder:text-muted/50 focus:outline-none
                                            focus:border-accent4 transition-all duration-200"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Correct Answer dropdown */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Correct Answer
                        </label>
                        <select
                            value={correctAnswer}
                            onChange={e => { setCorrectAnswer(e.target.value); setError(""); }}
                            className={selectClass}>
                            <option value="" disabled className="bg-card">
                                Select correct option
                            </option>
                            {['A', 'B', 'C', 'D'].map((letter, i) => (
                                <option key={i} value={i} className="bg-card">
                                    {letter} — {options[i] || `Option ${letter}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-accent1 text-xs font-bold text-center
                            bg-[rgba(255,77,109,0.1)] border border-accent1/30
                            rounded-[8px] px-4 py-2">
                            ✘ {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-3 rounded-[12px] bg-transparent font-extrabold
                                border border-white/10 text-muted text-sm tracking-wide
                                hover:border-accent1/50 hover:text-accent1 transition-all duration-200">
                            ↩ Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                            className="flex-1 py-3 rounded-[12px] text-white font-extrabold
                                text-sm tracking-wide
                                shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                                hover:enabled:-translate-y-1
                                hover:enabled:shadow-[0_12px_32px_rgba(67,97,238,0.6)]
                                transition-all duration-200
                                disabled:opacity-40 disabled:cursor-not-allowed">
                            {loading ? "Adding..." : "Add Question →"}
                        </button>
                    </div>

                </form>
                

            </div>
            
        </section>
    );

}
export default CustomQuestionAdd;