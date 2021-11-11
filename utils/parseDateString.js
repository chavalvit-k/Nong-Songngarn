module.exports = function parseDateString(dateString){

    dateString = dateString.split(" ");

    if(dateString[0] === "Mon") dateString[0] = "วันจันทร์"
    if(dateString[0] === "Tue") dateString[0] = "วันอังคาร"
    if(dateString[0] === "Wed") dateString[0] = "วันพุธ"
    if(dateString[0] === "Thu") dateString[0] = "วันพฤหัสบดี"
    if(dateString[0] === "Fri") dateString[0] = "วันศุกร์"
    if(dateString[0] === "Sat") dateString[0] = "วันเสาร์"
    if(dateString[0] === "Sun") dateString[0] = "วันอาทิตย์"

    if(dateString[1] === "Jan") dateString[1] = "มกราคม";
    if(dateString[1] === "Feb") dateString[1] = "กุมภาพันธ์";
    if(dateString[1] === "Mar") dateString[1] = "มีนาคม";
    if(dateString[1] === "Jun") dateString[1] = "เมษายน";
    if(dateString[1] === "May") dateString[1] = "พฤษภาคม";
    if(dateString[1] === "Jun") dateString[1] = "มิถุนายน";
    if(dateString[1] === "Jul") dateString[1] = "กรกฎาคม";
    if(dateString[1] === "Aug") dateString[1] = "สิงหาคม";
    if(dateString[1] === "Sep") dateString[1] = "กันยายน";
    if(dateString[1] === "Oct") dateString[1] = "ตุลาคม";
    if(dateString[1] === "Nov") dateString[1] = "พฤศจิกายน";
    if(dateString[1] === "Dec") dateString[1] = "ธันวาคม";

    let time = dateString[4].split(":");
    let newTime = `${time[0]}:${time[1]}`;

    if(dateString[4] === "00:00:00") return `${dateString[0]} ${dateString[2]} ${dateString[1]} ${dateString[3]}`;
    return `${dateString[0]} ${dateString[2]} ${dateString[1]} ${dateString[3]} ก่อน ${newTime}`;
}

// [Thu, Nov, 11, 2021, 00:00:00, GMT+0700]