import { createMessage } from "../helpers/api";

import "./styles.css";

export default function Student({current_class, current_class_instance, username}) {
    console.log(current_class);
    console.log(current_class_instance);
    console.log(username);
    return (
        <div className="container centered-vertical centered-horizontal vertical" id="main-body">
            <div className="container bordered centered-vertical centered-horizontal vertical sub-window-bg">
                <h3>{current_class.title} (Instance ID: {current_class_instance.id})</h3>
                <input id="content-input" placeholder="Enter a message here..." />
                <button onClick={(e) => {
                    e.preventDefault();

                    createMessage(current_class_instance.id, username, new Date(), document.getElementById("content-input").value).then(data => {
                        console.log(data);
                    });
                }}>Send Message</button>
            </div>
        </div>
    )
}