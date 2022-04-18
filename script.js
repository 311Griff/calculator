'use strict';
var nums = document.querySelectorAll('.button');
var ops = ['+', '\u2014', '/', 'x', '='];
var clear = ['C', 'AC'];
var decimal = false;

for (var i = 0, len = nums.length; i < len; i++) {
  nums[i].addEventListener('click', function(e) {
    e.preventDefault();
    var input = document.querySelector('#screen input');
    var equals = document.querySelector('#enter');
    var button = this.innerHTML;
    var inputVal = input.value;
    //calculator logic in the buttons....

    if (ops.indexOf(button) > -1) {
      decimal = false;
      if (ops.indexOf(inputVal.substr(inputVal.length - 1)) > -1 || inputVal.substr(inputVal.length - 1) == '.') {
        input.value = inputVal.substr(0, inputVal.length - 1);

      }
    }

    //logic for the decimal button to only be used once per number between operators.
    if (inputVal.substr(inputVal.length - 1) == '.' && !decimal) {
      decimal = true;
    }

    //do the cleaning of the string then evaluate it
    if (button == '=') {
      if (input.value == '') {
        input.value = 'Nothing Here';
      } else {
        var last = inputVal.length - 1;
        if (ops.indexOf(last) > -1 || last == '.') {
          input.value = inputVal.replace(/.$/, '');
        }
        inputVal = inputVal.replace(/x/g, '*').replace(/\u2014/, '-');
        if (inputVal) {
          input.value = eval(inputVal);
        }
        decimal = false;
      }
    }
    //clear one character off the end
    if (button == 'C') {
      input.value = inputVal.substr(0, inputVal.length - 1);
    }

    if (button == 'AC' || inputVal == 'Nothing Here') {
      input.value = '';
      decimal = false;
    }

    if (clear.indexOf(button) === -1 && button !== '=') {
      if (button == '.' && decimal) {
        return false;
      } else {
        input.value += button;
      }
    }

  });

}