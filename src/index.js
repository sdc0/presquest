import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import StudentHome from "./pages/student-home";
import TeacherHome from "./pages/teacher-home";
import Student from "./pages/student";
import Teacher from './pages/teacher';

import './index.css';

export default function App() {
    const [class_id, set_class_id] = useState("");
    const [username, set_username] = useState("");

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<StudentHome class_id={class_id} set_class_id={set_class_id} username={username} set_username={set_username} />} />
                <Route path='teacher-home' element={<TeacherHome class_id={class_id} set_class_id={set_class_id} />} />
                <Route path='student' element={<Student class_id={class_id} set_class_id={set_class_id} username={username} set_username={set_username} />} />
                <Route path='teacher' element={<Teacher class_id={class_id} set_class_id={set_class_id} />} />
            </Routes>
        </HashRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);