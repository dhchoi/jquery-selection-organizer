var $ = require("jquery");
require("jquery-selection-organizer");

$(document).ready(function () {
  // initialize
  $(".unordered-list").selectionOrganizer({
    childSelector: "li",
    animation: {
      finish: {"height": "toggle"}
    },
    selectedChildClass: "unordered-list-selected",
    callback: function () {console.log("end");}
  });

  // change settings
  // $.fn.selectionOrganizer.settings.showAnimation = false;
});
