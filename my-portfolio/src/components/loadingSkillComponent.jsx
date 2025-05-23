import { useState } from 'react';
export default function LoadingSkillComponent() {

    return (
        <section id='skills' className="px-6 py-16 bg-gray-100 animate-pulse">
            <div class="col-span-2 h-2 mb-8">
                <span className="h-2 rounded bg-gray-200"></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                {[...Array(9)].map((_, index) => (
                    <span key={index} className="h-2 rounded bg-gray-200 p-4"></span>
                ))}
            </div>
        </section>
    )
}

{/* <section id='skills' className="px-6 py-16 bg-gray-100">
    <h2 className="text-2xl font-semibold text-center mb-8">Skills & Experiences</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
        {skill.length > 0 && skill.map((item, index) => (
            <span key={index} className="bg-white p-4 rounded shadow">{item.title}</span>
        ))}
    </div>
</section> */}