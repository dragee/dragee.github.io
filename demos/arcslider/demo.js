var spider,
	root = document.getElementById("DemoArkSlider"),
	areaElement = root.getElementsByClassName("area")[0],
	slide =  root.getElementsByTagName("li")[0],


	spider = new Dragee.ArcSlider(areaElement, slide, {
		radius: 210
	});
