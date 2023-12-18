import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditTask from './EditTask';
import { Member, Task } from '../../interface';
import { useTheme } from "../../theme/ThemeProvider";
import axios from 'axios';
import { URL_API, colorMapLabel } from '../../utils';
import { useParams } from 'react-router-dom';

interface TaskCardProps {
    item: Task;
    index: number;
    members: Member[];
    status_title: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index, members, status_title }) => {
    const { theme } = useTheme();
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

    // Get the corresponding color from the mapping
    const label: string = item.label || '0'
    const strokeColor: string = colorMapLabel[label]?.color ;

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div id={theme} className='task-card'>
                        <EditTask item={item} members={members} status_title={status_title}>
                            <div className='task-body'>
                                <div>
                                    <p>{item.name}</p>
                                    <span className='task-date'>
                                        {new Date(item.deadline).toLocaleDateString("en-GB")}
                                    </span>
                                </div>
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle style={{ stroke: strokeColor }} cx="12" cy="11.9999" r="9" stroke="#00000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <rect style={{ stroke: strokeColor }} x="12" y="16" width="0.01" height="0.01" stroke="#00000000" strokeWidth="3.75" strokeLinejoin="round"></rect>
                                    <path style={{ stroke: strokeColor }} d="M12 12L12 8" stroke="#00000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        </EditTask >
                        <div >
                            {item.done === 1 ?
                                <div className="task-check btn" onClick={() => unDone()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 30 31" fill="none">
                                        <g filter="url(#filter0_d_356_544)">
                                            <rect y="0.475586" width="28" height="28" rx="6" fill="#8CD4CB" />
                                        </g>
                                        <path d="M6 14.606C7.24162 14.9159 11.0413 16.873 12.1587 19.4756C13.3439 15.2928 18 7.25713 26 5.47559" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                :
                                item.done !== 1 && isDueDatePast(item.deadline) ?
                                    <div className="task-check btn" onClick={() => done()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 30 31" fill="none">
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
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
