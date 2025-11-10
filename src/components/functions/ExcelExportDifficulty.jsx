import { decode } from 'he';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function ExcelExportDifficulty({ chartData = [], questions = [], selectedCategory }) {
    // Ensure chartData is an array (protect against receiving props object or undefined)
    

    // Export function for Excel download
    const exportToExcel = () => {
        const tableData = chartData.map(({ name, value, displayPercent }) => ({
            Difficulty: name,
            Count: value,
            Percent: `${displayPercent}%`,
        }));

        tableData.push({
            Difficulty: 'Total',
            Count: questions.length,
            Percent: '100%',
        });

        // Convert the JSON data to an Excel sheet
        const ws = XLSX.utils.json_to_sheet(tableData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Write the workbook to an array and create a Blob from the data
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });

        // Trigger the download of the Excel file
        // Derive a safe file name using the selected category (topic)
        try {
            const rawTopic = selectedCategory ? decode(selectedCategory) : 'all';
            // replace whitespace with underscores and remove unsafe chars
            const safeTopic = rawTopic
                .toString()
                .trim()
                .replace(/\s+/g, '_')
                .replace(/[^a-zA-Z0-9_-]/g, '')
                .toLowerCase() || 'all';

            const filename = `difficulty_distribution_${safeTopic}.xlsx`;
            saveAs(blob, filename);
        } catch {
            // Fallback to default name if something goes wrong
            saveAs(blob, 'difficulty_distribution.xlsx');
        }
    };

    return (

        <button onClick={exportToExcel} className="btn-export">
            Download as Excel
        </button>
    )
}