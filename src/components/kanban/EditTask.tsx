import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useParams } from "react-router-dom";
import MemberTask from "./MemberTask";
import LabelTask from "./LabelTask";
import DayTask from "./DayTask";
import { Member, Task } from "../../interface";
import MemberDialog from "./MemberDialog";
import LabelDialog from "./LabelDialog";
import DayDialog from "./DayDialog";
import MoreOption from "../MoreOption";
import { URL_API } from '../../utils';
import DoneDialog from "./DoneDialog";
interface EditTaskProps {
    children: React.ReactNode;
    item: Task;
    members: Member[];
    status_title: string;
}

const EditTask: React.FC<EditTaskProps> = ({ children, item, members, status_title }) => {
    const [open, setOpen] = useState(false);
    const [isMemberOpen, setMemberOpen] = useState(false);
    const [isLabelOpen, setLabelOpen] = useState(false);
    const [isJobsOpen, setJobsOpen] = useState(false);
    const [isDayOpen, setDayOpen] = useState(false);
    const [description, setDescription] = useState<string>(item.description);
    const { boardID } = useParams<{ boardID?: string }>();

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
        setDayOpen(false);
        setJobsOpen(false);
        setLabelOpen(false);
        setMemberOpen(false);
    };

    const toggleMember = () => {
        setMemberOpen((prev) => !prev);
        setDayOpen(false);
        setJobsOpen(false);
        setLabelOpen(false);
    };

    const toggleLabel = () => {
        setLabelOpen((prev) => !prev);
        setDayOpen(false);
        setJobsOpen(false);
        setMemberOpen(false);
    };

    const toggleDay = () => {
        setDayOpen((prev) => !prev);
        setJobsOpen(false);
        setLabelOpen(false);
        setMemberOpen(false);
    };

    const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (isMemberOpen) {
            setMemberOpen(false);
        };
        if (isDayOpen) {
            setDayOpen(false);
        }
        if (isJobsOpen) {
            setJobsOpen(false);
        }
        if (isLabelOpen) {
            setLabelOpen(false);
        }
    };

    useEffect(() => {
        setDescription(item.description);
    }, [item])

    const editTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                    description: description,
                    label: item.label,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
            alert('Đã lưu!');
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const deleteTask = async () => {
        try {
            const response = await axios.delete(`${URL_API}/task/delete`, {
                data: {
                    board_id: boardID,
                    taskId: item.id,
                }
            });
            const responseData = response.data;
            console.log('deleted successfully:', responseData);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    const renameTask = async (name: string) => {
        try {
            const response = await axios.put(`${URL_API}/task/edit`, {
                board_id: boardID,
                task: {
                    id: item.id,
                    name: name,
                    deadline: item.deadline,
                    dsach_id: item.dsach_id,
                    bang_id: boardID,
                    members_task: item.members_task,
                    done: item.done,
                    description: item.description,
                    label: item.label,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    }

    return (
        <div className="edit-task btn" onClick={handleClickToOpen}>
            {children}
            <Dialog onClose={handleToClose} open={open}
                disableScrollLock
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "768px",  // Set your width here
                        },
                    },
                }}
            >
                <div className="edit-task-container">
                    <div className="edit-task-inner">
                        <div className="task-title">
                            <div className="task-icon">
                                <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 17H9.2C8.07989 17 7.51984 17 7.09202 16.782C6.71569 16.5903 6.40973 16.2843 6.21799 15.908C6 15.4802 6 14.9201 6 13.8V11C6 11.9319 6 12.3978 6.15224 12.7654C6.35523 13.2554 6.74458 13.6448 7.23463 13.8478C7.60218 14 8.06812 14 9 14M3 8H21M12 11H18M13 14H18M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="#44546f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </div>
                            <div>
                                <h2>{item.name}</h2>
                                <p>trong danh sách <span>{status_title}</span></p>
                            </div>
                            <div className='close btn' onClick={handleToClose}>
                                <svg height="20px" style={{ fill: '#44546f' }} id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="task-content">
                            <div className="task-detail">
                                <div className="description-box">
                                    <MemberDialog members={members} item={item} />
                                    <LabelDialog item={item} />
                                    <DayDialog item={item} />
                                    <DoneDialog item={item}/>
                                </div>
                                <div className="description">
                                    <div className="des-icon">
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Menu_Alt_04"> <path id="Vector" d="M5 17H19M5 12H19M5 7H13" stroke="#44546f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                                    </div>
                                    <form onSubmit={editTask}>
                                        <div className="des-content">
                                            <h3>Mô tả</h3>
                                            <textarea value={description || ""} onChange={(e) => setDescription(e.target.value)} placeholder="Thêm mô tả chi tiết hơn..." />
                                            <button type="submit">Lưu</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-title">
                                    <h5 style={{ color: '#44546f' }}>Thêm vào thẻ</h5>
                                    <MoreOption type={'Thẻ'} title={item.name} onDelete={deleteTask} rename={renameTask} />
                                </div>
                                <div className="item-card-outer">
                                    <div className="item-card" onClick={toggleMember}>
                                        <div className="btn item-card-inner">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12.25C11.2583 12.25 10.5333 12.0301 9.91661 11.618C9.29993 11.206 8.81928 10.6203 8.53545 9.93506C8.25163 9.24984 8.17736 8.49584 8.32206 7.76841C8.46675 7.04098 8.8239 6.3728 9.34835 5.84835C9.8728 5.3239 10.541 4.96675 11.2684 4.82206C11.9958 4.67736 12.7498 4.75162 13.4351 5.03545C14.1203 5.31928 14.706 5.79993 15.118 6.41661C15.5301 7.0333 15.75 7.75832 15.75 8.5C15.75 9.49456 15.3549 10.4484 14.6517 11.1517C13.9484 11.8549 12.9946 12.25 12 12.25ZM12 6.25C11.555 6.25 11.12 6.38196 10.75 6.62919C10.38 6.87643 10.0916 7.22783 9.92127 7.63896C9.75098 8.0501 9.70642 8.5025 9.79323 8.93895C9.88005 9.37541 10.0943 9.77632 10.409 10.091C10.7237 10.4057 11.1246 10.62 11.561 10.7068C11.9975 10.7936 12.4499 10.749 12.861 10.5787C13.2722 10.4084 13.6236 10.12 13.8708 9.75003C14.118 9.38002 14.25 8.94501 14.25 8.5C14.25 7.90326 14.0129 7.33097 13.591 6.90901C13.169 6.48705 12.5967 6.25 12 6.25Z" fill="#44546f"></path> <path d="M19 19.25C18.8019 19.2474 18.6126 19.1676 18.4725 19.0275C18.3324 18.8874 18.2526 18.6981 18.25 18.5C18.25 16.55 17.19 15.25 12 15.25C6.81 15.25 5.75 16.55 5.75 18.5C5.75 18.6989 5.67098 18.8897 5.53033 19.0303C5.38968 19.171 5.19891 19.25 5 19.25C4.80109 19.25 4.61032 19.171 4.46967 19.0303C4.32902 18.8897 4.25 18.6989 4.25 18.5C4.25 13.75 9.68 13.75 12 13.75C14.32 13.75 19.75 13.75 19.75 18.5C19.7474 18.6981 19.6676 18.8874 19.5275 19.0275C19.3874 19.1676 19.1981 19.2474 19 19.25Z" fill="#44546f"></path> </g></svg>
                                            <p>Thành viên</p>
                                        </div>
                                    </div>
                                    <MemberTask trigger={isMemberOpen} close={toggleClose} members={members} item={item} />
                                </div>

                                <div className="item-card-outer">
                                    <div className="btn item-card" onClick={toggleLabel}>
                                        <div className="item-card-inner">
                                            <svg width="20px" height="17px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#44546f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.414 5.586l-11 11a2 2 0 000 2.828l8.172 8.172a2 2 0 002.828 0l11-11A2 2 0 0027 15.172V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586zM10 19l5.5-5.5M13 22l2.5-2.5"></path> <path fill="#44546f" d="M23 10a1 1 0 11-2 0 1 1 0 012 0z"></path> </g></svg>
                                            <p>Nhãn</p>
                                        </div>
                                    </div>
                                    <LabelTask trigger={isLabelOpen} close={toggleClose} item={item} />
                                </div>
                                <div className="item-card-outer">
                                    <div className="btn item-card" onClick={toggleDay}>
                                        <div className="item-card-inner">
                                            <svg width="20px" height="18px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#44546f"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="work-case" fill="#44546f" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M234.666667,106.666667 L234.666667,225.813333 L292.418278,283.581722 L262.248389,313.751611 L192,243.503223 L192,106.666667 L234.666667,106.666667 Z" id="reading-time"> </path> </g> </g> </g></svg>
                                            <p>Ngày</p>
                                        </div>
                                    </div>
                                    <DayTask trigger={isDayOpen} close={toggleClose} item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditTask;