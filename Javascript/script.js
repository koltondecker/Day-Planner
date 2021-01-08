//Initial Javascript File
$(document).ready(function() {

const currentDate = moment().format("dddd, MMMM Do, YYYY");
const currentHour = moment().format("H");
//const currentHour = 9;
var textAreaArray = [];
var textAreaObj = {
    name: "",
    text: ""
};

//populateTextAreas();

$("#currentDay").text(currentDate);

//Appends time to page continually in real time
updateTime();
function updateTime() {
    const currentTime = moment().format("h:mm:ss a");
    $("#currentTime").text(currentTime);
    setTimeout(updateTime, 1000);
}


for (i = 0; i < $(".text-box").length; i++) {
    const currentTextBox = $(".text-box")[i];

    if (parseInt(currentTextBox.dataset.value) < parseInt(currentHour)) {
        currentTextBox.classList.add("past");
        currentTextBox.setAttribute("disabled", "");
    }
    else if ((parseInt(currentTextBox.dataset.value)) === parseInt(currentHour)) {
        currentTextBox.classList.add("present");
    }
    else {
        currentTextBox.classList.add("future");
    }
}

function populateTextAreas() {
    const textAreaLocalStorage = JSON.parse(localStorage.getItem("textAreaArray"));
    if (textAreaLocalStorage !== null) {
        textAreaArray = textAreaLocalStorage;
        
        for (i = 0; i < textAreaArray.length; i++) {
            if(textAreaArray[i].name === textAreaObj.name) {
                textAreaArray[i].text = textAreaObj.text;
            }
        }
        
        if(textAreaArray.some(e => e.name === textAreaObj.name) === false) {
            textAreaArray.push(textAreaObj);
        }
    }
    else {
        textAreaArray.push(textAreaObj);
    }
    localStorage.setItem("textAreaArray", JSON.stringify(textAreaArray));
}

$(".saveBtn").on("click", function(e) {
    e.preventDefault();
    
    const textAreaInfo = this.previousElementSibling.value;
    textAreaObj.name = this.previousElementSibling.id;
    textAreaObj.text = textAreaInfo;

    populateTextAreas();
});



















});