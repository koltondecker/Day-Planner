//Initial Javascript File
$(document).ready(function() {

const currentDate = moment().format("dddd, MMMM Do, YYYY");




$("#currentDay").text(currentDate);
updateTime();
function updateTime() {
    const currentTime = moment().format("h:mm:ss a");
    $("#currentTime").text(currentTime);
    setTimeout(updateTime, 1000);
}























});