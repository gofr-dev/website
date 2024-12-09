import React from 'react';
import AnimatedTimelineItem from './AnimatedTimelineItem';
import Image from "next/image";
import blurCyanImage from "@/images/blur-cyan.png";

const VerticalTimeline = ({ events }) => (
    <div className="md:container mx-auto px-4 py-8 relative">

            <div
                style={{ backgroundColor: 'rgb(56 189 248 )' }}
                className="absolute left-3 xs:left-0 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2"></div>


            <div className="relative z-10">
                <Image
                    className="fixed bottom-full right-full top-5 -mb-56 -mr-72 opacity-50"
                    src={blurCyanImage}
                    alt=""
                    width={530}
                    height={530}
                    unoptimized
                    priority
                />
                    {events.map((event, index) => (
                        <AnimatedTimelineItem
                            key={index}
                            date={event.date}
                            title={event.title}
                            description={event.description}
                            imageSrc={event.imageSrc}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                <Image
                    className="fixed right-0 bottom-0 -mb-56 -mr-72 opacity-50"
                    src={blurCyanImage}
                    alt=""
                    width={530}
                    height={530}
                    unoptimized
                    priority
                />
            </div>
    </div>
);

export default VerticalTimeline;

