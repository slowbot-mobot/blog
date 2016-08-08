---
title: Before Finding a Solution, First Find a Problem
author: Glen
permalink: /blog/2016/07/23/before-finding-a-solution-first-find-a-problem.html 
date_string: 2016/07/23
tags: javascript
---

I had a problem to solve:

The conversion of a date in a numeric arrangement to a more appealing form- for example, from '2016/07/12' to 'July 12, 2016'. On its surface, it seems like a simple problem, and, in implementation, proved to be very simple. What follows is a picture of the final code.

<!--Summary ends here -->

<img src="/img/CleanDateThing.png" alt="Clean Code" style="width:100%">

Pretty straightforward, right? What follows below is how I initially tried to solve it.

<img src="/img/MessyDateThing.png" alt="Messy Code" style="width:100%">

Horrible, isn’t it? A function whose contents are essentially just three lines (and could be shrunk even further, but for the sake of clarity I left them as is) ballooned out to the hideous monstrosity above for no reason other than intellectual laziness. Here’s a (likely incomplete) list of problems that I saw in my thinking.

 
* Failure to understand what was going to be used as input:

 

This seems to be particularly obvious when I thought about it. The form I used to input the date was 2016/02/1 for single digit day numbers and 2016/02/12 for double digit day numbers. In both formats, the month takes up the same two positions when the date is turned to a string. Equally as important, the day will always be in the same position.

 

* Failure to understand how the language will interpret the input:

 

The problem above stems from a lack of thought into how Javascript will reads numbers. Compared to something like C++ where there there are a variety of number types (int, float,  double, etc.) Javascript only uses one. When ’04’ is seen as a number in Javascript (as opposed to a string), it interprets it as ‘4’ (again, as a number and not a string). There’s no need to overcomplicate the reading of something that will self-correct to what you’re looking for anyways.

