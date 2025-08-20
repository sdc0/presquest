import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import StudentHome from "./pages/student-home/student-home";
import TeacherHome from "./pages/teacher-home/teacher-home";
import Student from "./pages/student/student";
import Teacher from './pages/teacher/teacher';

import './index.css';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<StudentHome />} />
                <Route path='teacher-home' element={<TeacherHome />} />
                <Route path='student' element={<Student />} />
                <Route path='teacher' element={<Teacher />} />
            </Routes>
        </HashRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);