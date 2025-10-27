export function Header() {
    return (
        <header>
            <div className="container">
                <h1>Trivia Dashboard</h1>

                <div className="filter-controls">
                    <label for="categoryFilter">Filter by category:</label>
                    <select id="categoryFilter">
                        <option value="">All Categories</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                        <option value="Arts">Arts</option>
                        <option value="Sports">Sports</option>
                    </select>
                    <button id="clearFilter">Clear filter</button>
                </div>
            </div>
        </header>
            

    );
}