---
title: If You Don't Scope, You're a Dope
author: Glen
permalink: /blog/2016/05/26/if-you-dont-scope-youre-a-dope.html 
date_string: 2016/05/26
tags: javascript, scoping, closure
---

<p>Scoping refers to what is “readable” or “available” to different methods in a given program, and is one of the more intuitive aspects of programming. Generally speaking, if you think of a function as a series of matryoshka dolls made of reverse-mirror stuff with the mirror part looking outwards, then you have a pretty good handle on how it works. Objects inside the function can “see” (and access and manipulate) things outside its scope, but within the function itself, can only access things immediately inside the scope.</p>


<!--Summary ends here -->


<p>For example, consider:</p>


<pre>
var x = 2 

fn = function(){
	return 8000000;
};

var y = function (num) {
	num +=4
	var z = function (int) {
		matryoshka = 40;
		return matryoshka + 1;
	};
	return z * num;
};
</pre>

In this example, function y would have access to the variable x, but not the variable matryoshka, whereas function z would be able to use both the number variable and variable x. The only things that the fn function would be able to see are the function y and the variable x.
