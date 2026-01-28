"use client"

import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"

export default function MessageScreen() {
    const [opened, setOpened] = useState(false)
    const audioRef = useRef(null)

    const handleOpen = () => {
        if (!opened) {
            setOpened(true)
            
            // 1. Play Birthday Song
            if (audioRef.current) {
                audioRef.current.play().catch(err => console.log("Audio play blocked"));
            }

            // 2. Continuous Party Pops
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe4e1] p-4 overflow-x-hidden">
            {/* Audio Element */}
            <audio ref={audioRef} loop>
                <source src="images/happy-birthday-469282.mp3" type="audio/mpeg" />
            </audio>

            {/* GIF APPEARING ABOVE THE BOX */}
            <div className={`transition-all duration-1000 transform ${opened ? "opacity-100 translate-y-0 scale-110" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}>
                <img 
                    src="https://raw.githubusercontent.com/Sandeep992299/HDB/main/public/gifs/surprise.gif" 
                    alt="Surprise GIF" 
                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                />
            </div>

            <div className={`bg-[#fff8fc] p-8 rounded-[60px] drop-shadow-2xl w-full max-w-lg relative flex flex-col items-center gap-6 my-6 transition-all duration-500 ${opened ? "mt-2" : "mt-10"}`}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#ff4d6d] text-center animate-bounce">
                        {opened ? "Surprise! 🎉" : "A Special Message"}
                    </h2>
                    <p className="text-pink-400 text-lg font-semibold mt-2">
                        {opened ? "For My Favorite Person ❤️" : "Tap the heart to open"}
                    </p>
                </div>

                {/* The Interactive Box (Made Larger) */}
                <div
                    onClick={handleOpen}
                    className={`relative h-96 w-full rounded-[50px] overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 transform ${opened ? 'scale-105' : 'hover:scale-102'} bg-white flex items-center justify-center`}
                >
                    {/* COVER IMAGE */}
                    <div 
                        className={`absolute inset-0 z-20 transition-all duration-[1200ms] ease-in-out ${opened ? "opacity-0 translate-y-[-120%] pointer-events-none" : "opacity-100"}`}
                        style={{
                            backgroundImage: `url('https://raw.githubusercontent.com/Sandeep992299/HDB/main/public/images/cover.webp')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="flex items-center justify-center h-full bg-black/10">
                             <div className="text-7xl animate-pulse">💝</div>
                        </div>
                    </div>

                    {/* BIGGER MESSAGE CONTENT */}
                    <div className={`relative px-10 py-8 h-full flex flex-col items-center justify-center text-center transition-all duration-1000 ${opened ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                        <div className="text-6xl mb-4">🎂</div>
                        <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-bold italic">
                            Happy Birthday, <span className="text-[#ff4d6d]">Cutiepie!</span>
                        </p>
                        <p className="text-gray-600 text-lg md:text-xl mt-4 leading-relaxed font-medium">
                            You deserve all the happiness, love, and smiles in the world. 
                            You make everything brighter just by being you. 
                            I hope your day is filled with laughter and heart-melting moments. 
                            Keep being amazing! 💗
                        </p>
                    </div>
                </div>
                
                {opened && (
                    <div className="flex gap-4 animate-bounce mt-4">
                        <span className="text-4xl">🎈</span>
                        <span className="text-4xl">🎁</span>
                        <span className="text-4xl">🎈</span>
                    </div>
                )}
            </div>
        </div>
    )
}
