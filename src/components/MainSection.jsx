import axios from 'axios';
import { CategoriesListSection } from "./main section components/CategoriesListSection";
import { CategoriesDistributionSection } from "./main section components/CategoryDistributionSection";
import { DifficultyDistributionSection } from "./main section components/DifficultyDistributionSection";
import { decode } from "he";
import { useState, useEffect } from 'react';
export function MainSection({ selectedCategory, questions, setQuestions }) {
    const [loading, setLoading] = useState(true);

    // Filter questions based on selected category
    const filteredQuestions = selectedCategory 
        ? questions.filter(q => q.category === selectedCategory)
        : questions;

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const questionUrls = [
                'https://opentdb.com/api.php?amount=40&category=19',
                'https://opentdb.com/api.php?amount=30&category=21',
                'https://opentdb.com/api.php?amount=30&category=23',
                'https://opentdb.com/api.php?amount=35&category=25',
                'https://opentdb.com/api.php?amount=40&category=24',
                'https://opentdb.com/api.php?amount=10&category=31'
            ];
            
            const allResults = [];
            
            // Fetch each category separately with delays
            for (let i = 0; i < questionUrls.length; i++) {
                const url = questionUrls[i];
                let categoryName = `API ${i + 1}`; // Default name
                
                try {
                    console.log(`Waiting 5 seconds before ${categoryName}...`);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    
                    console.log(`Fetching from ${categoryName}...`);
                    const response = await axios.get(url);
                    
                    if (response.data.response_code === 0 && response.data.results && response.data.results.length > 0) {
                        // Extract category name from the first question
                        categoryName = response.data.results[0].category;
                        console.log(`Category detected: ${categoryName}`);
                        
                        allResults.push(...response.data.results);
                        console.log(`✅ Successfully fetched ${response.data.results.length} questions from ${categoryName}`);
                    } else {
                        console.warn(`⚠️ ${categoryName} returned code: ${response.data.response_code}`);
                    }
                } catch (error) {
                    console.error(`❌ Error fetching from ${categoryName}:`, error.response?.status, error.message);
                }
            }

            setQuestions(allResults);
            setLoading(false);
            console.log(`📊 Total questions loaded: ${allResults.length}`);
        };

        fetchAllQuestions();
    },[setQuestions]);

    return (
        <main>
            {loading && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    gap: '1.5rem'
                }}>
                    <div className="spinner">
                        <style>{`
                            .spinner {
                                width: 60px;
                                height: 60px;
                                border: 5px solid #f3f3f3;
                                border-top: 5px solid #2563eb;
                                border-radius: 50%;
                                animation: spin 1s linear infinite;
                            }
                            
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                    <p style={{ fontSize: '1.125rem', color: '#64748b', fontWeight: '500' }}>
                        Fetching trivia questions...
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                    }}>
                        <span style={{
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}>📊</span>
                        <span style={{
                            animation: 'pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.2s'
                        }}>📊</span>
                        <span style={{
                            animation: 'pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.4s'
                        }}>📊</span>
                    </div>
                    <style>{`
                        @keyframes pulse {
                            0%, 100% { opacity: 1; transform: scale(1); }
                            50% { opacity: 0.3; transform: scale(0.8); }
                        }
                    `}</style>
                </div>
            )}
            
            {!loading && (
                <>
                    <div style={{ padding: '1rem', textAlign: 'center', background: '#e8f5e9', borderRadius: '8px', marginBottom: '2rem' }}>
                        📊 Loaded {questions.length} questions from multiple APIs
                    </div>
                    
                    {selectedCategory && (
                        <div style={{ 
                            padding: '1rem', 
                            marginBottom: '1rem', 
                            background: '#dbeafe',
                            borderRadius: '8px',
                            border: '2px solid #2563eb',
                            textAlign: 'center'
                        }}>
                            <strong>Filtered by: {decode(selectedCategory)}</strong>
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                                ({filteredQuestions.length} of {questions.length} questions)
                            </span>
                        </div>
                    )}

                    {/* <!-- Categories List Section --> */}
                    <CategoriesListSection questions={filteredQuestions} />

                    {/* <!-- Category Distribution Section --> */}
                    <CategoriesDistributionSection questions={filteredQuestions} selectedCategory={selectedCategory} />

                    {/* <!-- Difficulty Distribution Section --> */}
                    <DifficultyDistributionSection questions={filteredQuestions} selectedCategory={selectedCategory} />
                </>
            )}
        </main>
    );
}