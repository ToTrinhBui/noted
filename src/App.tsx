import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Table from './pages/Table';
import Charts from './pages/Charts';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user/:id/boards' element={<Dashboard />} />
          <Route path='/search' element={<Search />} />
          <Route path='/board/table/:boardID' element={<Table />} />
          <Route path='/board/kanban/:boardID' element={<Kanban />} />
          <Route path='/board/charts/:boardID' element={<Charts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
