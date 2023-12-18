import React, { useState } from 'react';
import { Task } from '../../interface';
import DayTask from './DayTask';

interface CardProps {
  item: Task;
}
const DayDialog: React.FC<CardProps> = ({ item }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isOpen) {
      setOpen(false);
    }
  };

  const dueDate = new Date(item.deadline);
  const isValidDueDate = !isNaN(dueDate.getTime());

  if (isValidDueDate) {
    return (
      <div>
        <h5>Ngày hết hạn</h5>
        <div className='day-dialog btn' onClick={toggle}>
          {new Date(item.deadline).toLocaleDateString("en-GB")}
        </div>
        <DayTask trigger={isOpen} close={toggleClose} item={item} />
      </div>
    )
  }
  return <></>;
}

export default DayDialog;