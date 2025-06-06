import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Github, Instagram } from "lucide-react";
import Navbar from "../components/navbar";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import LoadingCard from "../components/loadingCardComponent.jsx";
import LoadingSkillComponent from "../components/loadingSkillComponent.jsx";
import api from "../api/api.jsx";
import { Helmet } from "react-helmet";
import FadeInOnView from "../components/animations/fadeInOnView.jsx";
import { Typewriter } from "../components/animations/typeWriter.jsx";
import TextScrollerComponent from "../components/textScrollerComponent.jsx";
import LogoScrollerComponent from "../components/logoScrollerComponent copy.jsx";
import Footer from "../components/footer.jsx";
import PortfolioCard from "../components/portfolioCard.jsx";

export default function Portfolio() {
  const [skill, setSkill] = useState([]);
  const [project, setProject] = useState([]);
  const [acheivement, setAcheivement] = useState([]);
  const [internship, setInternship] = useState([]);
  const [activity, setActivity] = useState([]);
  const [education, setEducation] = useState([]);

  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [loadingInternships, setLoadingInternships] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [loadingEducation, setLoadingEducation] = useState(true);

  const fetchSkills = () => {
    axios
      .get(api.getSkills) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched skills data:", res.data); // 👈 logs to browser console
        setSkill(res.data);
      })
      .catch((err) => console.error("Error fetching skills data:", err))
      .finally(() => setLoadingSkills(false));
  };

  const fetchProjects = () => {
    axios
      .get(api.getProjects) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched projects data:", res.data); // 👈 logs to browser console
        setProject(res.data);
      })
      .catch((err) => console.error("Error fetching projects data:", err))
      .finally(() => setLoadingProjects(false));
  };

  const fetchAchievements = () => {
    axios
      .get(api.getAcheivements) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched Acheivements data:", res.data); // 👈 logs to browser console
        setAcheivement(res.data);
      })
      .catch((err) => console.error("Error fetching Acheivements data:", err))
      .finally(() => setLoadingAchievements(false));
  };

  const fetchInternships = () => {
    axios
      .get(api.getInternships) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched internships data:", res.data); // 👈 logs to browser console
        setInternship(res.data);
      })
      .catch((err) => console.error("Error fetching internships data:", err))
      .finally(() => setLoadingInternships(false));
  };

  const fetchActivities = () => {
    axios
      .get(api.getActivities) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched activities data:", res.data); // 👈 logs to browser console
        setActivity(res.data);
      })
      .catch((err) => console.error("Error fetching activities data:", err))
      .finally(() => setLoadingActivities(false));
  };

  const fetchEducations = () => {
    axios
      .get(api.getEducations) // adjust endpoint as needed
      .then((res) => {
        console.log("Fetched education data:", res.data); // 👈 logs to browser console
        setEducation(res.data);
      })
      .catch((err) => console.error("Error fetching education data:", err))
      .finally(() => setLoadingEducation(false));
  };

  useEffect(() => {
    fetchSkills();
    fetchProjects();
    fetchAchievements();
    fetchInternships();
    fetchActivities();
    fetchEducations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Phanlop's Portfolio</title>
      </Helmet>
      <Navbar></Navbar>
      <main className="pt-16 min-h-screen bg-gray-50/50 text-gray-800 font-sans">
        {/* Hero Section */}
        <section
          id="hero"
          className="flex flex-col-reverse sm:flex-row bg-cover bg-fixed bg-[url('./images/bg2.jpg')] object-cover text-gray overflow-hidden"
        >
          {/* Image */}
          <FadeInOnView duration={0.5}>
            <div className="">
              <img
                src="/images/profile2.png"
                alt="Profile"
                className="w-[700px] md:w-[700px] h-full object-cover ease-in-out transition duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </FadeInOnView>
          {/* Content */}
          <div className="flex flex-col gap-y-5 pt-16 sm:p-0 justify-center align-center text-left px-6">
            <FadeInOnView
              className="bg-gradient-to-r from-blue-800 to-sky-500 bg-clip-text text-transparent"
              duration={1}
            >
              <Typewriter
                text="Hi, I'm Phanlop Boonluea"
                className="text-6xl font-bold mb-2 font-durer"
                staggerChildren={0.1}
              />
              {/* <h1 className="text-6xl font-bold mb-2 font-durer">Hi, I'm Phanlop Boonluea</h1> */}
            </FadeInOnView>
            <FadeInOnView duration={1.5}>
              <Typewriter
                text="Computer Engineering Student"
                className="text-lg mb-4 text-gray-600"
                staggerChildren={0.1}
              />
            </FadeInOnView>
            <div className="flex justify-left gap-4 text-gray-600">
              <FadeInOnView duration={2}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:phanlop.auto@gmail.com"
                  className="hover:text-white transition"
                >
                  <Mail />
                </a>
              </FadeInOnView>
              <FadeInOnView duration={2.5}>
                <a
                  target="lank"
                  rel="noopener noreferrer"
                  href="https://github.com/Automatic28m"
                  className="hover:text-white transition"
                >
                  <Github />
                </a>
              </FadeInOnView>
              <FadeInOnView duration={3}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/automatic.pb/"
                  className="hover:text-white transition"
                >
                  <Instagram />
                </a>
              </FadeInOnView>
            </div>
          </div>
        </section>

        <TextScrollerComponent className="bg-gray-100"></TextScrollerComponent>

        {/* About Me */}
        <section
          id="about"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 max-w-3xl mx-auto"
        >
          <section className="flex flex-col justify-center pt-16 sm:pt-0">
            <h2 className="text-3xl font-semibold mb-4 font-durer text-left">
              About Me
            </h2>
            <p className="text-left">
              <Typewriter text="I'm a passionate student developer who loves building user-friendly web apps. I'm currently studying at RMUTT University in Thailand and enjoy exploring new technology." />
            </p>
          </section>

          <FadeInOnView>
            <section
              id="quote"
              className="px-6 pt-8 max-w-3xl mx-auto flex justify-center z-0 "
            >
              <div className="max-w-md flex justify-center items-center w-full h-96 overflow-hidden relative">
                <img
                  src="/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector.png"
                  alt="Smartphone"
                  className="object-cover object-top w-full h-full"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 text-center px-8 font-durer text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent">
                  Let's know me better through my portfolio!
                </div>
              </div>
            </section>
          </FadeInOnView>
        </section>

        {/* my story */}
        <div className="bg-gray-100 py-16">
          <section
            id="my-story"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 max-w-3xl mx-auto"
          >
            <section>
              <img
                src="/images/IMG_9479 2.JPG"
                alt="My Story"
                className="w-full h-full object-cover rounded shadow"
              />
            </section>
            <section className="flex flex-col gap-2 justify-center">
              <h2 className="text-3xl font-semibold mb-4 font-durer text-left">
                My Story
              </h2>
              <p
                className="text-left text-sm text-pretty"
                style={{ textAlign: "justify" }}
              >
                Hi, I'm Phanlop Boonluea, a Computer Engineering student
                at&nbsp;
                <a
                  href="https://www.rmutt.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Rajamangala University of Technology Thanyaburi (RMUTT).
                </a>
                &nbsp; Originally from Chonburi, Thailand, I’m now based in
                Pathum Thani for my studies.
                <br />
                <br />
                My journey into the world of programming began back in 2019,
                when I enrolled in the Information Technology program at &nbsp;
                <a
                  href="http://www.tatc.ac.th/?usid=20100887&language=Th "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Thai-Austrian Technical College
                </a>
                . That decision sparked a passion in me. I found myself diving
                deep into code, competing in various contests, and discovering
                that not only did I enjoy programming, but I was also pretty
                good at it. Each competition helped shape my confidence and
                direction.
                <br />
                <br />
                In 2024, I took a bold step and chose to pursue Computer
                Engineering, a field that combines both hardware and software
                disciplines. Transitioning into this field was a
                challenge, especially the math-heavy courses I hadn’t encountered
                much before. But I was determined. I doubled down on my studies,
                stayed focused in class, and pushed myself to adapt. That hard
                work paid off. I finished my first year with pride and progress.
                <br />
                <br />
                Now, I’m channeling my energy into building real-world projects
                and gaining hands-on experience. My goal is simple but powerful:
                to grow into a skilled engineer who not only solves problems but
                also builds meaningful solutions. Everything I do now is a step
                toward that dream.
              </p>
            </section>
          </section>
        </div>

        {/* Skills */}
        <section
          id="skills"
          className="px-6 py-16 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed z-50"
        >
          {loadingSkills ? (
            <LoadingSkillComponent></LoadingSkillComponent>
          ) : (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 font-durer text-center">
                Tech Stacks
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                {skill.length > 0 &&
                  skill.map((item, index) => (
                    <span
                      key={index}
                      className="bg-white p-4 rounded shadow hover:text-blue-500 duration-700 transition"
                    >
                      {item.title}
                    </span>
                  ))}
              </div>
              <LogoScrollerComponent></LogoScrollerComponent>
            </div>
          )}
        </section>

        {/* <div className="col-span-2 grid grid-cols-2 gap-2 overflow-hidden h-[500px]"> */}

        {/* Scroll Up */}
        {/* <div className="overflow-hidden h-full">
            <div className="animate-scrollUp">
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img src="/images/pollanswer/image (6).png" className="shadow-md" />
                    <img src="/images/pollanswer/image (5).png" className="shadow-md" />
                    <img src="/images/pollanswer/image (4).png" className="shadow-md" />
                    <img src="/images/pollanswer/image (3).png" className="shadow-md" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div> */}

        {/* // Scroll Down */}
        {/* <div className="overflow-hidden h-full">
            <div className="animate-scrollDown">
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img src="/images/pollanswer/image (1).png" className="shadow-md" />
                    <img src="/images/pollanswer/image (2).png" className="shadow-md" />
                    <img src="/images/pollanswer/image (3).png" className="shadow-md" />
                    <img src="/images/pollanswer/image.png" className="shadow-md" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div> */}

        {/* </div> */}

        {/* Projects */}
        <section id="projects" className="px-6 py-16 max-w-5xl mx-auto">
          {loadingProjects ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">
                  Projects
                </h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2">
                {project.length > 0 &&
                  project.map((item, index) => (
                    <PortfolioCard item={item} index={index} key={index} />
                  ))}
              </div>
            </>
          )}
        </section>

        {/* Achievements */}
        <section
          id="achievements"
          className="px-6 py-16 bg-gray-100 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed"
        >
          {loadingAchievements ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">
                  Achievements
                </h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {acheivement.length > 0 &&
                  acheivement.map((item, index) => (
                    <PortfolioCard item={item} index={index} key={index} />
                  ))}
              </div>
            </>
          )}
        </section>

        {/* Internship Experiences */}
        <section id="internships" className="px-6 py-16 px-6 py-16 ">
          {loadingInternships ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">
                  Internship Experiences
                </h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {internship.length > 0 &&
                  internship.map((item, index) => (
                    <PortfolioCard item={item} index={index} key={index} />
                  ))}
              </div>
            </>
          )}
        </section>

        {/* Academic Activities */}
        <section
          id="activities"
          className="px-6 py-16 bg-gray-100 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed"
        >
          {loadingActivities ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">
                  Academic Activities
                </h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {activity.length > 0 &&
                  activity.map((item, index) => (
                    <PortfolioCard item={item} index={index} key={index} />
                  ))}
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section id="education" className="px-6 py-16 bg-gray-100">
          {loadingEducation ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">
                  Education
                </h2>
              </FadeInOnView>
              <ul className="max-w-2xl mx-auto space-y-4">
                {education.length > 0 &&
                  education.map((item, index) => (
                    <FadeInOnView>
                      <li key={index}>
                        <div className="bg-white p-4 rounded shadow">
                          <h3 className="font-bold">{item.title}</h3>
                          <h3 className="font-bold">{item.contents}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(item.event_date).getFullYear()}
                          </p>
                        </div>
                      </li>
                    </FadeInOnView>
                  ))}
              </ul>
            </>
          )}
        </section>

        {/* Contact */}
        <Footer></Footer>
      </main>
    </div>
  );
}
