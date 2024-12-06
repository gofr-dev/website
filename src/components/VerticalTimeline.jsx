import React from 'react';
import AnimatedTimelineItem from './AnimatedTimelineItem';

const VerticalTimeline = ({ events }) => (
    <div className="md:container mx-auto px-4 py-8 relative">
        <div
            style={{ backgroundColor: 'rgb(56 189 248 )' }}
            className="absolute left-3 xs:left-0 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2"></div>

        <div className="relative z-10">
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
        </div>
    </div>
);

export default VerticalTimeline;
