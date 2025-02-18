import Image from "next/image";
import React from "react";

const testimonials = [
    {
        quote:
            "What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        profile: "https://randomuser.me/api/portraits/men/1.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        quote:
            "The strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-tryThe strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-tryThe strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-tryThe strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-tryThe strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-try",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        profile: "https://randomuser.me/api/portraits/men/2.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        quote:
            "What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional to'What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business'ol in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        profile: "https://randomuser.me/api/portraits/women/1.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        quote:
            "What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        profile: "https://randomuser.me/api/portraits/men/3.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        quote:
            "What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        // profile: "https://randomuser.me/api/portraits/women/2.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        quote:
            "The strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-try",
        author: "Praveen Kumar",
        role: "Founder of apnerve labs",
        profile: "https://randomuser.me/api/portraits/men/4.jpg",
        logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
]

export default function Reviews() {
    return (
        <div className="mx-10 min-h-screen bg-[#101827]">
            {/*<h2 className="text-center text-lg font-semibold leading-8 text-white mb-10">*/}
            {/*    User Testimonials*/}
            {/*</h2>*/}
            <div className="columns-3">
                <div >
                    {/* Your Content */}
                </div>

                {/*{testimonials.map((testimonial, index) => (*/}
                {/*    <div*/}
                {/*        key={index}*/}
                {/*        className="my-2 inline-block max-h-[420px] w-full overflow-hidden rounded-2xl border  border-gray-700 p-6"*/}
                {/*    >*/}
                {/*        <div className="scrollbar-thin scrollbar-thumb-gray-500 max-h-[290px] overflow-y-auto pr-2">*/}
                {/*            <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">*/}
                {/*                "{testimonial.quote}"*/}
                {/*            </p>*/}
                {/*        </div>*/}

                {/*        <div className="mt-2 flex items-center justify-between border-t border-gray-700">*/}
                {/*            <div className="flex items-center justify-center gap-3 pt-3">*/}
                {/*                <Image*/}
                {/*                    className="h-14 w-14 rounded-full bg-gray-800"*/}
                {/*                    src={testimonial.profile}*/}
                {/*                    width={400}*/}
                {/*                    height={400}*/}
                {/*                    alt="profile"*/}
                {/*                    unoptimized*/}
                {/*                />*/}
                {/*                <div className="h-10 w-10 rounded-full bg-gray-300"></div>*/}
                {/*                <div>*/}
                {/*                    <p className="font-medium text-white">*/}
                {/*                        {testimonial.author}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm text-gray-400">{testimonial.role}</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <button*/}
                {/*                className="mt-3 rounded-md bg-gray-500 px-4 py-1 text-sm text-white transition hover:bg-gray-600">*/}
                {/*                Logo*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}



                {testimonials.map((testimonial, index) => (
                    <div key={index} className="group inline-block relative my-3 rounded-xl border cursor-default border-slate-200 dark:border-slate-800 p-1">
                        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />

                        <div className="relative overflow-hidden rounded-xl p-6">
                            <div className="scrollbar-thin scrollbar-thumb-gray-500 max-h-[290px] overflow-y-auto pr-2">
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                                    "{testimonial?.quote}"
                                </p>
                            </div>

                            <div
                                className="mt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3">
                                <div className="flex items-center justify-center gap-3">
                                    {testimonial?.profile ? (
                                        <Image
                                            className="h-14 w-14 rounded-full bg-gray-800"
                                            src={testimonial?.profile}
                                            width={400}
                                            height={400}
                                            alt="profile"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-500 text-white text-2xl font-semibold">
                                            {testimonial?.author.charAt(0)}
                                        </div>
                                    )}

                                    {/*<div className="h-10 w-10 rounded-full bg-gray-300"></div>*/}
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {testimonial?.author}
                                        </p>
                                        <p className="text-sm text-slate-700 dark:text-slate-400">
                                            {testimonial?.role}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="rounded-md bg-slate-200 dark:bg-slate-700 px-4 py-1 text-sm text-slate-900 dark:text-white transition hover:bg-slate-300 dark:hover:bg-slate-600">
                                    {testimonial?.logo ? (
                                            // <Image
                                            //     className="h-6 w-6 object-cover"
                                            //     src={testimonial.profile}
                                            //     width={400}
                                            //     height={400}
                                            //     alt="profile"
                                            //     unoptimized
                                            // />
                                        <img src={testimonial?.logo} alt="Logo" className="h-6 w-6 object-contain"/>
                                    ) : (
                                        "Logo"
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

