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
const CardsDonePerDeadlineBar: React.FC<ChartProps> = ({ data }) => {
  const deadlineList: string[] = [];
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

  data.tasks.forEach((element) => {
    if (!deadlineList.includes(element.deadline.toString())) {
      deadlineList.push(element.deadline.toString())
    }
  });

  deadlineList.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  deadlineList.forEach((element) => {
    undoneCount[element] = 0; // Initialize count for each column ID
    outOfDateCount[element] = 0;
    doneCount[element] = 0;
  })

  data.tasks.forEach((task) => {
    if (task.done === 1) {
      doneCount[task.deadline.toString()]++;
    } else if (isDueDatePast(task.deadline) && task.deadline) {
      outOfDateCount[task.deadline.toString()]++;
    } else {
      undoneCount[task.deadline.toString()]++;
    }
  });

  const dataFilter = {
    labels: deadlineList,
    datasets: [
      {
        label: "Số thẻ chưa làm",
        backgroundColor: "#99b3ff10",
        borderColor: "#99b3ff",
        borderWidth: 2,
        data: Object.values(undoneCount),
      },
      {
        label: "Số hoàn thành",
        backgroundColor: "#99ff9996",
        borderColor: "#99ff99",
        borderWidth: 2,
        data: Object.values(doneCount),
      },
      {
        label: "Số thẻ quá hạn",
        backgroundColor: "#ff505096",
        borderColor: "#ff5050",
        borderWidth: 2,
        data: Object.values(outOfDateCount),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Số thẻ theo ngày đến hạn',
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
  )
}

export default CardsDonePerDeadlineBar