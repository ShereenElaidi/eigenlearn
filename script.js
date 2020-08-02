let textarea;
let content; 
let nextQuestionButton; 
let previousQuestionButton; 
let questionNumber = 0;
let numQuestions = 0; 
// let mode; 
let editButton; 
let viewButton; 
let quizButton; 
let state = new Map();
state.set("mode", ""); 
state.set("numQuestions", 0); 
state.set("questionNumber", 0); 
state.set("userHasEdited", false);


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
	// mode = m;
	state.set("mode", m); 
	document.body.className = state.get("mode"); 
}

function init() {
	renderMathInElement(document.getElementById("title")); 
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
		if ((document.documentElement.clientWidth/window.devicePixelRatio) < 500) {
			changeModeTo("quiz"); 
			console.log("HELLO"); 
			postProcessHTML(); 
		} else {
			changeModeTo("edit"); 
		}
	}) 
	window.setInterval(() => {
		if (state.get("userHasEdited")) {
			gabify(content, textarea.value); 
			postProcessHTML(); 
			state.set("userHasEdited", false); 
		}
	}, 1000); 
}



function handleQuizButton() {
	changeModeTo("quiz"); 
	postProcessHTML(); 
	hideElement(textarea);  
}

function handleEditButton() {
	changeModeTo("edit"); 
	postProcessHTML(); 
	showElement(textarea); 
}

function handleViewButton() {
	changeModeTo("view"); 
	postProcessHTML();
	hideElement(textarea); 	
}

function handleUserInput() {
	state.set("userHasEdited", true); 
	// gabify(content, textarea.value); 
	// postProcessHTML(); 
}

function postProcessHTML() {
	let questionElements = document.querySelectorAll("question-env");
	state.set("numQuestions", questionElements.length); 
	for (let i = 0; i < state.get("numQuestions"); i++) {
		if (i === state.get("questionNumber") || state.get("mode") !== "quiz") {
			showElement(questionElements[i]); 
		} else {
			hideElement(questionElements[i]);
		}
	}
}

function handleNextQuestionButton() {
	if (state.get("questionNumber") < state.get("numQuestions") - 1) {
		state.set("questionNumber", state.get("questionNumber")+1); 
		postProcessHTML(); 
	}
}

function handlePreviousQuestionButton() {
	if (state.get("questionNumber") > 0) {
		state.set("questionNumber", state.get("questionNumber")-1); 
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

