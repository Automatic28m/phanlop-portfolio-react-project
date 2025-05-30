import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import FadeInOnView from "../components/animations/fadeInOnView.jsx";
import LightGallery from 'lightgallery/react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PortfolioCard({ item, index }) {

    const navigate = useNavigate();
    const [skillTypes, setSkillTypes] = useState([]);
    const handleReadMore = () => {
        navigate(`/portfolio/${item.id}`);
    };

    const fetchSkillTypesByPortfolioId = async (portfolioId) => {
        axios.get(`${api.getSkillTypeByPortfolioId}/${portfolioId}`)
            .then(res => {
                setSkillTypes(res.data);
            })
            .catch(err => {
                console.error("Error fetching skill types:", err);
            })
    }

    useEffect(() => {
        fetchSkillTypesByPortfolioId(item.id);
    }, [item.id]);

    return (
        <FadeInOnView className="bg-white rounded shadow" key={index}>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <LightGallery
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                    >
                        <a
                            className="gallery-item cursor-zoom-in"
                            data-src={`${item.thumbnail}`}
                        >
                            <img src={`${item.thumbnail}`} className="object-cover rounded-t aspect-[16/9] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rounded" />
                        </a>
                    </LightGallery>
                    <div id="content-container" className='p-4'>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm">{item.contents}</p>
                        <p className='text-sm font-bold'>At {item.event_location}, {item.event_date}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skillTypes.map((skillType, idx) => (
                                <span key={idx} className={`px-2 py-1 text-xs rounded bg-${skillType.color}-100 text-${skillType.color}-900`}>
                                    {skillType.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={handleReadMore} className="flex flex-row gap-1 items-center p-4 text-left text-blue-500 hover:text-blue-800 cursor:pointer transition">
                    Read more <ArrowUpRight size={16} />
                </button>
            </div>
        </FadeInOnView>
    )
}