// ScrollerComponent.jsx
import { useEffect } from 'react';
import './scroller.css'; // custom CSS

export default function TextScrollerComponent({className = ""}) {
    useEffect(() => {
        const scrollers = document.querySelectorAll('.scroller');

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', true);
                const scrollerInner = scroller.querySelector('.scroller__inner');
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicate = item.cloneNode(true);
                    duplicate.setAttribute('aria-hidden', true);
                    scrollerInner.appendChild(duplicate);
                });
            });
        }
    }, []);

    return (
        <div className={className + " space-y-12 w-full mx-auto p-6 flex flex-col items-center"}>
            <div className="scroller w-full" data-speed="fast">
                <ul className="tag-list scroller__inner">
                    <li>Webdev</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JS</li>
                    <li>SQL</li>
                    <li>PHP</li>
                    <li>C</li>
                    <li>Python</li>
                    <li>React</li>
                    <li>Angular</li>
                    <li>Flutter</li>
                    <li>Git</li>
                    <li>UI/UX</li>
                    <li>Figma</li>
                </ul>
            </div>
        </div>
    );
};
