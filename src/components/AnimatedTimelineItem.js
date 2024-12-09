
import React, { useRef, useEffect, useState } from 'react';

const AnimatedTimelineItem = ({ date, title, description, imageSrc, isLeft }) => {
    const itemRef = useRef(null); // Using useRef correctly for referencing the DOM element
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current); // Observing the ref element for visibility
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current); // Cleanup observer
            }
        };
    }, []);

    const animationClass = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10';

    return (
        <div
            ref={itemRef}
            className={`flex flex-col md:flex-row items-center w-full my-8 relative transition-all duration-1000 ease-out ${animationClass}`}
        >

            <div
                className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:order-last md:text-left md:pl-8'}`}>
                <div className="mb-4">
                    <h3 className="text-xl text-white font-bold mb-2">{title}</h3>
                    <p className="text-white">{description}</p>
                </div>
            </div>
            <div className="w-full md:w-2/12 flex md:justify-center items-center mb-4 md:mb-0">
                <div className="w-6 h-6 bg-primary rounded-full z-20 flex items-center justify-center">
                    <span className="text-xs px-4 bg-[#23293b] p-2 rounded-3xl text-white font-semibold">{date}</span>
                </div>
            </div>
            <div className={`w-full md:w-5/12 ${isLeft ? 'md:pl-8' : 'md:order-first md:pr-8'}`}>
                <img src={imageSrc} alt={title} className="w-full h-72 object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    );
};

export default AnimatedTimelineItem;




