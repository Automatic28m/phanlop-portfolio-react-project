import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Github, Instagram } from 'lucide-react';
import Navbar from '../components/navbar';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LoadingCard from "../components/loadingCardComponent.jsx";
import LoadingSkillComponent from '../components/loadingSkillComponent.jsx';
import api from '../api/api.jsx';
import { Helmet } from 'react-helmet';
import FadeInOnView from "../components/fadeInOnView.jsx";

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
    axios.get(api.getSkills)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched skills data:", res.data); // 👈 logs to browser console
        setSkill(res.data);
      })
      .catch(err => console.error("Error fetching skills data:", err))
      .finally(() => setLoadingSkills(false));
  };

  const fetchProjects = () => {
    axios.get(api.getProjects)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched projects data:", res.data); // 👈 logs to browser console
        setProject(res.data);
      })
      .catch(err => console.error("Error fetching projects data:", err))
      .finally(() => setLoadingProjects(false));
  };

  const fetchAchievements = () => {
    axios.get(api.getAcheivements)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched Acheivements data:", res.data); // 👈 logs to browser console
        setAcheivement(res.data);
      })
      .catch(err => console.error("Error fetching Acheivements data:", err))
      .finally(() => setLoadingAchievements(false));
  };

  const fetchInternships = () => {
    axios.get(api.getInternships)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched internships data:", res.data); // 👈 logs to browser console
        setInternship(res.data);
      })
      .catch(err => console.error("Error fetching internships data:", err))
      .finally(() => setLoadingInternships(false));
  };

  const fetchActivities = () => {
    axios.get(api.getActivities)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched activities data:", res.data); // 👈 logs to browser console
        setActivity(res.data);
      })
      .catch(err => console.error("Error fetching activities data:", err))
      .finally(() => setLoadingActivities(false));
  };

  const fetchEducations = () => {
    axios.get(api.getEducations)  // adjust endpoint as needed
      .then(res => {
        console.log("Fetched education data:", res.data); // 👈 logs to browser console
        setEducation(res.data);
      })
      .catch(err => console.error("Error fetching education data:", err))
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
    <div>
      <Helmet>
        <title>Phanlop's Portfolio</title>
      </Helmet>
      <Navbar></Navbar>
      <main className="pt-16 min-h-screen bg-gray-50/50 text-gray-800 font-sans">

        {/* Hero Section */}
        <section id='hero' className="py-20 bg-white text-center ">
          <div className="flex justify-center mb-6">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          </div>
          <div className='bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent'>
            <h1 className="text-5xl font-bold mb-2 font-durer">Hi, I'm Phanlop Boonluea</h1>
          </div>
          <p className="text-lg mb-4">Computer Engineering Student</p>
          <div className="flex justify-center gap-4 text-gray-600">
            <a target="_blank" rel="noopener noreferrer" href="mailto:phanlop.auto@gmail.com"><Mail /></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Automatic28m"><Github /></a>
            {/* <a href="https://linkedin.com/in/janedoe"><Linkedin /></a> */}
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/automatic.pb/"><Instagram /></a>
          </div>
        </section>

        {/* About Me */}
        <section id='about' className="px-6 py-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 font-durer text-center">About Me</h2>
          <p className='text-center'>
            I'm a passionate student developer who loves building user-friendly web apps. I'm currently studying at RMUTT University in Thailand and enjoy exploring new technology.
          </p>
        </section>

        {/* Skills */}
        <section id='skills' className="px-6 py-16 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed">
          {loadingSkills ? (
            <LoadingSkillComponent></LoadingSkillComponent>
          ) : (
            <div className='max-w-3xl mx-auto'>
              <h2 className="text-3xl font-semibold mb-8 font-durer text-center">Skills</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                {skill.length > 0 && skill.map((item, index) => (
                  <span key={index} className="bg-white p-4 rounded shadow hover:text-blue-500 duration-700 transition">{item.title}</span>
                ))}
              </div>
            </div>

          )}
        </section>

        {/* Projects */}
        <section id='projects' className="px-6 py-16 max-w-5xl mx-auto">
          {loadingProjects ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">Projects</h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2">
                {project.length > 0 && project.map((item, index) => (
                  <FadeInOnView className="bg-white rounded shadow transition hover:shadow-xl" key={index}>
                    <a href={`portfolio/${item.id}`} >
                      <LightGallery
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                      >
                        <a
                          className="gallery-item"
                          data-src={`${item.thumbnail}`}
                        >
                          <img src={`${item.thumbnail}`} className="w-full h-48 object-cover rounded-t mb-2" />
                        </a>
                      </LightGallery>
                      <div className='p-4'>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm">{item.contents}</p>
                        <p className='text-sm font-bold'>At {item.event_location}, {item.event_date}</p>
                      </div>
                    </a>
                  </FadeInOnView>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Achievements */}
        <section id='achievements' className="px-6 py-16 bg-gray-100 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed">
          {loadingAchievements ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">Achievements</h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {acheivement.length > 0 && acheivement.map((item, index) => (
                  <FadeInOnView className='bg-white rounded-lg shadow' key={index}>
                    <LightGallery
                      speed={500}
                      plugins={[lgThumbnail, lgZoom]}
                    >
                      <a
                        className="gallery-item"
                        data-src={`${item.thumbnail}`}
                      >
                        <img src={`${item.thumbnail}`} className="w-full h-48 object-cover rounded-t mb-2" />
                      </a>
                    </LightGallery>
                    <div className='p-4'>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm">{item.contents}</p>
                      <p className='text-sm font-bold'>At {item.event_location}, {item.event_date}</p>
                    </div>
                  </FadeInOnView>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Internship Experiences */}
        <section id='internships' className="px-6 py-16 px-6 py-16 ">
          {loadingInternships ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">Internship Experiences</h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {internship.length > 0 && internship.map((item, index) => (
                  <FadeInOnView className="bg-white rounded-lg shadow" key={index}>
                    <div>
                      <LightGallery
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                      >
                        <a
                          className="gallery-item"
                          data-src={`${item.thumbnail}`}
                        >
                          <img src={`${item.thumbnail}`} className="w-full h-48 object-cover rounded-t mb-2" />
                        </a>
                      </LightGallery>
                      <div className='p-4'>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm">{item.contents}</p>
                        <p className="text-sm text-gray-600">At {item.event_location}, {item.event_date}</p>
                      </div>
                    </div>
                  </FadeInOnView>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Academic Activities */}
        <section id='activities' className="px-6 py-16 bg-gray-100 bg-[url('./images/bg2.jpg')] bg-cover bg-fixed">
          {loadingActivities ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">Academic Activities</h2>
              </FadeInOnView>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {activity.length > 0 && activity.map((item, index) => (
                  <FadeInOnView className="bg-white rounded-lg shadow" key={index}>
                    <div>
                      <LightGallery
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                      >
                        <a
                          className="gallery-item"
                          data-src={`${item.thumbnail}`}
                        >
                          <img src={`${item.thumbnail}`} className="w-full h-48 object-cover rounded-t mb-2" />
                        </a>
                      </LightGallery>
                      <div className='p-4'>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm">{item.contents}</p>
                        <p className="text-sm text-gray-600">At {item.event_location}, {item.event_date}</p>
                      </div>
                    </div>
                  </FadeInOnView>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section id='education' className="px-6 py-16 bg-gray-100">
          {loadingEducation ? (
            <LoadingCard></LoadingCard>
          ) : (
            <>
              <FadeInOnView>
                <h2 className="text-3xl font-durer font-semibold text-center mb-8">Education</h2>
              </FadeInOnView>
              <ul className="max-w-2xl mx-auto space-y-4">
                {education.length > 0 && education.map((item, index) => (
                  <FadeInOnView>
                    <li key={index}>
                      <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{item.title}</h3>
                        <h3 className="font-bold">{item.contents}</h3>
                        <p className="text-sm text-gray-600">{new Date(item.event_date).getFullYear()}</p>
                      </div>
                    </li>
                  </FadeInOnView>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Contact */}
        <section id='contact' className="px-6 py-16 text-center bg-[url('./images/bg1.jpg')] bg-cover bg-fixed">
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="mb-4">Feel free to reach out if you'd like to collaborate or just say hi!</p>
          <a
            href="mailto:phanlop.auto@gmail.com"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Contact Me
          </a>
        </section>
      </main>
    </div >
  );
}
