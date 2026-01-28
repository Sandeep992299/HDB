"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

const BALLOONS = [
    { id: 1, word: "I", color: "bg-red-400" },
    { id: 2, word: "Love", color: "bg-pink-400" },
    { id: 3, word: "You", color: "bg-purple-400" },
    { id: 4, word: "Patiyo", color: "bg-rose-500" },
];

export default function PopBaloons({ onNext }) {
    const [popped, setPopped] = useState([]);
    const [allPopped, setAllPopped] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const popSound = () => {
        const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
        audio.play().catch(e => console.log("Audio play blocked"));
    };

    const handlePop = (id) => {
        if (!popped.includes(id)) {
            popSound();
            setPopped([...popped, id]);
            
            confetti({
                particleCount: 40,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ffffff']
            });
        }
    };

    useEffect(() => {
        if (popped.length === BALLOONS.length) {
            setTimeout(() => {
                setAllPopped(true);
                const end = Date.now() + 3000;
                const colors = ['#ff4d6d', '#ffccd5', '#ffffff'];
                
                (function frame() {
                    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
                    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    } else {
                        setShowButton(true);
                    }
                }());
            }, 500);
        }
    }, [popped]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-[#fff0f3] p-4 md:p-10 overflow-hidden">
            <div className="text-center mt-5 md:mt-10">
                <h2 className="text-2xl md:text-4xl font-bold text-[#ff4d6d] animate-pulse">
                    {allPopped ? "You're my world! 🌎" : "Pop the balloons for a secret! 🎈"}
                </h2>
            </div>

            {/* BALLOON GRID - Fixed spacing to prevent overlapping */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 w-full max-w-5xl justify-items-center items-center my-10">
                {BALLOONS.map((b, index) => (
                    <div key={b.id} className="relative flex flex-col items-center justify-center w-32 h-48 md:w-40 md:h-60">
                        
                        {/* THE WORD - Centered in the balloon's spot */}
                        <div className={`absolute transition-all duration-700 ease-out text-3xl md:text-5xl font-black text-[#ff4d6d] z-10 text-center
                            ${popped.includes(b.id) ? "opacity-100 scale-110 translate-y-0" : "opacity-0 scale-0 translate-y-10"}`}>
                            {b.word}
                        </div>

                        {/* THE BALLOON */}
                        {!popped.includes(b.id) && (
                            <div
                                onClick={() => handlePop(b.id)}
                                className={`w-24 h-32 md:w-32 md:h-44 ${b.color} rounded-t-full rounded-b-[70%] cursor-pointer shadow-xl
                                           animate-float relative transition-transform hover:scale-110 active:scale-95 z-20`}
                                style={{ animationDelay: `${index * 0.3}s` }}
                            >
                                {/* Balloon String */}
                                <div className="absolute -bottom-12 md:-bottom-16 left-1/2 w-0.5 h-12 md:h-16 bg-gray-400/40"></div>
                                {/* Shine Effect */}
                                <div className="absolute top-4 left-6 w-3 h-7 bg-white/30 rounded-full"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* FINAL MESSAGE & BUTTON */}
            <div className="flex flex-col items-center gap-6 mb-10 md:mb-20 min-h-[150px]">
                <div className={`transition-all duration-1000 text-center ${allPopped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-[#ff4d6d] drop-shadow-lg">
                        Forever Yours ❤️
                    </h1>
                    <p className="text-pink-400 text-lg md:text-xl mt-2 italic font-medium px-4">
                        You are the best thing that ever happened to me.
                    </p>
                </div>

                {showButton && (
                    <button
                        onClick={onNext}
                        className="bg-[#ff4d6d] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-xl md:text-2xl shadow-2xl hover:bg-[#ff3355] transition-all transform hover:scale-105 active:scale-95 animate-bounce-slow"
                    >
                        See More Surprise! ✨
                    </button>
                )}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3.5s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
