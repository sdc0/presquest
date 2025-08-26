import { useNavigate } from "react-router-dom";

import "./styles.css";

export default function TeacherHome({class_id, set_class_id}) {
    const nav = useNavigate();
    const baseURL = "https://samcham.pythonanywhere.com/";

    async function submit(e) {
        e.preventDefault();

        let class_name = document.getElementById("id_input").value;

        await fetch(baseURL + "classes/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'title': class_name,
                'date': (new Date()).toDateString()
            }
        }).then(data => {
            console.log(data);
        });
        /*let active = false;

        for (let c in classes) {
            // eslint-disable-next-line
            if (classes[c].id == temp_class_id) {
                active = true;
                break;
            }
        }

        set_class_id(temp_class_id);

        if (!active) {
            console.log("No class with id found or class inactive");
            return;
        }

        nav("/teacher");*/
    }

    return (
        <div className="container vertical" id="main-body">
            <div className="navbar">
                <div className="navbar-item" onClick={(e) => {e.preventDefault(); nav("/");}}>
                    <p className="navbar-text">Student View</p>
                </div>
                <div className="navbar-item active" onClick={(e) => {e.preventDefault(); nav("/teacher-home");}}>
                    <p className="navbar-text">Teacher View</p>
                </div>
            </div>

            <form className="login">
                <div className="container bordered">
                    <div className="form-item">
                        <label htmlFor="id_input">Class</label>
                        <input id="id_input" placeholder="Enter Class Name (e.x. Bio325)..." />
                    </div>
                    <button className="form-submit" onClick={(e) => submit(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}