import { generateRightTriangle } from './right_triangle.js';
import { generateTriangle } from './triangle.js';
import { copyToCB } from './util.js';

function generate() {
	if (document.getElementById('right').checked) {
		generateRightTriangle();
	} else {
		generateTriangle();
	}
}

function showHideHypToggle() {
	if (document.getElementById('right').checked) {
		document.getElementById('hypToggle').className = '';
	} else {
		document.getElementById('hypToggle').className = 'hidden';
	}
}

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('copy').addEventListener('click', copyToCB);
document.getElementById('right').addEventListener('click', showHideHypToggle);
document.getElementById('oblique').addEventListener('click', showHideHypToggle);
