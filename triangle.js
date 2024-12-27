export function generateTriangle(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,300,300)
    // Create 3 random angles on unit circle for points
    let ang1 = Math.random()*2*Math.PI
    let ang2 = Math.random()*2*Math.PI
    let ang3 = Math.random()*2*Math.PI

    // If angles are too close, regenerate
    while (Math.abs(ang1 - ang2) < 0.4 || Math.abs(ang1 - ang3) < 0.4 || Math.abs(ang1 - ang2) < 0.4) {
        ang1 = Math.random()*2*Math.PI
        ang2 = Math.random()*2*Math.PI
        ang3 = Math.random()*2*Math.PI
    }

    //Calculate x,y coordinates based on angles
    const pointA = {x:150+(125 * Math.cos(ang1)), y:150-(125 * Math.sin(ang1))}
    const pointB = {x:150+(125 * Math.cos(ang2)), y:150-(125 * Math.sin(ang2))}
    const pointC = {x:150+(125 * Math.cos(ang3)), y:150-(125 * Math.sin(ang3))}

    //Calculate internal angles of triangle
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

function length(point1,point2){
    return (Math.sqrt(((point1.x-point2.x)**2)+((point1.y-point2.y)**2)))
}

function midpoint(point1,point2){
    return {x:(point1.x+point2.x)/2,y:(point1.y+point2.y)/2}
}

function centroid(point1,point2,point3){
    return {x:(point1.x+point2.x+point3.x)/3,y:(point1.y+point2.y+point3.y)/3}
}

function scaleAndCentre(point1, point2, point3) {
    const points = [point1,point2,point3]
    let leftmost;
    if (point1.x<= point2.x && point1.x <= point3.x){
        leftmost = points[0]
    }else if (point2.x <= point1.x && point2.x <= point3.x){
        leftmost = points[1]
    }else{
        leftmost = point3
    }
    let rightmost;
    if (point1.x>= point2.x && point1.x >= point3.x){
        rightmost = point1
    }else if (point2.x >= point1.x && point2.x >= point3.x){
        rightmost = point2
    }else{
        rightmost = point3
    }
    let topmost;
    if (point1.y<= point2.y && point1.y <= point3.y){
        topmost = point1
    }else if (point2.y <= point1.y && point2.y <= point3.y){
        topmost = point2
    }else{
        topmost = point3
    }
    let bottommost;
    if (point1.y >= point2.y && point1.y >= point3.y){
        bottommost = point1
    }else if (point2.y >= point1.y && point2.y >= point3.y){
        bottommost = point2
    }else{
        bottommost = point3
    }
    let midlr
     
    let midtb
    
    const height = points.bottommost.y - points.topmost.y
    const width = points.rightmost.x - points.leftmost.x
    const tall = height > width
    const tbprop = (points.midtb.y - points.topmost.y)/height
    const lrprop = (points.midlr.x - points.leftmost.x)/width
    if (tall){
        const scale = 250/height
        points.topmost.y = 25
        points.bottommost.y = 275
        points.midtb.y = 25+(tbprop*250)
        points.leftmost.x = 150-(width/2)
        points.rightmost.x = 150 + (width/2)
        points.midlr.x = points.rightmost.x + scale*lrprop
    } else {
        const scale = 250/width
        points.leftmost.x = 25
        points.rightmost.x = 275
        points.midlr.x = 25+(tbprop*250)
        points.topmost.x = 150-(width/2)
        points.bottommost.x = 150 + (width/2)
        points.midtb.x = points.topmost.x + scale*tbprop
    }
    
}