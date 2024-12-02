"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";

const ErrorPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setEyePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-colors duration-700 ${
        isDarkTheme
          ? "bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 text-black"
      } animate-fade-in`}
    >
      <div className="h-[70vh] min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg relative">
              <div
                className="w-8 h-8 bg-black rounded-full eye animate-eye-movement"
                style={{
                  transition: 'transform 0.1s ease',
                  transform: `translate(${eyePosition.x / 50}px, ${eyePosition.y / 50}px)`,
                }}
              ></div>
            </div>
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg relative">
              <div
                className="w-8 h-8 bg-black rounded-full eye animate-eye-movement"
                style={{
                  transition: 'transform 0.1s ease',
                  transform: `translate(${eyePosition.x / 50}px, ${eyePosition.y / 50}px)`,
                }}
              ></div>
            </div>
          </div>

          <p className="font-display text-sm font-medium text-gray-400 animate-bounce">404</p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-gray-400 animate-bounce">
            Looks like you&apos;re lost
          </h1>
          <p className="mt-2 text-sm text-gray-400 animate-bounce">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Link
            href="/"
            className="mt-8 text-sm font-medium inline-block border border-yellow-500 text-lg font-light px-6 py-3 rounded-lg shadow-md hover:shadow-none hover:bg-yellow-500 hover:text-black transition-all transform hover:scale-110"
          >
            Go back home
          </Link>
        </div>
      </div>

      <button
        className="absolute top-10 right-10 text-2xl text-yellow-500 cursor-pointer bg-transparent border-none focus:outline-none transition-transform hover:scale-110"
        onClick={toggleTheme}
      >
        {isDarkTheme ? "\u2600" : "\u{1F319}"}
      </button>
    </div>
  );
};

export default ErrorPage;



