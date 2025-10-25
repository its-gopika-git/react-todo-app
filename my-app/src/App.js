import React from 'react';
import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashBoard } from './components/DashBoard';
function App() {
  return (
<BrowserRouter basename={process.env.PUBLIC_URL || '/react-todo-app'}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;