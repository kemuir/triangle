export function generateTriangle() {
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 300, 300);
	// Create 3 random angles on unit circle for points
	let ang1 = Math.random() * 2 * Math.PI;
	let ang2 = Math.random() * 2 * Math.PI;
	let ang3 = Math.random() * 2 * Math.PI;

	// If angles are too close, regenerate
	while (Math.abs(ang1 - ang2) < 0.4 || Math.abs(ang1 - ang3) < 0.4 || Math.abs(ang3 - ang2) < 0.4) {
		ang1 = Math.random() * 2 * Math.PI;
		ang2 = Math.random() * 2 * Math.PI;
		ang3 = Math.random() * 2 * Math.PI;
	}

	const circumcent = { x:canvas.width / 2, y:canvas.height / 2 };
	const rad = canvas.height * 5 / 12;

	//Calculate x,y coordinates based on angles
	const pointA = { x:circumcent.x + (rad * Math.cos(ang1)), y:circumcent.y - (rad * Math.sin(ang1)) };
	const pointB = { x:circumcent.x + (rad * Math.cos(ang2)), y:circumcent.y - (rad * Math.sin(ang2)) };
	const pointC = { x:circumcent.x + (rad * Math.cos(ang3)), y:circumcent.y - (rad * Math.sin(ang3)) };

	//Calculate internal angles of triangle
	const angMin = Math.min(ang1, ang2, ang3);
	const angMax = Math.max(ang1, ang2, ang3);
	const angA = (ang1 !== angMin && ang1 !== angMax) ? (180 - Math.round((Math.abs(ang2 - ang3) / 2) * 180 / Math.PI)) : (Math.round((Math.abs(ang2 - ang3) / 2) * 180 / Math.PI));
	const angB = (ang2 !== angMin && ang2 !== angMax) ? (180 - Math.round((Math.abs(ang1 - ang3) / 2) * 180 / Math.PI)) : (Math.round((Math.abs(ang1 - ang3) / 2) * 180 / Math.PI));
	const angC = (ang3 !== angMin && ang3 !== angMax) ? (180 - Math.round((Math.abs(ang2 - ang1) / 2) * 180 / Math.PI)) : (Math.round((Math.abs(ang2 - ang1) / 2) * 180 / Math.PI));

	/* Original Triangle
	ctx.strokeStyle = 'red';
	ctx.fillStyle = 'red';
	ctx.fillRect(circumcent.x, circumcent.y, 3, 3);
	ctx.beginPath();
	ctx.moveTo(pointA.x, pointA.y);
	ctx.lineTo(pointB.x, pointB.y);
	ctx.lineTo(pointC.x, pointC.y);
	ctx.lineTo(pointA.x, pointA.y);
	ctx.stroke();
	*/

	scaleAndCentre(pointA, pointB, pointC, circumcent, rad);

	console.log(`A:${pointA.x},${pointA.y}`);
	console.log(`B:${pointB.x},${pointB.y}`);
	console.log(`C:${pointC.x},${pointC.y}`);

	const cent = centroid(pointA, pointB, pointC);

	//draw triangle
	ctx.font = '14px Arial';
	ctx.textAlign = 'center';
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(pointA.x, pointA.y);
	ctx.lineTo(pointB.x, pointB.y);
	ctx.lineTo(pointC.x, pointC.y);
	ctx.lineTo(pointA.x, pointA.y);
	ctx.stroke();

	// display angle measures
	ctx.fillText(`A:${angA}`, 20, 20);
	ctx.fillText(`B:${angB}`, 60, 20);
	ctx.fillText(`C:${angC}`, 100, 20);

	// label angles
	const ALoc = angleLabelLocation(cent, pointA);
	const BLoc = angleLabelLocation(cent, pointB);
	const CLoc = angleLabelLocation(cent, pointC);
	ctx.fillText('A', ALoc.x, ALoc.y);
	ctx.fillText('B', BLoc.x, BLoc.y);
	ctx.fillText('C', CLoc.x, CLoc.y);

	// label sides
	const sideaLoc = sideLabelLocation(pointB, pointC, pointA);
	const aLen = Math.ceil(dist(pointB, pointC));
	ctx.fillText(aLen, sideaLoc.x, sideaLoc.y);
	const sidebLoc = sideLabelLocation(pointA, pointC, pointB);
	const bLen = Math.ceil(dist(pointA, pointC));
	ctx.fillText(bLen, sidebLoc.x, sidebLoc.y);
	const sidecLoc = sideLabelLocation(pointB, pointA, pointC);
	const cLen = Math.ceil(dist(pointB, pointA));
	ctx.fillText(cLen, sidecLoc.x, sidecLoc.y);

	// angle markers
	ctx.lineWidth = 1;
	const points = [pointA, pointB, pointC];
	for (let i = 0; i < 3;i++) {
		let startAng = angleFromZero(points[i], points[(i + 1) % 3]);
		let endAng = angleFromZero(points[i], points[(i + 2) % 3]);
		let rad;
		if (Math.abs(startAng - endAng) < Math.PI / 8) {
			rad = 20;
		} else if (Math.abs(startAng - endAng) > 3 * Math.PI / 4) {
			rad = 10;
		} else {
			rad = 15;
		}
		if (endAng < startAng) {
			[startAng, endAng] = [endAng, startAng];
		}
		if (endAng - startAng > Math.PI) {
			[startAng, endAng] = [endAng, startAng];
		}
		ctx.beginPath();
		ctx.arc(points[i].x, points[i].y, rad, startAng, endAng);
		ctx.stroke();
	}
}

