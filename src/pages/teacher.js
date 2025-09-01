import { useEffect, useState } from "react";

import "./styles.css";

export default function Teacher({current_class, set_current_class}) {
    const baseURL = "https://samcham.pythonanywhere.com/";

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}messages/class?id=${current_class.id}`).then(data => data.json()).then(data => {
            let m = [];
            for (let d in data) m.push(data[d]);
            setMessages(m);
        });
    }, [current_class]);

    function getDate() {
        let halves = current_class.date.split(" ");

        let dates = halves[0].split("-");
        let times = halves[1].split(":");

        let pm = Number(times[0]) > 12;

        return `${pm ? times[0] - 12 : times[0]}:${times[1]}:${times[2]} ${pm ? "pm" : "am"} ${dates[1]}/${dates[2]}/${dates[0]}`;
    }

    async function toggleClass() {
        await fetch(baseURL + "classes/toggle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: current_class.id
            })
        }).then(data => data.json()).then(data => {
            set_current_class(data);
            console.log(`Active is now ${data.active}`);
        });
    }

    return (
        <div className="container centered-vertical centered-horizontal horizontal" id="main-body">
            <div className="container centered-vertical centered-horizontal grow" style={{height: "100vh"}}>
                <div className="container centered-horizontal vertical bordered sub-window-bg" style={{margin: "var(--margin-size)", height: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))", width: "100%"}}>
                    <h3>Message Log</h3>
                    <div style={{display: "flex", width: "75%", height: "var(--border-width)", backgroundColor: "var(--licorice)"}}></div>
                    {
                        messages.map((message, index) => {
                            return <div>
                                <p>{message.message}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="container centered-vertical centered-horizontal vertical grow" style={{height: "100vh"}}>
                <div className="container centered-vertical centered-horizontal bordered vertical sub-window-bg" style={{margin: "var(--margin-size)", width: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))"}}>
                    <p className="info-field">Class ID: {current_class.id}</p>
                    <p className="info-field">Class starts at {getDate()}</p>
                    <p className="info-field">Class is currently {current_class.active ? "active" : "not active"}</p>
                    <button onClick={toggleClass} className="info-field">Toggle Class Activation</button>
                </div>
                <div className="container centered-vertical centered-horizontal bordered vertical sub-window-bg grow" style={{margin: "var(--margin-size)", width: "calc(100% - 2 * var(--margin-size) - 2 * var(--border-padding) - 2 * var(--border-width))"}}>

                </div>
            </div>
        </div>
    );
}