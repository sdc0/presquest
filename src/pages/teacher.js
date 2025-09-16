import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { get, createClass, createClassInstance } from "../helpers/api";
import { formatDateStringFromDatabase } from "../helpers/utils";

import "./styles.css";

export default function Teacher({instructor, set_current_class, set_current_class_instance}) {
    const nav = useNavigate();
    const [classes, set_classes] = useState([]);
    const [checked, set_checked] = useState([]);

    useEffect(() => {
        get("classes", undefined, undefined, undefined, instructor.id).then(data => {
            set_classes(data);
            console.log(data);
        });
    }, [instructor]);

    async function enterClassInstance(class_index, id) {
        set_current_class(classes[class_index]);

        await get("class_instances", id).then(data => {
            console.log(data);
            set_current_class_instance(data[0]);
        });

        nav("/class-home");
    }

    async function downloadClassInstance(class_instance_id) {
        let data = await get("messages", undefined, undefined, class_instance_id);
        
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
            <div className="container container-bg bordered centered-vertical centered-horizontal vertical" style={{padding: "0", margin: "var(--margin-size)"}}>
                {
                    classes.map((cls, i) => {
                        if (i >= checked.length) set_checked([...checked, []]);
                        return (
                            <>
                                {
                                    i === 0 ? <></> : <div style={{display: "flex", width: "100%", height: "var(--border-width)", backgroundColor: "var(--licorice)"}}></div>
                                }
                                <div style={{padding: "var(--padding-size)"}}>
                                    <div className="container horizontal centered-horizontal" style={{gap: "10px"}}>
                                        <h3 style={{margin: "0", marginTop: "5px"}}>{cls.title} (Class ID: {cls.id})</h3>
                                    </div>
                                    <div>
                                        <h5>Instructors: </h5>
                                        <ul style={{paddingLeft: "15px"}}>
                                            {
                                                cls.instructors.map((instructor) => {
                                                    return (
                                                        <li>
                                                            <p>{instructor.username} (Instructor ID: {instructor.id}) from {instructor.school}</p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <h5>Class Instances: </h5>
                                        <ul style={{paddingLeft: "15px"}}>
                                            {
                                                cls.class_instances.map((instance, j) => {
                                                    return (
                                                        <li className="container centered-horizontal">
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
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}