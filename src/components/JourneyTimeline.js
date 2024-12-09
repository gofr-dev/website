

import React from 'react';
import VerticalTimeline from './VerticalTimeline';

const JourneyTimeline = () => {
    const events = [
        {
            date: '2020',
            title: 'GopherCon Africa',
            description: 'GoFr received an amazing response at GopherCon Africa! We showcased our seamless database integration, HTTP/gRPC support, observability, and WebSockets.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609009162059836/1301136150156677141/1729836948894.jpeg?ex=67542878&is=6752d6f8&hm=8873c986db6913f2a617803849087cf934d8bc1d42c00946d421aab5740322e3&=&format=webp&width=2160&height=944',
        },
        {
            date: '2021',
            title: 'Open Source India 2024',
            description: 'At Open Source India in Bengaluru, we kicked off with an amazing response at our booth on 23rd and an interactive Developer’s Meet on Oct 24th. It was a pleasure connecting with everyone at our booth, where demos highlighted GoFr’s innovative approach to writing microservices, making backend development simpler and more efficient.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609009162059836/1301136149749698650/1729836948365.jpeg?ex=67542878&is=6752d6f8&hm=2d302d88b61fea1de21e4a062813ebac571a82b28ea34f4219fe9003307b7162&=&format=webp&width=1360&height=1012',
        },
        {
            date: '2022',
            title: 'GoFr is on a roll with its workshops!',
            description: 'Past two months, we’ve hosted workshops at top colleges such as IIT BHU, IIIT Sri City, Thapar University, JIIT Noida, NIT Jalandhar, and NIT Nagpur. At Gravitas in VIT Vellore, we proudly supported the Hack the Hackathon event, where students explored GoFr and contributed innovative ideas to enhance the framework.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609050899710052/1301491118780973137/WhatsApp_Image_2024-10-30_at_15.47.27.jpeg?ex=6754218f&is=6752d00f&hm=c66889de6a211941e90c73ccc3500eaab43c49cf6c30dc602e814125e17226fa&=&format=webp&width=1350&height=1012',
        },
        {
            date: '2020',
            title: 'GopherCon Africa',
            description: 'GoFr received an amazing response at GopherCon Africa! We showcased our seamless database integration, HTTP/gRPC support, observability, and WebSockets.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609009162059836/1301136150156677141/1729836948894.jpeg?ex=67542878&is=6752d6f8&hm=8873c986db6913f2a617803849087cf934d8bc1d42c00946d421aab5740322e3&=&format=webp&width=2160&height=944',
        },
        {
            date: '2021',
            title: 'Open Source India 2024',
            description: 'At Open Source India in Bengaluru, we kicked off with an amazing response at our booth on 23rd and an interactive Developer’s Meet on Oct 24th. It was a pleasure connecting with everyone at our booth, where demos highlighted GoFr’s innovative approach to writing microservices, making backend development simpler and more efficient.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609009162059836/1301136149749698650/1729836948365.jpeg?ex=67542878&is=6752d6f8&hm=2d302d88b61fea1de21e4a062813ebac571a82b28ea34f4219fe9003307b7162&=&format=webp&width=1360&height=1012',
        },
        {
            date: '2022',
            title: 'GoFr is on a roll with its workshops!',
            description: 'Past two months, we’ve hosted workshops at top colleges such as IIT BHU, IIIT Sri City, Thapar University, JIIT Noida, NIT Jalandhar, and NIT Nagpur. At Gravitas in VIT Vellore, we proudly supported the Hack the Hackathon event, where students explored GoFr and contributed innovative ideas to enhance the framework.',
            imageSrc: 'https://media.discordapp.net/attachments/1230609050899710052/1301491118780973137/WhatsApp_Image_2024-10-30_at_15.47.27.jpeg?ex=6754218f&is=6752d00f&hm=c66889de6a211941e90c73ccc3500eaab43c49cf6c30dc602e814125e17226fa&=&format=webp&width=1350&height=1012',
        },
    ];


    return (
        <div className="bg-slate-900 min-h-screen py-12 sm-min-w-72">
            <div className="sm:mx-auto xs:mx-10 px-4 sm-min-w-72">
                <h1 className="flex justify-center items-center text-4xl font-bold text-center mb-12 text-white">
                    Outreach
                </h1>
                <VerticalTimeline events={events} />
            </div>
        </div>
    );
};

export default JourneyTimeline;

