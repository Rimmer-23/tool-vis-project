export function CategoriesDistributionSection() {
    return (
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
    );
}