We support two types of sortable: `List` and `BubblingList`. We implemented `List` first, and its main goal was to create different sorting mechanisms. It is comfortable to sort vertically, horizontally, or in the matrix.

`BubblingList` extends `List`. It uses a much more performant bubbling algorithm to sort elements, but it currently supports only vertical sorting.

# List
During dragging, we search for the nearest `Draggable` from the list, and if the distance between the dragging and the closest is less than the radius, we swap them.

```javascript
import { List } from 'dragee'
List(draggables[, options])
```

## Options:
### getDistance
the function calculates the distance from dragging `Draggable` to others in the list.
We have already implemented the `getDistance,` `getXDifference` and `getYDifference` functions.
By default, we use the `getDistance` function.


### sorting
a function that describes how we sort elements in the list. By default, we sort by `y` value. If it's equal, then by `x`.

### radiusthe radius(default — 30px) determines whether two elements are close enough to swap in the `List`.

### timeEnd
time to move `draggable` to endpoint on drop(default - 200ms)

### timeExcange
time to swap two `draggables`(default — 400ms)

### swappingDisabled
we do not swap elements while dragging if this option is set

# Bubbling List
## Options:
### verticalGap
`BubblingList` tries to autodetect the gap between vertical elements. However, you can provide it yourself.
