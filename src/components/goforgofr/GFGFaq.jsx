import React from 'react';
import Accordion from "@/components/Accordion";

const GfgFaq = () => {
    const faq = [
        {
            "title": "Is this event online or offline?",
            "description": "We have planned for the event to be offline, but we also offer an option for online registrations in our form. If we see substantial online interest, we may consider transitioning the hackathon to a hybrid format."
        },
        {
            "title": "What are the timings of the hackathon?",
            "description": "The hackathon will kick off at 12 PM on November 23rd and run continuously until 12 PM on November 24th."
        },
        {
            "title": "Can I participate in multiple tracks?",
            "description": "To streamline the judging process, each team can participate in only one track. However, you can change your chosen track before the idea presentation round at 5 PM."
        },
        {
            "title": "What is the required team size?",
            "description": "Teams should consist of 2 to 4 members."
        },
        {
            "title": "Have any other queries?",
            "description": "Feel free to join our Discord community to start discussions or connect with fellow participants. You can also join the WhatsApp group linked in the registration form. "
        }
    ];


    return (
    <div className={`flex flex-col my-10 px-10 md:px-20 gap-4`} id={`Faq`}>
      <span
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-wider bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent`}
      >
        FAQ
      </span>
        <Accordion data={faq} />
    </div>
  )
}

export default GfgFaq