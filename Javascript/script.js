//Initial Javascript File
$(document).ready(function() {

    var currentDate = moment().format("dddd, MMMM Do, YYYY");
    var initialHour = moment().format("H");
    var curHourCheck = initialHour;

    var textAreaArray = [];
    var textAreaObj = {
        name: "",
        text: ""
    };

    populateTextAreas();
    updateTextBoxColors(initialHour);

    $("#currentDay").text(currentDate);

    //Appends time to page continually in real time
    updateTime();
    function updateTime() {
        const currentTime = moment().format("h:mm:ss a");
        var currentHour = moment().format("H");

        $("#currentTime").text(currentTime);

        if (currentHour > curHourCheck) {
            changeHour();
            curHourCheck = currentHour;
        }
        setTimeout(updateTime, 1000);
    }

    function updateTextBoxColors(hour) {
        for (i = 0; i < $(".text-box").length; i++) {
            const currentTextBox = $(".text-box")[i];

            if (parseInt(currentTextBox.dataset.value) < parseInt(hour)) {
                currentTextBox.classList.add("past");
                currentTextBox.setAttribute("disabled", "");
            }
            else if ((parseInt(currentTextBox.dataset.value)) === parseInt(hour)) {
                currentTextBox.classList.add("present");
            }
            else {
                currentTextBox.classList.add("future");
            }
        }
    }

    function changeHour() {
        for (i = 0; i < $(".text-box").length; i++) {
            if ($(".text-box")[i].classList.contains("present")) {
                $(".text-box")[i].classList.remove("present");
                $(".text-box")[i].classList.add("past");
                $(".text-box")[i].setAttribute("disabled", "");
                $(".text-box")[i+1].classList.remove("future");
                $(".text-box")[i+1].classList.add("present");
                return;
            }
        }
    }

    function populateTextAreas() {
        var textAreaLocalStorage = JSON.parse(localStorage.getItem("textAreaArray"));
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
            if ( textAreaObj.name !== "" && textAreaObj.text !== "") {
                textAreaArray.push(textAreaObj);
            }
        }
        localStorage.setItem("textAreaArray", JSON.stringify(textAreaArray));
        
        for (i = 0; i < textAreaArray.length; i++) {
            for (j = 0; j < $(".text-box").length; j++) {
                if ($(".text-box")[j].id === textAreaArray[i].name) {
                    $(".text-box")[j].value = textAreaArray[i].text;
                }
            }
        }
    }

    $(".saveBtn").on("click", function(e) {
        e.preventDefault();
        
        var textAreaInfo = this.previousElementSibling.value;
        textAreaObj.name = this.previousElementSibling.id;
        textAreaObj.text = textAreaInfo;

        populateTextAreas();
    });

    $("#clear-button").on("click", function() {
        localStorage.removeItem("textAreaArray");
        $(".text-box").value = "";
        location.reload();
    });

});