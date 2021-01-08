//Initial Javascript File
$(document).ready(function() {

const currentDate = moment().format("dddd, MMMM Do, YYYY");
const currentHour = moment().format("H");

$("#currentDay").text(currentDate);

//Appends time to page continually in real time
updateTime();
function updateTime() {
    const currentTime = moment().format("h:mm:ss a");
    $("#currentTime").text(currentTime);
    setTimeout(updateTime, 1000);
}


for (i = 0; i < $(".text-box").length; i++) {
    var currentTextBox = $(".text-box")[i];

    if (parseInt(currentTextBox.dataset.value) < parseInt(currentHour)) {
        currentTextBox.classList.add("past");
        currentTextBox.setAttribute("disabled", "");
        console.log(currentTextBox);
    }
    else if ((parseInt(currentTextBox.dataset.value)) === parseInt(currentHour)) {
        currentTextBox.classList.add("present");
    }
    else {
        currentTextBox.classList.add("future");
    }
}





















});