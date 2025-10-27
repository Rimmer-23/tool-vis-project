export function DifficultyDistributionSection() {
    return (
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
    );

}