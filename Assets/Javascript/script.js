//Initial Javascript File
$(document).ready(function() {

    var initialDate = moment().format("dddd, MMMM Do, YYYY");
    var initialHour = moment().format("H");
    var curHourCheck = initialHour;
    var curDayCheck = initialDate;

    //Declaring empty array and empty object for textbox areas to append to localstorage.
    var textAreaArray = [];
    var textAreaObj = {
        name: "",
        text: ""
    };

    //Initially call our functions to populate text boxes from local storage and update text box colors to current time.
    populateTextAreas();
    updateTextBoxColors(initialHour);

    $("#currentDay").text(initialDate);

    //Appends time to page continually in real time. Function repeats every second.
    updateTime();
    function updateTime() {
        const currentTime = moment().format("h:mm:ss a");
        const currentDate = moment().format("dddd, MMMM Do, YYYY");
        var currentHour = moment().format("H");

        $("#currentTime").text(currentTime);

        //Checks if time rolls over to a new hour and runs the change hour function.
        if (currentHour > curHourCheck) {
            changeHour();
            curHourCheck = currentHour;
        }
        //Checks if day date rolls over to a new day and updates the page to display the new day.
        if (currentDate !== curDayCheck) {
            $("#currentDay").text(initialDate);
        }

        setTimeout(updateTime, 1000);
    }

    //Function uses current hour to compare against hour dataset value of all text boxes and changes css class appropriately.
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

    //Function takes text box that matches current hour and the next text box and changes css classes. 
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

    //Function parses local storage for array that contains values saved in the day planner and appends back to page. 
    //Also takes in new values when save button is pressed and adds to array in local storage.
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
                if ( textAreaObj.name !== "" && textAreaObj.text !== "") {
                    textAreaArray.push(textAreaObj);
                }
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

    //Listens for a save button to be pressed and uses text object to update hour name and hour value and call populateTextAreas function.
    //This will keep hour blocks better organized in local storage array by using objects.
    $(".saveBtn").on("click", function(e) {
        e.preventDefault();
        
        var textAreaInfo = this.previousElementSibling.value;
        textAreaObj.name = this.previousElementSibling.id;
        textAreaObj.text = textAreaInfo;

        populateTextAreas();
    });

    //Clears all text boxes on page and clears local storage array then reloads the page.
    $("#clear-button").on("click", function() {
        localStorage.removeItem("textAreaArray");
        $(".text-box").value = "";
        location.reload();
    });

});