import React, {useEffect, useRef, useState} from 'react';
import VerticalTimeline from './VerticalTimeline';

const Journey = () => {
    const events = [
        {
            date: '2020',
            title: 'Journey Begins',
            description: 'Our adventure started with a small idea and big dreams.',
            imageSrc: 'https://storage.googleapis.com/zopdev-blog-resources/zop/files/originals/20241130/44150fa7-7771-4de1-8a64-d3fcca1ed447-screen.png',
        },
        {
            date: '2021',
            title: 'First Milestone',
            description: 'We achieved our first major goal, setting the stage for future success.',
            imageSrc: 'https://images.pexels.com/photos/3309775/pexels-photo-3309775.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3309775.jpg&fm=jpg',
        },
        {
            date: '2022',
            title: 'Expansion',
            description: 'Our team grew, and we expanded our reach to new markets.',
            imageSrc: 'https://images.pexels.com/photos/3309775/pexels-photo-3309775.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3309775.jpg&fm=jpg',
        },
        {
            date: '2023',
            title: 'Innovation',
            description: 'We launched our groundbreaking product, revolutionizing the industry.',
            imageSrc: 'https://images.pexels.com/photos/3309775/pexels-photo-3309775.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3309775.jpg&fm=jpg',
        },
        {
            date: '2024',
            title: 'Global Recognition',
            description: 'Our efforts were recognized on the global stage, earning prestigious awards.',
            imageSrc: 'https://images.pexels.com/photos/3309775/pexels-photo-3309775.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3309775.jpg&fm=jpg',
        },
        {
            date: '2025',
            title: 'Sustainable Future',
            description: 'We implemented eco-friendly practices, setting new industry standards.',
            imageSrc: 'https://images.pexels.com/photos/3309775/pexels-photo-3309775.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3309775.jpg&fm=jpg',
        },
    ];

    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {

                console.log(entry)
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
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    const animationClass = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10';

    return (
      <div
          ref={itemRef}
        className={
          'sm-min-w-72 relative min-h-screen bg-slate-900 py-12 ' +
          animationClass
        }
      >
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-10 h-[30vh] bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent" />
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-[30vh] bg-gradient-to-t from-slate-900/40 via-slate-900/20 to-transparent" />

        <div className="sm-min-w-72 px-4 xs:mx-10 sm:mx-auto">
          <h1 className="mb-12 flex items-center justify-center text-center text-4xl font-bold text-white">
            Our Journey
          </h1>

          <VerticalTimeline events={events} />
        </div>
      </div>
    )
};

export default Journey;
