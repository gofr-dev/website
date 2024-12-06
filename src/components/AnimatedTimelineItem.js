
import React, { useRef, useEffect, useState } from 'react';

const AnimatedTimelineItem = ({ date, title, description, imageSrc, isLeft }) => {


    return (
        <div className="">

            <div
                className={`flex flex-col md:flex-row items-center w-full my-8 relative transition-all duration-1000 ease-out`}
            >
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:order-last md:text-left md:pl-8'}`}>
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
                    <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-lg shadow-md xs:mb-10" />
                </div>
            </div>
        </div>
    );
};

export default AnimatedTimelineItem;

