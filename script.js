// Set the current date, day and time to be displayed on the header.
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

// adding click function to save the inputs in the local storage of the browser whenever the save button is clicked.
$(document).ready(function(){

    $("button").on("click", function(){
        var value = $(this).siblings("textarea").val();
        var time = $(this).siblings("div").text();

        localStorage.setItem(time, value);
        
    })
    const workHours = {
        "9:00 AM": "",
        "10:00 AM": "",
        "11:00 AM": "",
        "12:00 PM": "",
        "1:00 PM": "",
        "2:00 PM": "",
        "3:00 PM": "",
        "4:00 PM": "",
        "5:00 PM": "",
    };

// this function checks the time and updates the background color depending on wether it is past, present or future.
    let counter = 1;
    for(const property in workHours) {
        let textEntry = "#text-entry" + counter;
        $(textEntry).text(workHours[property]);
        let timeId = "#time" + counter;
        let presentHour = moment().hour();
        let timeString = $(timeId).text();
        let timeNumber = hourNumbers(timeString);  
    if(timeNumber < presentHour) {
        $(textEntry).addClass("past-hour");
    } else if (timeNumber > presentHour) {
        $(textEntry).addClass("future-hour");
    } else {
        $(textEntry).addClass("present-hour");
    }
    counter ++;
    }

    function hourNumbers(hourString) {
    switch(hourString) {
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 AM": return 12;
        case "13 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
        case "6 PM": return 18;
    }
}
