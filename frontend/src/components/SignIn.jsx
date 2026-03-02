import api from "../utils/api";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn({setActiveTab}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    function handleToggle(e){
        e.preventDefault();
        setActiveTab("signup")
    }
    async function handleSignIn(e){
        e.preventDefault();
        const payload = {
            email: email,
            password: password
        }
        try{
            const res = await api.post("api/users/login", payload);
            console.log(res);
            const access = res?.data?.accessToken;
            login(access);
            setEmail("");
            setPassword("");
            navigate("/");
        }catch(err){
            alert(err.response?.data?.message || err.message);   
            }

    }
    return (
        <section className="w-full min-h-screen bg-bg flex items-center justify-center px-4">
            <div className="w-full max-w-[900px] min-h-[500px] flex flex-col md:flex-row
                rounded-[24px] overflow-hidden border border-white/10
                shadow-[0_8px_48px_rgba(0,0,0,0.4)]">

                {/* Left — Text Panel */}
                <div style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                    className="w-full md:w-[45%] flex flex-col justify-center gap-6 p-10">
                    <div className="text-5xl font-[Bangers] quiz-logo">⚡QuizBliz</div>
                    <h1 className="font-[Bangers] text-5xl tracking-widest text-white leading-tight">
                        Welcome<br />Back!
                    </h1>
                    <p className="text-white/70 text-sm leading-relaxed font-semibold">
                        Sign in to track your progress, create your own quizzes,
                        and challenge your friends. Your brain workout awaits.
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                            <span className="text-accent3">✓</span> Access all quiz categories
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                            <span className="text-accent3">✓</span> Create & share your own quizzes
                        </div>
                    </div>
                    <p className="text-white/50 text-xl mt-4">
                        Don't have an account?{" "}
                        <button onClick={handleToggle}
                            className="text-accent2 font-extrabold hover:underline">
                            Sign Up
                        </button>
                    </p>
                </div>

                {/* Right — Form Panel */}
                <div className="w-full md:w-[55%] bg-card flex flex-col justify-center gap-6 p-10">
                    <div>
                        <h2 className="text-text font-[Bangers] text-3xl tracking-widest">
                            Sign In
                        </h2>
                        <p className="text-muted text-sm mt-1 font-semibold">
                            Enter your credentials to continue
                        </p>
                    </div>

                    <form className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="bg-bg border border-white/10 rounded-[12px] px-4 py-3
                                    text-text text-sm font-semibold placeholder:text-muted/50
                                    focus:outline-none focus:border-accent4 transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-bg border border-white/10 rounded-[12px] px-4 py-3
                                        text-text text-sm font-semibold placeholder:text-muted/50
                                        focus:outline-none focus:border-accent4 transition-all duration-200"
                                />
                                {/* Show/Hide toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2
                                        text-muted hover:text-text transition-all duration-200 text-sm">
                                    {showPassword ? <FaEye />: <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                            className="w-full py-3 rounded-[12px] text-white font-extrabold
                                tracking-wider text-sm mt-2
                                shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                                hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(67,97,238,0.6)]
                                transition-all duration-200"
                            onClick={handleSignIn}>
                            Sign In →
                        </button>
                    </form>

                </div>

            </div>
        </section>
    );

}
export default SignIn;