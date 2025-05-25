import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import api from '../api/api.jsx';
import { Helmet } from 'react-helmet';


export default function Portfolio() {

    const [data, setData] = useState(null);
    const { id } = useParams();
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        axios.get(`${api.getPortfolioById}/${id}`)
            .then(res =>
                setData(res.data[0]),
            )
            .catch(error => console.error('Error fetching detail: ', error));

        axios.get(`${api.getGalleryByPortfolioId}/${id}`)
            .then(res =>
                setGallery(res.data),
            )
            .catch(error => console.error('Error fetching gallery: ', error));
    }, [id]);

    useEffect(() => {
        console.log(data)
        console.log(gallery);

    }, [data]);

    if (!data) return <div className='p-6'>Loading...</div>;

    return (
        <div>
            <Helmet>
                <title>Phanlop's Portfolio</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="pt-24 max-w-3xl mx-auto p-6">
                <img src={`${data.thumbnail}`} alt="Thumbnail" className="w-full object-cover rounded mb-4 shadow" />
                <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                <p className="text-gray-700 whitespace-pre-line">{data.contents}</p>
                <p className='text-sm font-bold'>At {data.event_location}, {data.event_date}</p>
                <div className="mt-4">
                    <h2 className='mb-4 text-md font-bold'>Gallery</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {gallery.length > 0 && gallery.map((item, index) => (
                            <LightGallery
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}
                                key={index}
                            >
                                <a
                                    className="gallery-item"
                                    data-src={`${item.img}`}
                                >
                                    <img src={`${item.img}`} className="w-full h-48 object-cover rounded mb-2 shadow" />
                                </a>
                            </LightGallery>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}