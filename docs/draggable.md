# Dragee.Draggable

```javascript
Dragee.Draggable(element[, options])
```

### Options

`parent` - HTMLElement that define Cartesian coordinates system. It's upper left corner is taken as the origin.
By default we take first not static parent HTMLElement.

`bounding` is class or object that restrict movement of `Draggable`.

`position` - default coordinate. If it is not set we automatically calculate position inside `parent`.
