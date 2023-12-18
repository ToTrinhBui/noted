import React from 'react';
import { Task } from '../../interface';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_API, colorMapLabel } from '../../utils';
interface CardProps {
    trigger: boolean,
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    item: Task;
}

const LabelTask: React.FC<CardProps> = ({ trigger, close, item }) => {
    const { boardID } = useParams<{ boardID?: string }>();

    const editTask = async (label: string ) => {
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
                done: item.done,
                description: item.description,
                label: label,
            }
        })
        const editedTask = response.data;
        console.log('Task updated successfully:', editedTask);
    } catch (error) {
        console.error('Error editing task:', error);
    }
};

const check = (labelId: string) => {
    editTask(labelId);
};

const unCheck = () => {
    editTask('0');
};

if (trigger) {
    return (
        <div className='overlay'>
            <div className='card-box'>
                <div className='title-card'>
                    <h4 style={{ width: '90%', textAlign: 'center' }}>Nhãn</h4>
                    <div className='close-card btn' onClick={close}>
                        <svg
                            height="12px"
                            style={{ fill: '#868686' }}
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                        </svg>
                    </div>
                </div>
                <div className='card-content'>
                    <h5>Nhãn</h5>
                    {Object.entries(colorMapLabel)?.map(([labelId, label], index) => (
                        <div className='label-card' key={labelId}>
                            {labelId === item.label ? (
                                <div className='tick-box btn' onClick={() => unCheck()} style={{ background: "#0c66e4" }}>
                                    <svg fill="#ffffff" width="16px" height="16px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path></g></svg>
                                </div>
                            ) : (
                                <div className='tick-box btn' onClick={() => check(labelId)} style={{ background: 'transparent' }}>
                                </div>
                            )}
                            <div className='label-title' style={{ background: label.color }}>
                                <p>{label.label}</p>
                            </div>
                            <div className='edit-label'>
                                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}
return <></>;
}

export default LabelTask;