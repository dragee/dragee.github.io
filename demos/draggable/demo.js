var root = document.getElementById("DemoDraggable");

root.querySelectorAll(".draggable").forEach(function(draggableElement){
  new Dragee.Draggable(draggableElement)
});