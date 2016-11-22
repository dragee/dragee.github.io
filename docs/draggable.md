# Dragee.Draggable

```javascript
Dragee.Draggable(element[, options])
```

### Options

`parent` - HTMLElement that define Cartesian coordinates system. It's upper left corner is taken as the origin.     
By default we take first not static parent HTMLElement.  

`bound` is function that restrict movement of `Draggable`.

`position` - default coordinate. If it is not set we automatically calculate position inside parent.  

### Callbacks:

`onStart`, `onMove`, `onEnd`  

### Defaults:

```javascript
parent: Dragee.util.getDafaultParent(element),
bound: Dragee.bound.toElement(parent, parent)
```

### Methods

`getSize()`    
`getCenter()`   
`getRectangle()`    
`move(point, time, isFix, isSilent)`    
`setPosition(point)`    

### Properties

`enable = [true|false]` 
