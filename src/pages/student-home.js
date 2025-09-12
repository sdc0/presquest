import { useNavigate } from "react-router-dom";

import { get } from "../helpers/api";
import "./styles.css";

export default function StudentHome({current_class, set_current_class, username, set_username}) {
    const nav = useNavigate();

    async function submit(e) {
        e.preventDefault();

        let temp_class_id = document.getElementById("id_input").value;
        let temp_username = document.getElementById("username_input").value;

        // eslint-disable-next-line
        if (temp_username == "") {
            console.log("Enter a username");
            return;
        }

        let classes = await get("classes");
        let active = false;

        for (let c in classes) {
            // eslint-disable-next-line
            if (classes[c].id == temp_class_id) {
                active = classes[c].active;
                if (active) set_current_class(classes[c]);
                break;
            }
        }

        if (!active) {
            console.log("No class with id found or class inactive");
            return;
        }

        set_username(temp_username);

        nav("/student");
    }
    
    return (
        <div className="container centered-vertical centered-horizontal vertical" id="main-body">
            <div className="navbar">
                <div className="navbar-item active" onClick={(e) => {e.preventDefault(); nav("/");}}>
                    <p className="navbar-text">Student View</p>
                </div>
                <div className="navbar-item" onClick={(e) => {e.preventDefault(); nav("/teacher-home");}}>
                    <p className="navbar-text">Teacher View</p>
                </div>
            </div>

            <form className="form">
                <div className="container centered-vertical centered-horizontal bordered">
                    <div className="form-item">
                        <label htmlFor="id_input">Class ID</label>
                        <input id="id_input" placeholder="Enter Class ID..." />
                    </div>
                    <div className="form-item">
                        <label htmlFor="username_input">Username</label>
                        <input id="username_input" placeholder="Enter Username..." />
                    </div>
                    <button className="form-submit" onClick={(e) => submit(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}