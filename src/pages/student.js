import "./styles.css";

export default function Student({current_class, set_current_class, username, set_username}) {
    console.log(current_class);
    console.log(username);
    return (
        <>
            <p>Student route working</p>
        </>
    )
}