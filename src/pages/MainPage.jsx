import { useState, useMemo } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MainSection } from '../components/MainSection';


export function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [questions, setQuestions] = useState([]);

    // Extract unique categories from loaded questions
    const availableCategories = useMemo(() => {
        const uniqueCategories = new Set(questions.map(q => q.category));
        return Array.from(uniqueCategories).sort();
    }, [questions]);

    return (
        <>
            <title>Tool Visualization Project</title>
            
            <Header 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                availableCategories={availableCategories}
            />
            
            <MainSection 
                selectedCategory={selectedCategory}
                questions={questions}
                setQuestions={setQuestions}
            />

            <Footer />
        </>
    );
}