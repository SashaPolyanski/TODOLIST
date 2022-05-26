import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import taskStories from "./Task.stories";
import {TasksType} from "../../state/reducers/tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistApi";

export default {
    title: 'TODOLIST/TaskChangeBox',
    component: Task,
    //При создании истории для этой компоненты будут применины все args, попадут в каждую историю
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = () => {
    //что бы оживить наши истории и дать им функциональности нужно работать с локальным стейтом
    const [task, setTask] = useState<TasksType>({
        id: '123', title: 'ChangeStory', status: TaskStatuses.Completed,
        todoListId: '',
        startDate: null,
        deadline: null,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: null
    })
    const changeTaskStatus = () => setTask({
        id: '123', title: ' ChangeStory', status: TaskStatuses.New,
        todoListId: '',
        startDate: null,
        deadline: null,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: null
    })


    return <Task task={task}
                 removeTaskHandler={action('removeTaskHandler')}
                 changeTitleHandler={action('changeTitleHandler')}
                 changeStatusHandler={changeTaskStatus}/>

}

export const TaskStory = Template.bind({})
taskStories.args = {}


