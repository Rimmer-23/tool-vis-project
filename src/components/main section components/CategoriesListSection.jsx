import { useMemo } from 'react';
import { decode } from "he";

export function CategoriesListSection({ questions = [] }) {
    // Calculate question counts per category
    const categoryCounts = useMemo(() => {
        const counts = {};
        questions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    }, [questions]);

    // Get unique categories with questions
    const categoriesWithQuestions = useMemo(() => {
        return Object.keys(categoryCounts).sort();
    }, [categoryCounts]);

    if (questions.length === 0) {
        return (
            <section className="categories-section">
                <h2>Categories</h2>
                <p>No questions available.</p>
            </section>
        );
    }

    return (
        <section className="categories-section">
            <h2>Categories</h2>
            <div className="categories-grid">
                {categoriesWithQuestions.map(category => (
                    <div key={category} className="category-card">
                        <h3>{decode(category)}</h3>
                        <p className="count">{categoryCounts[category]}</p>
                        <p className="label">questions</p>
                    </div>
                ))}
            </div>
        </section>
    );
}