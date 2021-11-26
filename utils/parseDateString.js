module.exports = function parseDateString(dateString){

    dateString = dateString.split(" ");

    let day = dateString[0];
    let month = dateString[1];
    let date = dateString[2];
    let year = dateString[3];
    let time = dateString[4].split(":");
    let newTime = `${time[0]}:${time[1]}`;

    if(day === "Mon") day = "วันจันทร์"
    if(day === "Tue") day = "วันอังคาร"
    if(day === "Wed") day = "วันพุธ"
    if(day === "Thu") day = "วันพฤหัสบดี"
    if(day === "Fri") day = "วันศุกร์"
    if(day === "Sat") day = "วันเสาร์"
    if(day === "Sun") day = "วันอาทิตย์"

    if(month === "Jan") month = "มกราคม";
    if(month === "Feb") month = "กุมภาพันธ์";
    if(month === "Mar") month = "มีนาคม";
    if(month === "Jun") month = "เมษายน";
    if(month === "May") month = "พฤษภาคม";
    if(month === "Jun") month = "มิถุนายน";
    if(month === "Jul") month = "กรกฎาคม";
    if(month === "Aug") month = "สิงหาคม";
    if(month === "Sep") month = "กันยายน";
    if(month === "Oct") month = "ตุลาคม";
    if(month === "Nov") month = "พฤศจิกายน";
    if(month === "Dec") month = "ธันวาคม";

    if(dateString[4] === "00:00:00") return `${day} ${date} ${month} ${year}`;
    return `${day} ${date} ${month} ${year} ก่อน ${newTime}`;

}
