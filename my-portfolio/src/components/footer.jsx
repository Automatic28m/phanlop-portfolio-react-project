import FadeInOnView from "./animations/fadeInOnView";
import { Mail, Github, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <section id='contact' className="px-6 py-16 text-center bg-[url('./images/bg1.jpg')] bg-cover bg-fixed bottom-0 left-0 right-0 mt-auto">
            <h2 className="text-2xl font-semibold mb-4 font-durer">Get In Touch</h2>
            <p className="mb-4 text-gray-600">Feel free to reach out if you'd like to collaborate or just say hi!</p>
            <div className="flex justify-center gap-4 text-gray-600">
                <FadeInOnView duration={2}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:phanlop.auto@gmail.com"
                        className='hover:text-white transition'
                    >
                        <Mail />
                    </a>
                </FadeInOnView>
                <FadeInOnView duration={2.5}>
                    <a
                        target="lank"
                        rel="noopener noreferrer"
                        href="https://github.com/Automatic28m"
                        className='hover:text-white transition'
                    >
                        <Github />
                    </a>
                </FadeInOnView>
                <FadeInOnView duration={3}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/automatic.pb/"
                        className='hover:text-white transition'
                    >
                        <Instagram />
                    </a>
                </FadeInOnView>
            </div>
        </section>
    )
}