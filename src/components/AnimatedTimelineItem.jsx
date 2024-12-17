import React, { useRef, useEffect, useState } from 'react';

const AnimatedTimelineItem = ({ date, title, description, imageSrc, isLeft }) => {
    const itemRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); 
                    setIsExiting(false); 
                } else {
                    setIsVisible(false); 
                    setIsExiting(true);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    const animationStyle = isVisible
        ? {
              transform: 'translateX(0)',
              opacity: 1,
              transition: 'all 1s ease-out',
          }
        : isExiting
        ? isLeft
            ? {
                  transform: 'translateX(100px)', 
                  opacity: 0,
                  transition: 'all 1s ease-out',
              }
            : {
                  transform: 'translateX(-100px)', 
                  opacity: 0,
                  transition: 'all 1s ease-out',
              }
        : isLeft
        ? {
              transform: 'translateX(-100px)',
              opacity: 0,
          }
        : {
              transform: 'translateX(100px)',
              opacity: 0,
          };

    return (
        <div
            ref={itemRef}
            className="flex flex-col md:flex-row items-center w-full xs:mb-20 md:mb-60 relative transition-all duration-1000 ease-out"
        >
            <div
                className={`w-full md:w-5/12 ${
                    isLeft ? 'md:text-right md:pr-8' : 'md:order-last md:text-left md:pl-8'
                }`}
            >
                <div className="mb-4">
                    <h3 className="text-xl text-white font-bold mb-2">{title}</h3>
                    <p className="text-white">{description}</p>
                </div>
            </div>
            <div className="w-full px-4 md:w-2/12 flex md:justify-center items-center mb-4 md:mb-0">
                <div className="w-auto h-6 bg-primary rounded-full z-20 flex items-center justify-center">
                    <span className="text-xs px-4 bg-[#23293b] p-2 rounded-3xl text-white font-semibold items-center whitespace-nowrap">
                        {date}
                    </span>
                </div>
            </div>
            

            <div
                className={`w-full md:w-5/12 ${
                    isLeft ? 'md:pl-8' : 'md:order-first md:pr-8'
                }`}
                style={animationStyle}
            >
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-72 object-cover rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default AnimatedTimelineItem;
