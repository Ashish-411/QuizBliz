import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
function CreateQuiz(){
    const {user} = useAuth();
    const [quizName, setQuizName]= useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    async function handleSubmit(e){
        e.preventDefault();
        if(!quizName.trim()){
            setError("quiz title cannot be empty");
            return;
        }
        const payload = {
            title:quizName
        }
        try{
            setLoading(true);
            const res = await api.post("api/quiz/createquiz", payload);
            console.log(res);
            navigate("/my-quizzes");
        }catch(err){
            setError(err?.response?.data?.message || err.message);

        }finally{
            setLoading(false);
        }
    }
    
    return(
        <section className="w-full min-h-screen bg-bg flex items-center justify-center px-4">
            <div className="w-full max-w-[520px] bg-card rounded-[24px] p-10
                border border-white/10 shadow-[0_8px_48px_rgba(0,0,0,0.4)]
                flex flex-col gap-6">

                {/* Header */}
                <div>
                    <h1 className="font-[Bangers] text-4xl tracking-widest text-text">
                        Create Quiz ✏️
                    </h1>
                    <p className="text-muted text-sm font-semibold mt-1">
                        Give your quiz a name and start adding questions
                    </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    {/* Quiz Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Quiz Title
                        </label>
                        <input
                            type="text"
                            value={quizName}
                            onChange={e => { setQuizName(e.target.value); setError(""); }}
                            required
                            placeholder="e.g. Ultimate Science Quiz"
                            className="bg-bg border border-white/10 rounded-[12px] px-4 py-3
                                text-text text-sm font-semibold placeholder:text-muted/50
                                focus:outline-none focus:border-accent4 transition-all duration-200"
                        />
                    </div>

                    {/* Created By — read only */}
                    <div className="flex flex-col gap-2">
                        <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                            Created By
                        </label>
                        <input
                            type="text"
                            value={user?.username || ""}
                            readOnly
                            className="bg-bg border border-white/5 rounded-[12px] px-4 py-3
                                text-muted text-sm font-semibold cursor-not-allowed opacity-60"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-accent1 text-xs font-bold text-center
                            bg-[rgba(255,77,109,0.1)] border border-accent1/30
                            rounded-[8px] px-4 py-2">
                            ✘ {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !quizName.trim()}
                        style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                        className="w-full py-3 rounded-[12px] text-white font-extrabold
                            tracking-wider text-sm
                            shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                            hover:enabled:-translate-y-1
                            hover:enabled:shadow-[0_12px_32px_rgba(67,97,238,0.6)]
                            transition-all duration-200
                            disabled:opacity-40 disabled:cursor-not-allowed">
                        {loading ? "Creating..." : "Create Quiz"}
                    </button>

                </form>
            </div>
        </section>
    );


}
export default CreateQuiz;