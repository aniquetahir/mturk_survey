import React from 'react';
import {OpenEndedQuestion} from "./OpenEndedQuestion";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export default {
    title: "Open Ended Question",
    component: OpenEndedQuestion
};

const display_question = {
    question: "Are you a Bully? Explain in 250 characters.",
    charLimit: 256
}

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <OpenEndedQuestion question={display_question.question} charLimit={display_question.charLimit} />
        </FluentProvider>
    )
}