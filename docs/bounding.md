# Bounding
`bound` is a function that restricts movements of `Draggable`


```javascript
import { BoundToCircle } from 'dragee'

new Draggable(element, {
    bound(point, size) {
        const retPoint = point.clone()
        retPoint.y = calculusFx(point.x)
        return retPoint
    }
})

new Draggable(element, {
    bound: BoundToCircle.bounding(new Dragee.Point(100, 90), 80)
})
```

We already implemented a lot of useful bounding classes for you

```javascript
BoundToElement.bounding(element, parent)
BoundToRectangle.bounding(rectangle)
BoundTolineX.bounding(x, startY, endY)
BoundTolineY.bounding(y, startX, endX)
BoundToLine.bounding(startPoint, endPoint)
BoundToCircle.bounding(center, radius)
BoundToArc.bounding(center, radius, startAgle, endAngle)
```
