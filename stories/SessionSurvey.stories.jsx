import React from "react";
import {SessionSurvey, DirectionalitySurvey, BullyQuestions, AntiBullyingQuestions} from "./SessionSurvey";
import {Button, FluentProvider, webLightTheme} from "@fluentui/react-components";

const sessions = require('../public/sessions.json')

export default {
    title: "Survey Questionaire",
    component: SessionSurvey
}

const bullyIdxs = [3, 15, 20];
const antiBullyIdxs = [5, 8, 17];

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            {/*<Button>Hi</Button>*/}
            <SessionSurvey session_data={sessions[0]} />
        </FluentProvider>
    )
};

export const Secondary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <DirectionalitySurvey session_data={sessions[0]} />
        </FluentProvider>
    )
};

export const BullyArray = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <BullyQuestions bully_idxs={bullyIdxs} session_data={sessions[0]} />
        </FluentProvider>
    );
};

export const AntiBullyArray = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <AntiBullyingQuestions
                antiBullyIdxs={antiBullyIdxs}
                sessionData={sessions[0]}
            />
        </FluentProvider>
    );
};
