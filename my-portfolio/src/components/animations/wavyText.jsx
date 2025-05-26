import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef, useState } from "react"

export default function WavyText({ children, className = "" }) {
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return;

            const { chars } = splitText(
                containerRef.current.querySelector(".wavy")
            );
            setVisible(true);

            const staggerDelay = 0.15;

            animate(
                chars,
                { y: [-8, 8] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    duration: 2,
                    delay: stagger(
                        staggerDelay,
                        { startDelay: -staggerDelay * chars.length }
                    ),
                }
            );
        });
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ visibility: visible ? "visible" : "hidden" }}
        >
            <span className={`wavy ${className}`}>{children}</span>
            <style>{`
                .split-char {
                    will-change: transform, opacity;
                    background-clip: inherit;
                    -webkit-background-clip: inherit;
                    color: inherit;
                }
            `}</style>
        </div>
    );
}