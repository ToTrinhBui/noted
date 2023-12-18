import React, { useState, useEffect } from 'react';
import { Task } from '../../interface';
import LabelTask from './LabelTask';
import { colorMapLabel } from '../../utils';

interface CardProps {
  item: Task;
}
const LabelDialog: React.FC<CardProps> = ({ item }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };
  if (item.label)
    return (
      <div>
        <h5>Nhãn</h5>
        <div className='label-dialog'>
          {Object.entries(colorMapLabel)?.map(([labelId, label], index) => (
            item.label === labelId && (
              <div className='label-box' key={index} style={{ background: label.color }}>
                <p>{label.label}</p>
              </div>
            )
          ))}
          <div className='label-box-add btn' onClick={toggle}>
            <svg width='14px' height='14px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#778899'> <g id='SVGRepo_bgCarrier' strokeWidth='0'></g> <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g><g id='SVGRepo_iconCarrier'><path d='M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z' fill='#778899' ></path></g></svg>
          </div>
        </div>
        <LabelTask trigger={isOpen} close={toggleClose} item={item} />
      </div>
    )
  return <></>
}


export default LabelDialog