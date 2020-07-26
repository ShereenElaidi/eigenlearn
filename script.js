let textarea;
let content; 
let nextQuestionButton; 
let previousQuestionButton; 
let questionNumber = 0;
let numQuestions = 0; 
let mode; 
let editButton; 
let viewButton; 
let quizButton; 


customElements.define("question-env", class extends HTMLElement {
	constructor() {
		super(); 
		this.innerHTML = marked(processString("<b> Question. </b>" + this.innerHTML)); 
	}
	connectedCallback() {
    	renderMathInElement(this);
   	}
}); 

function changeModeTo(m) {
	mode = m;
	document.body.classList.remove("edit"); 
	document.body.classList.remove('view');
	document.body.classList.remove('quiz')	
	if (mode === 'quiz') {	
		document.body.classList.add("quiz"); 

	} else if (mode === 'edit') {
		document.body.classList.add("edit"); 
	} else {
		document.body.classList.add('view'); 		
	}
}

function init() {
	renderMathInElement(document.querySelector("h1")); 
	renderMathInElement(document.body) 
	textarea = document.getElementById("code"); 
	textarea.addEventListener("input", handleUserInput); 
	content = document.getElementById("content");
	nextQuestionButton = document.getElementById("next-question");  
	nextQuestionButton.addEventListener("click", handleNextQuestionButton); 
	previousQuestionButton = document.getElementById("previous-question"); 
	previousQuestionButton.addEventListener("click", handlePreviousQuestionButton); 
	editButton = document.getElementById("edit"); 
	editButton.addEventListener("click", handleEditButton); 
	viewButton = document.getElementById("view"); 
	viewButton.addEventListener("click", handleViewButton); 
	quizButton = document.getElementById("quiz"); 
	quizButton.addEventListener("click", handleQuizButton);

	fetch("454.txt").then(r => r.text()).then(t => {
		gabify(content, t); 
		textarea.value = t; 
	})
	console.log(innerWidth);
	if (window.innerWidth < 760) {
		changeModeTo("quiz"); 
	} else {
		changeModeTo("edit"); 
	}
}



function handleQuizButton() {
	mode = "quiz"; 
	postProcessHTML(); 
	hideElement(textarea); 
	changeModeTo(mode); 
}

function handleEditButton() {
	mode = "edit"; 
	postProcessHTML(); 
	showElement(textarea); 
	changeModeTo(mode); 
}

function handleViewButton() {
	mode = "view"; 
	postProcessHTML();
	hideElement(textarea); 
	changeModeTo(mode);  	
}

function handleUserInput() {
	gabify(content, textarea.value); 
	postProcessHTML(); 
}

function postProcessHTML() {
	let questionElements = document.querySelectorAll("question-env");
	numQuestions = questionElements.length;  
	console.log(numQuestions);
	for (let i = 0; i < questionElements.length; i++) {
		if (i === questionNumber || mode !== "quiz") {
			console.log("Question No" + i); 
			showElement(questionElements[i]); 
			console.log(questionElements[i]); 
		} else {
			console.log("I had better not see this message"); 
			hideElement(questionElements[i]);
		}
	}
}

function handleNextQuestionButton() {
	if (questionNumber < numQuestions - 1) {
		questionNumber++; 
		postProcessHTML(); 
	}
}

function handlePreviousQuestionButton() {
	if (questionNumber > 0) {
		questionNumber--; 
		postProcessHTML(); 
	}
}

function hideElement(element) {
	element.style.display = "none"; 
}

function showElement(element) {
	element.style.display = "block"; 
}

window.onload = init; 

