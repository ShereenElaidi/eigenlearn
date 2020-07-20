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
		// hideElement(textarea); 
		document.getElementById("content").style.fontSize = "25px"; 
		document.getElementById("topbox").style.gridColumn= "span 3"; 	
		textarea.classList.add("hidetextbox"); 
		content.classList.add("expandcontent"); 
		textarea.classList.add("topbox"); 

	} else if (mode === 'edit') {
		// showElement(textarea); 
		document.getElementById("content").style.fontSize = "15px"; 
		document.getElementById("topbox").style.gridColumn= "span 3"; 
		textarea.classList.remove("hidetextbox"); 
		content.classList.remove("expandcontent"); 
	} else {
		// showElement(textarea); 
		document.getElementById("content").style.fontSize = "18px"; 
		document.getElementById("topbox").style.gridColumn= "span 3"; 
		textarea.classList.add("hidetextbox"); 
		content.classList.add("expandcontent"); 		
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

	textarea.value = String.raw`
<question-env>
**(Math 454, Continuity Of Lebesgue Integration, Assignment #4)**
1. Let \(f\) be integrable over \( A \subseteq \mathbb{R}\). By using the countable additivity of integration, prove that: 
	1. If \( (A_n) \) is a sequence of measurable subsets of \( A \) such that \( A_n \subseteq A_{n+1} \) for all \( n \in \mathbb{N} \), then 
	$$ \int_{\cup_{n=1}^\infty A_n} f = \lim_{n \rightarrow \infty} \int_{A_n} f $$
	2. If \( (A_n) \) is a sequence of measurable subsets of \( A \) such that \( A_{n+1} \subseteq A_n \)  for all \( n \in \mathbb{N} \), then 
	$$ \int_{\cap_{n=1}^\infty A_n} f = \lim_{n \rightarrow \infty} \int_{A_n} f $$
2. Prove that if \( f \) is integrable over \( \mathbb{R} \), then \( F(x) = \int_{]-\infty, x[} f \) is continuous on \( \mathbb{R} \) and satisfies \( \lim_{x \rightarrow - \infty} F(x) = 0 \) and \( \lim_{ x \rightarrow + \infty} F(x) = \int_\mathbb{R} f \).
3. Let \( f(x) = \frac{ \sin(x) }{x} \) for all \( x \in [ \pi, \infty[ \). Prove that \( \lim_{n \rightarrow \infty} \int_{[\pi, n \pi]} f \) exists, while \( f \) is not integrable over \( [\pi, \infty[ \). 
</question-env>

<question-env>
**(Math 454, Assignment #4)**
1. Let $ (f_n)_{n \in \mathbb{N}} $ be a sequence of nonnegative measurable functions over $ A \subseteq \mathbb{R} $. Prove that if $ f_1 $ is integrable over $A$ and $f_{n+1} < f_n$ $\forall n \in \mathbb{N}$, then:
$$\lim_{n \rightarrow \infty} \int_A f_n = \int_A \lim_{n \rightarrow \infty} f_n $$
2. Show by providing a counter-example that this assertion is not true in general when $f_1$ is not integrable over $A$.
</question-env> 

<question-env>
**(Math 454, Assignment #3)**
1. Let $f$ and $g$ be two continuous functions on an interval $]a,b[$. Prove that if $f=g$ a.e. in $]a,b[$, then in fact $f=g$ on $]a,b[$.
2. Show by providing a counter-example that this assertion is false if $]a,b[$ is replaced by a general measurable set $A$.
</question-env> 

<question-env>
**(Math 454, Assignment #5)**
1. Let $f$ be Lipschitz on $\mathbb{R}$ and let $g$ be absolutely continuous on $[a,b]$. Prove that the composition $f \circ g$ is absolutely continuous on $[a,b]$. 
1. Define the functions $f$ and $g$ on $[0,1]$ by $f(x) := x^{1/3}$ for $0 \leq x \leq 1$ and:
$$ g(x) := \begin{cases}
x^3(\cos(\pi / (2x)))^3 & \text{ for } 0 < x \leq 1 \\\\
0 & \text{ for } x =0
\end{cases} $$
      1. Prove that both $f$ and $g$ are absolutely continuous on $[0,1]$. 
      2. Prove that $f \circ g$ fails to be of bounded variation, and hence also fails to be absolutely continuous on $[0,1]$. Hint: examine $\sum_{k=1}^{2n} | f \circ g(x_k) - f \circ g(x_{k-1})|$, where $x_0 = 0 $ and $x_k = 1/(2n-k+1)$ for $k \geq 1$.
</question-env>

<question-env>
**(Math 454, Assignment #5)**
1. Prove that both the sum and product of functions of bounded variation on an interval $[a,b]$ are of bounded variation. 
2. Prove that the sum and product of absolutely continuous functions on an interval $[a,b]$ are absolutely continuous. 
3. Let $f$ and $g$ be absolutely continuous on $[a,b]$. Prove that:
$$ \int_{[a,b]} fg' = f(b) g(b) - f(a) g(a) - \int_{[a,b]} f'g $$
</question-env>

<question-env>
**(Math 454, Assignment #2)**
1. Prove that every closed set is a $G_\delta$ set and every open set is an $F_\sigma$ set. Hint: if $F \subseteq \mathbb{R}$ is closed, consider $O_n := \\{ x \in \mathbb{R}\ |\ d(x, F) < 1/n \\}$.
2. Prove that $\mathbb{Q}$ is an $F_\sigma$ set but not a $G_\delta$ set. Hint: You may argue by contradiction: assume that $\mathbb{Q}$ is both an $F_\sigma$ set and a $G_\delta$ set, then show that there exist open sets $(O_n)$ which are all dense in $\mathbb{R}$ whose intersection is empty, and finally derive a contradiction with a well-known property of $\mathbb{R}$.
</question-env> 

<question-env>
**(Math 454, Assignment #6)**
1. Prove that if $f$ is measurable on $\mathbb{R}^d$, then $(x,y) \mapsto f(x-y) $ is measurable on $\mathbb{R}^{2d}$. This is actually the hardest part of the question. Hint: it may be helpful to first write $\\{ x \in \mathbb{R}^d\ |\ f(x) < c \\}$ as the difference of a $G_\delta$ set and a set of measure $0$, and then show that this gives a similar decomposition for the set $\\{ (x,y) \in \mathbb{R}^{2d}\ |\ f(x-y) < c \\}$. 
2. Prove that if $f$ and $g$ are integrable over $\mathbb{R}^d$, then $(x,y) \mapsto f(x-y)g(y)$ is integrable over $\mathbb{R}^{2d}$
3. We define the convolution $f * g$ of $f$ and $g$ as: 
$$ f * g(x) := \int_{\mathbb{R}^d} f(x-y) g(y) dy $$
Prove that if $f$ and $g$ are integrable over $\mathbb{R}^d$, then $f *g$ is well-defined for a.e. $x$ (that is, $y \mapsto f(x-y) g(y)$ is integrable over $\mathbb{R}^d$ for a.e. $x$).
4. Prove that $f * g$ is integrable whenever $f$ and $g$ are integrable, and that
$$ \int_{\mathbb{R}^d} | f * g(x) | dx \leq \left(  \int_{\mathbb{R}^d} |f(x)| \right) \left( \int_{\mathbb{R}^d} |g(x)| \right) $$
with equality if $f$ and $g$ are non-negative.
</question-env>

<question-env>
**(Math 454, Assignment #2)**
1. Show that a strictly increasing function that is defined on an interval has a continuous inverse. 
2. Let $A$ and $B$ be two Borel subsets of $\mathbb{R}$ and $f: A \rightarrow \mathbb{R}$ a continuous function. Show that $f^{-1}(B) $ is a Borel set. Hint: prove that the collection of sets $B$ for which $f^{-1}(B)$ is Borel is a $\sigma$-algebra containing the open sets. 
3. Use parts (1) and (2) to show that a continuous strictly increasing function that is defined on an interval maps Borel sets to Borel sets.
</question-env> 

<question-env>
**(Math 454, Assignment #3)**
1. Show that the conclusion of Egoroff's theorem can fail if we drop the assumption that the domain has finite measure.
2. We proved Lusin's theorem in class under the assumption that the domain has finite measure. Show that this theorem continues to hold if the domain has infinite measure. 
</question-env>

<question-env>
**(Math 454, Assignment #3)**
A function $f: \mathbb{R} \rightarrow \overline{\mathbb{R}}$ is said to be **Borel Measurable** provided its domain $A \subseteq \mathbb{R}$ is a Borel set and for each $c$, the set $\\{ x \in A\ |\ f(x) < c \\}$ is a Borel set. Prove that
1. Every Borel measurable function is Lebesgue measurable. 
2. If $f$ is Borel measurable and $B$ is a Borel set, then $f^{-1}(B)$ is a Borel set. 
3. If $f$ and $g$ are Borel measurable, so is $f \circ g$.
4. If $f$ is Borel measurable and $g$ is Lebesgue measurable, then $f \circ g$ is Lebesgue measurable.
</question-env> 

<question-env>
**(Math 454, Assignment #1)**
A set of real numbers is said to be a $G_\delta$ set provided it is the intersection of a countable collection of open sets. Show that for any $A \subseteq \mathbb{R}$ such that $m^*(A) < \infty$, there is a $G_\delta$ set $G$ for which $A \subseteq G$ and $m^*(G) = m^*(A)$. 
</question-env> 

<question-env>
**(Math 454, Assignment #4)**
Determine the limit as $n \rightarrow \infty$ of the numbers
$$ I_n := \int_{]0, \infty[} \frac{x^n}{1+x^{n+2}} dx $$
</question-env> 

<question-env>
**(Math 454, Assignment #1)**
For every set $A \subseteq \mathbb{R}$, let $m_j^*(A)$ be defined as: 
$$ m_j^*(A) := \inf \sum_{k=1}^n \ell(I_k) $$
where the infimum is taken over all finite coverings of $A$ by open intervals $I_k$. The function $m_J^*$ is called the **outer Jordan measure**. 
1. Prove that $m_j^*(A) = m_J^*(\overline{A})$ for all sets $A \subseteq \mathbb{R}$, where $\overline{A}$ denotes the closure of $A$. 
2. Give an example of a countable set $A$ such that $m_J^*(A) = 1$. Compare with $m^*(A)$. 
</question-env> 

<question-env>
**(Math 454, Assignment #3)** Let $(f_n)$ be a sequence of measurable functions defined on a measurable set $A \subseteq \mathbb{R}$. Let $A_0$ be the set of points $x$ in $A$ at which $(f_n(x))$ converges. Is $A_0$ measurable?
</question-env> 

<question-env> 
**(Math 454, Assignment #3)**
Let $(f_n)$ be a sequence of measurable functions defined on a measurable set $A \subseteq \mathbb{R}$. Prove that each of the following functions is measurable: 
$$ \inf_{n \in \mathbb{N}} (f_n),\ \sup_{n \in \mathbb{N}} (f_n), \liminf_{n \rightarrow \infty} (f_n),\ \text{ and } \limsup_{n \rightarrow \infty} (f_n)$$
</question-env> 

<question-env>
**(Math 454, Assignment #6)**
Let $\Gamma \subseteq \mathbb{R}^d \times \mathbb{R}$, $\Gamma := \\{ (x,y) \in \mathbb{R}^d \times \mathbb{R}\ |\ y = f(x) \\}$, and assume that $f$ is measurable on $\mathbb{R}^d$. Prove that $\Gamma$ is a measurable subset of $\mathbb{R}^{d+1}$, and $m(\Gamma) = 0$.
</question-env> 

<question-env> 
**(Math 454, Assignment #1)**
Let $A \subseteq \mathbb{R}$ and $O_n := \\{ x \in \mathbb{R}\ |\ d(x,A) < 1/n \\} $ for all $n \in \mathbb{N}$, where $d(x,A) := \inf \\{ | x- y|\ |\ y \in A \\} $
1. Prove that if $A$ is compact then $\lim_{n \rightarrow \infty} m(O_n) = m(A)$. 
2. Prove that this is not necessarily true if $A$ is open and bounded. 
</question-env> 

<question-env>
**(Math 454, Assignment #1)** Let $A \subseteq \mathbb{R}$ be measurable, $\alpha > 0$, $A_\alpha := \\{ \alpha x\ |\ x \in A \\}$ 
  1. Prove that $m^*(A_\alpha) = \alpha m^*(A)$ 
  2. Prove that $A$ is measurable $\iff$ $A_\alpha$ is measurable.
</question-env> 

<question-env> 
**(Math 454, Assignment #2)**
Let $A \subseteq \mathbb{R}$ be measurable. Prove that
$$ m(A) = \sup \\{ m(K)\ |\ K \subseteq A, K \text{ compact} \\}. $$
This property is called the **inner regularity of Lebesgue measure**. Hint: You may first approximate $A$ by a closed set $F$ and then use the continuity of Lebesgue Measure.
</question-env> 

<question-env> 
**(Math 454, Assignment #2)**
Let $A$ and $B$ be two subsets of $\mathbb{R}$ and $A+B$ be the set defined by $A + B := \\{ x+y\ |\ x  \in A, y \in B \\}$. Prove that: 
1. If $A$ is closed and $B$ is compact, then $A+B$ is closed.
2. If $A$ and $B$ are closed, then $A+B$ is measurable.
Hint for Part (2): Prove that $A+B$ is an $F_\sigma$ set.
</question-env> 

<question-env> 
**(Math 454, Assignment #2)**
Let $A$ be a subset of $\mathbb{R}$ such that $m^*(A) < \infty$. Prove that: 
1. $A$ is measurable $\iff$ $\exists$ an $F_\sigma$ set $F$ such that $F \subseteq A$ and $m(F) = m^*(A)$.
2. $A$ is non-measurable $\iff$ exists a $G_\delta$ set $G$ such that $A \subseteq G$, $m(G) = m^*(A)$ and $m(G \setminus A) > 0$
</question-env> 

<question-env> 
**(Math 454, Assignment #6)**
Let $C_0(\mathbb{R}^d)$ be the set of all continuous functions $f: \mathbb{R}^d \rightarrow \mathbb{R}$ such that $\lim_{||x|| \rightarrow \infty} f(x) = 0$, where $||x|| := \sqrt{\sum_{i=1}^n x_i^2}$. 
1. Prove that if $f$ is uniformly continuous and integrable over $\mathbb{R}^d$, then $f \in C_0(\mathbb{R}^d)$. 
2. Prove that if $f$ is bounded and uniformly continuous in 
</question-env> 

<question-env> 
**(Math 454, Assignment #3)**
Let $f$ and $g$ be two bounded, measurable functions defined on a set of finite measure $A \subseteq \mathbb{R}$. Prove that if $f = g$ a.e. in $A$, then $\int_A f = \int_A g$.
</question-env> 

<question-env> 
**(Math 454, Assignment #3)**
Let $f$ be a bounded, measurable function defined on a set of finite measure $A \subseteq \mathbb{R}$. Prove that: 
1. If $\int_B f \geq 0$ for all measurable sets $B \subseteq A$, then $f \geq 0$ a.e. in $A$.
2. If $\int_B f = 0$ for all measurable sets $B \subseteq A$, then $f =0$ a.e. in $A$.
</question-env> 

<question-env> 
**(Math 454, Assignment #5)**
Let $f$ be a real-valued function of two variables $(x,y)$ that is defined on the square $[0,1] \times [0,1]$. Suppose that $x \mapsto f(x,y)$ is integrable over $[0,1]$ for each fixed value of $y$. Let $h$ be the function of $y$ defined by: 
$$ h(y) := \int_{[0,1]} f(x,y)dx $$
1. Suppose that for each $(x,y)$, we have $|f(x,y)| \leq g(x)$, where $g$ is integrable over $[0,1]$. Prove that if $f(x,y)$ is continuous in $y$ for each $x$, then $h$ is continuous.
2. Suppose that for each $(x,y)$, 
$$ \frac{\partial f}{\partial y} (x,y) \text{ exists and } \left| \frac{\partial f}{\partial y} (x,y) \right| \leq g(x) $$
where $g$ is integrable over $[0,1]$. Prove that $h$ is differentiable and 
$$ h'(y) = \int_{[0,1]} \frac{\partial f}{\partial y} (x,y) dx $$
</question-env>

<question-env> 
**(Math 454, Assignment #5)**
Let $f$ be of bounded variation on $[a,b]$ and define $v(x) := TV(f|_{[a,x]})$ for all $x \in [a,b]$.
1. Prove that $|f'| \leq v'$ a.e. on $[a,b]$ and infer from this that
$$ \int_{[a,b]} |f'| \leq TV(f) $$
2. Prove that the above is an equality $\iff$ $f$ is absolutley continuous on $[a,b]$.
</question-env>

<question-env> 
**(Math 454, Assignment #5)** 
Let $f$ fail to be of bounded variation on $[a,b]$. Show that there is a point $x_0 \in [a,b]$ such that for every $\delta > 0$, $f$ fails to be of bounded variation on $[x_0 - \delta, x_0 + \delta] \cap [a,b]$. 
</question-env>

<question-env> 
**(Math 454, Assignment #5)**
Let the function $f$ be absolutely continuous on $[a,b]$. Prove that $f$ is Lipschitz on $[a,b]$ $\iff$ there is a constant $c > 0$ for which $|f'| \leq c$ a.e. on $[a,b]$.
</question-env>

<question-env> 
**(Math 454, Assignment #1)**
Show that the continuity of measure together with finite additivity of measure implies countable additivity of measure.
</question-env>

<question-env> 
**(Math 454, Assignment #6)**
Suppose $f$ is integrable over $\mathbb{R}^d$. For each $\alpha > 0$, let $E_\alpha := \\{ x\ |\ |f(x)| > \alpha \\}$. Prove that:
$$
\int_{\mathbb{R}^d} |f(x)| dx = \int_0^\infty m(E_\alpha) d \alpha 
$$
</question-env>

<question-env> 
**(Math 454, Assignment #5)**
Suppose $f$ is measurable on $\mathbb{R}$, finite almost everywhere, $ f \geq 0$ and let $F_k := \\{ x\ |\ 2^k < f(x) \leq 2^{k+1} \\}$. Prove that
$$f \text{ is integrable on } \mathbb{R} \iff \sum_{k=-\infty}^{+\infty} 2^k m(F_k) < \infty $$
Use this result to verify that
$$ f(x) = \begin{cases} 
|x|^{-a} & \text{ if } |x| \leq 1 \\\\
0 & \text{ otherwise }
\end{cases} $$
is integrable over $\mathbb{R}$ $\iff$ $a < 1$ and 
$$ g(x) = \begin{cases}
|x|^{-b} & \text{ if } |x| > 1 \\\\
0  & \text{ otherwise } 
\end{cases} $$
is integrable over $\mathbb{R}$ if and only if $b > 1$.
</question-env>

<question-env> 
**(Math 454, Assignment #6)**
The Fourier Transform of an integrable function $f$ is defined as: 
$$
\hat{f} ( \xi) := \int_{\mathbb{R}^d} f(x) \cos (2 \pi \langle  x, \xi \rangle) dx - i \int_{\mathbb{R}^d} f(x) \sin ( 2 \pi \langle x, \xi \rangle ) dx 
$$
(also denoted by: 
$$
\hat{f}(\xi) = \int_{\mathbb{R}^d} f(x) \text{exp}( - 2 \pi i \langle x, \xi \rangle ) dx )
$$
</question-env>

<question-env>
Congrats! You finished all the problems. You've mastered Measure Theory :-)
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

