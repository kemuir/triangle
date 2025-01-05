export function generateRightTriangle() {
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 300, 300);
	const longer = Math.random();
	const ratio = longer < 0.5 ? (Math.ceil(Math.random() * 90) + 10) / 100 : (Math.ceil(Math.random() * 90) + 10) / 10;
	const mult = Math.random();
	const dir = Math.random();

	const [a, b] = ratio > 1 ? [200, 200 / ratio] : [ratio * 200, 200];

	let xstart, xend, ystart, yend, xoffset, yoffset, corner;

	if (dir < 0.25) {
		//bottom right
		xstart = 150 - (0.5 * a);
		xend = xstart + a;
		ystart = 150 - (0.5 * b);
		yend = ystart + b;
		xoffset = 1;
		yoffset = 1;
		corner = [xend - 10, yend - 10];

	} else if (dir < 0.5) {
		//top left
		xstart = 150 + (0.5 * a);
		xend = xstart - a;
		ystart = 150 + (0.5 * b);
		yend = ystart - b;
		xoffset = -1;
		yoffset = -1;
		corner = [xend, yend];

	} else if (dir < 0.75) {
		//bottom left
		xstart = 150 + (0.5 * a);
		xend = xstart - a;
		ystart = 150 - (0.5 * b);
		yend = ystart + b;
		xoffset = -1;
		yoffset = 1;
		corner = [xend, yend - 10];
	} else {
		//top Right
		xstart = 150 - (0.5 * a);
		xend = xstart + a;
		ystart = 150 + (0.5 * b);
		yend = ystart - b;
		xoffset = 1;
		yoffset = -1;
		corner = [xend - 10, yend];
	}

	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(xstart, yend);
	ctx.lineTo(xend, yend);
	ctx.lineTo(xend, ystart);
	ctx.lineTo(xstart, yend);
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeRect(corner[0], corner[1], 10, 10);

	const alabel = Math.ceil(mult * a);
	const blabel = Math.ceil(mult * b);
	const clabel = Math.ceil(Math.sqrt(Math.pow(alabel, 2) + Math.pow(blabel, 2)));

	ctx.font = '14px Arial';

	let mode;
	if (document.getElementById('hyp').checked) {
		mode = document.getElementById('hyp').value;
	} else {
		mode = 'leg';
	}

	//LABELS
	ctx.textAlign = 'center';
	const aorb = Math.random();
	if (mode === 'hyp') {
		ctx.fillText(alabel, 150, yend + (yoffset * 20));
		ctx.fillText(blabel, xend + (xoffset * 15), 150);
		ctx.fillText('x', 150 - (xoffset * 10), 150 - (yoffset * 10));
	} else if (aorb < 0.5) {
		ctx.fillText('x', 150, yend + (yoffset * 20));
		ctx.fillText(blabel, xend + (xoffset * 15), 150);
		ctx.fillText(clabel, 150 - (xoffset * 10), 150 - (yoffset * 10));
	} else {
		ctx.fillText(alabel, 150, yend + (yoffset * 20));
		ctx.fillText('x', xend + (xoffset * 15), 150);
		ctx.fillText(clabel, 150 - (xoffset * 10), 150 - (yoffset * 10));
	}
}
