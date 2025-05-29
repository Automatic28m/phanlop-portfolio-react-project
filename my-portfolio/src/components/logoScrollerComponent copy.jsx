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

    const folder = "./LogoImages/";

    const languages = [
        { url: "React.png" },
        { url: "python.png" },
        { url: "angular.png" },
        { url: "flutter-icon.png" },
        { url: "express.png" },
        { url: "node-js.png" },
        { url: "C_Logo.png" },
        { url: "html.png" },
        { url: "css.png" },
        { url: "javascript.png" },
        { url: "php.png" },
        { url: "mysql.png" },
        { url: "figma.png" },
    ];

    return (
        <div className="max-w-screen mx-auto p-6 flex flex-col items-center">
            <div className="scroller w-screen" data-direction="right" data-speed="slow">
                <div className="scroller__inner ">
                    {languages.map((lang, index) => (
                        <img
                            key={index}
                            src={`${folder}${lang.url}`}
                            alt={lang.name}
                            // crossOrigin="anonymous"
                            className="rounded w-24 h-24 object-contain bg-transparent p-2 mix-blend-multiply grayscale hover:grayscale-0 transition duration-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoScrollerComponent;
