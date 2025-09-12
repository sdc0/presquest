export function formatDateStringFromDatabase(date) {
    let halves = date.split(" ");

    let dates = halves[0].split("-");
    let times = halves[1].split(":");

    let pm = Number(times[0]) > 12;

    return `${pm ? times[0] - 12 : times[0]}:${times[1]}:${times[2]} ${pm ? "pm" : "am"} ${[
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ][dates[1] - 1]} ${dates[2]}, ${dates[0]}`;
}