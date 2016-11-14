/*global $*/

(function (global) {
  "use strict";
  
  var functions = {
    silent: function (param) {
      return "";
    },
    lower: function (param) {
      return param.toLowerCase();
    },
    upper: function (param) {
      return param.toUpperCase();
    },
    capitalize: function (param) {
      return param.slice(0, 1).toUpperCase() + param.slice(1);
    },
    object: function (param) {
      switch (param) {
        case "he":   return "him";
        case "she":  return "her";
        case "they": return "them";
        case "it":   return "it";
      }
    },
    possessive: function (param) {
      switch (param) {
        case "he":   return "his";
        case "she":  return "her";
        case "they": return "their";
        case "it":   return "its";
      }
    }
  };
  
  [
    "subjects",
    "first-line"
  ].forEach(function (element, index, array) {
    $.getJSON("data/" + element + ".json", function (data, status, xhr) {
      localStorage["data-" + element] = JSON.stringify(data);
    });
  });
  
  $("#generate").on("click", function (event) {
    $("#prompt").html(
      JSON.parse(localStorage["data-" + $("#kind").val()])
        .choice().parseTemplate(functions)
    );
  });
}(this.window));