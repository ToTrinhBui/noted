import React, { useState } from 'react';
import CardsPerListBar from './CardsPerListBar'
import { Member, Task, Column } from '../../interface';
import CardsPerMemberBar from './CardsPerMemberBar';
import CardsPerListPie from './CardsPerListPie';
import CardsPerMemberPie from './CardsPerMemberPie';
import CardsPerDeadlineBar from './CardsPerDeadlineBar';
import CardsPerLabelBar from './CardsPerLabelBar';
import CardsPerLabelPie from './CardsPerLabelPie';
import CardsPerDeadlineLine from './CardsPerDeadlineLine';
import { useTheme } from '../../theme/ThemeProvider';
interface Data {
    columns: Column[];
    tasks: Task[];
}
interface BoardChartProps {
    data: Data;
    members: Member[];
}
const BoardChart: React.FC<BoardChartProps> = ({ data, members }) => {
    const { theme } = useTheme()

    const [isOpen1, setIsOpen1] = useState<boolean>(false);
    const [isOpen2, setIsOpen2] = useState<boolean>(false);
    const [isOpen3, setIsOpen3] = useState<boolean>(false);
    const [isOpen4, setIsOpen4] = useState<boolean>(false);
    const [box1, setBox1] = useState<boolean>(true);
    const [box2, setBox2] = useState<boolean>(true);
    const [box3, setBox3] = useState<boolean>(true);
    const [box4, setBox4] = useState<boolean>(true);

    const toggle = (id: number) => {
        if (id === 1) {
            setIsOpen1((prev) => !prev);
            setIsOpen2(false);
            setIsOpen3(false);
            setIsOpen4(false);
        }
        else if (id === 2) {
            setIsOpen2((prev) => !prev);
            setIsOpen1(false);
            setIsOpen3(false);
            setIsOpen4(false);
        }
        else if (id === 3) {
            setIsOpen3((prev) => !prev);
            setIsOpen1(false);
            setIsOpen2(false);
            setIsOpen4(false);
        }
        else {
            setIsOpen4((prev) => !prev);
            setIsOpen1(false);
            setIsOpen2(false);
            setIsOpen3(false);
        }
    };

    const handleToClose = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    return (
        <div className='board-chart' id={theme}>
            <div className='board-chart-inner'>
                <div className='chart-outer'>
                    <div className='more-option'>
                        <div className='more-icon btn' onClick={() => toggle(1)}>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>  </g></svg>
                        </div>
                        {isOpen1 &&
                            <div className='more-item'>
                                <div className='option-part btn' onClick={() => { setBox1(true); handleToClose() }}>Biểu đồ cột</div>
                                <div className='option-part btn' onClick={() => { setBox1(false); handleToClose() }}>Biểu đồ tròn</div>
                            </div>
                        }
                    </div>
                    {box1 ? <CardsPerListBar data={data} /> : <CardsPerListPie data={data} />}
                </div>
                <div className='chart-outer'>
                    <div className='more-option'>
                        <div className='more-icon btn' onClick={() => toggle(2)}>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>  </g></svg>
                        </div>
                        {isOpen2 &&
                            <div className='more-item'>
                                <div className='option-part btn' onClick={() => { setBox2(true); handleToClose() }}>Biểu đồ tròn</div>
                                <div className='option-part btn' onClick={() => { setBox2(false); handleToClose() }}>Biểu đồ cột</div>
                            </div>
                        }
                    </div>
                    {box2 ? <CardsPerLabelPie data={data} /> : <CardsPerLabelBar data={data} />}
                </div>
                <div className='chart-outer'>
                    <div className='more-option'>
                        <div className='more-icon btn' onClick={() => toggle(3)}>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>  </g></svg>
                        </div>
                        {isOpen3 &&
                            <div className='more-item'>
                                <div className='option-part btn' onClick={() => { setBox3(true); handleToClose() }}>Biểu đồ đường</div>
                                <div className='option-part btn' onClick={() => { setBox3(false); handleToClose() }}>Biểu đồ cột</div>
                            </div>
                        }
                    </div>
                    {box3 ? <CardsPerDeadlineLine data={data} /> : <CardsPerDeadlineBar data={data} />}
                </div>
                <div className='chart-outer'>
                    <div className='more-option'>
                        <div className='more-icon btn' onClick={() => toggle(4)}>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>  </g></svg>
                        </div>
                        {isOpen4 &&
                            <div className='more-item'>
                                <div className='option-part btn' onClick={() => { setBox4(true); handleToClose() }}>Biểu đồ cột</div>
                                <div className='option-part btn' onClick={() => { setBox4(false); handleToClose() }}>Biểu đồ tròn</div>
                            </div>
                        }
                    </div>
                    {box4 ? <CardsPerMemberBar data={data} members={members} /> : <CardsPerMemberPie data={data} members={members} />}
                </div>
            </div>
        </div>
    )
}

export default BoardChart