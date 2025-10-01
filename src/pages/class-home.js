import { useEffect, useState, useCallback } from "react";

import { getMessages, toggleClassInstance } from "../helpers/api";
import { formatDateStringFromDatabase } from "../helpers/utils";

import "./styles.css";

export default function ClassHome({current_class, current_class_instance, set_current_class_instance, instructor}) {
    const [messages, setMessages] = useState([]);

    async function toggleClass() {
        toggleClassInstance(current_class_instance.id).then(data => {
            set_current_class_instance(data);
            console.log(`Active is now ${data.active}`);
        });
    }

    const fetchClasses = useCallback(async () => {
        let data = await getMessages(undefined, undefined, current_class_instance.id);
        
        let m = [];
        for (let d in data) m.push(data[d]);
        setMessages(m);
    }, [current_class_instance]);

    useEffect(() => {
        fetchClasses();

        const intervalId = setInterval(fetchClasses, 1000);
        return () => clearInterval(intervalId);
    }, [fetchClasses]);

    return (
        <div className="container centered-vertical centered-horizontal horizontal" id="main-body">
            <div className="container centered-vertical centered-horizontal grow" style={{height: "100vh"}}>
                <div className="container centered-horizontal vertical bordered sub-window-bg" style={{margin: "var(--margin-size)", height: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))", width: "100%"}}>
                    <h3>Message Log</h3>
                    <div style={{display: "flex", width: "75%", height: "var(--border-width)", backgroundColor: "var(--licorice)"}}></div>
                    {
                        messages.map((message, index) => {
                            return (
                                <div>
                                    <p>{message.message}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="container centered-vertical centered-horizontal vertical grow" style={{height: "100vh"}}>
                <div className="container centered-vertical centered-horizontal bordered vertical sub-window-bg" style={{margin: "var(--margin-size)", width: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))"}}>
                    <p className="info-field">Class ID: {current_class.id}</p>
                    <p className="info-field">Class Instance ID: {current_class_instance.id}</p>
                    <p className="info-field">Class starts at {formatDateStringFromDatabase(current_class_instance.date)}</p>
                    <p className="info-field">Class is currently {current_class_instance.active ? "active" : "not active"}</p>
                    <button onClick={toggleClass} className="info-field">Toggle Class Activation</button>
                </div>
                <div className="container centered-vertical centered-horizontal bordered vertical sub-window-bg grow" style={{margin: "var(--margin-size)", width: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))"}}>

                </div>
            </div>
        </div>
    );
}