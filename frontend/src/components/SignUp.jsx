import api from "../utils/api";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function SignUp({setActiveTab}){
    const [username,SetUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [validPassword, setValidPassword]= useState(false);
    function handleToggle(e){
        e.preventDefault();
        setActiveTab("signin")
    }
    async function handleSignUp(e){
        e.preventDefault();
        const payload ={
            username: username,
            email: email,
            password: password
        }
        try{
            const res = await api.post("api/users/register",payload);
            console.log(res);
            SetUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setActiveTab("signin");
        }catch(err){
            console.log(err.response?.data?.message || err.message);
        }
    }
    useEffect(()=>{
        if(confirmPassword === password){
            setValidPassword(true);
            return;
        }
        setValidPassword(false);   
    },[confirmPassword]);
    return (
        <section className="w-full min-h-screen bg-bg flex items-center justify-center px-4">
            <div className="w-full max-w-[900px] flex flex-col md:flex-row
                rounded-[24px] overflow-hidden border border-white/10
                shadow-[0_8px_48px_rgba(0,0,0,0.4)]">

                {/* Left — Text Panel */}
                <div style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                    className="w-full md:w-[45%] flex flex-col justify-center gap-6 p-10">
                    <div className="font-[Bangers] quiz-logo text-5xl">⚡QuizBliz</div>
                    <h1 className="font-[Bangers] text-5xl tracking-widest text-white leading-tight">
                        Join The<br />Challenge!
                    </h1>
                    <p className="text-white/70 text-sm leading-relaxed font-semibold">
                        Create your account and dive into thousands of quizzes.
                        Compete, learn, and prove you're the smartest in the room.
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                            <span className="text-accent3">✓</span> Free forever
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                            <span className="text-accent3">✓</span> Create unlimited quizzes
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                            <span className="text-accent3">✓</span> Challenge your friends
                        </div>
                    </div>
                    <p className="text-white/50 text-xl mt-4">
                        Already have an account?{" "}
                        <button onClick={handleToggle}
                            className="text-accent2 font-extrabold hover:underline">
                            Sign In
                        </button>
                    </p>
                </div>

                {/* Right — Form Panel */}
                <div className="w-full md:w-[55%] bg-card flex flex-col justify-center gap-6 p-10">
                    <div>
                        <h2 className="text-text font-[Bangers] text-3xl tracking-widest">
                            Create Account
                        </h2>
                        <p className="text-muted text-sm mt-1 font-semibold">
                            Fill in the details to get started
                        </p>
                    </div>

                    <form className="flex flex-col gap-4">

                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={e => SetUserName(e.target.value)}
                                placeholder="coolquizzer99"
                                className="bg-bg border border-white/10 rounded-[12px] px-4 py-3
                                    text-text text-sm font-semibold placeholder:text-muted/50
                                    focus:outline-none focus:border-accent1 transition-all duration-200"
                            />
                        </div>

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
                                    focus:outline-none focus:border-accent1 transition-all duration-200"
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
                                        focus:outline-none focus:border-accent1 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2
                                        text-muted hover:text-text transition-all duration-200 text-sm">
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-muted text-xs font-extrabold tracking-widest uppercase">
                                Confirm Password
                            </label>
                            <div className="relative">
                               <input
                                    type={showConfirm ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-bg rounded-[12px] px-4 py-3 border
                                        text-text text-sm font-semibold placeholder:text-muted/50
                                        focus:outline-none transition-all duration-200
                                        ${confirmPassword === "" 
                                            ? "border-white/10 focus:border-accent1"
                                            : validPassword 
                                                ? "border-accent3 focus:border-accent3" 
                                                : "border-accent1 focus:border-accent1"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(prev => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2
                                        text-muted hover:text-text transition-all duration-200 text-sm">
                                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {confirmPassword !== "" && !validPassword && (
                                <p className="text-accent1 text-xs font-bold mt-[-4px]">
                                    ✘ Passwords do not match
                                </p>
                            )}
                            {confirmPassword !== "" && validPassword && (
                                <p className="text-accent3 text-xs font-bold mt-[-4px]">
                                    ✓ Passwords match
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)' }}
                            className="w-full py-3 rounded-[12px] text-white font-extrabold
                                tracking-wider text-sm mt-2
                                shadow-[0_8px_24px_rgba(67,97,238,0.4)]
                                hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(67,97,238,0.6)]
                                transition-all duration-200
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-white/10"
                            disabled={!validPassword}
                            onClick={handleSignUp}>
                            Create Account →
                        </button>
                    </form>

                </div>

            </div>
        </section>
    );
}
export default SignUp;