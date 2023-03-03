import React from "react";

import {FluentButton} from "./FluentButton";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export default {
    title: "Fluent Button",
    component: FluentButton
};

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <FluentButton primary>Wow</FluentButton>
        </FluentProvider>
    )
}

export const Secondary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <FluentButton>Secondary</FluentButton>
        </FluentProvider>
    )
}