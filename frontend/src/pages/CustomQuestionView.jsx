import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

// ── Question Card Component ──
function QuestionCard({ question, index }) {
    return (
        <div className="w-full bg-card border border-white/10 rounded-[20px] p-6
            flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            hover:border-white/20 transition-all duration-200">

            {/* Top row — index + category */}
            <div className="flex items-center justify-between">
                <span className="text-muted text-xs font-extrabold tracking-widest uppercase">
                    Q{index + 1}
                </span>
                <span className="bg-[rgba(67,97,238,0.15)] border border-accent4/30
                    text-accent4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    {question.category}
                </span>
            </div>

            {/* Question text */}
            <p className="text-text font-bold text-base leading-relaxed">
                {question.question}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                {question.options.map((option, i) => (
                    <div key={i}
                        className={`px-4 py-3 rounded-[12px] border text-sm font-semibold
                            ${i === question.correctAnswer
                                ? "border-accent3 bg-[rgba(6,214,160,0.1)] text-accent3"
                                : "border-white/10 text-muted"
                            }`}>
                        <span className="font-extrabold mr-2 opacity-60">
                            {['A', 'B', 'C', 'D'][i]}.
                        </span>
                        {option}
                    </div>
                ))}
            </div>

        </div>
    );
}

// ── Page Component ──
function CustomQuestionView() {
    const { state: questions } = useLocation();
    const navigate = useNavigate();

    if (!questions) return (
        <section className="w-full h-screen bg-bg flex items-center justify-center">
            <Loader />
        </section>
    );

    return (
        <section className="w-full min-h-screen bg-bg px-4 sm:px-8 py-10">

            {/* Header */}
            <div className="w-full max-w-[900px] mx-auto mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-[Bangers] text-4xl tracking-widest text-text">
                        Questions 📋
                    </h1>
                    <p className="text-muted text-sm font-semibold mt-1">
                        {questions.length} question{questions.length !== 1 ? "s" : ""} in this quiz
                    </p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full
                        border border-white/10 text-muted text-sm font-bold
                        hover:border-accent2/50 hover:text-accent2 transition-all duration-200">
                    ↩ Back
                </button>
            </div>

            {/* Empty state */}
            {questions.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center
                    gap-4 py-24 text-center">
                    <div className="text-6xl">📭</div>
                    <h2 className="font-[Bangers] text-3xl tracking-widest text-text">
                        No Questions Yet
                    </h2>
                    <p className="text-muted text-sm font-semibold">
                        Go back and add some questions to your quiz.
                    </p>
                </div>
            )}

            {/* Question Cards */}
            <div className="w-full max-w-[900px] mx-auto flex flex-col gap-5">
                {questions.map((q, index) => (
                    <QuestionCard key={q._id} question={q} index={index} />
                ))}
            </div>

        </section>
    );
}

export default CustomQuestionView;