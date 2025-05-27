// ScrollerComponent.jsx
import { useEffect } from 'react';
import './scroller.css'; // custom CSS

const LogoScrollerComponent = () => {
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

    const languages = [
        { name: "React", url: "https://react.dev/" },
        { name: "Python", url: "python.org" },
        { name: "Angular", url: "https://angular.dev/" },
        { name: "Flutter", url: "https://flutter.dev/" },
        { name: "Express", url: "https://expressjs.com/" },
        { name: "Node.js", url: "nodejs.org" },
    ];

    return (
        <div className="max-w-screen mx-auto p-6 flex flex-col items-center">
            <div className="scroller w-screen" data-direction="right" data-speed="slow">
                <div className="scroller__inner ">
                    {languages.map((lang, index) => (
                        <img
                            key={index}
                            src={`https://api.enrich.so/v1/api/search-logo?url=${lang.url}`}
                            alt={lang.name}
                            crossOrigin="anonymous"
                            className="rounded w-24 h-24 object-contain bg-transparent p-2 mix-blend-multiply"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoScrollerComponent;
