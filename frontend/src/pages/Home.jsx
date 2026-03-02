import api from "../utils/api";
import { useState,useEffect, useRef } from "react";
import Hero from "../components/Hero";
import HomeMain from "../components/HomeMain";
function Home(){
    const [questions,setQuestions] = useState(null);
    const [loading,setLoading] = useState(false);
    const dotsRef = useRef(null);

    // Generate floating dots
    useEffect(() => {
        const colors = ['#ff4d6d', '#ffbe0b', '#06d6a0', '#4361ee', '#7209b7'];
        const container = dotsRef.current;
        if (!container) return;

        for (let i = 0; i < 22; i++) {
            const d = document.createElement('div');
            d.className = 'dot';
            const size = Math.random() * 18 + 6;
            d.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${Math.random() * 18 + 10}s;
                animation-delay: -${Math.random() * 20}s;
            `;
            container.appendChild(d);
        }

        // Cleanup on unmount
        return () => {
            if (container) container.innerHTML = '';
        };
    }, []);
    async function fetchInGameQuiz(){
        try{
            setLoading(true);
            const res = await api.get("api/quiz/ingame");
            console.log(res.data);
        }catch(err){
            console.log(err);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchInGameQuiz();
    },[]);
    return (
        <div className="relative min-h-screen bg-bg overflow-hidden">

            {/* Floating Dots Container */}
            <div ref={dotsRef} className="fixed inset-0 pointer-events-none z-0" />

            {/* Your page content goes here (above dots) */}
            <div className="relative z-10">
                <Hero/>
                <HomeMain/>
            </div>

        </div>
    );

}
export default Home;