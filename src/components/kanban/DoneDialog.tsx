import React from 'react';
import { Task } from '../../interface';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../../utils';

interface CardProps {
    item: Task;
}
const DoneDialog: React.FC<CardProps> = ({ item }) => {
    const { boardID } = useParams<{ boardID?: string }>();

    function isDueDatePast(Due_Date: any) {
        const dueDate = new Date(Due_Date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Compare the dueDate with the current date
        return dueDate.getTime() < currentDate.getTime();
    }

    const editTask = async (done_status: boolean) => {
        try {
            const response = await axios.put(`${URL_API}/task/edit`, {
                board_id: boardID,
                task: {
                    id: item.id,
                    name: item.name,
                    deadline: item.deadline,
                    dsach_id: item.dsach_id,
                    bang_id: boardID,
                    members_task: item.members_task,
                    done: done_status,
                    description: item.description,
                    label: item.label,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const done = () => {
        const done_status = true;
        editTask(done_status);
    };

    const unDone = () => {
        const done_status = false;
        editTask(done_status);
    };
    return (
        <div className='done-dialog'>
            <h5>Trạng thái</h5>
            <div >
                {item.done === 1 ?
                    <div className="task-check btn" onClick={() => unDone()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 30 31" fill="none">
                            <g filter="url(#filter0_d_356_544)">
                                <rect y="0.475586" width="28" height="28" rx="6" fill="#8CD4CB" />
                            </g>
                            <path d="M6 14.606C7.24162 14.9159 11.0413 16.873 12.1587 19.4756C13.3439 15.2928 18 7.25713 26 5.47559" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    :
                    item.done !== 1 && isDueDatePast(item.deadline) ?
                        <div className="task-check btn" onClick={() => done()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 30 31" fill="none">
                                <g filter="url(#filter0_d_359_551)">
                                    <rect y="0.475586" width="28" height="28" rx="6" fill="#F6A89E" />
                                </g>
                                <path d="M7 21.4756C11 14.9756 16.5 8.47559 21.5 7.47559" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" />
                                <path d="M7.56771 6.47561C9.91396 11.4756 12.914 15.9756 21.414 21.4756" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        :
                        <div className="task-check btn" onClick={() => done()}></div>
                }
            </div>
        </div>
    )
}

export default DoneDialog;