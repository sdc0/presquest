import { useNavigate } from "react-router-dom";

import "../styles.css";

export default function TeacherHome() {
    const nav = useNavigate();

    return (
        <div>
            <div className="navbar">
                <div className="navbar-item" onClick={(e) => {e.preventDefault(); nav("/");}}>
                    <p className="navbar-text">Student View</p>
                </div>
                <div className="navbar-item active" onClick={(e) => {e.preventDefault(); nav("/teacher-home");}}>
                    <p className="navbar-text">Teacher View</p>
                </div>
            </div>

        </div>
    )
}