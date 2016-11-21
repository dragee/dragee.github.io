var targetManger, draggables, targets,
  root = document.getElementById("DemoTargetA"),
  targetAreaElement = root.getElementsByClassName("area-a")[0],
  targetElements = targetAreaElement.getElementsByClassName("target"),
  draggableElements = targetAreaElement.getElementsByClassName("draggable"),
  classForTargets=["green", "red", "blue"];

draggables = Array.prototype.slice.call(draggableElements).map(
  function(element, i){
    return new Dragee.Draggable(element, {
      parent: targetAreaElement
    });
  }
);

targets = Array.prototype.slice.call(targetElements).map(
  function(element, i){
    return new Dragee.Target(element, draggables,{
      parent:targetAreaElement,
      onAdd:function(draggable){
        draggable.element.addClass(classForTargets[i]);
      },
      onRemove:function(draggable){
        draggable.element.removeClass(classForTargets[i]);
      }
    }
  );
});