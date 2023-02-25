function generateRows() {
    const workdayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const currentDate = moment().format("YYYY-MM-DD");
    const currentHour = moment().hour();
  
    for (let i = 0; i < workdayHours.length; i++) {
      const newRow = $("<div>").addClass("row time-block");
      const hourCol = $("<div>")
        .addClass("col-md-1 hour")
        .text(moment(workdayHours[i], "H").format("hA"));
  
      const textCol = $("<textarea>")
        .addClass("col-md-10 description")
        .addClass(currentHour > workdayHours[i] ? "past" : currentHour === workdayHours[i] ? "present" : "future")
        .attr("data-hour", workdayHours[i])
        .val(localStorage.getItem(`${currentDate}-${workdayHours[i]}`));
  
      const saveCol = $("<button>")
        .addClass("col-md-1 saveBtn")
        .html("<i class='fas fa-save'></i>")
        .attr("data-hour", workdayHours[i]);
  
      newRow.append(hourCol, textCol, saveCol);
      $(".container").append(newRow);
    }
  }
  
  
  $(document).ready(function () {
  
    // display current date and time
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm a"));
  
    // save button click event listener
    $(".saveBtn").on("click", function () {
      // get the event description and hour
      var description = $(this).siblings(".description").val();
      var hour = $(this).parent().attr("data-hour");
      var currentDate = moment().format("YYYY-MM-DD");
      // update events object and save to local storage
      localStorage.setItem(`${currentDate}-${hour}`, description);
    });
  
  // loop through each time block and populate with events from local storage
  $(".time-block").each(function () {
    var hour = $(this).attr("data-hour");
    var currentDate = moment().format("YYYY-MM-DD");
    $(this).find(".description").val(localStorage.getItem(`${currentDate}-${hour}`) || "");
  });
  
  
    // check current time and add past, present, or future class to time blocks
    function updateTimeBlocks() {
      var currentHour = moment().hours();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("data-hour"));
  
        if (blockHour < currentHour) {
          $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentHour) {
          $(this).addClass("present").removeClass("past future");
        } else {
          $(this).addClass("future").removeClass("past present");
        }
      });
    }
  
    // call updateTimeBlocks every 10 minutes to update colors of time blocks
    setInterval(updateTimeBlocks, 600000);
    updateTimeBlocks();
  
  });
  
  
    generateRows();