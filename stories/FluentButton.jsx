import React from "react";
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Button} from "@fluentui/react-components";

export const FluentButton = ({primary, ...props}) => {
    const mode = primary ? 'primary': '';
    return (
            <Button appearance={mode}>Test</Button>
    );
};

