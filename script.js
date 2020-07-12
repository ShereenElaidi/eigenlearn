let textarea;
let content; 
let nextQuestionButton; 
let previousQuestionButton; 
let questionNumber = 0;
let numQuestions = 0; 
let mode = "edit"; 
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
	editButton.addEventListener("click", () => {
		mode = "edit"; 
		postProcessHTML(); 
	}); 
	viewButton = document.getElementById("view"); 
	viewButton.addEventListener("click", () => {
		mode = "view"; 
		postProcessHTML(); 
	}); 
	quizButton = document.getElementById("quiz"); 
	quizButton.addEventListener("click", () => {
		mode = "quiz"; 
		postProcessHTML(); 
	});

	textarea.value = String.raw`<question-env>
Let \(\Omega \subseteq \mathbb{R}^n \) be a connected domain. The **wave equation** on \(\Omega \times [0, \infty[ \) is:
\[u_{tt} - c^2\Delta u = 0.\]
What kind of PDE is this? 
</question-env>

<question-env>
Let \( \Omega \subseteq \mathbb{R}^n \) be a connected domain. The **heat equation** on \( \Omega \times [0, \infty[ \) is: 
\[u_t - c \Delta u = 0.\]
What kind of PDE is this?
</question-env>

<question-env> 
Let \( \Omega \subseteq \mathbb{R}^n \) be a connected domain. Then **Laplace's Equation** on \( \Omega \) is: 
\[ \Delta u = 0 \] 
What kind of PDE is this?
</question-env> `; 
	gabify(content, textarea.value); 
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
			questionElements[i].style.display = "block"; 
		} else {
			questionElements[i].style.display = "none"; 
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



window.onload = init; 
