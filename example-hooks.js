// Sample data that is passed to the DragAndDropContext callbacks

// onDragStart
const start = {
  draggableId: 'task-1',
  type: 'TYPE',
  source: {
    droppableId: 'column-1',
    index: 0,
  },
};

// onDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: 'column-1',
    index: 1,
  },
};

// onDragEnd
const end = {
  ...update,
  reason: 'DROP',
};
