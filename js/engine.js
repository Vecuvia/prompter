/*global $*/

(function (global) {
  "use strict";
  
  [
    "subjects"
  ].forEach(function (element, index, array) {
    $.getJSON("data/" + element + ".json", function (data, status, xhr) {
      localStorage["data-" + element] = JSON.stringify(data);
    });
    $("#" + element).on("click", function (event) {
      $("#prompt").html(JSON.parse(localStorage["data-" + element]).choice().parseTemplate());
    });
  });
}(this.window));