import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import Board from "../components/kanban/Board";
import { URL_API } from "../utils";
import "../styles/index.css";
import "../styles/kanban.css";
import { Column, Member, Task } from "../interface";
import { useSelector } from "react-redux";
import { accessBoard, selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
interface FormColumn {
    title: string;
    items: Task[];
    background: string;
}
interface Data {
    columns: Column[];
    tasks: Task[];
}

interface NewData {
    columns: {
        [key: string]: FormColumn;
    }
}
export default function Kanban() {
    const [data, setData] = useState<NewData>({
        columns: {}
    });
    const [members, setMembers] = useState<Member[]>([]);
    const [nameBoard, setNameBoard] = useState<string>('Name board');
    const [ownerBoard, setOwnerBoard] = useState<string>('');
    const [background_link, setBackgroundLink] = useState<string>('');
    const { boardID } = useParams<{ boardID?: string }>();
    const user_redux = useSelector(selectUser).user;
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    dispatch(accessBoard({
        justAccessed: boardID
    }))

    useEffect(() => {
        const newWs = new WebSocket('ws://localhost:8080');

        newWs.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
            if (boardID)
                newWs.send(boardID);
        });

        newWs.addEventListener('message', async (event) => {
            const response = JSON.parse(event.data);
            console.log('Received updated data:', response);
            const newData = addTaskToColumns(response);
            setData(newData);
            setNameBoard(response.boards.name);
            setOwnerBoard(response.boards.owner_id);
            setBackgroundLink(response.boards.background);

            // Fetch members asynchronously and update state
            const memberFilter: Member[] = response.boards?.members.split(', ');
            const updatedMembers = await Promise.all(memberFilter.map(async (member_id) => {
                try {
                    const member_response = await axios.get(`${URL_API}/users?id=${member_id}`);
                    const memberWithEmail = member_response.data
                    return memberWithEmail;
                } catch (error) {
                    console.error(`Error fetching user with id ${member_id}:`, error);
                    return null; // You can choose how to handle errors here
                }
            }));

            // Cast the array to the correct type before passing to setMembers
            setMembers(updatedMembers.filter((member): member is Member => member !== null));
            setLoading(false);
        });

        return () => {
            newWs.close();
        };
    }, [boardID]);


    function addTaskToColumns(data: Data): NewData {
        const newData: NewData = {
            columns: {}
        };

        data.columns.forEach(element => {
            newData.columns[element.id] = {
                title: element.name,
                items: [],
                background: element.background
            }
        })

        for (const task of data.tasks) {
            const matchingColumnKey = Object.keys(newData.columns).find(
                (columnKey) => columnKey === task.dsach_id
            );
            if (matchingColumnKey) {
                const matchingColumn = newData.columns[matchingColumnKey];
                matchingColumn.items = matchingColumn.items || [];
                matchingColumn.items.push(task);
            }
        }

        // Add empty arrays to columns with no matching tasks
        Object.values(newData.columns).forEach((column) => {
            if (!column.items || column.items.length === 0) {
                column.items = [];
            }
        });

        return newData;
    }

    const check = user_redux && members.filter(member => member.user_id === user_redux.id).length > 0;

    if (loading) {
        return <Loading />;
    }

    if (check) {
        return (
            <div style={{ 'backgroundImage': `url(${background_link})`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat', 'backgroundAttachment': 'fixed' }}>
                <NavbarUser />
                <div className="kanban">
                    <Heading members={members} nameBoard={nameBoard} ownerBoard={ownerBoard} />
                    <Board data={data} members={members} />
                </div>
            </div>
        )
    }
    return <NotFound />;
};