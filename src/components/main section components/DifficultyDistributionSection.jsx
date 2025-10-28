import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

export function DifficultyDistributionSection({ questions = [] }) {
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

    return (
        <section className="distribution-section">
            <h2>Difficulty Distribution</h2>
            <div className="distribution-grid">
                <div className="chart-placeholder">
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
                </div>
            </div>
        </section>
    );

}