import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import StudentHome from "./pages/student-home";
import TeacherHome from "./pages/teacher-home";
import Student from "./pages/student";
import Teacher from './pages/teacher';

import './index.css';

export default function App() {
    const [current_class, set_current_class] = useState("");
    const [username, set_username] = useState("");

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<StudentHome current_class={current_class} set_current_class={set_current_class} username={username} set_username={set_username} />} />
                <Route path='teacher-home' element={<TeacherHome current_class={current_class} set_current_class={set_current_class} />} />
                <Route path='student' element={<Student current_class={current_class} set_current_class={set_current_class} username={username} set_username={set_username} />} />
                <Route path='teacher' element={<Teacher current_class={current_class} set_current_class={set_current_class} />} />
            </Routes>
        </HashRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);