import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import api from '../api/api.jsx';
import axios from "axios";
import DataTable from "react-data-table-component";
import TypeFilterComponent from '../components/typeFilterComponent.jsx';
import FilterComponent from '../components/filterComponent.jsx';
import BackendNavbar from "../components/backendNavbar.jsx";
import toast, { Toaster } from "react-hot-toast";
import ProcessingButtonComponent from "../components/processingButtonComponent.jsx";

export default function EditGallery() {

    const navigate = useNavigate();

    const { id } = useParams();
    const portfolio_id = id;

    const [gallery, setGallery] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const fetchData = () => {
        setLoading(true);
        axios.get(`${api.getGalleryByPortfolioId}/${portfolio_id}`)
            .then(res => {
                console.log("Fetched gallery: ", res.data);
                const data = res.data;
                setGallery(data);
                setLoading(false)
            })
            .catch(err => console.error("Error fetching gallery: ", err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData();
    }, [portfolio_id])

    const columns = [
        {
            name: 'No.',
            cell: (row, index) => ((currentPage - 1) * perPage) + index + 1,
            width: '50px'
        },
        {
            name: 'ID',
            selector: row => row.id,
            sortable: 'true',
            width: '50px'
        },
        {
            name: 'img',
            cell: row => {
                // const imagePath = row.thumbnail ? row.thumbnail : 'path/to/default-image.jpg';
                const imagePath = row.img ? row.img : null;
                return (
                    <div>
                        {row.img ? (
                            <img
                                src={`${imagePath}`}  // Ensure full URL for access
                                alt="Portfolio gallery"
                                style={{ width: '100px', height: 'auto' }} // You can adjust the size here
                            />
                        ) : (
                            <span>No Image</span> // Fallback if no image is available
                        )}
                    </div>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px'
        }
    ]

    const imageUploadRef = useRef(null)

    const handleAddGallery = async (e) => {
        const imageUpload = imageUploadRef.current;

        e.preventDefault();
        setLoading(true);
        imageUpload.disabled = true;

        if (!imageUpload.files.length) {
            toast.error("Please select at least one image.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("portfolio_id", portfolio_id); // assume this exists in your component state

        for (let file of imageUpload.files) {
            formData.append("gallery_images", file);
        }

        // Wrap request with toast.promise for auto status messages
        await toast.promise(
            axios.post(api.uploadMultipleGalleryImagesToPortfolioId, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            {
                loading: "Uploading images...",
                success: "Gallery images uploaded successfully!",
                error: "Upload failed. Please try again.",
            }
        ).then((res) => {
            console.log("Uploaded images:", res.data.images);
            fetchData();
            imageUpload.value = "";
        }).catch((err) => {
            console.error("Upload error:", err);
        }).finally(() => {
            setLoading(false);
            imageUpload.disabled = false;
        });
    };

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <form onSubmit={handleAddGallery} className="" encType="multipart/form-data">
                <div className="flex flex-col text-left">
                    <label className="block mb-1 font-semibold" htmlFor="galleryImages">Upload images to gallery</label>
                    <div className="flex flex-col lg:flex sm:flex-row sm:gap-2">
                        <input
                            id="imageUpload"
                            name="gallery_images"
                            multiple
                            className="w-full p-2 border rounded"
                            type="file"
                            accept="image/*"
                            ref={imageUploadRef}
                        />
                        {loading ? (
                            <ProcessingButtonComponent width={`w-40`} />
                        ) : (
                            <button
                                type="submit"
                                className="w-24 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </form>
        )
    }, [loading]);



    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
        const handleMultipleDelete = () => {
            if (selectedRows.length === 0) return;

            toast((t) => (
                <span>
                    Are you sure to delete IDs:
                    <b> {selectedRows.map(r => r.id).join(", ")}</b> ?
                    <div className='pt-3'>
                        <button
                            className='p-2 mr-6 text-green-500 rounded-md border border-solid border-green-500'
                            onClick={() => {
                                selectedRows.forEach(row => confirmDelete(row.id));
                                setToggleCleared(!toggleCleared);
                                toast.dismiss(t.id);
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className='text-red-500'
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </span>
            ), { duration: 10000 });
        };

        return (
            <button
                key="delete"
                onClick={handleMultipleDelete}
                style={{ backgroundColor: 'red', color: 'white', padding: '8px', borderRadius: '4px' }}
            >
                Delete Selected
            </button>
        );
    }, [selectedRows, toggleCleared]);

    const confirmDelete = (id) => {
        setLoadingDelete(true);

        toast.promise(
            axios.delete(`${api.deleteGalleryById}/${id}`),
            {
                loading: `Deleting ID ${id}...`,
                success: () => {
                    fetchData();  // refresh the table
                    return `ID ${id} has been deleted`;
                },
                error: `Error deleting ID ${id}`,
            }
        ).finally(() => {
            setLoadingDelete(false);
        });
    };

    return (
        <>
            <Helmet>
                <title>Edit Gallery</title>
            </Helmet>
            <div><Toaster /></div>
            <BackendNavbar></BackendNavbar>
            <section className='pt-16'>
                {loadingDelete ? (
                    <></>
                ) : (
                    <>
                        <DataTable
                            title={`Gallery of ID ${portfolio_id}`}
                            columns={columns}
                            data={gallery}
                            responsive
                            striped
                            pagination
                            onChangePage={(page) => setCurrentPage(page)}
                            onChangeRowsPerPage={(newPerPage, page) => {
                                setPerPage(newPerPage);
                                setCurrentPage(page);
                            }}
                            selectableRows
                            contextActions={contextActions}
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={toggleCleared}
                            fixedHeader
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                        />
                    </>
                )}

            </section>
        </>
    )
}