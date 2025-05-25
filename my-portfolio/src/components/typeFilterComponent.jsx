import axios from "axios";
import { useState, useEffect } from "react"
import api from '../api/api.jsx';

export default function TypeFilterComponent({filterType, onFilter, onClear}) {

    const [type, setType] = useState([]);

    const fetchType = () => {
        axios.get(api.getPortfolioType)
            .then(res => {
                console.log("Fetched type data: ", res.data);
                setType(res.data);
            })
            .catch(err => {
                console.error("Error fetching type data:", err);
            })
    };

    useEffect(() => {
        fetchType();
    }, []);

    return (
        <div className="flex gap-2 mb-4">
            <select
                id="select"
                value={filterType}
                onChange={onFilter}
                className="p-2 border rounded"
            >
                <option value="">Select a type</option>
                {type.map((item, index) => (
                    <option key={index} value={item.id}>{item.title}</option>
                ))}
            </select>
        </div>
    )
}