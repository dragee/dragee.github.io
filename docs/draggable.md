# Draggable

```javascript
import 'Draggable' from 'dragee'
Draggable(element[, options])
```

## Options

### handler

```javascript
import 'Draggable' from 'dragee'
new Draggable(element, {
    handler: '.icon-move'
})
```

### parent
HTMLElement that defines Cartesian coordinates system. Its upper left corner is taken as the origin. By default, we calculate the parent(container) automatically by finding the first parent that has no-`static` positioning


### bounding
Bounding conception can help us to restrict `draggable` movements. We can restrict moving it inside a rectangle, by a circle, byline, etc.
By default, we will restrict movements inside the parent rectangle.

### position
Start positioning. By default, we automatically calculate the position inside the `parent` element

### isContentBoxSize
You can identify  that we should take into account element borders and paddings when we calculate the draggable size

### nativeDragAndDrop
There can be situations where we need to use html5 drag&drop instead of `dragee` realization.

Example: `table > tr` have a lot of issues, so it's easier to fix them using html5 drag&drop realization or emulation.

### emulateNativeDragAndDropOnTouch
`true` by default. Emulate native drag&drop on touch devices

### emulateNativeDragAndDropForAll
`false` by default. Emulate native drag&drop on all browsers