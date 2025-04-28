import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BackendNavbar from "../components/backendNavbar.jsx";
import { useNavigate } from 'react-router-dom'

export default function CreatePortfolio() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [event_location, setEventLocation] = useState('');
    const [event_date, setEventDate] = useState(null);
    const [portfolio_type_id, setPortfolioTypeId] = useState('');
    const [portfolioType, setPortfolioType] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/getPortfolioType")
            .then(res => {
                console.log("Fetched portfolio type data:", res.data);
                setPortfolioType(res.data);
            })
            .catch(err => console.error("Error fetching education data:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formattedDate = event_date ? event_date.toISOString() : null;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("event_location", event_location);
        formData.append("event_date", formattedDate);
        formData.append("portfolio_type_id", portfolio_type_id);

        // Append the image file if selected
        const imageUpload = document.getElementById('imageUpload');
        if (imageUpload.files[0]) {
            formData.append("thumbnail", imageUpload.files[0]);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // Send the form data (including the image) to the backend
            await axios.post("http://localhost:8080/createPortfolio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                }
            });

            navigate('/displayPortfolio');
        } catch (err) {
            console.error("Error creating portfolio:", err);
        }
    };



    return (
        <div>
            <BackendNavbar></BackendNavbar>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" enctype="multipart/form-data">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create portfolio</h2>

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
                        // required
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
                        <input className="w-full p-2 border rounded" type="file" id="imageUpload" name="imageUpload" accept="image/*"></input>
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