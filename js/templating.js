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
  // - `$[\w\d]+`: outputs one of the earlier substitutions or a variable
  // - `@[a-z:]+(.+?)`: calls one or more functions, pipelining them over
  //   the parameter
  String.prototype.parseTemplate = function (variables) {
    var substitutions = [];
    return this.replace(/(\\)?(\[(@|#|hidden:)?(.*?)\])/g, function (match, escaped, whole, modifier, choices) {
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
    }).replace(/(\\)?(\$([\w\d]+))/g, function (match, escaped, whole, name) {
      if (escaped) {
        return whole;
      }
      var result, group = parseInt(name, 10);
      if (!Number.isNaN(group)) {
        result = substitutions[group].choice;
      } else {
        result = variables[name];
      }
      if (result !== undefined) {
        return result;
      }
      return "";
    }).replace(/(\\)?@(([a-z:]+)\((.+?)\))/g, function (match, escaped, whole, name, param) {
      if (escaped) {
        return whole;
      }
      var result = param, called = name.split(":");
      for (var i = 0; i < called.length; i++) {
        if (variables[called[i]]) {
          result = variables[called[i]](result);
        } else {
          result = "Error: no function '" + called[i] + "'";
          break;
        }
      }
      return result;
    });
  };
}(this.window));