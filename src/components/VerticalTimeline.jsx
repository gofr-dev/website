import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import AnimatedTimelineItem from "./AnimatedTimelineItem";
import Image from "next/image";
import blurCyanImage from "@/images/blur-cyan.png";

const TimelineObserver = dynamic(() => import("react-timeline-animation"), { ssr: false });

const Timeline = ({ setObserver, customHeight }) => {
    const timelineRef = useRef(null);

    useEffect(() => {
        setObserver(timelineRef.current);
    }, [setObserver]);

    return (
        <div
            id="timeline"
            ref={timelineRef}
            style={{ height: customHeight }}
            className="absolute left-3 xs:left-0 md:left-1/2 py-8 top-0 w-1 transform md:-translate-x-1/2 md:block hidden transition-all duration-100 ease-in-out"
        />
    );
};

const VerticalTimeline = ({ events }) => {
    const containerRef = useRef(null);
    const [timelineHeight, setTimelineHeight] = useState("100%");

    useEffect(() => {
        const updateTimelineHeight = () => {
            if (containerRef.current) {
                const lastEvent = containerRef.current.querySelector(
                    `.timeline-item:last-child`
                );
                if (lastEvent) {
                    const timelineTop = containerRef.current.getBoundingClientRect().top;
                    const lastEventBottom = lastEvent.getBoundingClientRect().bottom;
                    const lastEventHeight = lastEvent.offsetHeight;
                    setTimelineHeight(`${lastEventBottom - timelineTop - lastEventHeight / 2}px`);
                }
            }
        };
        updateTimelineHeight();
    }, [events]);

    return (
        <div ref={containerRef} className="md:container mx-auto px-4 py-4 md:py-8 relative">
            <TimelineObserver
                initialColor="transparent"
                fillColor="cyan"
                hasReverse={true}
                handleObserve={(setObserver) => (
                    <Timeline setObserver={setObserver} customHeight={timelineHeight} />
                )}
            />

            {/* `unoptimized` is required: this site builds with */}
            {/* output: 'export', which disables /_next/image. Without */}
            {/* unoptimized, Next emits a /_next/image?url=... src that */}
            {/* 404s in production and renders as a broken-image icon. */}
            <Image
                aria-hidden="true"
                className="fixed bottom-full right-full top-5 -mb-56 -mr-72 opacity-50 pointer-events-none select-none hidden sm:block"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                loading="lazy"
                unoptimized
            />

            <div className="relative z-10">
                {events.map((event, index) => (
                    <div key={index} className="timeline-item">
                        <AnimatedTimelineItem
                            date={event.date}
                            title={event.title}
                            description={event.description}
                            imageSrc={event.imageSrc}
                            isLeft={index % 2 === 0}
                        />
                    </div>
                ))}
            </div>

            <Image
                aria-hidden="true"
                className="fixed right-0 bottom-0 -mb-56 -mr-72 opacity-50 pointer-events-none select-none hidden sm:block"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                loading="lazy"
                unoptimized
            />
        </div>
    );
};

export default VerticalTimeline;
