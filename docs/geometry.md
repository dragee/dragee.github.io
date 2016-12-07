# Geometry
## Point

```javascript
Point(x, y)
```

### Methods:

`add(point)`    
`sub(point)`    
`mult(k)`    
`negative()`    
`compare(point)`    
`clone()`

## Rectangle

```javascript
Rectangle(position, size)
```

### Methods:

`getP1()`, `getP2()`, `getP3()`, `getP4()`    
`getCenter()`    
`or(rect)` - return 'union' of two rectangles    
`and(rect)` - return intersection of two rectangles    
`includePoint(point)` - check if rectangle include point    
`includeRectangle(rectangle)` - check if rectangle include another rectangle    
`moveToBound(rect[, axis])` - move rectangle outside of current rectangle. If axis setted, will move along it   
`getSquare()`    
`getMinSide()` - return lower side value    
`growth(size)` - increases rectangle relative to the center

## Geometry

### Methods:
`getAVG([point1, point2, point3, ...])`    
`getDistance(p1, p2)`    
`getXDifference(p1, p2)`    
`getYDifference(p1, p2)`    
`transformedSpaceDistanceFactory(options)` - factory that return function that help to measure distance between two points in flattened space. options.x and options.y define coefficient of space flattening    
`indexOfNearPoint(arr, val, radius, getDistance)` - search nearest point in array. Search bounded by radius. Distance calculated using getDistance function
`bound(min, max, val)`    
`boundPoint(min, max, val)`    
`directCrossing(L1P1, L1P2, L2P1, L2P2)` - return intersection of two lines    
`boundOnLine(LP1, LP2, P)` - move point P to nearest point on line(LP1, LP2)    
`getPointInLine(LP1, LP2, percent)`    
`getPointInLineByLenght(LP1, LP2, lenght)`    
`createRectangleFromElement(element, parent, isContentBoxSize, isConsiderTranslate)`    
`getSizeOfElement(element, isContentBoxSize)`    
`getOffset(element, parent, isConsiderTranslate)`    
`getPointFromRadialSystem(angle, length, center)`    
`addPointToBoundPoints(boundpoints, point, isRight)`    
