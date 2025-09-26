export function formatDateStringFromDatabase(date) {
    let halves = date.split(" ");

    let dates = halves[0].split("-");
    let times = halves[1].split(":");

    let pm = Number(times[0]) >= 12;

    return `${(pm && Number(times[0]) !== 12) ? times[0] - 12 : (Number(times[0]) === 0 ? 12 : times[0])}:${times[1]} ${pm ? "pm" : "am"} ${[
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ][dates[1] - 1]} ${dates[2]}, ${dates[0]}`;
}

export function formatDateForDatabase(date) {
    let parts = date.toLocaleTimeString().split(" ")[0].split(":");
    if (date.toLocaleTimeString().includes("PM") && Number(parts[0]) !== 12) parts[0] = (Number(parts[0]) + 12).toString()
    if (date.toLocaleTimeString().includes("AM") && Number(parts[0]) === 12) parts[0] = (0).toString()

    return [date.toISOString().split("T")[0], parts.join(":")].join(" ");
}