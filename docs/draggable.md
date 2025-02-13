# Draggable

```javascript
import { Draggable } from 'dragee'
Draggable(element[, options])
```

## Options

### handler

```javascript
import { Draggable } from 'dragee'
new Draggable(element, {
    handler: '.icon-move'
})
```

### container

HTMLElement that defines the Cartesian coordinates system. Its upper left corner is taken as the origin. By default, we automatically calculate the container by finding the first parent that does not have static positioning.

### scrollRootContainer

HTMLElement defines all draggable parents scrolling, which we should consider.

### bounding

Bounding conception can help us restrict `draggable` movements. For example, we can restrict moving it inside a rectangle, by a circle, byline, etc.
By default, we will restrict movements inside the `container` rectangle.

### position

Start positioning. By default, we automatically calculate the position inside the `container` element.

### nativeDragAndDrop

We have two dragging modes. By default, we move the html element of the `draggable` instance directly.

If `nativeDragAndDrop` is set, we use the native browser HTML Drag and Drop API. So you drag the image created by the browser and the original `draggable` element we use as a placeholder.

One useful case is making `table > tr` sortable. The main issue is that it is not possible to set a z-index for `table > tr`, but using `nativeDragAndDrop` mode bypasses this problem.

<img width="545" alt="Знімок екрана 2025-02-13 о 16 25 41" src="https://github.com/user-attachments/assets/b34f93c4-d68d-492d-b132-b0863795393b" />

### emulateNativeDragAndDropOnTouch

HTML Drag and Drop API does not work well on touch devices, but we can emulate this behavior. If you have trouble with the drag image, you can use the `copyStyles` option to provide a function that copies styles from the original element to the drag image.

### touchDraggingThreshold

Threshold in milliseconds: It is useful to start dragging with a threshold to distinguish dragging from scrolling on touch devices.

### dragOverThrottleDuration

Default to 16 milliseconds. Dragover can trigger too often, and it decreases the performance of UI. This throttling improves performance.

