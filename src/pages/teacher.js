import { useEffect, useState } from "react";

import "./styles.css";

export default function Teacher({class_id, set_class_id}) {
    const baseURL = "https://samcham.pythonanywhere.com/";

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}messages/class?id=${class_id}`).then(data => data.json()).then(data => {
            let m = [];
            for (let d in data) m.push(data[d]);
            setMessages(m);
        });
    }, [class_id]);

    return (
        <div className="container horizontal" style={{gap: "var(--margin-size)"}} id="main-body">
            <div className="container grow" style={{height: "100vh"}}>
                <div className="container vertical bordered" style={{margin: "var(--margin-size) 0 var(--margin-size) var(--margin-size)", height: "calc(100% - var(--border-padding) * 2 - var(--border-width) * 2 - var(--margin-size) * 2)", width: "100%"}}>
                    {
                        messages.map((message, index) => {
                            return <div>
                                <p>{message.message}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="container bordered vertical grow" style={{margin: "0 var(--margin-size) 0 0"}}>
                <p>Class ID: {class_id}</p>
                <p>Teacher route works</p>
            </div>
        </div>
    )
}