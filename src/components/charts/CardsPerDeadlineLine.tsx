import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Task, Column } from '../../interface';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
const CardsPerDeadlineLine: React.FC<ChartProps> = ({ data }) => {
    const deadlineList: string[] = [];
    const dataset: number[] = [];
    const doneCount: { [key: string]: number } = {};

    data.tasks.forEach((element) => {
        if (!deadlineList.includes(element.deadline.toString())) {
            deadlineList.push(element.deadline.toString());
            doneCount[element.deadline.toString()] = 0;
        }
    });

    deadlineList.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    data.tasks.forEach((task) => {
        if (task.done === 1) {
            doneCount[task.deadline.toString()]++;
        }
    });

    console.log(doneCount);

    let count = 0;

    deadlineList.forEach(day => {
        count += doneCount[day];
        let rate = Math.round(count / data.tasks.length * 100)
        dataset.push(rate)
    })

    const dataFilter = {
        labels: deadlineList,
        datasets: [
            {
                label: "tỷ lệ hoàn thành",
                backgroundColor: "#99b3ff10",
                borderColor: "#99b3ff",
                borderWidth: 2,
                data: dataset,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Tỷ lệ hoàn thành thẻ theo ngày đến hạn',
            },
        }
    }

    return (
        <Line data={dataFilter}
            width={"580px"} height={"300px"}
            options={options} />
    )
}

export default CardsPerDeadlineLine