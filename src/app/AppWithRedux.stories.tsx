import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    //При создании истории для этой компоненты будут применины все args, попадут в каждую историю
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) =><AppWithRedux/>

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {

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



