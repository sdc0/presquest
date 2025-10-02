import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { getClasses, getClassInstances, getMessagesForJSON, createClass, createClassInstance } from "../helpers/api";
import { formatDateStringFromDatabase } from "../helpers/utils";

import "./styles.css";

export default function Teacher({instructor, set_current_class, set_current_class_instance}) {
    const nav = useNavigate();
    const [classes, set_classes] = useState([]);
    const [dates, setDates] = useState([]);

    const reloadClasses = useCallback(() => {
        getClasses(undefined, instructor.id).then(data => {
            set_classes(data);
        });
    }, [instructor]);

    useEffect(() => {
        reloadClasses();
    }, [reloadClasses]);

    async function enterClassInstance(class_index, id) {
        set_current_class(classes[class_index]);

        await getClassInstances(id).then(data => {
            set_current_class_instance(data[0]);
        });

        nav("/class-home");
    }

    async function downloadClassInstance(class_instance_id) {
        let data = await getMessagesForJSON(undefined, undefined, class_instance_id);
        
        const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
        const a = document.createElement('a');
        a.download = `ClassInstance${class_instance_id}Messages.json`;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    }

    return (
        <div className="container centered-vertical centered-horizontal vertical" id="main-body">
            <div className="container container-bg bordered centered-vertical centered-horizontal vertical" style={{padding: "0", margin: "calc(var(--margin-size) * 5) var(--margin-size)", minWidth: "50vw"}}>
                {
                    classes.map((cls, i) => {
                        if (i >= dates.length) setDates([...dates, 0]);
                        return (
                            <div key={cls.id} style={{width: "100%"}}>
                                {
                                    i === 0 ? <></> : <div style={{display: "flex", width: "100%", height: "var(--border-width)", backgroundColor: "var(--licorice)"}}></div>
                                }
                                <div style={{padding: "var(--padding-size)"}}>
                                    <div className="container horizontal centered-horizontal" style={{gap: "10px"}}>
                                        <h3 style={{margin: "0", marginTop: "5px"}}>{cls.title} (Class ID: {cls.id})</h3>
                                    </div>
                                    <div>
                                        <h4>Class Instances: </h4>
                                        <ul style={{paddingLeft: "15px"}}>
                                            {
                                                cls.class_instances.map((instance, j) => {
                                                    return (
                                                        <li className="container centered-horizontal" key={instance.id}>
                                                            <p>{formatDateStringFromDatabase(instance.date)} (Instance ID: {instance.id})</p>
                                                            <button style={{height: "22px", marginLeft: "calc(var(--padding-size) * 2)"}} onClick={(e) => {
                                                                e.preventDefault();
                                                                enterClassInstance(i, instance.id);
                                                            }}>Enter Class Instance</button>
                                                            <button style={{height: "22px", marginLeft: "calc(var(--padding-size) * 2)"}} onClick={(e) => {
                                                                e.preventDefault();
                                                                downloadClassInstance(instance.id);
                                                            }}>Download Messages</button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <input type="datetime-local" id="datetime-input" onChange={(e) => {
                                            e.preventDefault();
                                            let temp = [...dates];
                                            temp[i] = e.target.value;
                                            setDates(temp);
                                        }} />
                                        <button onClick={(e) => {
                                            e.preventDefault();

                                            console.log(dates[i].replace('T', ' '));

                                            createClassInstance(cls.id, dates[i].replace('T', ' ')).then(data => {
                                                console.log(data);
                                                reloadClasses();
                                            });
                                        }}>Create a new Class Instance</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="container vertical centered-horizontal" style={{width: "100%", gap: "var(--margin-size)", margin: "var(--margin-size)"}}>
                    {
                        classes.length > 0 ? <div style={{display: "flex", width: "100%", height: "var(--border-width)", backgroundColor: "var(--licorice)"}}></div> : <></>
                    }
                    <h3>Create a New Class</h3>
                    <input id="class-code-input" placeholder="Enter a Class Code (e.g. BIO235)..." style={{minWidth: "50%"}}/>
                    <button onClick={(e) => {
                        e.preventDefault();

                        createClass(document.getElementById("class-code-input").value, instructor.id).then(data => {
                            console.log(data);
                            reloadClasses();
                        });
                    }}>Create</button>
                </div>
            </div>
        </div>
    )
}