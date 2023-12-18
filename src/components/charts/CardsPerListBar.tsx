import React from 'react'; import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Task, Column } from '../../interface';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface Data {
    columns: Column[];
    tasks: Task[];
}
interface ChartProps {
    data: Data;
}
const CardsPerListBar: React.FC<ChartProps> = ({ data }) => {
    const columnIdList: string[] = [];
    const undoneCount: { [key: string]: number } = {};
    const outOfDateCount: { [key: string]: number } = {};
    const doneCount: { [key: string]: number } = {};

    function isDueDatePast(Due_Date: any) {
        const dueDate = new Date(Due_Date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Compare the dueDate with the current date
        return dueDate.getTime() < currentDate.getTime();
    }

    data.columns.forEach((element) => {
        columnIdList.push(element.id);
        undoneCount[element.id] = 0; // Initialize count for each column ID
        outOfDateCount[element.id] = 0;
        doneCount[element.id] = 0;
    });

    data.tasks.forEach((task) => {
        if (task.done === 1) {
            doneCount[task.dsach_id]++;
        } else if (isDueDatePast(task.deadline) && task.deadline) {
            outOfDateCount[task.dsach_id]++;
        }else{
            undoneCount[task.dsach_id]++;
        }
    });

    const dataset1: { [title: string]: number } = {};
    const dataset2: { [title: string]: number } = {};
    const dataset3: { [title: string]: number } = {};

    columnIdList.forEach((columnId) => {
        const column = data.columns.find((col) => col.id === columnId);
        const title = column ? column.name : "Unknown Title";
        dataset1[title] = undoneCount[columnId];
        dataset2[title] = doneCount[columnId];
        dataset3[title] = outOfDateCount[columnId];
    });

    const dataFilter = {
        labels: Object.keys(dataset1),
        datasets: [
            {
                label: "Số thẻ chưa làm",
                backgroundColor: "#99b3ff96",
                borderColor: "#99b3ff",
                borderWidth: 2,
                data: Object.values(dataset1),
            },
            {
                label: "Số hoàn thành",
                backgroundColor: "#99ff9996",
                borderColor: "#99ff99",
                borderWidth: 2,
                data: Object.values(dataset2),
            },
            {
                label: "Số thẻ quá hạn",
                backgroundColor: "#ff505096",
                borderColor: "#ff5050",
                borderWidth: 2,
                data: Object.values(dataset3),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Số thẻ mỗi danh sách',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }
    return (
            <Bar data={dataFilter}
                width={"580px"} height={"300px"}
                options={options} />
    );
}

export default CardsPerListBar