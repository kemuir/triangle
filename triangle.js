export function generateTriangle(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,300,300)
    let ang1 = Math.random()*2*Math.PI
    let ang2 = Math.random()*2*Math.PI
    let ang3 = Math.random()*2*Math.PI
    while (Math.abs(ang1 - ang2) < 0.4 || Math.abs(ang1 - ang3) < 0.4 || Math.abs(ang1 - ang2) < 0.4) {
        ang1 = Math.random()*2*Math.PI
        ang2 = Math.random()*2*Math.PI
        ang3 = Math.random()*2*Math.PI
    }
    const [x1,y1] = [150+(125 * Math.cos(ang1)), 150-(125 * Math.sin(ang1))]
    const [x2,y2] = [150+(125 * Math.cos(ang2)), 150-(125 * Math.sin(ang2))]
    const [x3,y3] = [150+(125 * Math.cos(ang3)), 150-(125 * Math.sin(ang3))]
    const angMin = Math.min(ang1,ang2,ang3)
    const angMax = Math.max(ang1,ang2,ang3)
    const angA = (ang1 != angMin && ang1 != angMax) ? (180 - Math.round((Math.abs(ang2-ang3)/2)*180/Math.PI)) : (Math.round((Math.abs(ang2-ang3)/2)*180/Math.PI))
    const angB = (ang2 != angMin && ang2 != angMax) ? (180 - Math.round((Math.abs(ang1-ang3)/2)*180/Math.PI)) : (Math.round((Math.abs(ang1-ang3)/2)*180/Math.PI)) 
    const angC = (ang3 != angMin && ang3 != angMax) ? (180 - Math.round((Math.abs(ang2-ang1)/2)*180/Math.PI)) : (Math.round((Math.abs(ang2-ang1)/2)*180/Math.PI))

    ctx.textAlign = "center"

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x1,y1);
    ctx.stroke();

    ctx.fillText("A:"+angA,x1+20,y1+20)
    ctx.fillText("B:"+angB,x2+20,y2+20)
    ctx.fillText("C:"+angC,x3+20,y3+20)
}

function scaleAndCentre(points) {
    // points = [x1,y1,x2,y2,x3,y3]
    let topPoint
    //if points[
}