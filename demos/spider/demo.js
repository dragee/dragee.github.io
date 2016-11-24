var spider,
    root = document.getElementById("DemoSpider"),
    areaElement = root.getElementsByClassName("spider")[0],
    draggableElements = [];
 
[].push.apply(draggableElements, areaElement.getElementsByTagName("li"))

spider = new Dragee.Spider(areaElement, draggableElements, {
  startRadius: 100,
  endRadius: 150,
  lineWidth: 20,
  strokeStyle: "#ff5533",
  fillStyle: "rgba(100,255,220,0.8)"
});
