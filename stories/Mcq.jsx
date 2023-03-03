import React from 'react';
import {
    Button,
    Radio,
    RadioGroup,
    Label,
    makeStyles,
    tokens,
    useId
} from '@fluentui/react-components';
import { Checkbox } from "@fluentui/react-components";


const useStyles = makeStyles({
    field: {
        display: 'grid',
        gridRowGap: tokens.spacingVerticalS,
    },
});

export const MCQ =  ({question, choices, ...props}) => {
    const styles = useStyles();
    const labelId = useId('label');
    let choicesList = choices.map( (c, i) => {
        return (
            <Radio value={i} label={c} />
        );
    });

    return (
        <div className={styles.field}>
            <Label id={labelId}>{question}</Label>
            <RadioGroup aria-labelledby={labelId}>
            {choicesList}
            </RadioGroup>
        </div>
    );
}

export const MCQMultiple =  ({question, choices, ...props}) => {
    const choices_setters = choices.map(c => {
        let [option, setOption] = React.useState(false);
        return [c, option, setOption]
    });

    const styles = useStyles();
    const labelId = useId('label');

    let choicesList = choices_setters.map( (c_s, i) => {
        return (
            <Checkbox
                checked={c_s[1]}
                onChange={()=>c_s[2](checked => !checked)}
                label={c_s[0]}
            />
        )
    })

    return (
        <div className={styles.field}>
            <Label id={labelId}>{question}</Label>
            {choicesList}
        </div>
    );
}
