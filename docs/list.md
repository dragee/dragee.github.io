# Dragee.List

```javascript
Dragee.List(draggables[, options])
```

### Options:

timeEnd - time to move `Dragee.Draggable` to endpoint.    
timeExcange - time to exchange `Dragee.Draggables`.    
getDistance|getLength - function that determines distance between two `Draggable`. It take two arguments - p1 and p2.    
radius - radius that determine if we can excange two `Draggable`.    

After user drop `Draggable` we found nearest `Draggable` from list and if distance between them is less than radius, we excange their positions.

### Callbacks: 
`onChange`

### Defaults:

```javascript
timeEnd: 200,
timeExcange: 400,
radius: 30,
getDistance: mathPoint.factories.getDistanceFunction()
```
        
### Methods:
`getSortedDraggables()`

### Properties:
positions - position of `Draggables`. We use it to store and restore states of list.

### Factory:
```javascript
Dragee.listFactory(parentElement, elements, options)
options = { draggable : {...} , list : {...} }
```
