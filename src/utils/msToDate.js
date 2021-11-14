module.exports = function parseDateString(ms){

    let dateString = new Date(ms).toString();
    dateString = dateString.split(" ");

    if(dateString[1] === "Jan") dateString[1] = "01";
    if(dateString[1] === "Feb") dateString[1] = "02";
    if(dateString[1] === "Mar") dateString[1] = "03";
    if(dateString[1] === "Jun") dateString[1] = "04";
    if(dateString[1] === "May") dateString[1] = "05";
    if(dateString[1] === "Jun") dateString[1] = "06";
    if(dateString[1] === "Jul") dateString[1] = "07";
    if(dateString[1] === "Aug") dateString[1] = "08";
    if(dateString[1] === "Sep") dateString[1] = "09";
    if(dateString[1] === "Oct") dateString[1] = "10";
    if(dateString[1] === "Nov") dateString[1] = "11";
    if(dateString[1] === "Dec") dateString[1] = "12";

    return `${dateString[2]}/${dateString[1]}/${dateString[3]}`;
}

// [Thu, Nov, 11, 2021, 00:00:00, GMT+0700]