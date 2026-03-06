import { useNavigate } from "react-router-dom";
function MyQuizCard({quiz}){
    const navigate = useNavigate();
    function handleClick(e){
        e.preventDefault();
        navigate(`/customquiz/${quiz._id}`, {state: quiz});
    }

    return(
        <div className="bg-card border border-white/10 rounded-[20px]
                        p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex
                        flex-col gap-4 hover:border-white/20 transition-all duration-200"
            onClick={handleClick}>
            <div className="flex item-start justify-between gap-3">
                <h2 className="text-text font-extrabold text-lg leading-tight">
                    {quiz.title}
                </h2>
                <span className="shring-0 bg-[rgba(67,97,238,0.15)] border border-accent4/30
                text-accent4 px-3 py-1 rounded-full text-xs font-bold tracking-widest">
                    {quiz.questions.length} Qs
                </span>
            </div>
            <div className="flex justify-between">
                <p className="text-muted text-l font-semibold">
                    Click to add questions and play
                </p>  
                <p className="text-muted text-l font-semibold">
                    {"->"}
                </p>  
            </div>
            <p className="text-muted text-xs font-semibold">
                Created: {new Date(quiz.createdAt).toLocaleDateString('en-US',{
                    year: 'numeric', month:'short', day:'numeric'
                })}
            </p>



        </div>
    );

}
export default MyQuizCard;