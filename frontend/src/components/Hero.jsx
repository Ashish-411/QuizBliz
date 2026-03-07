import { useAuth } from "../contexts/AuthContext";
function Hero(){
    const {user} = useAuth();
    const name = user?.username;
    function getGreeting(){
        const Greetings = ["Morning", "AfterNoon", "Evening", "Night"];
        const currentHr = new Date().getHours();
        if(currentHr < 12) return Greetings[0];
        if(currentHr < 17) return Greetings[1];
        if(currentHr < 21) return Greetings[2];
        return Greetings[3];

    }
    return(
        <section className="text-center max-w-[640px] mx-auto my-[3rem] flex flex-col items-center justify-center gap-4">
             <h1 className="font-['Bangers'] text-[clamp(3.5rem,8vw,6rem)]
            leading-none tracking-[3px] text-text">
                {"Good" + " " + getGreeting() + " " + name}
            </h1>
            <div className="inline-block bg-[rgba(6,214,160,0.3)]
            border border-[rgba(6,214,160,0.3)] text-accent3 px-[18px] py-[5px]
            rounded-full text-xs font-extrabold tracking-[2px] uppercase">
            ✦ Challenge Your Brain</div>
            <h1 className="font-['Bangers'] text-[clamp(3.5rem,8vw,6rem)]
            leading-none tracking-[3px] text-text">
                Think Fast,
                <span className="block bg-gradient-to-r from-[var(--color-accent1)] via-[var(--color-accent2)] to-[var(--color-accent3)]
                bg-clip-text text-transparent shimmer-text"
                >Quiz Hard.</span>
            </h1>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-2">
                Build your own quizzes, challenge your friends. Let's make the atmosphere
                competetive. Are you ready?
            </p>
        </section>
    );

}
export default Hero;