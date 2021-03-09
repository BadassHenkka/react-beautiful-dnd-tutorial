import { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

type TaskListProps = {
  isDragginOver: boolean;
  draggingOverWith?: string | number;
};

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${(props) => (props.isDragginOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease;
`;

type ColumnProps = {
  column: any;
  tasks: any;
};

/*
1. Droppable components are the ones in which you can drop
an item into.

2. Droppable expects to get a function that returns a component.

3. The function has a provided prop object which has some different props
like droppableProps which you have to spread into the component that
you want to have as a droppable.

4. The provided object also has an innerRef which you have to give as a ref
to your droppable component

5. Lastly remember to place the {provided.placeholder} inside your droppable
component. This expands the drop area a bit when a user is dragging a component.
*/

const Column: FunctionComponent<ColumnProps> = ({ column, tasks }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDragginOver={snapshot.isDraggingOver}
          >
            {tasks.map((task: any, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
