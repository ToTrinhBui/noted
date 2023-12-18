import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import BoardChart from "../components/charts/BoardChart";
import { useSelector } from "react-redux";
import { selectUser, accessBoard } from "../redux/userSlice";
import NotFound from "./NotFound";
import { Member, Task, Column } from "../interface";
import Loading from "../components/Loading";
import { URL_API } from "../utils";
import "../styles/index.css";
import "../styles/charts.css";
import { useDispatch } from "react-redux";

interface Data {
    columns: Column[];
    tasks: Task[];
}
const Charts = () => {
    const [data, setData] = useState<Data>({
        columns: [],
        tasks: [],
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
            const data_db: Data = {
                columns: [...response.columns],
                tasks: [...response.tasks],
            };
            setData(data_db);
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

    const check = user_redux && members.filter(member => member.user_id === user_redux.id).length > 0;

    if (loading) {
        return <Loading />;
    }

    if (check) {
        return (
            <div style={{ 'backgroundImage': `url(${background_link})`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat', 'backgroundAttachment': 'fixed' }}>
                <NavbarUser />
                <div className="charts">
                    <Heading members={members} nameBoard={nameBoard} ownerBoard={ownerBoard} />
                    <BoardChart data={data} members={members} />
                </div>
            </div>
        )
    }
    return <NotFound />;
}
export default Charts;