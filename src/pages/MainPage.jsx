

export function MainPage() {
    return (
        <>
            <title>Tool Visualization Project</title>

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

            <main>
                {/* <!-- Categories List Section --> */}
                <section className="categories-section">
                    <h2>Categories</h2>
                    <div className="categories-grid">
                        <div className="category-card">
                            <h3>Science</h3>
                            <p className="count">4</p>
                            <p className="label">questions</p>
                        </div>
                        <div className="category-card">
                            <h3>History</h3>
                            <p className="count">4</p>
                            <p className="label">questions</p>
                        </div>
                        <div className="category-card">
                            <h3>Geography</h3>
                            <p className="count">4</p>
                            <p className="label">questions</p>
                        </div>
                        <div className="category-card">
                            <h3>Arts</h3>
                            <p className="count">3</p>
                            <p className="label">questions</p>
                        </div>
                        <div className="category-card">
                            <h3>Sports</h3>
                            <p className="count">3</p>
                            <p className="label">questions</p>
                        </div>
                    </div>
                </section>

                {/* <!-- Category Distribution Section --> */}
                <section className="distribution-section">
                    <h2>Category Distribution</h2>
                    <div className="distribution-grid">
                        <div className="chart-placeholder">
                            <img src="https://c.animaapp.com/mh99d91xcxidEK/img/ai_1.png" alt="category distribution placeholder"
                                loading="lazy" />
                        </div>
                        <div className="distribution-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Count</th>
                                        <th>Percent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Arts</td>
                                        <td>3</td>
                                        <td>16.7%</td>
                                    </tr>
                                    <tr>
                                        <td>Geography</td>
                                        <td>4</td>
                                        <td>22.2%</td>
                                    </tr>
                                    <tr>
                                        <td>History</td>
                                        <td>4</td>
                                        <td>22.2%</td>
                                    </tr>
                                    <tr>
                                        <td>Science</td>
                                        <td>4</td>
                                        <td>22.2%</td>
                                    </tr>
                                    <tr>
                                        <td>Sports</td>
                                        <td>3</td>
                                        <td>16.7%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* <!-- Difficulty Distribution Section --> */}
                <section className="distribution-section">
                    <h2>Difficulty Distribution</h2>
                    <div className="distribution-grid">
                        <div className="chart-placeholder">
                            <img src="https://c.animaapp.com/mh99d91xcxidEK/img/ai_2.png" alt="difficulty distribution placeholder"
                                loading="lazy" />
                        </div>
                        <div className="distribution-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Difficulty</th>
                                        <th>Count</th>
                                        <th>Percent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Easy</td>
                                        <td>6</td>
                                        <td>33.3%</td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
                                        <td>6</td>
                                        <td>33.3%</td>
                                    </tr>
                                    <tr>
                                        <td>Hard</td>
                                        <td>6</td>
                                        <td>33.3%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>© 2024 Trivia Dashboard. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}