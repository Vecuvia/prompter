(function (global) {
  "use strict";

  //Returns a random value between min and max, included
  global.random = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Returns a random element from an array
  Array.prototype.choice = function () {
    return this[global.random(0, this.length - 1)];
  };

  //Templates a string according to some simple rules:
  // - `\`: escape character - add it before one of the following to ignore
  //   that rule
  // - `[#(.+?)]`: comment - is ignored
  // - `[(hidden:)choice 1|choice 2]`: if not hidden, outputs one of choice 
  //    1 or choice 2, and adds it to the `substitutions` list
  // - `[@[0-9]+]`: calls one of the earlier substitutions again and outputs 
  //   it (the substitution must be defined)
  // - `$[0-9]+`: outputs one of the earlier substitutions
  String.prototype.parseTemplate = function () {
    var substitutions = [];
    return this.replace(/(\\)?(\[(@|#|hidden:)?(.*?)\])/g, function (match, escaped, whole, modifier, choices) {
      console.log(modifier);
      if (escaped) {
        return whole;
      }
      if (modifier === "#") {
        return "";
      }
      if (modifier === "@") {
        choices = substitutions[parseInt(choices, 10)].choices;
      }
      var choice = choices.split("|").choice();
      substitutions.push({
        choices: choices,
        choice: choice
      });
      if (modifier === "hidden:") {
        return "";
      }
      return choice;
    }).replace(/(\\)?(\$([0-9]+))/g, function (match, escaped, whole, group) {
      if (escaped) {
        return whole;
      }
      return substitutions[parseInt(group, 10)].choice;
    });
  };
}(this.window));