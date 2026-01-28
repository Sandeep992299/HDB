"use client"

import { useState, useRef } from "react"
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

            // 2. Continuous Party Pops (Confetti)
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

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

            {/* GIF ABOVE THE BOX */}
            <div className={`transition-all duration-1000 transform ${opened ? "opacity-100 translate-y-0 scale-110" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}>
                <img 
                    src="https://raw.githubusercontent.com/Sandeep992299/HDB/main/public/gifs/surprise.gif" 
                    alt="Surprise GIF" 
                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                />
            </div>

            <div className={`bg-[#fff8fc] p-8 rounded-[60px] drop-shadow-2xl w-full max-w-lg relative flex flex-col items-center gap-6 transition-all duration-500 ${opened ? "mt-2" : "mt-10"}`}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#ff4d6d] text-center animate-bounce">
                        {opened ? "Surprise! 🎉" : "A Special Message"}
                    </h2>
                    <p className="text-pink-400 text-lg font-semibold mt-2">
                        {opened ? "Keep scrolling to read... ❤️" : "Tap the heart to open"}
                    </p>
                </div>

                {/* The Interactive Box */}
                <div
                    onClick={handleOpen}
                    className={`relative h-[450px] w-full rounded-[50px] overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 transform ${opened ? 'scale-105' : 'hover:scale-102'} bg-white flex flex-col items-center justify-center`}
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

                    {/* SCROLLABLE MESSAGE CONTENT */}
                    <div className={`relative w-full h-full flex flex-col items-center transition-all duration-1000 ${opened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        
                        {/* Fixed Top Decoration inside box */}
                        <div className="pt-8 pb-2 text-6xl">🎂</div>

                        {/* THIS SECTION IS NOW SCROLLABLE */}
                        <div className="px-10 pb-10 overflow-y-auto w-full custom-scrollbar">
                            <p className="text-[#ff4d6d] text-2xl md:text-3xl font-bold italic text-center mb-6">
                                Happy Birthday, Cutiepie!
                            </p>
                            
                            <div className="text-gray-600 text-xl md:text-2xl leading-relaxed font-medium space-y-6 text-center">
                                <p>
                                    You deserve all the happiness, love, and smiles in the world today and always. 🌟
                                </p>
                                <p>
                                    You have this special way of making everything around you brighter—your smile, your kindness, and the way you make people feel truly cared for.
                                </p>
                                <p>
                                    I hope your day is filled with laughter, surprises, and moments that make your heart happy. You’re truly one of a kind.
                                </p>
                                <p>
                                    Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless success and all the sweet things life has to offer!
                                </p>
                                <p className="text-[#ff4d6d] font-bold text-3xl mt-6">
                                    I Love You So Much! 💗
                                </p>
                            </div>
                        </div>
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

            {/* Custom Scrollbar CSS */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ffccd5;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ff4d6d;
                }
            `}</style>
        </div>
    )
}
