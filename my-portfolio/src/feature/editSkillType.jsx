import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackendNavbar from '../components/backendNavbar.jsx';
import axios from 'axios';
import api from '../api/api.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ProcessingButtonComponent from '../components/processingButtonComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import skillTypeColors from "../utils/skillTypeColors.js";

export default function EditSkillType() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        axios.get(`${api.getSkillTypeById}/${id}`)
            .then(res => {
                console.log("Fetched skill types: ", res.data);
                const data = res.data;
                console.log(data);

                setName(data.name);
                setColor(data.color);
            })
            .catch(err => console.error("Error fetching skill types: ", err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchData();
        console.log("Fetching skill type with ID: ", id);
        console.log("name: ", name);
        console.log("color: ", color);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        console.log("Submitting skill type with ID: ", id);
        console.log("Name: ", name);
        console.log("Color: ", color);

        if (!name || !color) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            axios.put(`${api.updateSkillTypeById}/${id}`, {
                name: name,
                color: color
            })
            navigate('/manageSkillTypes');
        } catch (error) {
            console.error("Error updating skill type: ", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Edit Skill type</title>
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
                            <h2 className="text-2xl font-bold mb-6 text-center">Edit skill type</h2>

                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter skill type name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className='mb-4'>
                                <label className="block mb-1 font-semibold">Color</label>
                                <select
                                    id="colorSelect"
                                    name="colorSelect"
                                    onChange={(e) => setColor(e.target.value)}
                                    value={color}
                                    className="w-full p-2 border rounded"

                                >
                                    <option value="">Select color</option>
                                    {skillTypeColors.map(color => (
                                        <option
                                            key={color.value}
                                            value={color.value}
                                            className={`bg-${color.value}-100 text-${color.value}-900`}
                                        >
                                            {color.label}
                                        </option>
                                    ))}
                                </select>
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
        </>
    )
}
