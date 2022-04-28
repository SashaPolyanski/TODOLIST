import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolistApi";

export default {
    title: 'TODOLIST/Task',
    component: Task,
    //При создании истории для этой компоненты будут применины все args, попадут в каждую историю
    args: {
        removeTaskHandler: action('removeTaskHandler'),
        changeTitleHandler: action('changeTitleHandler'),
        changeStatusHandler: action('changeStatusHandler'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {
        id: '123123', status: TaskStatuses.New, title: 'false', todoListId: '',
        startDate: null,
        deadline: null,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: null
    },
};
export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {
        id: '123123', status: TaskStatuses.Completed, title: 'true', todoListId: '',
        startDate: null,
        deadline: null,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: null
    },
};

// const Template: ComponentStory<typeof Task> = () => {
//     const [task, setTask] = useState<TaskType>({id: '123', isDone: false, title: 'ChangeStory'})
//     const changeTaskStatus = () => {
//         setTask({id: '123', isDone: !task.isDone, title: ' ChangeStory'})
//     }
//
// return <Task task={task}
//              removeTaskHandler={action('removeTaskHandler')}
//              changeTitleHandler={action('changeTitleHandler')}
//              changeStatusHandler={changeTaskStatus}/>
//
// }



