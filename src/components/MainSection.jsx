import { CategoriesListSection } from "./main section components/CategoriesListSection";
import { CategoriesDistributionSection } from "./main section components/CategoryDistributionSection";
import { DifficultyDistributionSection } from "./main section components/DifficultyDistributionSection";

export function MainSection(){
    return (
        <main>
            {/* <!-- Categories List Section --> */}
                <CategoriesListSection />

                {/* <!-- Category Distribution Section --> */}
                <CategoriesDistributionSection />

                {/* <!-- Difficulty Distribution Section --> */}
                <DifficultyDistributionSection />
        </main>
    );

}