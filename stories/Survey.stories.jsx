import React from "react";
import {Survey} from "./Survey";

export default {
    title: "Survey App",
    component: Survey
}

export const Primary = () => {
    return (
        <Survey sessionIdx={0} />
    )
}