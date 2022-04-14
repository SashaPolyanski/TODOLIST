import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskType} from "../Todolist";
import taskStories from "./Task.stories";

export default {
    title: 'TODOLIST/TaskChangeBox',
    component: Task,
    //При создании истории для этой компоненты будут применины все args, попадут в каждую историю
} as ComponentMeta<typeof Task>;



const Template: ComponentStory<typeof Task> = () => {
    //что бы оживить наши истории и дать им функциональности нужно работать с локальным стейтом
    const [task, setTask] = useState<TaskType>({id: '123', isDone: false, title: 'ChangeStory'})
    const changeTaskStatus = () => setTask({id: '123', isDone: !task.isDone, title: ' ChangeStory'})


return <Task task={task}
             removeTaskHandler={action('removeTaskHandler')}
             changeTitleHandler={action('changeTitleHandler')}
             changeStatusHandler={changeTaskStatus}/>

}

export const TaskStory = Template.bind({})
taskStories.args= {}


