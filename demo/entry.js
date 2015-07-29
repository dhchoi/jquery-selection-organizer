var $ = require("jquery");
require("jquery-selection-organizer");

$(document).ready(function () {
  // initialize
  $(".unordered-list").selectionOrganizer({
    selector: "li",
    animationProperties: {
      finish: {"height": "toggle"}
    },
    classSelected: "unordered-list-selected",
    callback: function () {console.log("end");}
  });

  // change settings
  $.fn.selectionOrganizer.settings.sendToEnd = true;
});
