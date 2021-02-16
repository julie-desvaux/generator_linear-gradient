const inputsColor = document.querySelectorAll(".input-color");
const inputRange = document.querySelector(".input-range");
const btns = document.querySelectorAll("button");
const containerColors = document.querySelector(".container-colors");
const bg = document.body;
const span = document.querySelector("span");
const btnRandom = document.querySelector(".random");
const inputResult = document.querySelector(".input-result");
let index = 3;

let valColors = ["#BA5370", "#F4E2D8"];
let tilt = 45;
inputsColor[0].value = valColors[0];
inputsColor[1].value = valColors[1];
inputsColor[0].style.background = valColors[0];
inputsColor[1].style.background = valColors[1];

bg.style.background = `linear-gradient(${tilt}deg, ${valColors}`;
inputResult.value = `linear-gradient(${tilt}deg, ${valColors}`;

// INPUTS BASICS
inputsColor.forEach((inp) => {
	inp.addEventListener("input", updateColors);
});

// TILT (inclinaison)
inputRange.addEventListener("input", (e) => {
	tilt = e.target.value * 3.6;
	bg.style.background = `linear-gradient(${tilt}deg, ${valColors}`;
});

// ADD/DELETE INPUT
btns.forEach((btn) => {
	btn.addEventListener("click", addDelete);
});

function addDelete(e) {
	span.innerHTML = "";
	let allInputs = document.querySelectorAll(".input-color");
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);

	if (e.target.className === "plus") {
		if (allInputs.length > 7) {
			return;
		}
		const newColor = document.createElement("input");
		newColor.setAttribute("class", "input-color");
		newColor.setAttribute("data-index", index);
		newColor.setAttribute("maxlength", 7);
		newColor.value = `#${randomColor.toUpperCase()}`;
		newColor.style.background = `#${randomColor}`;
		containerColors.appendChild(newColor);

		valColors.push(`#${randomColor.toUpperCase()}`);

		inputResult.value = `linear-gradient(${tilt}deg, ${valColors}`;
		bg.style.background = `linear-gradient(${tilt}deg, ${valColors}`;
		index++;
	} else if (e.target.className === "minus") {
		if (valColors.length === 2) {
			span.innerText = "Il faut au moins deux couleurs !";
		} else {
			valColors.pop();
			allInputs[allInputs.length - 1].remove();
			bg.style.background = `linear-gradient(${tilt}deg, ${valColors}`;
			inputResult.value = `linear-gradient(${tilt}deg, ${valColors}`;
			index--;
		}
	}
	allInputs = document.querySelectorAll(".input-color");
	allInputs.forEach((inp) => {
		inp.addEventListener("input", updateColors);
	});
}

// UPDATE INPUT
function updateColors(e) {
	let indexNow = e.target.getAttribute("data-index");
	e.target.value = e.target.value.toUpperCase();
	valColors[indexNow - 1] = e.target.value.toUpperCase();
	e.target.style.background = valColors[indexNow - 1];
	bg.style.background = `linear-gradient(${tilt}deg, ${valColors}`;
	inputResult.value = `linear-gradient(${tilt}deg, ${valColors}`;
}

// RANDOM COLOR
btnRandom.addEventListener("click", () => {
	const inputs = document.querySelectorAll(".input-color");
	for (i = 0; i < valColors.length; i++) {
		valColors[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		inputs[i].value = valColors[i].toUpperCase();
		inputs[i].style.background = valColors[i].toUpperCase();
		bg.style.background = `linear-gradient(${tilt}deg, ${valColors})`;
	}
});
