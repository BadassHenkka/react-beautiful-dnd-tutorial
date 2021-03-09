import { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

type TaskProps = {
  task: any;
  index: number;
};

type ContainerProps = {
  isDragging: boolean;
  draggingOver?: string | number;
  isDragDisabled?: boolean;
};

const Container: any = styled.div<ContainerProps>`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

// DRAG HANDLE EXAMPLE
// const Handle: any = styled.div`
//   border: 1px solid palevioletred;
//   border-radius: 50%;
//   background-color: palevioletred;
//   padding: 8px;
//   margin-right: 1em;

//   &:hover {
//     cursor: pointer;
//   }
// `;

/*
- Draggable components are the ones which you can drag.

- Draggable also expects to get a function that returns a component.

- The function has a provided prop object which has some different props
like DraggableProps which you have to spread into the component that
you want to have as a Draggable. It also has dragHandleProps for specifying
which part of the component can be grabbed an used to drag it.

- The provided object also has an innerRef which you have to give as a ref
to your Draggable component
*/

const Task: FunctionComponent<TaskProps> = ({ task, index }) => {
  // const isDragDisabled = task.id === 'task-1';
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      // isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          // isDragDisabled={isDragDisabled}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
