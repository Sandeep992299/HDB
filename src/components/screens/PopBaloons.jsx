"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

const BALLOONS = [
    { id: 1, word: "I", color: "bg-red-400" },
    { id: 2, word: "Love", color: "bg-pink-400" },
    { id: 3, word: "You", color: "bg-purple-400" },
    { id: 4, word: "Patiyo", color: "bg-rose-500" },
];

export default function BalloonPage({ onNext }) { // Received onNext prop
    const [popped, setPopped] = useState([]);
    const [allPopped, setAllPopped] = useState(false);
    const [showButton, setShowButton] = useState(false); // New state for button delay

    const popSound = () => {
        const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
        audio.play().catch(e => console.log("Audio play blocked"));
    };

    const handlePop = (id) => {
        if (!popped.includes(id)) {
            popSound();
            setPopped([...popped, id]);
            
            // Individual balloon pop effect
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
                
                // Grand Finale Confetti
                const end = Date.now() + 3 * 1000;
                const colors = ['#ff4d6d', '#ffccd5', '#ffffff'];
                
                (function frame() {
                    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
                    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    } else {
                        // Show the "Next" button after confetti finishes
                        setShowButton(true);
                    }
                }());
            }, 500);
        }
    }, [popped]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-[#fff0f3] p-6 overflow-hidden">
            <div className="text-center mt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#ff4d6d] animate-pulse">
                    {allPopped ? "You're my world! 🌎" : "Pop the balloons for a secret! 🎈"}
                </h2>
            </div>

            {/* Balloon Container */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-4xl">
                {BALLOONS.map((b, index) => (
                    <div key={b.id} className="relative flex flex-col items-center">
                        {/* The Word revealed after popping */}
                        <div className={`absolute top-10 transition-all duration-500 text-4xl md:text-6xl font-black text-[#ff4d6d] ${popped.includes(b.id) ? "opacity-100 scale-125 translate-y-0" : "opacity-0 scale-50 translate-y-10"}`}>
                            {b.word}
                        </div>

                        {/* The Balloon */}
                        {!popped.includes(b.id) && (
                            <div
                                onClick={() => handlePop(b.id)}
                                className={`w-24 h-32 md:w-32 md:h-44 ${b.color} rounded-t-full rounded-b-[70%] cursor-pointer shadow-xl
                                           animate-float relative transition-transform hover:scale-110 active:scale-90`}
                                style={{ animationDelay: `${index * 0.5}s` }}
                            >
                                {/* Balloon String */}
                                <div className="absolute -bottom-16 left-1/2 w-0.5 h-16 bg-gray-400/50"></div>
                                {/* Shine Effect */}
                                <div className="absolute top-4 left-6 w-4 h-8 bg-white/30 rounded-full"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Final Message & Button Container */}
            <div className="flex flex-col items-center gap-6 mb-20">
                <div className={`transition-all duration-1000 text-center ${allPopped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#ff4d6d] drop-shadow-lg">
                        Forever Yours ❤️
                    </h1>
                    <p className="text-pink-400 text-xl mt-4 italic font-medium px-4">You are the best thing that ever happened to me.</p>
                </div>

                {/* NEXT BUTTON */}
                {showButton && (
                    <button
                        onClick={onNext}
                        className="bg-[#ff4d6d] text-white px-10 py-4 rounded-full font-bold text-2xl shadow-2xl hover:bg-[#ff3355] transition-all transform hover:scale-110 active:scale-95 animate-bounce-slow"
                    >
                        See More Surprise! ✨
                    </button>
                )}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0) scale(1.1); }
                    50% { transform: translateY(-10px) scale(1.1); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
