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
import FadeInOnView from '../components/animations/fadeInOnView.jsx';
import Footer from '../components/footer.jsx';
import LoadingCardComponent from '../components/loadingCardComponent.jsx';
import LoadingPortfolioComponent from '../components/loadingPortfolioComponent.jsx';

export default function Portfolio() {

    const [data, setData] = useState(null);
    const { id } = useParams();
    const [gallery, setGallery] = useState([]);
    const [skillTypes, setSkillTypes] = useState([]);

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
        fetchSkillTypesByPortfolioId(id)
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (data === null) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <LoadingPortfolioComponent />
                <Footer />
            </div>
        )
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <Helmet>
                <title>Phanlop's Portfolio</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="px-6 pt-24 max-w-3xl mx-auto py-20">
                <FadeInOnView>
                    <img src={`${data.thumbnail}`} alt="Thumbnail" className="w-full object-cover rounded mb-4 shadow" />
                    <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                    <p className="text-gray-700 whitespace-pre-line mb-2">{data.contents}</p>
                    <p className='text-sm font-bold'>At {data.event_location}, {data.event_date}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skillTypes.map((skillType, idx) => (
                            <span key={idx} className={`px-2 py-1 text-xs rounded bg-${skillType.color}-100 text-${skillType.color}-900`}>
                                {skillType.name}
                            </span>
                        ))}
                    </div>
                </FadeInOnView>

                {/* Gallery */}
                {gallery.length === 0 ? (
                    <></>
                ) : (
                    <div className="mt-4">
                        <FadeInOnView>
                            <div className='my-6'>
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-semibold mr-4">Gallery</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <p className='text-gray-500 text-left text-xs'>Click to see full image</p>
                            </div>
                        </FadeInOnView>
                        <FadeInOnView>
                            <LightGallery
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}
                                thumbnail={true}
                                elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
                            >
                                {gallery.length > 0 && gallery.map((item, index) => (
                                    <a
                                        key={index}
                                        data-src={item.img}
                                    >
                                        <img
                                            src={item.img}
                                            className="w-full h-48 object-cover rounded shadow cursor-pointer"
                                        />
                                    </a>
                                ))}
                            </LightGallery>

                        </FadeInOnView>
                    </div>
                )}
            </div>
            <Footer></Footer>
        </div>
    )
}