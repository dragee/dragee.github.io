# Dragee.Target

```javascript
Target(element, draggables[, options])
```

### Options:

`timeEnd` - time to move `Dragee.Draggable` to endpoint.    
`timeExcange` - time to exchange `Dragee.Draggables`.    
`parent` - HTMLElement that define Cartesian coordinates system.    
`sorting` - function that define how will be `Dragee.Draggables` sorted inside `Dragee.Target`.    
`positioning` - function that define how will `Dragee.Draggables` placed inside `Dragee.Target` after user will drop it.

### Callbacks:

`onAdd`, `onRemove`

### Defaults:

```javascript
timeEnd: 200,
timeExcange: 400,
parent: Dragee.util.getDefaultParent(element),
sorting: Dragee.sortingFactory(Dragee.positionType.floatLeft)(80, mathPoint.getLength({x: 1, y:4, IsTransformationSpace:true})),
positioning: Dragee.positionFactory(Dragee.positionType.floatLeft)(Dragee.util.bind(this.getRectangle, this), {isRemove: true})
```

### Methods:

`getSortedDraggables()`    
`reset()` - all `Dragee.Draggables` inside `Dragee.Target` thrown out and are moving to initial positions.
