import { useNavigate } from "react-router-dom";

import { getClasses, getClassInstances } from "../helpers/api";
import "./styles.css";

export default function StudentHome({set_current_class, set_current_class_instance, set_username}) {
    const nav = useNavigate();

    async function submit(e) {
        e.preventDefault();

        let temp_class_instance_id = document.getElementById("id_input").value;
        let temp_username = document.getElementById("username_input").value;

        // eslint-disable-next-line
        if (temp_username == "") {
            console.log("Enter a username");
            return;
        }

        let class_instance = await getClassInstances(temp_class_instance_id).then(data => data[0]);
        
        if (class_instance === undefined) {
            console.log("Class instance does not exist");
            document.getElementById("error-message").textContent = "Class instance does not exist";
            return;
        }

        if (!class_instance.active) {
            console.log("Class instance inactive");
            document.getElementById("error-message").textContent = "Class instance inactive";
            return;
        }

        await getClasses(class_instance.class.id).then(data => {
            set_current_class(data[0]);
        });
        set_current_class_instance(class_instance);
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
                    <p className="error-message" id="error-message"></p>
                </div>
            </form>
        </div>
    )
}