// the clock in the jumbotron
function update() {
    $('#currentTime').html(moment().format('D. MMMM YYYY h:mm:ss'));
}

setInterval(update, 1000);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVyA4yf9AvWRjT2cZQfxdH7nkt8pQXhUA",
    authDomain: "train-time-assignment.firebaseapp.com",
    databaseURL: "https://train-time-assignment.firebaseio.com",
    projectId: "train-time-assignment",
    storageBucket: "",
    messagingSenderId: "384643739685"
};
firebase.initializeApp(config);



$("#submitButton").on("click", function () {
    
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var freqMinutes = $("#freqMinutes").val();

    
    //first time is pushed back a year to make sure it comes first
    var firstTrainTimeConv = moment(firstTrainTime, "h:mm").subtract(1, "hours");
    console.log(firstTrainTimeConv);
    
    //current time for calculation
    var currentTime = moment();
    
    // difference between  current and first train time
    var diffTime = moment().diff(moment(firstTrainTimeConv), "minutes");
    console.log("time difference " + diffTime);

    // time apart
    var tRemainder = diffTime % freqMinutes;
    console.log(tRemainder);
    
    //minutes until the next train
    var tMinutesUntilTrain = freqMinutes - tRemainder;
    console.log("minutes till train " + tMinutesUntilTrain)
    
    // next train
    var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
    console.log("arrival time " + moment(nextTrain).format("h:mm"));

    //appends a new row with the entered data
    var newRow = $("<tr>")
    
    newRow.append($("<td>").text(trainName));
    newRow.append($("<td>").text(destination));
    newRow.append($("<td>").text(freqMinutes + " minutes"));
    newRow.append($("<td>").text(moment(nextTrain).format("hh:mm")))
    newRow.append($("<td>").text(tMinutesUntilTrain + " minutes"));
    
    $("#entryBody").append(newRow);
    
    var database = firebase.database();

    database.ref().update({
        name: trainName,
        dest: destination,
        freq: freqMinutes,
        next: nextTrain,
        tUntilTrain: tMinutesUntilTrain,
    });
});