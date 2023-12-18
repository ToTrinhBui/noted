// const http = require('http');
// const WebSocket = require('ws');
// const axios = require('axios');
import { createServer } from 'http';
import WebSocket from 'ws';
import axios from 'axios';
// import { URL_API } from './src/utils.ts';

const server = createServer((req, res) => {
    // ...
});

const wss = new WebSocket.Server({ server });

async function handleDataUpdate(wss, board_id) {
    try {
        const response = await axios.get(`http://localhost:3001/boards/${board_id}`);
        const responseData = response.data;

        // Broadcast the fetched data to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(responseData));
            }
        });
    } catch (error) {
        console.error('Error fetching data using REST API:', error);
    }
}

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        console.log('Received:', message);

        const board_id = message; // Assuming the received message is the board ID

        // Call the function to handle data update and broadcasting
        await handleDataUpdate(wss, board_id);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

export { wss, handleDataUpdate };
