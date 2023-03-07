import React from "react";

import {HyperTableQuestion} from "./HyperTableQuestion";
import {FluentProvider, webLightTheme} from "@fluentui/react-components";

export default {
    title: "Hyper Table Question",
    component: HyperTableQuestion
}

const data = [
    {
        idx: 0,
        time: "Day b4 Yster",
        author: "Anti-Bully",
        comment: "I will stop teh bully :)"
    },
    {
        idx: 1,
        time: "Yesterday",
        author: "Hyper-Bully",
        comment: "I will Bully"
    },
    {
        idx: 2,
        time: "Today",
        author: "Anique",
        comment: "This comment was made today"
    }
]

const question = "Select an option. Just do it!"

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <HyperTableQuestion question={question} tableData={data} highlightIdx={2} />
        </FluentProvider>
    )
}