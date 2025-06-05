import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BackendNavbar from "../components/backendNavbar.jsx";
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api.jsx';
import { Helmet } from "react-helmet";
import ProcessingButtonComponent from "../components/processingButtonComponent.jsx";

export default function EditPortfolio() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [event_location, setEventLocation] = useState('');
    const [event_date, setEventDate] = useState(null);
    const [portfolio_type_id, setPortfolioTypeId] = useState('');
    const [portfolioType, setPortfolioType] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);  // To store selected image
    const [currentThumbnail, setCurrentThumbnail] = useState('');  // To display current image
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
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

    const fetchPortfolio = () => {
        axios.get(api.getPortfolioType)
            .then(res => {
                console.log("Fetched portfolio type data:", res.data);
                setPortfolioType(res.data);
            })
            .catch(err => console.error("Error fetching education data:", err));
    }

    const fetchSkillTypesByPortfolioId = () => {
        axios.get(`${api.getSkillTypeByPortfolioId}/${id}`)
            .then(res => {
                console.log("Fetched skill types by portfolio ID:", res.data);
                setSelectedSkillTypes(res.data.map(skill => skill.id));
            })
            .catch(err => console.error("Error fetching skill types by portfolio ID:", err));
    };          

    const fetchPortfolioById = () => {
        axios.get(`${api.getPortfolioById}/${id}`)
            .then(res => {
                console.log("Portfolio id :", res.data[0].id);
                console.log("Fetched portfolio:", res.data);

                const data = res.data[0];

                setTitle(data.title);
                setContents(data.contents);
                setEventLocation(data.event_location);
                setEventDate(data.event_date ? new Date(data.event_date) : null);
                setCurrentThumbnail(data.thumbnail);  // Store the current image path
                setPortfolioTypeId(data.portfolio_type_id);
            })
            .catch(err => console.error("Error fetching data:", err))
            .finally(() => {
                setLoading(false);  // stop loading
            }
            );
    };

    useEffect(() => {
        fetchSkillTypes();
        fetchPortfolio();
        fetchSkillTypesByPortfolioId();
    }, []);

    useEffect(() => {
        console.log("Selected skill types:", selectedSkillTypes);
    }, [selectedSkillTypes]);

    // Fetch portfolio data
    useEffect(() => {
        setLoading(true);  // start loading
        fetchPortfolioById();
    }, [id]);

    const handleImageChange = (e) => {
        setThumbnail(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);  // start loading

        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('event_location', event_location);
        formData.append('event_date', event_date.toISOString().split('T')[0]); // Convert date to string
        formData.append('portfolio_type_id', portfolio_type_id);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            await axios.post(`${api.updatePortfolioById}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // If skill types are selected, send them to the backend
            if (selectedSkillTypes.length > 0) {
                await axios.post(`${api.addSkillTypeToPortfolio}`, {
                    portfolio_id: id,
                    skill_type_ids: selectedSkillTypes,
                });
            }

            navigate('/displayPortfolio');
        } catch (err) {
            console.error("Error updating portfolio:", err);
        } finally {
            setSaving(false);  // stop loading
        }
    };


    return (
        <div>
            <Helmet>
                <title>Edit Portfolio</title>
            </Helmet>
            {loading ? (
                <>
                    <div className="flex flex-cols items-center justify-center min-h-screen bg-gray-100 pt-24 py-16">
                        <p>Loading...</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 py-16">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" enctype="multipart/form-data">
                            <h2 className="text-2xl font-bold mb-6 text-center">Edit portfolio</h2>

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
                                // required
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
                                <label className="block mb-1 font-semibold">Upload New Thumbnail (Optional)</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <label className="mt-4 block mb-1 font-semibold">Current image</label>
                                {currentThumbnail && (
                                    <div className="">
                                        <img
                                            src={`${currentThumbnail}`}
                                            alt="Current Thumbnail"
                                            className="w-full max-w-xs rounded"
                                        />
                                    </div>
                                )}
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

                            {saving ? (
                                <ProcessingButtonComponent />
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            )}
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};