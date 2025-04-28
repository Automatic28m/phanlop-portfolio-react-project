// src/components/FilterComponent.jsx
export default function FilterComponent({ filterText, onFilter, onClear }) {
    return (
        <div className="flex gap-2 mb-4">
            <input
                id="search"
                type="text"
                placeholder="Filter By Title"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                className="p-2 border rounded"
            />
            <button type="button" onClick={onClear} className="p-2 bg-gray-200 rounded">
                Clear
            </button>
        </div>
    );
}
