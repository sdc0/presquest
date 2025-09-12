import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import StudentHome from "./pages/student-home";
import TeacherHome from "./pages/teacher-home";
import Student from "./pages/student";
import Teacher from './pages/teacher';
import ClassHome from './pages/class-home';

import './index.css';

export default function App() {
    const [current_class, set_current_class] = useState({});
    const [current_class_instance, set_current_class_instance] = useState({});
    const [instructor, set_instructor] = useState("");
    const [username, set_username] = useState("");

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<StudentHome set_current_class={set_current_class} set_current_class_instance={set_current_class_instance} set_username={set_username} />} />
                <Route path='teacher-home' element={<TeacherHome set_instructor={set_instructor} />} />
                <Route path='student' element={<Student current_class={current_class} current_class_instance={current_class_instance} username={username} />} />
                <Route path='teacher' element={<Teacher instructor={instructor} set_current_class={set_current_class} set_current_class_instance={set_current_class_instance} />} />
                <Route path='class-home' element={<ClassHome current_class={current_class} set_current_class={set_current_class} current_class_instance={current_class_instance} instructor={instructor} />} />
            </Routes>
        </HashRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);