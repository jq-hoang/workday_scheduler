function generateRows() {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentHour = moment().hour();

  for (let i = 9; i < 18; i++) {
    const newRow = $("<div>").addClass("row time-block");
    const hourCol = $("<div>")
      .addClass("col-md-1 hour")
      .text(moment(i, "H").format("hA"));

    const textCol = $("<textarea>")
      .addClass("col-md-10 description")
      .addClass(currentHour > i ? "past" : currentHour === i ? "present" : "future")
      .attr("id", `hour-${i}`)
      .val(localStorage.getItem(`${currentDate}-hour-${i}`));

    const saveCol = $("<button>")
      .addClass("col-md-1 saveBtn")
      .html("<i class='fas fa-save'></i>")
      .attr("data-hour", i);

    newRow.append(hourCol, textCol, saveCol);
    $(".container").append(newRow);
  }
}

$(document).ready(function () {

  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm a"));


  $(".saveBtn").on("click", function () {
    // gets the event description and hour
    var description = $(this).siblings(".description").val();
    var hour = $(this).attr("data-hour");
    var currentDate = moment().format("YYYY-MM-DD");
    // update events object and save to local storage
    localStorage.setItem(`${currentDate}-hour-${hour}`, description);
  });

  // loops through each time block and populate with events from local storage
  $(".time-block").each(function () {
    var hour = $(this).find(".hour").text();
    var description = localStorage.getItem(`${currentDate}-hour-${hour}`);
    $(this).find(".description").val(description);
  });

  // checks current time and add past, present, or future classess to time blocks
  function updateTimeBlocks() {
    var currentHour = moment().hours();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).find(".hour").text());

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // call updateTimeBlocks every 10mins to update colors of time blocks
  setInterval(updateTimeBlocks, 600000);
  updateTimeBlocks();

});

generateRows();
