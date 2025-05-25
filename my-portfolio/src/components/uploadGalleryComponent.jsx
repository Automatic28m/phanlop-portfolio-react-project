import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../api/api.jsx';

export default function UploadGallery({ portfolioId }) {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (files.length > 0 && portfolioId) {
            handleAutoSubmit();
        }
    }, [files, portfolioId]);

    const handleAutoSubmit = async () => {
        const formData = new FormData();
        files.forEach(file => formData.append("images", file));

        try {
            const res = await axios.post(`${api.uploadGallery}/${portfolioId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log("Gallery uploaded:", res.data);

            // Optional: navigate or notify user here
            navigate('/displayPortfolio');
        } catch (err) {
            console.error("Gallery upload failed:", err);
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={e => setFiles([...e.target.files])}
            />
        </div>
    );
}
