import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { decode } from "he";

export function ExcelExportCategory({chartData = [], selectedCategory, questions = []}) {

    const exportToExcel = () => {
        const tableData = chartData.map(({ category, count, percent }) => ({
            Category: decode(category),
            Count: count,
            Percent: `${percent}%`,
        }));

        tableData.push({
            Category: 'Total',
            Count: questions.length,
            Percent: '100%',
        });

        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });

        try {
            const rawTopic = selectedCategory ? decode(selectedCategory) : 'all';
            const safeTopic = rawTopic
                .toString()
                .trim()
                .replace(/\s+/g, '_')
                .replace(/[^a-zA-Z0-9_-]/g, '')
                .toLowerCase() || 'all';

            const filename = `category_distribution_${safeTopic}.xlsx`;
            saveAs(blob, filename);
        } catch {
            saveAs(blob, 'category_distribution.xlsx');
        }
    };

    return (

        <button onClick={exportToExcel} className="btn-export">
            Download as Excel
        </button>
    )
}