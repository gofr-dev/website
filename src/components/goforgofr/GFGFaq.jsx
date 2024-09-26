import React from 'react';
import Accordion from "@/components/Accordion";
import {data} from "autoprefixer";

const GfgFaq = () => {
    const faq = [
        {
            "title": "Why is GOFR better than other frameworks?",
            "description": "GOFR offers a simple, structured approach to building RESTful APIs in Go, prioritizing performance and maintainability while following best practices. GOFR offers a simple, structured approach to building RESTful APIs in Go, prioritizing performance and maintainability while following best practices. GOFR offers a simple, structured approach to building RESTful APIs in Go, prioritizing performance and maintainability while following best practices. GOFR offers a simple, structured approach to building RESTful APIs in Go, prioritizing performance and maintainability while following best practices. GOFR offers a simple, structured approach to building RESTful APIs in Go, prioritizing performance and maintainability while following best practices."
        },
        {
            "title": "What advantages does GOFR provide for new developers?",
            "description": "GOFR features clear documentation, a straightforward project structure, and easy-to-use components, making it accessible for newcomers to Go and API development."
        },
        {
            "title": "How does GOFR handle error management?",
            "description": "GOFR promotes consistent error handling practices, allowing developers to manage errors in a centralized manner, improving debugging and user experience."
        },
        {
            "title": "Can GOFR be used for microservices architecture?",
            "description": "Yes, GOFR is well-suited for microservices due to its lightweight design and modularity, enabling developers to build independent, scalable services."
        },
        {
            "title": "What is the performance of GOFR compared to other Go frameworks?",
            "description": "GOFR is optimized for performance and can handle high throughput, making it competitive with other Go frameworks while providing a simple API design."
        }
    ]

    return (
    <div className={`flex flex-col mt-10 px-10 gap-4`} id={`faq_section`}>
      <span
        className={`text-[66px] font-semibold tracking-wider text-sky-400`}
        style={{ fontFamily: 'Impact, sans-serif' }}
      >
        FAQ
      </span>
        <Accordion data={faq} />
    </div>
  )
}

export default GfgFaq