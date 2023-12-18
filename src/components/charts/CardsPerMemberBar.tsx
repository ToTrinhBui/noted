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
import { Member, Task, Column } from '../../interface';

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
    members: Member[];
}
const CardsPerMemberBar: React.FC<ChartProps> = ({ data, members }) => {
    const userIdList: string[] = members.map(member => member.user_id);
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

    userIdList.forEach(item => {
        undoneCount[item] = 0; // Initialize count for each column ID
        outOfDateCount[item] = 0;
        doneCount[item] = 0;
    })

    data.tasks.forEach(task => {
        task.members_task?.split(', ').forEach(userId => {

            if (task.done === 1) {
                doneCount[userId]++;
            } else if (isDueDatePast(task.deadline) && task.deadline) {
                outOfDateCount[userId]++;
            } else {
                undoneCount[userId]++;
            }
        })
    })

    const dataset1: { [email: string]: number } = {};
    const dataset2: { [email: string]: number } = {};
    const dataset3: { [email: string]: number } = {};

    members.forEach(member => {
        const emailUser = member.email;
        dataset1[emailUser] = undoneCount[member.user_id];
        dataset2[emailUser] = doneCount[member.user_id];
        dataset3[emailUser] = outOfDateCount[member.user_id];
    })

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
                text: 'Số thẻ mỗi thành viên thực hiện',
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

export default CardsPerMemberBar