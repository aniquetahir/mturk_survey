import React from 'react';

import {MCQ, MCQMultiple} from "./Mcq";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export default {
    title: 'MCQ',
    component: MCQ
}

export const Default = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <MCQ question='This is a test question' choices={['Anique1', 'Just Anique', 'Something else']} />
        </FluentProvider>
    );
}

export const MultipleSelection = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <MCQMultiple question='This is a test question' choices={['Anique1', 'Just Anique', 'Something else']} />
        </FluentProvider>
    )
}