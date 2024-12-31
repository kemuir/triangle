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

    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.moveTo(pointA.x,pointA.y);
    ctx.lineTo(pointB.x,pointB.y);
    ctx.lineTo(pointC.x,pointC.y);
    ctx.lineTo(pointA.x,pointA.y);
    ctx.stroke();

    scaleAndCentre(pointA,pointB,pointC)

    ctx.textAlign = "center"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(pointA.x,pointA.y);
    ctx.lineTo(pointB.x,pointB.y);
    ctx.lineTo(pointC.x,pointC.y);
    ctx.lineTo(pointA.x,pointA.y);
    ctx.stroke();

    ctx.fillText("A:"+angA,20,20)
    ctx.fillText("B:"+angB,60,20)
    ctx.fillText("C:"+angC,100,20)
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
    let leftmost;
    if (point1.x<= point2.x && point1.x <= point3.x){
        leftmost = point1
    }else if (point2.x <= point1.x && point2.x <= point3.x){
        leftmost = point2
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
    if ((leftmost == point1 && rightmost == point2) || (leftmost == point2 && rightmost == point1)){
        midlr = point3
    } else if ((leftmost == point1 && rightmost == point3) || (leftmost == point3 && rightmost == point1)){
        midlr = point2
    } else {
        midlr = point1
    }
    let midtb
    if ((topmost == point1 && bottommost == point2) || (topmost == point2 && bottommost == point1)){
        midtb = point3
    } else if ((topmost == point1 && bottommost == point3) || (topmost == point3 && bottommost == point1)){
        midtb = point2
    } else {
        midtb = point1
    }
    console.log("Left: ("+leftmost.x+","+leftmost.y)
    console.log("Right: ("+rightmost.x+","+rightmost.y) 
    console.log("Top: ("+topmost.x+","+topmost.y) 
    console.log("Bottom: ("+bottommost.x+","+bottommost.y) 
    console.log("Mid lr: ("+midlr.x+","+midlr.y) 
    console.log("Mid tb: ("+midtb.x+","+midtb.y) 
    
    const height = bottommost.y - topmost.y
    const width = rightmost.x - leftmost.x
    const prop = height/width
    const tbprop = (midtb.y - topmost.y)/height
    const lrprop = (midlr.x - leftmost.x)/width
    if (prop > 1){
        const newwid = 250/prop
        console.log("newwid: "+newwid +"   lrprop: " + lrprop)
        topmost.y = 25
        bottommost.y = 275
        midtb.y = 25+(tbprop*250)
        leftmost.x = 150-(newwid/2)
        rightmost.x = 150 + (newwid/2)
        midlr.x = leftmost.x + newwid*lrprop
    } else {
        const newhei = 250*prop
        console.log("newhei: "+newhei +"   tbprop: " + tbprop)
        leftmost.x = 25
        rightmost.x = 275
        midlr.x = 25+(lrprop*250)
        topmost.y = 150-(newhei/2)
        bottommost.y = 150 + (newhei/2)
        midtb.y = topmost.y + newhei * tbprop
    }
    
}