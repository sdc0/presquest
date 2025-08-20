import { useNavigate } from "react-router-dom";

import "../styles.css";

export default function StudentHome() {
    const nav = useNavigate();
    
    return (
        <div className="container" id="main-body">
            <div className="navbar">
                <div className="navbar-item active" onClick={(e) => {e.preventDefault(); nav("/");}}>
                    <p className="navbar-text">Student View</p>
                </div>
                <div className="navbar-item" onClick={(e) => {e.preventDefault(); nav("/teacher-home");}}>
                    <p className="navbar-text">Teacher View</p>
                </div>
            </div>

            <form className="login">
                <div className="container bordered">
                    <div className="form-item">
                        <label htmlFor="id_input">Class ID</label>
                        <input id="id_input" placeholder="Enter Class ID..." />
                    </div>
                    <div className="form-item">
                        <label htmlFor="username_input">Username</label>
                        <input id="username_input" placeholder="Enter Username..." />
                    </div>
                    <button className="form-submit">Submit</button>
                </div>
            </form>
        </div>
    )
}