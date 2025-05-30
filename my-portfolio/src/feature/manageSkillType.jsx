import DataTable from "react-data-table-component";
import BackendNavbar from "../components/backendNavbar.jsx";
import toast, { Toaster } from "react-hot-toast";
import ProcessingButtonComponent from "../components/processingButtonComponent.jsx";
import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import api from '../api/api.jsx';
import axios from "axios";
import skillTypeColors from "../utils/skillTypeColors.js";
import { SortAsc } from "lucide-react";

export default function ManageSkillType() {

    const navigate = useNavigate();
    const [skillTypes, setSkillTypes] = useState([]);

    const skillTypeInputRef = useRef(null);
    const [skillTypeInput, setSkillTypeInput] = useState('');
    const [colorSelect, setColorSelect] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const fetchData = () => {
        setLoading(true);
        axios.get(api.getSkillTypes)
            .then(res => {
                console.log("Fetched skill types: ", res.data);
                const data = res.data;
                setSkillTypes(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching skill types: ", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [])

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
            name: 'Skill Type',
            cell: row => (
                <div className="flex items-center">
                    <div className={`px-2 py-1 rounded bg-${row.color}-100 mr-2`}><span className={`text-${row.color}-900`}>{row.name}</span></div>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/editSkillType/${row.id}`)}
                    >
                        Edit
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const handleColorSelect = (e) => {
        setColorSelect(e.target.value);
        console.log("Selected color: ", e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const skillTypeName = skillTypeInputRef.current.value.trim();
        if (!skillTypeName) {
            toast.error("Skill type name cannot be empty.");
            return;
        }
        if (!colorSelect) {
            toast.error("Please select a color for the skill type.");
            return;
        }

        const name = skillTypeName;
        const color = colorSelect;

        setLoading(true);
        await toast.promise(
            axios.post(api.addSkillType, {
                name,
                color
            }),
            {
                loading: "Adding skill type...",
                success: "Skill type added successfully!",
                error: "Addition failed. Please try again.",
            }
        ).then((res) => {
            console.log("Added skill type: ", res.data);
            fetchData();
        }).catch((err) => {
            console.error("Added skill type error:", err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col text-left">
                    <label className="block mb-1 font-semibold" htmlFor="skillTypeInput">Add new skill type</label>
                    <div className="flex flex-col lg:flex sm:flex-row sm:gap-2">
                        <input
                            id="skillTypeInput"
                            name="skillTypeInput"
                            className="w-full p-2 border rounded"
                            type="text"
                            ref={skillTypeInputRef}
                            onChange={(e) => setSkillTypeInput(e.target.value)}
                            // value={skillTypeInput}
                            placeholder="Enter skill type name"
                            required
                        />
                        <select
                            id="colorSelect"
                            name="colorSelect"
                            onChange={handleColorSelect}
                            value={colorSelect}
                            className="w-full p-2 border rounded"
                            required
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
    }, [loading, colorSelect, skillTypeInput, skillTypeColors]);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
        const handleMultipleDelete = () => {
            if (selectedRows.length === 0) {
                toast.error("No skill types selected for deletion.");
                return;
            }

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
            axios.delete(`${api.deleteSkillTypeById}/${id}`),
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
                <title>Edit Skill Types</title>
            </Helmet>
            <div><Toaster /></div>
            <BackendNavbar></BackendNavbar>
            <section className='pt-16'>
                {loadingDelete ? (
                    <></>
                ) : (
                    <>
                        <DataTable
                            title={"Skill Types"}
                            columns={columns}
                            data={skillTypes}
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
    );
}