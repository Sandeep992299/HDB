"use client"

import { useState, useEffect, useRef } from "react"
// You can install this via: npm install canvas-confetti
import confetti from "canvas-confetti"

export default function MessageScreen() {
    const [opened, setOpened] = useState(false)
    const audioRef = useRef(null)

    const handleOpen = () => {
        if (!opened) {
            setOpened(true)
            
            // 1. Play Birthday Song
            if (audioRef.current) {
                audioRef.current.play().catch(err => console.log("Audio play blocked by browser. User must interact first."));
            }

            // 2. Trigger Party Pops / Confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // Since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe4e1] p-4">
            {/* Hidden Audio Element */}
            <audio ref={audioRef} loop>
                <source src="images/happy-birthday-469282.mp3" type="audio/mpeg" />
                {/* Note: Replace the URL above with a direct link to your "Happy Birthday" MP3 file */}
            </audio>

            <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-md relative flex flex-col items-center gap-6 my-10 transition-all duration-500">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#ff4d6d] text-center animate-bounce">
                        {opened ? "Surprise! 🎉" : "A Special Message"}
                    </h2>
                    <p className="text-pink-400 text-sm font-medium">
                        {opened ? "I love you! ❤️" : "Tap the heart to open"}
                    </p>
                </div>

                {/* The Interactive Box */}
                <div
                    onClick={handleOpen}
                    className={`relative h-80 w-full rounded-[40px] overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 transform ${opened ? 'scale-105' : 'hover:scale-102'} bg-white flex items-center justify-center`}
                >
                    {/* COVER IMAGE - Disappears when opened */}
                    <div 
                        className={`absolute inset-0 z-20 transition-all duration-1000 ease-in-out ${opened ? "opacity-0 translate-y-[-100%] pointer-events-none" : "opacity-100"}`}
                        style={{
                            backgroundImage: `url('https://raw.githubusercontent.com/Sandeep992299/HDB/main/public/images/cover.webp')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Overlay Heart Icon */}
                        <div className="flex items-center justify-center h-full bg-black/10">
                             <div className="text-6xl animate-pulse">💝</div>
                        </div>
                    </div>

                    {/* MESSAGE CONTENT - Appears when opened */}
                    <div className={`relative px-8 py-6 h-full flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}>
                        <div className="text-4xl mb-4">🎂</div>
                        <p className="text-gray-600 leading-relaxed font-medium italic">
                            Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world always. 
                            You have this special way of making everything around you brighter. 
                            I hope your day is filled with laughter, surprises, and moments that make your heart happy. 
                            Keep being the amazing person you are. 💗
                        </p>
                    </div>
                </div>
                
                {opened && (
                    <div className="flex gap-2 animate-fade-in">
                        <span className="text-2xl">🎈</span>
                        <span className="text-2xl">🎁</span>
                        <span className="text-2xl">🎈</span>
                    </div>
                )}
            </div>
        </div>
    )
}
