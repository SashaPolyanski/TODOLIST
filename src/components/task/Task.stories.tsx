import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import AddItemForm from "../addItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskType} from "../../Todolist";

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
    task: {id: '123123', isDone: false, title: 'false'},
};
export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: '123123', isDone: true, title: 'true'},
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



