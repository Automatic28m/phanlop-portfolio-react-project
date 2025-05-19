import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BackendNavbar from "../components/backendNavbar.jsx";
import { useNavigate, useParams } from 'react-router-dom'
import Portfolio from "./home.jsx";

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


    useEffect(() => {
        axios.get("https://phanlop-portfolio-react-project.onrender.com/getPortfolioType")
            .then(res => {
                console.log("Fetched portfolio type data:", res.data);
                setPortfolioType(res.data);
            })
            .catch(err => console.error("Error fetching education data:", err));
    }, []);

    // Fetch portfolio data
    useEffect(() => {
        axios.get(`https://phanlop-portfolio-react-project.onrender.com/getPortfolioById/${id}`)
            .then(res => {
                console.log("Fetched portfolio:", res.data);
                const data = res.data[0];

                setTitle(data.title);
                setContents(data.contents);
                setEventLocation(data.event_location);
                setEventDate(data.event_date ? new Date(data.event_date) : null);
                setCurrentThumbnail(data.thumbnail);  // Store the current image path
                setPortfolioTypeId(data.portfolio_type_id);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, [id]);

    const handleImageChange = (e) => {
        setThumbnail(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('event_location', event_location);
        formData.append('event_date', event_date.toISOString()); // Convert date to string
        formData.append('portfolio_type_id', portfolio_type_id);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            await axios.post(`https://phanlop-portfolio-react-project.onrender.com/updatePortfolioById/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/displayPortfolio');
        } catch (err) {
            console.error("Error updating portfolio:", err);
        }
    };


    return (
        <div>
            <BackendNavbar></BackendNavbar>
            <div className="flex items-center justify-center h-screen bg-gray-100">
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
                            required
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
                        {currentThumbnail && (
                            <div className="mt-4">
                                <img
                                    src={`https://phanlop-portfolio-react-project.onrender.com/${currentThumbnail}`}
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

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};