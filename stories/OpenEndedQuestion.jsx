import React from "react";
import {
    Label,
    makeStyles,
    useId,
    tokens,
    Textarea,
    TextareaProps
} from "@fluentui/react-components";
import RouteAnnouncer from "next/dist/client/route-announcer";


const useStyles = makeStyles({
    field: {
        display: 'grid',
        gridRowGap: tokens.spacingVerticalS,
    }
});

export const OpenEndedQuestion = ({question, charLimit, ...props}) => {
    const styles = useStyles();
    const labelId = useId('label');
    const textareaId = useId('textarea');
    const [value, setValue] = React.useState('');

    const onChange = (ev, data) => {
        if (data.value.length <= charLimit) {
            setValue(data.value);
        }
    };

    return (
        <div className={styles.field}>
            <Label htmlFor={textareaId} id={labelId}>{question}</Label>
            <Textarea value={value} onChange={onChange} id={textareaId} />
        </div>
    );
}