function dist(point1, point2) {
	return (Math.sqrt(((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2)));
}

function midpoint(point1, point2) {
	return { x:(point1.x + point2.x) / 2, y:(point1.y + point2.y) / 2 };
}

function centroid(point1, point2, point3) {
	return { x:(point1.x + point2.x + point3.x) / 3, y:(point1.y + point2.y + point3.y) / 3 };
}
function angleLabelLocation(centre, pointX) {
	const distance = dist(centre, pointX);
	const rat = 10 / distance;
	const deltax = centre.x - pointX.x;
	const deltay = centre.y - pointX.y;
	return { x:pointX.x - (deltax * rat), y:pointX.y - (deltay * rat) + 7 };
}

function sideLabelLocation(point1, point2, pointOpp) {

	const mid = midpoint(point1, point2);
	const deltax = point1.x - point2.x;
	const deltay = point1.y - point2.y;
	const rat = 20 / dist(point1, point2);
	const loc1 = { x:mid.x + (deltay * rat), y:mid.y - (deltax * rat) + 7 };
	const loc2 = { x:mid.x - (deltay * rat), y:mid.y + (deltax * rat) + 7 };

	if (dist(loc1, pointOpp) > dist(loc2, pointOpp)) {
		return loc1;
	} else {
		return loc2;
	}

}

function angleFromZero(point1, point2) {
	const raa = Math.atan((point1.y - point2.y) / (point1.x - point2.x));
	if (point1.x > point2.x) {
		return raa + Math.PI;
	} else if (raa < 0) {
		return raa + (2 * Math.PI);
	} else {
		return raa;
	}
}

function scaleAndCentre(point1, point2, point3, circcent, rad) {
	// Not currently using circcent relocation - was originally used for side labels
	let leftmost;
	if (point1.x <= point2.x && point1.x <= point3.x) {
		leftmost = point1;
	} else if (point2.x <= point1.x && point2.x <= point3.x) {
		leftmost = point2;
	} else {
		leftmost = point3;
	}
	let rightmost;
	if (point1.x >= point2.x && point1.x >= point3.x) {
		rightmost = point1;
	} else if (point2.x >= point1.x && point2.x >= point3.x) {
		rightmost = point2;
	} else {
		rightmost = point3;
	}
	let topmost;
	if (point1.y <= point2.y && point1.y <= point3.y) {
		topmost = point1;
	} else if (point2.y <= point1.y && point2.y <= point3.y) {
		topmost = point2;
	} else {
		topmost = point3;
	}
	let bottommost;
	if (point1.y >= point2.y && point1.y >= point3.y) {
		bottommost = point1;
	} else if (point2.y >= point1.y && point2.y >= point3.y) {
		bottommost = point2;
	} else {
		bottommost = point3;
	}
	let midlr;
	if ((leftmost === point1 && rightmost === point2) || (leftmost === point2 && rightmost === point1)) {
		midlr = point3;
	} else if ((leftmost === point1 && rightmost === point3) || (leftmost === point3 && rightmost === point1)) {
		midlr = point2;
	} else {
		midlr = point1;
	}
	let midtb;
	if ((topmost === point1 && bottommost === point2) || (topmost === point2 && bottommost === point1)) {
		midtb = point3;
	} else if ((topmost === point1 && bottommost === point3) || (topmost === point3 && bottommost === point1)) {
		midtb = point2;
	} else {
		midtb = point1;
	}

	const height = bottommost.y - topmost.y;
	const width = rightmost.x - leftmost.x;
	const prop = height / width;
	const tbprop = (midtb.y - topmost.y) / height;
	const lrprop = (midlr.x - leftmost.x) / width;
	const centYrat = (circcent.y - topmost.y) / height;
	const centXrat = (circcent.x - leftmost.x) / width;
	if (prop > 1) {
		const newwid = 2 * rad / prop;
		topmost.y = circcent.y - rad;
		bottommost.y = circcent.y + rad;
		midtb.y = topmost.y + (tbprop * 2 * rad);
		leftmost.x = circcent.x - (newwid / 2);
		rightmost.x = circcent.x + (newwid / 2);
		midlr.x = leftmost.x + newwid * lrprop;
		circcent.y = topmost.y + (2 * rad * centYrat);
		circcent.x = leftmost.x + (newwid * centXrat);
	} else {
		const newhei = 2 * rad * prop;
		leftmost.x = circcent.x - rad;
		rightmost.x = circcent.y + rad;
		midlr.x = leftmost.x + (lrprop * 2 * rad);
		topmost.y = circcent.y - (newhei / 2);
		bottommost.y = circcent.y + (newhei / 2);
		midtb.y = topmost.y + newhei * tbprop;
		circcent.x = leftmost.x + (2 * rad * centXrat);
		circcent.y = topmost.y + newhei * centYrat;
	}

}
