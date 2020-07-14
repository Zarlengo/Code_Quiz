var jQueryQuestions= [
	{
		title:"Question 1",
		question:"What is the correct jQuery code to set the background color of all p elements to red?",
		answers:{
			a:`$("p").css("background-color","red");`,
			b:`$("p").layout("background-color","red");`,
			c:`$("p").manipulate("background-color","red");`,
			d:`$("p").style("background-color","red");`
		},
		answer:"a"
	},
	{
		title:"Question 2",
		question:`With jQuery, look at the following selector: $("div.intro"). What does it select?`,
		answers:{
			a:`The first div element with class="intro"`,
			b:`The first div element with id="intro"`,
			c:`All div elements with class="intro"`,
			d:`All div elements with id="intro"`
		},
		answer:"c"
	},
	{
		title:"Question 3",
		question:"Which jQuery method is used to hide selected elements?",
		answers:{
			a:"display(none)",
			b:"hidden()",
			c:"hide()",
			d:"visible(false)"
		},
		answer:"c"
	},
	{
		title:"Question 4",
		question:"What scripting language is jQuery written in?",
		answers:{
			a:"C#",
			b:"JavaScript",
			c:"C++",
			d:"VBScript"
		},
		answer:"b"
	},
	{
		title:"Question 5",
		question:"Which jQuery method should be used to deal with name conflicts?",
		answers:{
			a:"conflict()",
			b:"noConflict()",
			c:"noNameConflict()",
			d:"nameConflict()"
		},
		answer:"b"
	},
	{
		title:"Question 6",
		question:"Which jQuery method is used to switch between adding/removing one or more classes (for CSS) from selected elements?",
		answers:{
			a:"switch()",
			b:"switchClass()",
			c:"toggleClass()",
			d:"altClass()"
		},
		answer:"c"
	},
	{
		title:"Question 7",
		question:`Look at the following selector: $(":disabled"). What does it select?`,
		answers:{
			a:"All disabled input elements",
			b:`All elements that does not contain the text "disabled"`,
			c:`All elements containing the text "disabled"`,
			d:"All hidden elements"
		},
		answer:"a"
	},
	{
		title:"Question 8",
		question:"Which jQuery method returns the direct parent element of the selected element?",
		answers:{
			a:"ancestor()",
			b:"parent()",
			c:"ancestors()",
			d:"parents()"
		},
		answer:"b"
	},
	{
		title:"Question 9",
		question:"Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
		answers:{
			a:"getIndex()",
			b:"location()",
			c:"indexOf()",
			d:"None of the above"
		},
		answer:"c"
	},
	{
		title:"Question 10",
		question:"Which built-in method returns the calling string value converted to lower case?",
		answers:{
			a:"toLowerCase()",
			b:"toLower()",
			c:"changeCase(case)",
			d:"None of the above"
		},
		answer:"a"
	},
	{
		title:"Question 11",
		question:"Which of the following jQuery method sets the html contents of an element?",
		answers:{
			a:"html(val)",
			b:"setHtml(val)",
			c:"setInnerHtml(val)",
			d:"None of the above"
		},
		answer:"a"
	},
	{
		title:"Question 12",
		question:"Which of the following jQuery method can be used to attach a function to be executed whenever AJAX request completed successfully?",
		answers:{
			a:"ajaxStart(callback)",
			b:"ajaxSuccess(callback)",
			c:"ajaxSend(callback)",
			d:"ajaxStop(callback)"
		},
		answer:"b"
	}
];