// Example snapshot objects. Snapshots describe the state of the drag
// and can be used to for example do styling when the drag is happening

// Draggable snapshot
const draggableSnaptshot = {
  isDragging: true,
  // This describes which droppable element (ID of it)
  // the draggable is currenctly hovering over.
  // This will be null if the draggable is not currently over
  // a droppable
  draggingOver: 'column-1',
};

// Droppable snapshot
const droppableSnapshot = {
  // If a draggable is dragging over the droppable
  isDraggingOver: true,
  // ID of the draggable that is currently dragging over
  // null if no draggable is being dragged over
  draggingOverWith: 'task-1',
};
