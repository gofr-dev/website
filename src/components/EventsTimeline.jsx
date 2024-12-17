import React, { useEffect } from 'react';
import VerticalTimeline from './VerticalTimeline';
import events from '../app/events/events.json'

const EventsTimeline = () => {
    useEffect(() => {
        if (window.innerWidth >= 768) {
            window.scrollBy(0, 70);
        }
    }, []);
    return (
        <div className="bg-slate-900 min-h-screen py-4 md:py-28">
            <div className="sm:mx-auto px-4 py-8">
                <h1 className="flex justify-center items-center text-4xl font-bold text-center mb-12 text-white sm:hidden">
                    Events
                </h1>
                <VerticalTimeline events={events} />
            </div>
        </div>
    );
};

export default EventsTimeline;