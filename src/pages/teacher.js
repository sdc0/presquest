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
        <div className="container horizontal" id="main-body">
            <div className="container vertical bordered">
                {
                    messages.map((message, index) => {
                        return <p>{message.message}</p>
                    })
                }
            </div>
            <p>Teacher route working</p>
        </div>
    )
}