import { useMemo } from 'react';
import { decode } from "he";
import { BarChart, Bar, Cell, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ExcelExportCategory } from '../functions/ExcelExportCategory';


// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#1e293b',
        color: 'white',
        borderRadius: '8px',
        border: '1px solid #475569'
      }}>
        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{decode(label)}</p>
        <p style={{ fontSize: '0.875rem', color: '#60a5fa' }}>
          Questions: <span style={{ marginLeft: '0.5rem' }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function CategoriesDistributionSection({ questions = [], selectedCategory }) {
    const chartData = useMemo(() => {
        if (questions.length === 0) return [];
        
        const counts = {};
        questions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });

        const total = questions.length;
        return Object.entries(counts)
            .map(([category, count]) => ({
                category: decode(category), // Decode HTML entities
                count,
                percent: ((count / total) * 100).toFixed(1)
            }))
            .sort((a, b) => b.count - a.count);
    }, [questions]);

    if (questions.length === 0) {
        return (
            <section className="distribution-section">
                <h2>Category Distribution</h2>
                <p>No data to display.</p>
            </section>
        );
    }

    return (
        <section className="distribution-section">
            <h2>Category Distribution</h2>
            <div className="distribution-grid">
                <div className="chart-placeholder">
                    <BarChart
                        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                        responsive
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" hide />
                        <YAxis width="auto" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="count" activeBar={<Rectangle fill="lightcoral" stroke="darkred" />}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`hsl(${Math.round((index * 130) / chartData.length)}, 70%, 50%)`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
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
                            {chartData.map(({ category, count, percent }) => (
                                <tr key={category}>
                                    <td>{decode(category)}</td>
                                    <td>{count}</td>
                                    <td>{percent}%</td>
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
                    <ExcelExportCategory chartData={chartData} questions={questions} selectedCategory={selectedCategory} />
                </div>
            </div>
        </section>
    );
}