// Set the current date, day and time to be displayed on the header.

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

let workHours = {
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
    };

// saving and updating the local storage. 
$(document).ready(function(){
    if (!localStorage.getItem("workHours")){
       updateSchedule(workHours);
    }else {
        updateSchedule(JSON.parse(localStorage.getItem("workHours")));
    }
   
})
// forming variables to check if we have moved past the time.
    let counter = 1;
    for(const property in workHours) {
            let textEntry = "#text-input" + counter;
            $(textEntry).text(workHours[property]);
            let timeId = "#time" + counter;
            let currentHour = moment().hour();
            let timeStr = $(timeId).text();
            let timeNum = hourNumbers(timeStr);

        // adding colors to the background as described in the css as we move past time.
        if(timeNum < currentHour) {
            $(textEntry).addClass("past");
        } else if (timeNum > currentHour) {
            $(textEntry).addClass("future");
        } else {
            $(textEntry).addClass("present");
        }
    counter ++;
    }

// adding click function to save the inputs in the local storage of the browser whenever the save button is clicked.
    $("button").on("click", function(){
        var value = $(this).siblings("textarea").val();
        var time = $(this).siblings("div").text();

        saveSchedule(time, value);
        
    })
    //this function uses the switch statement to evaluate the expression, matching its value to the case clause.
    function hourNumbers(time) {
        switch(time) {
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 AM": return 12;
        case "13 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
        }
    }

    // this function loads the schedule in the correct data set such that each time matched their schedule input.
    function loadCorrectDataset() {
        result = localStorage.getItem("workHours")
        return (result ? result : workHours);
    }
    // this function loads the schedule into the local storage 
    function loadLocalStorage(event) {
        localStorage.setItem('workHours', JSON.stringify(workHours, event));
    }

    function saveToLocalStorage(event) {
        localStorage.setItem("workHours", JSON.stringify(event));
    }
// this functions uses the two arguments i.e. the hour worked(time) and the task saved(val) to upload into the local storage and also save the data even when the browser is closed or refreshed.
    function saveSchedule(time, val) {
        if(!localStorage.getItem("workHours")) {
            loadLocalStorage();
        }
        let hoursWorked = JSON.parse(localStorage.getItem("workHours"));
        hoursWorked[time] = val

        saveToLocalStorage(hoursWorked);
    }

// this function loops over the value/input.
    function updateSchedule(hourTask) {
        $(".row").each(function() {
          let task = $(this).children("div");
          $(this).children("textarea").text(hourTask[task.text()]);
        })
      }

