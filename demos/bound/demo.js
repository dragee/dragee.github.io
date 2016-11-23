var draggableArea = document.querySelector(".draggable-area"),
    draggableAElement = document.querySelector(".draggable-a"),
    draggableBElement = document.querySelector(".draggable-b");

new Dragee.Draggable(draggableAElement, {
    bound: Dragee.bound.toCircle(new Point(100, 90), 80),
    position: new Point(100, 10)
});

function calculusFx(x) {
    x = x/100;
    return (x*Math.sin(x*x)+1)*10 + 80;
}

function calculusBound(point, size){
    var retPoint = point.clone();
    retPoint.y = calculusFx(point.x);
    return retPoint;
}

new Dragee.Draggable(draggableBElement, {
    bound: calculusBound,
    position: new Point(210, calculusFx(210))
});

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");    

context.lineWidth = 2;
context.strokeStyle = '#55bb55';
context.beginPath();
context.arc(100+25, 90+25, 80, 0, 2 * Math.PI);
context.stroke();
context.closePath()
context.moveTo(-1, 0);

context.strokeStyle = '#ffbb55';
context.beginPath();
var x, y;
for(x=-26; x<=726; x+=1){
 y = calculusFx(x) + 25;
 context.lineTo(x+25, y);
}
context.stroke();
