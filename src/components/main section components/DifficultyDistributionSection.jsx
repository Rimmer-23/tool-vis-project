import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './DifficultyDistributionSection.css';
import { ExcelExportDifficulty } from '../functions/ExcelExportDifficulty';

const RADIAN = Math.PI / 180;

// Custom label renderer for pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontSize: '14px', fontWeight: '600' }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// Custom Tooltip for pie chart
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                color: 'white',
                borderRadius: '6px',
                border: '1px solid #475569'
            }}>
                <p style={{ fontWeight: '600' }}>{payload[0].name}</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Questions: <span style={{ color: '#60a5fa' }}>{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export function DifficultyDistributionSection({ questions = [], selectedCategory }) {
    const [modal, setModal] = useState(false);

    const chartData = useMemo(() => {
        if (questions.length === 0) return [];

        const counts = {};
        questions.forEach(q => {
            const difficulty = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
            counts[difficulty] = (counts[difficulty] || 0) + 1;
        });

        const total = questions.length;
        return Object.entries(counts)
            .map(([difficulty, count]) => ({
                name: difficulty,
                value: count,
                displayPercent: ((count / total) * 100).toFixed(1)
            }))
            .sort((a, b) => {
                const order = { Easy: 0, Medium: 1, Hard: 2 };
                return order[a.name] - order[b.name];
            });
    }, [questions]);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

    if (questions.length === 0) {
        return (
            <section className="distribution-section">
                <h2>Difficulty Distribution</h2>
                <p>No data to display.</p>
            </section>
        );
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    // // Export function for Excel download
    // const exportToExcel = () => {
    //     const tableData = chartData.map(({ name, value, displayPercent }) => ({
    //         Difficulty: name,
    //         Count: value,
    //         Percent: `${displayPercent}%`,
    //     }));

    //     tableData.push({
    //         Difficulty: 'Total',
    //         Count: questions.length,
    //         Percent: '100%',
    //     });

    //     // Convert the JSON data to an Excel sheet
    //     const ws = XLSX.utils.json_to_sheet(tableData);

    //     // Create a new workbook and append the sheet
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //     // Write the workbook to an array and create a Blob from the data
    //     const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([excelFile], { type: 'application/octet-stream' });

    //     // Trigger the download of the Excel file
    //     // Derive a safe file name using the selected category (topic)
    //     try {
    //         const rawTopic = selectedCategory ? decode(selectedCategory) : 'all';
    //         // replace whitespace with underscores and remove unsafe chars
    //         const safeTopic = rawTopic
    //             .toString()
    //             .trim()
    //             .replace(/\s+/g, '_')
    //             .replace(/[^a-zA-Z0-9_-]/g, '')
    //             .toLowerCase() || 'all';

    //         const filename = `difficulty_distribution_${safeTopic}.xlsx`;
    //         saveAs(blob, filename);
    //     } catch {
    //         // Fallback to default name if something goes wrong
    //         saveAs(blob, 'difficulty_distribution.xlsx');
    //     }
    // };

    return (
        <section className="distribution-section">
            <h2>Difficulty Distribution</h2>
            <div className="distribution-grid">
                <div className="chart-placeholder">
                    <button onClick={toggleModal} className="btn-modal">
                        Open
                    </button>
                    {modal && (
                        <div className="modal">
                            <div
                                onClick={toggleModal}
                                className="overlay"></div>
                            <div className="modal-content">
                                {/* Large Pie Chart */}
                                <div className="mb-8">
                                    <ResponsiveContainer width="100%" height={500}>
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={180}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend
                                                wrapperStyle={{ fontSize: '18px', fontWeight: '600', paddingTop: '20px' }}
                                                iconSize={18}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <button className="close-modal" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
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
                            {chartData.map(({ name, value, displayPercent }) => (
                                <tr key={name}>
                                    <td>{name}</td>
                                    <td>{value}</td>
                                    <td>{displayPercent}%</td>
                                </tr>
                            ))}
                            <tr style={{
                                borderTop: '2px solid hsl(0, 0%, 88%)',
                                fontWeight: '700',
                                backgroundColor: '#f8f9fa'
                            }}>
                                <td style={{ paddingTop: '1rem' }}>Total</td>
                                <td style={{ paddingTop: '1rem' }}>{questions.length}</td>
                                <td style={{ paddingTop: '1rem' }}>100%</td>
                            </tr>
                        </tbody>
                    </table>

                    <ExcelExportDifficulty chartData ={chartData} questions={questions} selectedCategory={selectedCategory}/>
                </div>
            </div>
        </section>
    );
}
