import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Task, Column } from '../../interface';
import { colorMapLabel } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
    columns: Column[];
    tasks: Task[];
}
interface ChartProps {
    data: Data;
}

const CardsPerLabelPie: React.FC<ChartProps> = ({ data }) => {
    const dataset: { [key: string]: number } = {};

    for (const [key, value] of Object.entries(colorMapLabel)) {
        dataset[value.label] = 0;
    }

    dataset['Chưa gán nhãn'] = 0;

    data.tasks.forEach((task) => {
        let label: string = '';
        for (const [key, value] of Object.entries(colorMapLabel)) {
            if (key === task.label) {
                label = value.label;
            }
        }
        if (label.length > 0) {
            dataset[label]++;
        } else {
            dataset['Chưa gán nhãn']++;
        }
    });

    const backgroundColor = ['#f2f2f2', '#4bce9796', '#FAA53D96', '#f8746296', '#4bbcce96'];
    const borderColor = ['#e1e1e1', '#4bce97', '#FAA53D', '#f87462', '#4bbcce']
    const dataFilter = {
        labels: Object.keys(dataset),
        datasets: [
            {
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2,
                data: Object.values(dataset),
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
                text: 'Các thẻ theo nhãn',
            },
        }
    }
    return (
        <Pie data={dataFilter}
            width={"580px"} height={"300px"}
            options={options} />

    )
}

export default CardsPerLabelPie