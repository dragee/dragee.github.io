# bound

```javascript
bound(point, size)
```

`bound` is function that restrict movement of `Draggable`.
It got point and size of Draggable as arguments when dragging and return bounded point.

```javascript
function noBound(point, size){ return point; }
new Draggable(element, { bound: noBound })
```

`bound` can be dynamic. For this you should implement `bound.refresh` method

### Factories:

You can use one of existing bound functions or create your own

```javascript
Dragee.bound.toElement(element, parent)
Dragee.bound.toRectangle(rectangle)
Dragee.bound.tolineX(x, startY, endY)
Dragee.bound.tolineY(y, startX, endX)
Dragee.bound.toLine(startPoint, endPoint)
Dragee.bound.toCircle(center, radius)
Dragee.bound.toArc(center, radius, startAgle, endAngle)
```
