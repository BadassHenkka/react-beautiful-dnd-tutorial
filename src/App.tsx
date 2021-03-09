import React, { useState } from 'react';
import initData from './init-data';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  const [boardState, setBoardState] = useState(initData);
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // No destination - ie. user dropped somewhere outside of droppable
    if (!destination) {
      return;
    }

    // Check if location changed at all
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = boardState.columns[source.droppableId];

    // It is usually better to create a copy of the state for mutating
    // rather than mutating the state directly
    const newTaskIds = Array.from(column.taskIds);

    // Remove the item from it's previous position
    // (splice mutates the existing array)
    newTaskIds.splice(source.index, 1);
    // This doesn't remove anything but inserts the draggableId - ie. the taskId
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newBoardState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newColumn.id]: newColumn,
      },
    };

    setBoardState(newBoardState);
  };
  return (
    // All the components that you want to have dnd enabled
    // need to be wrapped inside a DragDropContext component which
    // has one required prop which is onDragEnd
    <DragDropContext onDragEnd={onDragEnd}>
      {boardState.columnOrder.map((colId: string) => {
        const column = boardState.columns[colId];
        const tasks = column.taskIds.map(
          (taskId: string) => boardState.tasks[taskId]
        );

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default App;
