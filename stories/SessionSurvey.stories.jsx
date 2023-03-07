import React from "react";
import {SessionSurvey, DirectionalitySurvey} from "./SessionSurvey";
import {Button, FluentProvider, webLightTheme} from "@fluentui/react-components";

const sessions = require('../public/sessions.json')

export default {
    title: "Survey Questionaire",
    component: SessionSurvey
}

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            {/*<Button>Hi</Button>*/}
            <SessionSurvey session_data={sessions[0]} />
        </FluentProvider>
    )
}

export const Secondary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <DirectionalitySurvey session_data={sessions[0]} />
        </FluentProvider>
    )
}