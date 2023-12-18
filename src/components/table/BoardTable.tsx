import React from 'react';
import AddTaskTable from './AddTaskTable';
import EditTask from '../kanban/EditTask';
import { Column, Member, Task } from '../../interface';
import Avatar from 'react-avatar';
import { useTheme } from "../../theme/ThemeProvider";
import axios from 'axios';
import { URL_API, colorMapLabel } from '../../utils';
import { useParams } from 'react-router-dom';

interface Data {
    columns: Column[];
    tasks: Task[];
}

interface BoardTableProps {
    data: Data;
    members: Member[]
}

const BoardTable: React.FC<BoardTableProps> = ({ data, members }) => {
    const { theme } = useTheme();
    const { boardID } = useParams<{ boardID?: string }>();

    function isDueDatePast(Due_Date: any) {
        const dueDate = new Date(Due_Date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Compare the dueDate with the current date
        return dueDate.getTime() < currentDate.getTime();
    }

    const editTask = async (done_status: boolean, task_id: string) => {
        const item: Task | undefined = data.tasks.find(element => element.id === task_id);
        if (item) {
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
        } else {
            console.error('Error editing task:');
        }
    };

    const done = (task_id: string) => {
        const done_status = true;
        editTask(done_status, task_id);
    };

    const unDone = (task_id: string) => {
        const done_status = false;
        editTask(done_status, task_id);
    };

    return (
        <div className='board-table' id={theme}>
            <div className='board-table-inner'>
                <table>
                    <thead>
                        <tr>
                            <th>STT
                                <AddTaskTable id={'0'} columns={data.columns} />
                            </th>
                            <th>Thẻ</th>
                            <th>Danh sách</th>
                            <th>Thành viên</th>
                            <th>Đến hạn</th>
                            <th>Nhãn</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((item: Task, index: number) => (
                            <React.Fragment key={item.id}>
                                <tr>
                                    <td>
                                        <AddTaskTable id={item.id} columns={data.columns} />
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{data.columns.find(element => element.id === item.dsach_id)?.name}</td>
                                    <td>
                                        <div className='list-members'>
                                            {members.map((member, index) => (
                                                Array.isArray(item.members_task?.split(', ')) && item.members_task?.split(', ').includes(member.user_id) ?
                                                    <Avatar key={index} name={member.email} size={'30'} round="20px" />
                                                    : <div key={index}></div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        {new Date(item.deadline).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </td>
                                    <td>
                                        <div className='label-box' style={{ background: colorMapLabel[item.label]?.color, width: '120px' }}>
                                            <p>{colorMapLabel[item.label]?.label}</p>
                                        </div>
                                    </td>
                                    <td>
                                        {item.done === 1 ?
                                            <div className="task-check btn" onClick={() => unDone(item.id)} style={{ marginLeft: '20px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 30 31" fill="none">
                                                    <g filter="url(#filter0_d_356_544)">
                                                        <rect y="0.475586" width="28" height="28" rx="6" fill="#8CD4CB" />
                                                    </g>
                                                    <path d="M6 14.606C7.24162 14.9159 11.0413 16.873 12.1587 19.4756C13.3439 15.2928 18 7.25713 26 5.47559" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            :
                                            item.done !== 1 && isDueDatePast(item.deadline) ?
                                                <div className="task-check btn" onClick={() => done(item.id)} style={{ marginLeft: '20px' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 30 31" fill="none">
                                                        <g filter="url(#filter0_d_359_551)">
                                                            <rect y="0.475586" width="28" height="28" rx="6" fill="#F6A89E" />
                                                        </g>
                                                        <path d="M7 21.4756C11 14.9756 16.5 8.47559 21.5 7.47559" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" />
                                                        <path d="M7.56771 6.47561C9.91396 11.4756 12.914 15.9756 21.414 21.4756" stroke="#F9F3E5" strokeWidth="3" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="task-check btn" onClick={() => done(item.id)} style={{ marginLeft: '20px' }}></div>
                                        }
                                    </td>
                                    <td>
                                        <EditTask item={item} members={members} status_title={data.columns.find(element => element.id === item.dsach_id)?.name || "tên danh sách"} >
                                            <div className='edit-board-table'>
                                                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path></svg>
                                            </div>
                                        </EditTask>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BoardTable;
