var targetManger, draggables, targets,
    root = document.getElementById("DemoTargetB"),
    targetAreaElement = root.getElementsByClassName("area-a")[0],
    targetElements = targetAreaElement.getElementsByClassName("target"),
    draggableElements = targetAreaElement.getElementsByClassName("draggable");
 
  draggables = Array.prototype.slice.call(draggableElements).map(function(element, i){
    return new Dragee.Draggable(element, {
      parent: targetAreaElement
    });
  });
 
  targets = Array.prototype.slice.call(targetElements).map(function(element, i){
    var target = new Dragee.Target(element, draggables, {
      parent: targetAreaElement,
      positioning: Dragee.positionFactory(Dragee.positionType.notCrossing)(function(){
        return target.getRectangle();
      }),
      sorting: Dragee.sortingFactory(Dragee.positionType.notCrossing)(),
      onAdd: function(draggable){
        draggable.element.addClass("ontarget");
      },
      onRemove: function(draggable){
        draggable.element.removeClass("ontarget");
      }
    });
    return target;
  });
