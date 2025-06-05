import {
    BicepsFlexed,
    Building,
    Eye,
    GraduationCap,
    Image,
    Laugh,
    Loader,
    LoaderCircle,
    TrophyIcon,
    Workflow,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import DashboardSmallCard from "../components/dashboardSmallCard.jsx";
import api from "../api/api.jsx";
import axios from "axios";

function Dashboard() {
    const [skill, setSkill] = useState([]);
    const [project, setProject] = useState([]);
    const [achievement, setAcheivement] = useState([]);
    const [internship, setInternship] = useState([]);
    const [activity, setActivity] = useState([]);
    const [education, setEducation] = useState([]);
    const [thumbnailAmount, setThumbnailAmount] = useState(0);
    const [galleryAmount, setGalleryAmount] = useState(0);

    const [loadingSkills, setLoadingSkills] = useState(true);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingAchievements, setLoadingAchievements] = useState(true);
    const [loadingInternships, setLoadingInternships] = useState(true);
    const [loadingActivities, setLoadingActivities] = useState(true);
    const [loadingEducation, setLoadingEducation] = useState(true);
    const [loadingThumbnailAmount, setLoadingThumbnailAmount] = useState(true);
    const [loadingGalleryAmount, setLoadingGalleryAmount] = useState(true);

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
            .catch((err) =>
                console.error("Error fetching Acheivements data:", err)
            )
            .finally(() => setLoadingAchievements(false));
    };

    const fetchInternships = () => {
        axios
            .get(api.getInternships) // adjust endpoint as needed
            .then((res) => {
                console.log("Fetched internships data:", res.data); // 👈 logs to browser console
                setInternship(res.data);
            })
            .catch((err) =>
                console.error("Error fetching internships data:", err)
            )
            .finally(() => setLoadingInternships(false));
    };

    const fetchActivities = () => {
        axios
            .get(api.getActivities) // adjust endpoint as needed
            .then((res) => {
                console.log("Fetched activities data:", res.data); // 👈 logs to browser console
                setActivity(res.data);
            })
            .catch((err) =>
                console.error("Error fetching activities data:", err)
            )
            .finally(() => setLoadingActivities(false));
    };

    const fetchEducations = () => {
        axios
            .get(api.getEducations) // adjust endpoint as needed
            .then((res) => {
                console.log("Fetched education data:", res.data); // 👈 logs to browser console
                setEducation(res.data);
            })
            .catch((err) =>
                console.error("Error fetching education data:", err)
            )
            .finally(() => setLoadingEducation(false));
    };

    const fetchThumbnailAmount = () => {
        const folder_name = "portfolio_thumbnails";

        axios
            .get(`${api.getImageCountByFolder}/${folder_name}`)
            .then((res) => {
                console.log("Thumbnail images amount : ", res.data);
                setThumbnailAmount(res.data.imageCount);
            })
            .catch((error) =>
                console.error("Error fetching thumbnail amount: ", error)
            )
            .finally(() => setLoadingThumbnailAmount(false));
    };

    const fetchGalleryAmount = () => {
        const folder_name = "portfolio_galleries";

        axios
            .get(`${api.getImageCountByFolder}/${folder_name}`)
            .then((res) => {
                console.log("Gallery images amount : ", res.data);
                setGalleryAmount(res.data.imageCount);
            })
            .catch((error) =>
                console.error("Error fetching gallery amount: ", error)
            )
            .finally(() => setLoadingGalleryAmount(false));
    };

    useEffect(() => {
        fetchThumbnailAmount();
        fetchGalleryAmount();
        fetchSkills();
        fetchProjects();
        fetchAchievements();
        fetchInternships();
        fetchActivities();
        fetchEducations();
    }, []);

    return (
        <div className="min-h-screen flex">
            <div className="max-w-5xl mx-auto py-16 flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <DashboardSmallCard
                        icon={<Eye size={30} />}
                        bg_color="blue"
                        title="Total Visitors"
                        number="100,000"
                        col_span={2}
                    />
                    <DashboardSmallCard
                        icon={<BicepsFlexed size={30} />}
                        bg_color="violet"
                        title="Skills"
                        number={skill.length}
                        isLoading={loadingSkills}
                    />
                    <DashboardSmallCard
                        icon={<Workflow size={30} />}
                        bg_color="green"
                        title="Projects"
                        number={project.length}
                        isLoading={loadingProjects}
                    />
                    <DashboardSmallCard
                        icon={<TrophyIcon size={30} />}
                        bg_color="red"
                        title="Archievements"
                        number={achievement.length}
                        isLoading={loadingAchievements}
                    />
                    <DashboardSmallCard
                        icon={<Building size={30} />}
                        bg_color="yellow"
                        title="Internship"
                        number={internship.length}
                        isLoading={loadingInternships}
                    />
                    <DashboardSmallCard
                        icon={<Laugh size={30} />}
                        bg_color="lime"
                        title="Activities"
                        number={activity.length}
                        isLoading={loadingActivities}
                    />
                    <DashboardSmallCard
                        icon={<GraduationCap size={30} />}
                        bg_color="cyan"
                        title="Educations"
                        number={education.length}
                        isLoading={loadingEducation}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <DashboardSmallCard
                        icon={<Image size={30} />}
                        bg_color="sky"
                        title="Total thumbnail images"
                        number={thumbnailAmount}
                        isLoading={loadingThumbnailAmount}
                    />
                    <DashboardSmallCard
                        icon={<Image size={30} />}
                        bg_color="amber"
                        title="Total gallery images"
                        number={galleryAmount}
                        isLoading={loadingGalleryAmount}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
