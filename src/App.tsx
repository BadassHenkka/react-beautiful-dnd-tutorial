import React, { useState, memo } from 'react';
import initData from './init-data';
import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const InnerList = ({ column, taskMap, index }: any) => {
  const tasks = column.taskIds.map((taskId: string) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
};

memo(InnerList, (props, nextProps): any => {
  if (
    nextProps.column === props.column &&
    nextProps.taskMap === props.taskMap &&
    nextProps.index === props.index
  ) {
    return false;
  }
  return true;
});

const App = () => {
  const [boardState, setBoardState] = useState(initData);

  const onDragEnd = (result: any) => {
    const { type, destination, source, draggableId } = result;

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

    // Column reordering
    if (type === 'column') {
      const newColumnOrder = Array.from(boardState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoardState = {
        ...boardState,
        columnOrder: newColumnOrder,
      };

      setBoardState(newBoardState);
      return;
    }
    const startColumn = boardState.columns[source.droppableId];
    const endColumn = boardState.columns[destination.droppableId];

    // Same list
    if (startColumn === endColumn) {
      // It is usually better to create a copy of the state for mutating
      // rather than mutating the state directly
      const newTaskIds = Array.from(startColumn.taskIds);

      // Remove the item from it's previous position
      // (splice mutates the existing array)
      newTaskIds.splice(source.index, 1);
      // This doesn't remove anything but inserts the draggableId - ie. the taskId
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
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
      return;
    }

    // Moving from one list to another
    // Start Column
    const startTaskIds = Array.from(startColumn.taskIds);
    // remove task
    startTaskIds.splice(source.index, 1);

    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    // End Column
    const endTaskIds = Array.from(endColumn.taskIds);
    // add task
    endTaskIds.splice(destination.index, 0, draggableId);

    const newEndColumn = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    const newBoardState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      },
    };

    setBoardState(newBoardState);
  };
  return (
    // All the components that you want to have dnd enabled
    // need to be wrapped inside a DragDropContext component which
    // has one required prop which is onDragEnd
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided, snapshot) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {boardState.columnOrder.map((colId: string, index: number) => {
              const column = boardState.columns[colId];

              return (
                <InnerList
                  key={column.id}
                  index={index}
                  column={column}
                  taskMap={boardState.tasks}
                  //isDropDisabled={isDropDisabled}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
