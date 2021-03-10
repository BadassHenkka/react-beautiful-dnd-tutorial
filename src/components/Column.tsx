import { FunctionComponent, memo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
  width: 33vw;
  background-color: white;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;

  &:hover {
    cursor: move;
  }
`;
const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${(props) =>
    props.isDragginOver ? 'lightgrey' : 'inherit'};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  // it's a good idea to add a min-height so that even if there's no tasks
  // there's still a decent space to create/drop new elements into
  min-height: 100px;
`;

const InnerTaskList = ({ tasks }: any) =>
  tasks.map((task: any, index: number) => (
    <Task key={task.id} task={task} index={index} />
  ));

memo(InnerTaskList, (props, nextProps): any => {
  if (props.tasks === nextProps.tasks) {
    return false;
  }
  return true;
});

type ColumnProps = {
  className?: string;
  column: any;
  index: number;
  tasks: any;
  isDropDisabled?: boolean;
};

/*
- Droppable components are the ones in which you can drop
an item into.

- Droppable expects to get a function that returns a component.

- The function has a provided prop object which has some different props
like droppableProps which you have to spread into the component that
you want to have as a droppable.

- The provided object also has an innerRef which you have to give as a ref
to your droppable component

- Remember to place the {provided.placeholder} inside your droppable
component. This expands the drop area a bit when a user is dragging a component.

- A draggable can only be dropped into the same TYPE of droppable as it
started from
*/

const Column: FunctionComponent<ColumnProps> = ({
  className,
  column,
  index,
  tasks,
  isDropDisabled,
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          className={className}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            // type={column.id === 'column-3' ? 'done' : 'active'}
            isDropDisabled={isDropDisabled}
            type='task'
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDragginOver={snapshot.isDraggingOver}
              >
                <InnerTaskList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
