import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard.tsx';
import AddTask from './AddTask.tsx';
import { useParams } from 'react-router-dom';
import AddColumn from './AddColumn.tsx';
import EditColumn from './EditColumn.tsx';
import { URL_API } from '../../utils.ts';

const Board = (props) => {
    const [columns, setColumns] = useState('');
    const { boardID } = useParams();
    
    useEffect(() => {
        setColumns(props.data.columns);
        // setColumns(columnsFromBackend)
    }, [props.data]);

    const updateTaskStatus = async (taskId, newStatus, updatedColumns) => {
        try {
            const response = await axios.put(`${URL_API}/task/update`, {
                board_id: boardID,
                task_id: taskId,
                status: newStatus,
            });
            const updatedTask = response.data;
            console.log('Task updated successfully:', updatedTask);
            setColumns(updatedColumns);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            };
            setColumns(updatedColumns); // Update the columns state before calling updateTaskStatus
            updateTaskStatus(removed.id, destination.droppableId, updatedColumns);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            };
            setColumns(updatedColumns);
            // updateTaskStatus(removed.id, source.droppableId);
        }
    };

    return (
        <>
            {props ? (
                <div className='board'>
                    <DragDropContext
                        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                    >
                        <div className='container'>
                            <div className='task-column-styles'>
                                {Object.entries(columns)?.map(([columnId, column], index) => {
                                    return (
                                        <Droppable key={index} droppableId={columnId}>
                                            {(provided, snapshot) => (
                                                <div className='task-list'
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    style={{ 'background': column.background}}
                                                >
                                                    <div className='task-list-header'>
                                                        <div className='title-column'>{column.title}</div>
                                                        <EditColumn columnId={columnId} title={column.title} background={column.background}/>
                                                    </div>
                                                    <div className='tasks'>
                                                        {column.items?.map((item, index) => (
                                                            <TaskCard key={index} item={item} index={index} members={props.members} status_title={column.title} />
                                                        ))}
                                                        {provided.placeholder}
                                                        <AddTask statusID={columnId} />
                                                    </div>
                                                </div>
                                            )}
                                        </Droppable>
                                    );
                                })}
                                <AddColumn />
                            </div>
                        </div>
                    </DragDropContext>
                </div>
            ) :
                <div>Loading</div>}
        </>
    );
};

export default Board;
