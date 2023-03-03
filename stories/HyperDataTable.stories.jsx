import React from 'react';

import {HyperDataTable} from "./HyperDataTable";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export default {
    title: "Hyper Data Table",
    component: HyperDataTable
};

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

export const Primary = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <HyperDataTable data={data} highlight_idx={1} />
        </FluentProvider>
    );
}


