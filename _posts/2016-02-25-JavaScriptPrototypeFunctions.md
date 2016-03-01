---
layout: post
title: "JavaScript Prototype Functions"
excerpt: "JS code I have written over the last few months to solidify my understanding of fundamental JS concepts."
link: https://github.com/tonykle/JavaScript-Prototype-Functions
tags: [javascript, practice, JS, prototypes]
---
Here's a link to the github repository: [link](https://github.com/tonykle/JavaScript-Prototype-Functions). My personal implementations of prototype functions in JavaScript. My purpose in this project is to further develop a deeper understanding of how functions work 'under the hood' in JS. Additionally, a number of built-in JS functions have odd or quirky edge cases and implementing through this project is helping me learn and memorize how they work.

{% highlight javascript %}
'use strict';
/*
Mozilla: "The substring() method returns a subset of a string between one index and another, or
through the end of the string."
My personal implementation of the substring() function used for strings in JS.
*/

// params: start and ending indexes
String.prototype.substring = function(start, end) {
  // if input values are equal to each other, return an empty string
  if (start === end) {
    return '';
  }
  var finalString = ''; // string to be appended to and returned
  var self = this; // original string passed in

  // preliminary checks
  start = start > self.length ? self.length : start;
  start = (start < 0 || start === NaN) ? 0 : start;
  end = end > self.length ? self.length : end;
  end = (end < 0 || end === NaN) ? 0 : end;

  // if only start value is passed in, substring from start index to end of string
  if (arguments.length === 1) {
    for (let i = start; i < self.length; i++) {
      finalString += self.charAt(i);
    }
    return finalString;
  } else if (arguments.length === 2) {
    // if start val > end val, reverse the two
    if (start > end) {
      let endTemp = end;
      end = start;
      start = endTemp;
    }
    for (let i = start; i < end; i++) {
      finalString += self.charAt(i);
    }
    return finalString;
  }
}

var anyString = 'Mozilla';

// Test Cases taken from Mozilla's JS String.prototype.substring() documentation
// Displays 'Moz'
console.log(anyString.substring(0, 3));
console.log(anyString.substring(3, 0));

// Displays 'lla'
console.log(anyString.substring(4, 7));
console.log(anyString.substring(7, 4));

// Displays 'Mozill'
console.log(anyString.substring(0, 6));

// Displays 'Mozilla'
console.log(anyString.substring(0, 7));
console.log(anyString.substring(0, 10));
{% endhighlight %}
