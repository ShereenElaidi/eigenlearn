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
	if (mode === 'quiz') {
		hideElement(textarea); 
		document.getElementById("content").style.fontSize = "25px"; 
		// textarea.classList.add("hidetextbox"); 
		// content.classList.add("expandcontent"); 
	} else {
		showElement(textarea); 
		// textarea.classList.remove("hidetextbox"); 
		// content.classList.remove("expandcontent"); 
	}
}

function init() {
	renderMathInElement(document.querySelector("h1")); 
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

	textarea.value = String.raw`<question-env>
Let \(\Omega \subseteq \mathbb{R}^n \) be a domain. The **wave equation** on \(\Omega \times [0, \infty[ \) is:
\[u_{tt} - c^2\Delta u = 0.\]
What kind of PDE is this? 
</question-env>

<question-env>
Let \( \Omega \subseteq \mathbb{R}^n \) be a domain. The **heat equation** on \( \Omega \times [0, \infty[ \) is: 
\[u_t - c \Delta u = 0.\]
What kind of PDE is this?
</question-env>

<question-env> 
Let \( \Omega \subseteq \mathbb{R}^n \) be a domain. Then **Laplace's Equation** on \( \Omega \) is: 
\[ \Delta u = 0 \] 
What kind of PDE is this?
</question-env> 

<question-env>
State and prove the **Dominated Convergence Theorem**. 
</question-env>`; 
	gabify(content, textarea.value); 
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
}

function handleViewButton() {
	mode = "view"; 
	postProcessHTML();
	hideElement(textarea);  	
}

function handleUserInput() {
	gabify(content, textarea.value); 
	postProcessHTML(); 
}

function postProcessHTML() {
	let questionElements = document.querySelectorAll("question-env");
	numQuestions = questionElements.length;  
	for (let i = 0; i < questionElements.length; i++) {
		if (i === questionNumber || mode !== "quiz") {
			showElement(questionElements[i]); 
		} else {
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
