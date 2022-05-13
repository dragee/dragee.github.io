# List

During dragging, we search nearest `Draggable` from the list and if the distance between them is less than the radius, we exchange their positions

```javascript
Dragee.List(draggables[, options])
```

## Options:

### getDistance

The function that calculates a distance from one draggable to other.
We already implemented `getDistance`, `getXDifference` and `getYDifference` functions.
By default we use `getDistance` function.и


### sorting

By default, we sort by `y` value. If it's equal, then by `x`. But it's possible to customize this behavior

### radius
the radius that determines if we can exchange two `Draggable`.
Default: 30px

### timeEnd
time to move `draggable` to endpoint
Default: 200ms

### timeExcange
time to exchange two `draggables`
Default: 400ms
