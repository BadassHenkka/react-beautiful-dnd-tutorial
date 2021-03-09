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
};

const Container: any = styled.div<ContainerProps>`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

/*
1. Draggable components are the ones which you can drag.

2. Draggable also expects to get a function that returns a component.

3. The function has a provided prop object which has some different props
like DraggableProps which you have to spread into the component that
you want to have as a Draggable. It also has dragHandleProps for specifying
which part of the component can be grabbed an used to drag it.

4. The provided object also has an innerRef which you have to give as a ref
to your Draggable component
*/

const Task: FunctionComponent<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
