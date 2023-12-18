import mysql from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM nguoi_dung")
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`SELECT id as user_id, email  FROM nguoi_dung WHERE id = ?`, [id])
    return rows[0]
}

export async function login(email, password) {
    const [rows] = await pool.query(`SELECT * FROM nguoi_dung WHERE email = ? AND password = ?;`, [email, password])
    return rows[0]
}

export async function loginVia(email) {
    const id = uuidv4();
    const password = '';
    const [result] = await pool.query(`
    insert into nguoi_dung (id, email, password)
    values(?, ?, ?)
    `, [id, email, password])
    return getUser(id);
}

export async function findUserByEmail(email) {
    const [rows] = await pool.query(`SELECT id as user_id, email  FROM nguoi_dung WHERE email = ?`, [email])
    return rows
}

export async function register(email, password) {
    const id = uuidv4();
    const [result] = await pool.query(`
    insert into nguoi_dung (id, email, password)
    values(?, ?, ?)
    `, [id, email, password])
    return result;
}

export async function addBoard(owner_id, name, background, members) {
    const id = uuidv4();
    const [result] = await pool.query(`
    insert into bang_cv (id, name, owner_id, background, members)
    values(?, ?, ?, ?, ?)
    `, [id, name, owner_id, background, members])
    return id;
}

export async function updateMemberBoard(members, board_id) {
    const [rows] = await pool.query(`UPDATE bang_cv SET members = ? WHERE id = ?`, [members, board_id]);
    return rows;
}

export async function renameBoard(board_id, name) {
    const [rows] = await pool.query(`UPDATE bang_cv SET name = ? WHERE id = ?`, [name, board_id]);
    return rows[0]
}

export async function deleteBoard(board_id) {
    const [rows3] = await pool.query(`DELETE from the_cv where bang_id = ?`, [board_id]);
    const [rows2] = await pool.query(`DELETE from danh_sach_cv where bang_id = ?`, [board_id]);
    const [rows1] = await pool.query(`DELETE from bang_cv where id = ?`, [board_id]);
    return 'sucess delete board';
}

export async function addColumn(board_id, backgound) {
    const id = uuidv4();
    const name = "new column";
    const time_created = new Date().toISOString();
    const [rows] = await pool.query(`
            INSERT INTO danh_sach_cv (id, name, background, bang_id, created)
            VALUES (?, ?, ?, ?, ?)
        `, [id, name, backgound, board_id, time_created]);

    return getBoardData(board_id);
}

export async function updateColumn(id, board_id, name, backgound) {
    const [rows] = await pool.query(`UPDATE danh_sach_cv SET name = ? , background = ? WHERE id= ? AND bang_id = ?`, [name, backgound, id, board_id])
    return rows[0]
}

export async function deleteColumn(id, board_id) {
    
    const [rows2] = await pool.query(`delete from the_cv where dsach_id = ? and bang_id = ?`, [id, board_id]);
    const [rows1] = await pool.query(`delete from danh_sach_cv where id = ? and bang_id = ?`, [id, board_id]);
    return 'sucess delete column'
}

export async function addTask(board_id, column_id, name, deadline) {
    const id = uuidv4();
    const [rows] = await pool.query(`
    insert into the_cv (id, name, bang_id, dsach_id, deadline, done)
    values(?, ?, ?, ?, ?, ?)
    `, [id, name, board_id, column_id, deadline, 0])
    return getBoardData[board_id]
}

export async function updateColumnForTask(id, board_id, column_id) {
    const [rows] = await pool.query(`UPDATE the_cv SET dsach_id = ? WHERE id= ? and bang_id = ?`, [column_id, id, board_id])
    return rows[0]
}

export async function editTask(id, column_id, board_id, name, deadline, label, description, members_task, done) {
    const [rows] = await pool.query(`UPDATE the_cv SET 
        name = ?, deadline = ?, label = ?, description = ?, members_task = ?, done = ?
        WHERE id = ? and dsach_id = ? and bang_id = ?
    `, [name, deadline, label, description, members_task, done, id, column_id, board_id]);
    return rows[0];
}


export async function deleteTask(id, board_id) {
    const [rows] = await pool.query(`delete from the_cv where id = ? and bang_id = ?`, [id, board_id]);
    return rows[0]
}

export async function getBoardData(board_id) {
    const [bang_cv] = await pool.query(`
    select * from bang_cv where id = ? ORDER BY name`, [board_id]);
    const [danh_sach_cv] = await pool.query(`
    select * from danh_sach_cv where bang_id = ? ORDER BY created ASC`, [board_id]);
    const [the_cv] = await pool.query(`
    select * from the_cv where bang_id = ? ORDER BY done ASC, STR_TO_DATE(deadline, '%Y-%m-%d');`, [board_id]);
    const data = { "boards": bang_cv[0], "columns": danh_sach_cv, "tasks": the_cv }
    return data
}

export async function getBoardsByUser(user_id) {
    const [rows] = await pool.query(`
    select * from bang_cv where owner_id = ?`, [user_id]);
    return rows;
}

export async function getBoardById(id) {
    const [rows] = await pool.query(` select * from bang_cv where id = ?`, [id]);
    return rows[0];
}

export async function getBackgrounds() {
    const [rows] = await pool.query(`select * from backgrounds`);
    return rows
}
