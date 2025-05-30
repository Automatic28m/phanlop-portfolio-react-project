import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackendNavbar from "../components/backendNavbar.jsx";
import { useNavigate } from "react-router-dom";
import UploadGallery from "../components/uploadGalleryComponent.jsx";
import api from '../api/api.jsx';
import { Helmet } from "react-helmet";
import ProcessingButtonComponent from "../components/processingButtonComponent.jsx";

export default function CreatePortfolio() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [event_location, setEventLocation] = useState('');
    const [event_date, setEventDate] = useState(null);
    const [portfolio_type_id, setPortfolioTypeId] = useState('');
    const [portfolioType, setPortfolioType] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSkillTypes, setSelectedSkillTypes] = useState([]);
    const [skillTypes, setSkillTypes] = useState([]);

    const fetchSkillTypes = () => {
        axios.get(api.getSkillTypes)
            .then(res => {
                console.log("Fetched skill types:", res.data);
                setSkillTypes(res.data);
            })
            .catch(err => console.error("Error fetching skill types:", err));
    };

    useEffect(() => {
        fetchSkillTypes();

        axios.get(api.getPortfolioType)
            .then((res) => {
                setPortfolioType(res.data);
            })
            .catch((err) => console.error("Error fetching portfolio types:", err));
    }, []);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // start loading


        const formattedDate = event_date ? event_date.toISOString().split('T')[0] : null;
        const formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("event_location", event_location);
        formData.append("event_date", formattedDate);
        formData.append("portfolio_type_id", portfolio_type_id);

        // Append thumbnail if selected
        const imageUpload = document.getElementById("imageUpload");
        if (imageUpload.files[0]) {
            formData.append("thumbnail", imageUpload.files[0]);
        }

        // Append gallery images
        for (let file of files) {
            formData.append("gallery_images", file);
        }

        try {
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            const res = await axios.post(api.createPortfolioAndGallery, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const id = res.data.portfolioId;

            if (id || selectedSkillTypes.length > 0) {
                await axios.post(`${api.addSkillTypeToPortfolio}`, {
                    portfolio_id: id,
                    skill_type_ids: selectedSkillTypes,
                });
            }

            console.log("Portfolio created successfully:", res.data);
            navigate('/displayPortfolio');
        } catch (err) {
            console.error("Error creating portfolio:", err);
        } finally {
            setLoading(false);  // stop loading
        }
    };

    return (
        <div>
            <Helmet>
                <title>Create new portfolio</title>
            </Helmet>
            <BackendNavbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 py-16">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" enctype="multipart/form-data">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Portfolio</h2>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Contents</label>
                        <textarea
                            value={contents}
                            onChange={(e) => setContents(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Event Location</label>
                        <input
                            type="text"
                            value={event_location}
                            onChange={(e) => setEventLocation(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Event Date</label>
                        <DatePicker
                            selected={event_date}
                            onChange={(date) => setEventDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border p-2 rounded w-full"
                            placeholderText="YYYY-MM-DD"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold" for="imageUpload">Upload an image thumbnail:</label>
                        <input className="w-full p-2 border rounded" type="file" id="imageUpload" name="imageUpload" accept="image/*" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold" for="galleryImages">Upload images to gallery:</label>
                        <input
                            className="w-full p-2 border rounded"
                            type="file"
                            name="gallery_images"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Portfolio Type</label>
                        <select
                            value={portfolio_type_id}
                            onChange={(e) => setPortfolioTypeId(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select a type</option>
                            {portfolioType.map((item, index) => (
                                <option key={index} value={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Skill Types (Optional)</label>
                        {skillTypes.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {skillTypes.map((skillType) => (
                                    <label
                                        key={skillType.id}
                                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded"
                                    >
                                        <input
                                            type="checkbox"
                                            value={skillType.id}
                                            checked={selectedSkillTypes.includes(skillType.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedSkillTypes([...selectedSkillTypes, skillType.id]);
                                                } else {
                                                    setSelectedSkillTypes(selectedSkillTypes.filter(id => id !== skillType.id));
                                                }
                                            }}
                                            className="accent-current"
                                        />
                                        <div className={`px-2 py-1 rounded bg-${skillType.color}-100 mr-2`}><span className={`text-${skillType.color}-900`}>{skillType.name}</span></div>

                                    </label>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {loading ? (
                        <ProcessingButtonComponent />
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Create
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
