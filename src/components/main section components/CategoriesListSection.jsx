export function CategoriesListSection() {
    return (
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
    );
}