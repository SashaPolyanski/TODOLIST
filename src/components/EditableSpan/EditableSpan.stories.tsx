import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import EditableSpan from "./EditableSpan";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        changeTitleHandler : {
            description: 'Start value changed'
        },
        oldTitle: {
            //Обязательно должно быть дефолтное value, что бы отрисовка произошла
            defaultValue: 'HTML',
            description: 'Start Value EditableSpan',
        },
    },

} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
    changeTitleHandler: action('oldTitle  changed'),

};

