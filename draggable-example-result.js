// Example result of what you can get
// from the function result prop
// that is provided to DragDropContext onDragEnd={onDragEnd}
const result = {
  draggableId: 'task-1',
  type: 'TYPE',
  reason: 'DROP',
  source: {
    droppableId: 'column-1',
    index: 0,
  },
  destination: {
    droppableId: 'column-1',
    index: 1,
  },
};
