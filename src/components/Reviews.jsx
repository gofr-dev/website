import Image from "next/image";
import React from "react";
import testimonials from 'utils/testimonials.json'


export default function Testimonials() {
    return (
        <div className="mx-10 bg-[#101827]">
            {/*<h2 className="text-center text-lg font-semibold leading-8 text-white mb-10">*/}
            {/*    User Testimonials*/}
            {/*</h2>*/}
            <div className="md:columns-3">
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
                                    className="rounded-md">
                                    {/*className="rounded-md bg-slate-200 dark:bg-slate-700 px-4 py-1 text-sm text-slate-900 dark:text-white transition hover:bg-slate-300 dark:hover:bg-slate-600">*/}
                                    {testimonial?.logo ? (
                                        <img src={testimonial?.logo} alt="Logo" className="h-6 w-6 object-contain"/>
                                    ) : (
                                        ''
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

