import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import BackendNavbar from '../components/backendNavbar.jsx';
import { useNavigate } from 'react-router-dom';
import { WindArrowDown } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { formatDuration } from 'date-fns';
import TypeFilterComponent from '../components/typeFilterComponent.jsx';
import FilterComponent from '../components/filterComponent.jsx';
import api from '../api/api.jsx';
import { Helmet } from 'react-helmet';


export default function DisplayPortfolio() {
	const navigate = useNavigate();
	const [data, setData] = useState()
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);

	const fetchData = () => {
		axios.get(api.portfolio)  // adjust endpoint as needed
			.then(res => {
				console.log("Fetched education data:", res.data); // 👈 logs to browser console
				setData(res.data);
			})
			.catch(err => console.error("Error fetching education data:", err));
	}

	useEffect(() => {
		fetchData();
	}, []);

	const handleEdit = async (e, id) => {
		e.preventDefault();
		navigate(`/editPortfolio/${id}`);
	}

	// const handleDelete = async (e, id) => {
	// 	e.preventDefault();
	// 	toast((t) => (
	// 		<span>
	// 			Are you sure to delete ID: <b>{id}?</b>
	// 			<div className='pt-3'>
	// 				<button
	// 					className='p-2 mr-6 text-green-500 rounded-md border border-solid border-green-500'
	// 					onClick={() => (
	// 						confirmDelete(id),
	// 						toast.dismiss(t.id)
	// 					)}>
	// 					Confirm
	// 				</button>
	// 				<button
	// 					className='text-red-500'
	// 					onClick={() => (
	// 						toast.dismiss(t.id)
	// 					)}>
	// 					Cancel
	// 				</button>
	// 			</div>
	// 		</span>
	// 	), { duration: 10000 });
	// }

	const confirmDelete = (id) => {
		setLoadingDelete(true);

		toast.promise(
			axios.delete(`${api.deletePortfolioById}/${id}`),
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

	const [filterText, setFilterText] = useState('');
	const [filterType, setFilterType] = useState();
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = (data || []).filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) && (filterType ? item.portfolio_type_id == filterType : true));
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText || filterType) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
				setFilterType('');
			}
		};
		return (
			<div className="flex flex-col lg:flex sm:flex-row sm:gap-2">
				<TypeFilterComponent onFilter={e => setFilterType(e.target.value)} onClear={handleClear} filterType={filterType} />
				<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
			</div>
		)
	}, [filterText, filterType, resetPaginationToggle]);

	const columns = [
		{
			name: 'No.',
			cell: (row, index) => ((currentPage - 1) * perPage) + index + 1,
			width: '80px'
		},
		{
			name: 'ID',
			selector: row => row.id,
			sortable: 'true',
		},
		{
			name: 'Title',
			selector: row => row.title,
			sortable: 'true',
		},
		{
			name: 'Contents',
			selector: row => row.contents,
			sortable: 'true',
		},
		{
			name: 'Location',
			selector: row => row.event_location,
			sortable: 'true',
		},
		{
			name: 'Date Time',
			selector: row => row.event_date,
			sortable: 'true',
		},
		{
			name: 'Thumbnail',
			cell: row => {
				// const imagePath = row.thumbnail ? row.thumbnail : 'path/to/default-image.jpg';
				const imagePath = row.thumbnail ? row.thumbnail : null;
				return (
					<div>
						{row.thumbnail ? (
							<img
								src={`${imagePath}`}  // Ensure full URL for access
								alt="Portfolio Thumbnail"
								style={{ width: '100px', height: 'auto' }} // You can adjust the size here
							/>
						) : (
							<span>No Image</span> // Fallback if no image is available
						)}
					</div>
				)
			}
		},
		{
			name: 'Type',
			selector: row => row.type_title,
			sortable: 'true',
		},
		{
			name: 'Date Time Created',
			selector: row => row.created,
			sortable: 'true',
		},
		{
			name: 'Actions',
			cell: row => {
				return (
					<div>
						<button className="pe-2" onClick={(e) => handleEdit(e, row.id)}>
							Edit
						</button>
						{/* <button onClick={(e) => handleDelete(e, row.id)}>
							Delete
						</button> */}
					</div>
				)
			},
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		}
	];

	return (
		<div>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<div><Toaster /></div>
			<BackendNavbar></BackendNavbar>
			<section className='pt-16'>
				{loadingDelete ? (
					<></>
				) : (
					<>
						<DataTable
							title='Portfolio'
							columns={columns}
							data={filteredItems}
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
		</div>
	);
};