import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Task, Column } from '../../interface';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
    columns: Column[];
    tasks: Task[];
}
interface ChartProps {
    data: Data;
}
const CardsPerListPie: React.FC<ChartProps> = ({ data }) => {
    const columnIdList: string[] = [];
    const columnIdCount: { [key: string]: number } = {};

    data.columns.forEach((element) => {
        columnIdList.push(element.id);
        columnIdCount[element.id] = 0; // Initialize count for each column ID
    });

    data.tasks.forEach((task) => {
        columnIdCount[task.dsach_id]++;
    });

    const titleCountMap: { [title: string]: number } = {};

    columnIdList.forEach((columnId) => {
        const column = data.columns.find((col) => col.id === columnId);
        const title = column ? column.name : "Unknown Title";
        titleCountMap[title] = columnIdCount[columnId];
    });

    function getListColor(): string[] {
        const listColor: string[] = [];
        let temp = columnIdList.length;
        while (temp > 0) {
            const color: string = "#" + Math.floor(Math.random() * 16777215).toString(16);
            listColor.push(color);
            temp--;
        }

        return listColor;
    }

    const listColor: string[] = getListColor();

    const dataFilter = {
        labels: Object.keys(titleCountMap),
        datasets: [
            {
                label: 'Số lượng thẻ',
                data: Object.values(titleCountMap),
                backgroundColor: listColor,
                borderColor: "white",
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right" as const,
                display: true
            },
            title: {
                display: true,
                text: 'Số thẻ mỗi danh sách',
            },
        },
    };

    return (
        <Pie data={dataFilter}
            width={"580px"} height={"300px"}
            options={options} />

    )
}

export default CardsPerListPie