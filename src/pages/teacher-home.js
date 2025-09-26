import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getInstructors, createInstructor } from "../helpers/api";
import "./styles.css";

export default function TeacherHome({set_instructor}) {
    const nav = useNavigate();
    const [loggingIn, setLoggingIn] = useState(true);

    async function login(e) {
        e.preventDefault();

        let username = document.getElementById("username_input").value;
        let password = document.getElementById("password_input").value;
        let school = document.getElementById("school_input").value;

        let exists = false;
        let instructors = await getInstructors();

        for (let i in instructors) {
            // eslint-disable-next-line
            if (instructors[i].username == username) {
                // eslint-disable-next-line
                if (instructors[i].password == password && instructors[i].school == school) {
                    set_instructor(instructors[i]);
                    exists = true;
                    break;
                }
            }
        }

        if (!exists) {
            document.getElementById("error-message").textContent = "Wrong username, password, or school, try again";
            console.log("Wrong username, password, or school, try again");
            return;
        }

        nav("/teacher");
    }

    async function signup(e) {
        e.preventDefault();

        let username = document.getElementById("username_input").value;
        let password = document.getElementById("password_input").value;
        let password_confirm = document.getElementById("password_confirm").value;
        let school = document.getElementById("school_input").value;

        if (password !== password_confirm) {
            document.getElementById("error-message").textContent = "Passwords didn't match, try again";
            console.log("Passwords didn't match, try again");
            document.getElementById("password_input").value = "";
            document.getElementById("password_confirm").value = "";
            return;
        }

        await createInstructor(username, password, school).then(data => {
            set_instructor(data);
            console.log(data);
        });

        nav("/teacher");
    }

    return (
        <div className="container centered-vertical centered-horizontal vertical" id="main-body">
            <div className="navbar">
                <div className="navbar-item" onClick={(e) => {e.preventDefault(); nav("/");}}>
                    <p className="navbar-text">Student View</p>
                </div>
                <div className="navbar-item active" onClick={(e) => {e.preventDefault(); nav("/teacher-home");}}>
                    <p className="navbar-text">Teacher View</p>
                </div>
            </div>

            {
                loggingIn ? (
                    <form className="form">
                        <div className="container centered-vertical centered-horizontal bordered">
                            <h1>Login</h1>
                            <div className="form-item">
                                <label htmlFor="username_input">Username</label>
                                <input id="username_input" placeholder="Enter username..." />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password_input">Password</label>
                                <input type="password" id="password_input" placeholder="Enter password..." />
                            </div>
                            <div className="form-item">
                                <label htmlFor="school_input">School</label>
                                <input id="school_input" placeholder="Enter your school..." />
                            </div>
                            <button className="form-submit" onClick={(e) => login(e)}>Log in</button>
                            <p className="error-message" id="error-message"></p>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setLoggingIn(false);
                            }}>Switch to Sign Up</button>
                        </div>
                    </form>
                ) : (
                    <form className="form">
                        <div className="container centered-vertical centered-horizontal bordered">
                            <h1>Sign Up</h1>
                            <div className="form-item">
                                <label htmlFor="username_input">Username</label>
                                <input id="username_input" placeholder="Enter username..." />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password_input">Password</label>
                                <input type="password" id="password_input" placeholder="Enter password..." />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password_confirm">Confirm Password</label>
                                <input type="password" id="password_confirm" placeholder="Enter password..." />
                            </div>
                            <div className="form-item">
                                <label htmlFor="school_input">School</label>
                                <input id="school_input" placeholder="Enter your school..." />
                            </div>
                            <button className="form-submit" onClick={(e) => signup(e)}>Sign Up</button>
                            <p className="error-message" id="error-message"></p>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setLoggingIn(true);
                            }}>Switch to Login</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}