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
    storageBucket: "train-time-assignment.appspot.com",
    messagingSenderId: "384643739685"
}
firebase.initializeApp(config);
var database = firebase.database();


$("#submitButton").on("click", function () {

    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var freqMinutes = $("#freqMinutes").val();


    //
    console.log('about to save');
    database.ref().push({
        name: trainName,
        dest: destination,
        freq: freqMinutes,
        firstTrainTime: firstTrainTime
    });
});
// on("child_added") runs 1) on page load and 2) when data is added to our database in database.ref().push()
database.ref().on("child_added", function (childSnapShot) {
    //first time is pushed back a year to make sure it comes first
    var firstTrainTimeConv = moment(childSnapShot.val().firstTrainTime, "h:mm").subtract(1, "hours");
    console.log('firstTrainTimeConv', firstTrainTimeConv);

    //current time for calculation
    var currentTime = moment();

    // difference between  current and first train time
    var diffTime = moment().diff(moment(firstTrainTimeConv), "minutes");
    console.log("time difference " + diffTime);

    // time apart
    var tRemainder = diffTime % childSnapShot.val().freq;
    console.log(tRemainder);

    //minutes until the next train
    var tMinutesUntilTrain = childSnapShot.val().freq - tRemainder;
    console.log("minutes till train " + tMinutesUntilTrain)

    // next train
    var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
    console.log("arrival time " + moment(nextTrain).format("h:mm"));

    //appends a new row with the entered data
    var newRow = $("<tr>")

    newRow.append($("<td>").text(childSnapShot.val().name));
    newRow.append($("<td>").text(childSnapShot.val().dest));
    newRow.append($("<td>").text(childSnapShot.val().freq + " minutes"));
    newRow.append($("<td>").text(moment(nextTrain).format("hh:mm")))
    newRow.append($("<td>").text(tMinutesUntilTrain + " minutes"));

    $("#entryBody").append(newRow);
});