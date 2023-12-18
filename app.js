import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { wss, handleDataUpdate } from './websocket.js';
import {
    login, loginVia, register, findUserByEmail, updateMemberBoard, renameBoard, addColumn, updateColumn,
    deleteColumn, updateColumnForTask, addTask, editTask, deleteTask, getBoardData, getBoardsByUser, getBackgrounds, addBoard, getUser, deleteBoard, getBoardById
} from './database.js';

const app = express();
app.use(cors());
const port = 3001; // Set your desired port

// Middleware
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    try {
        const { id } = req.query;
        const user = await getUser(id);
        res.send(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/users/email', async (req, res) => {
    try {
        const { email } = req.query;
        console.log(req.query)
        const user = await findUserByEmail(email);
        res.send(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/users/login', async (req, res) => {
    const { user } = req.body;
    const user_db = await login(user.email, user.password);
    console.log('Received request:', req.body);
    if (user_db) {
        res.status(200).json({
            'id': user_db.id,
            'email': user_db.email,
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials', requestPayload: req.body });
    }
});

app.post('/users/login-via', async (req, res) => {
    const { user } = req.body;
    let user_db = await login(user.email, '');
    console.log('Received request:', req.body);
    if (user_db) {
        res.status(200).json({
            'id': user_db.id,
            'email': user_db.email,
        });
    } else {
        user_db = await loginVia(user.email);
        res.status(200).json({
            'id': user_db.id,
            'email': user_db.email,
        });
    }
});

app.post('/users/register', async (req, res) => {
    const { user } = req.body;
    const user_db = await findUserByEmail(user.email);
    console.log('Received request:', req.body);
    if (user_db) {
        res.status(401).json({ error: 'Email has been used!' })
    } else {
        const new_user = await register(user.email, user.password);
        res.status(200).json({
            'id': new_user.id,
            'email': new_user.email,
        });
    }
});

app.post('/boards', async (req, res) => {
    const { user_id, name, background, members } = req.body;
    try {
        const board = await addBoard(user_id, name, background, members);
        res.status(200).json({
            'id': board
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

app.delete('/boards', async (req, res) => {
    const { board_id, user_id } = req.query;
    console.log('Received request:', req.query);
    const board = await getBoardById(board_id);
    if(board.owner_id === user_id) {
        await deleteBoard(board_id);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull delete board' });
    } else {
        res.status(401).json({ error: "You aren't allowed to delete this board", requestPayload: req.body });
    }
})

app.put('/board/member/update', async (req, res) => {
    const { board_id, members } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await updateMemberBoard(members, board_id);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new member in board' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

app.put('/board/rename', async (req, res) => {
    const { board_id, name } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await renameBoard(board_id, name);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull rename board', 'name': name });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

app.post('/status/add', async (req, res) => {
    const { board_id, background } = req.body;
    try {
        await addColumn(board_id, background);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new column in board' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});

app.put('/status/update', async (req, res) => {
    const { board_id, id, name, background } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await updateColumn(id, board_id, name, background);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull update column in board' });
    }  catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});

app.delete('/status/delete', async (req, res) => {
    const { board_id, columnId } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await deleteColumn(columnId, board_id);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull delete column in board' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});

app.put('/task/update', async (req, res) => {
    // update status
    const { board_id, task_id, status } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await updateColumnForTask(task_id, board_id, status);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull update task' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});

app.post('/task/add', async (req, res) => {
    const { board_id, Task, Due_Date, status } = req.body;
    try {
        await addTask(board_id, status, Task, Due_Date);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new task' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
})

app.put('/task/edit', async (req, res) => {
    const { board_id, task } = req.body;
    try {
        await editTask(task.id, task.dsach_id, task.bang_id, task.name, task.deadline, task.label, task.description, task.members_task, task.done);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new task' });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});

app.delete('/task/delete', async (req, res) => {
    const { board_id, taskId } = req.body;
    console.log('Received request:', req.body); // Log the request body
    try {
        await deleteTask(taskId, board_id);
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json('Successfully deleted');
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Invalid credentials. Can\'t find board', requestPayload: req.body });
    }
});


app.get("/boards/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const board = await getBoardData(id);
        res.send(board);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/boards", async (req, res) => {
    try {
        const { user_id } = req.query;
        const boards = await getBoardsByUser(user_id);
        res.send(boards);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/backgrounds", async (req, res) => {
    try {
        const listBackground = await getBackgrounds();
        res.send(listBackground);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});