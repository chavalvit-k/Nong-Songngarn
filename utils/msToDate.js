module.exports = function msToDate(ms){

    let dateString = new Date(ms).toString();
    dateString = dateString.split(" ");

    let monthNum = dateString[1];
    let date = dateString[2];
    let year = dateString[3];

    if(monthNum === "Jan") monthNum = "01";
    if(monthNum === "Feb") monthNum = "02";
    if(monthNum === "Mar") monthNum = "03";
    if(monthNum === "Jun") monthNum = "04";
    if(monthNum === "May") monthNum = "05";
    if(monthNum === "Jun") monthNum = "06";
    if(monthNum === "Jul") monthNum = "07";
    if(monthNum === "Aug") monthNum = "08";
    if(monthNum === "Sep") monthNum = "09";
    if(monthNum === "Oct") monthNum = "10";
    if(monthNum === "Nov") monthNum = "11";
    if(monthNum === "Dec") monthNum = "12";

    return `${date}/${monthNum}/${year}`;

}
