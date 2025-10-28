import { decode } from "he";

export function Header({ selectedCategory, onCategoryChange, availableCategories = [] }) {
    return (
        <header>
            <div className="container">
                <h1>Trivia Dashboard</h1>

                <div className="filter-controls">
                    <label htmlFor="categoryFilter">Filter by category:</label>
                    <select 
                        id="categoryFilter"
                        value={selectedCategory || ""}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        disabled={availableCategories.length === 0}
                    >
                        <option value="">All Categories</option>
                        {availableCategories.map(category => (
                            <option key={category} value={category}>
                                {decode(category)}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => onCategoryChange("")} disabled={availableCategories.length === 0}>
                        Clear filter
                    </button>
                </div>
            </div>
        </header>
    );
}