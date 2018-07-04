// the clock in the jumbotron
function update() {
    $('#currentTime').html(moment().format('D. MMMM YYYY H:mm:ss'));
  }
  
  setInterval(update, 1000);


$("#submitButton").on("click", function() {

    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var freqMinutes = $("#freqMinutes").val();

//appends a new row with the entered data
    var newRow = $("<tr>")

    newRow.append($("<td>").text(trainName))
    newRow.append($("<td>").text(destination))
    newRow.append($("<td>").text(freqMinutes))
    newRow.append($("<td>").text(firstTrainTime))

//first time is pushed back a year to make sure it comes first
    var firstTrainTimeConv = moment(firstTrainTime, "HH:mm").subtract(1, "hours");
    console.log(firstTrainTimeConv);
    
//current time for calculation
    var currentTime = moment();

// difference between  current and first train time
    var diffTime = moment().diff(moment(firstTrainTimeConv),"minutes");
    console.log("time difference " + diffTime);

// time apart
    var tRemainder = diffTime % freqMinutes;
    console.log(tRemainder);

//minutes until the next train
    var tMinutesUntilTrain = freqMinutes - tRemainder;
    console.log("minutes till train " + tMinutesUntilTrain)

    $("#entryBody").append(newRow);
    
});