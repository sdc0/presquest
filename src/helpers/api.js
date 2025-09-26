export const baseURL = "https://samcham.pythonanywhere.com/";

export async function getClasses(class_id=undefined, instructor_id=undefined) {
    let url = baseURL + "classes?";
    if (class_id !== undefined) url += "id=" + class_id;
    if (instructor_id !== undefined) url += "&instructor_id=" + instructor_id;

    return await fetch(url).then(data => data.json());
}

export async function getClassInstances(class_instance_id=undefined, class_id=undefined, instructor_id=undefined) {
    let url = baseURL + "class_instances?";
    if (class_instance_id !== undefined) url += "id=" + class_instance_id;
    if (class_id !== undefined) url += "&class_id=" + class_id;
    if (instructor_id !== undefined) url += "&instructor_id=" + instructor_id;

    return await fetch(url).then(data => data.json());
}

export async function getMessages(message_id=undefined, class_id=undefined, class_instance_id=undefined, instructor_id=undefined, student_username=undefined, school=undefined) {
    let url = baseURL + "messages?";
    if (message_id !== undefined) url += "id=" + message_id;
    if (class_id !== undefined) url += "&class_id=" + class_id;
    if (class_instance_id !== undefined) url += "&class_instance_id=" + class_instance_id;
    if (instructor_id !== undefined) url += "&instructor_id=" + instructor_id;
    if (student_username !== undefined) url += "&student_username=" + student_username;
    if (school !== undefined) url += "&school=" + school;

    return await fetch(url).then(data => data.json());
}

export async function getInstructors(instructor_id=undefined, class_id=undefined, school=undefined) {
    let url = baseURL + "instructors?";
    if (instructor_id !== undefined) url += "id=" + instructor_id;
    if (class_id !== undefined) url += "&class_id=" + class_id;
    if (school !== undefined) url += "&school=" + school;

    return await fetch(url).then(data => data.json());
}

export async function getMessagesForJSON(message_id=undefined, class_id=undefined, class_instance_id=undefined, instructor_id=undefined, student_username=undefined) {
    let url = baseURL + "messages/forJSON?";
    if (message_id !== undefined) url += "id=" + message_id;
    if (class_id !== undefined) url += "&class_id=" + class_id;
    if (class_instance_id !== undefined) url += "&class_instance_id=" + class_instance_id;
    if (instructor_id !== undefined) url += "&instructor_id=" + instructor_id;
    if (student_username !== undefined) url += "&student_username=" + student_username;

    return await fetch(url).then(data => data.json());
}

export async function toggleClassInstance(id) {
    return await fetch(baseURL + "class_instances/toggle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    }).then(data => data.json());
}

export async function createClass(class_code, instructors) {
    return await fetch(baseURL + "classes/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: class_code,
            instructor_ids: instructors
        })
    }).then(data => data.json());
}

export async function createClassInstance(class_id, date) {
    return await fetch(baseURL + "class_instances/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            class_id: class_id,
            date: date
        })
    }).then(data => data.json());
}

export async function createInstructor(username, password, school) {
    return await fetch(baseURL + "instructors/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            school: school
        })
    }).then(data => data.json());
}

export async function createMessage(class_instance_id, username, date, content) {
    return await fetch(baseURL + "messages/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            class_instance_id: class_instance_id,
            username: username,
            date: date,
            content: content
        })
    }).then(data => data.json());
}