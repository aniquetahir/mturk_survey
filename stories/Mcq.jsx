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

export const MCQMultiple =  ({question, choices, callback, ...props}) => {
    const choices_setters = choices.map(c => {
        let [option, setOption] = React.useState(false);
        return [c, option, setOption]
    });

    const styles = useStyles();
    const labelId = useId('label');

    const setChoice = (i) => {
        let selected = choices_setters.map((c_s, i) => {
            return c_s[1];
        });
        selected[i] = !selected[i];
        callback(selected);
        choices_setters[i][2](checked => !checked);
    }


    let choicesList = choices_setters.map( (c_s, i) => {
        return (
            <Checkbox
                checked={c_s[1]}
                onChange={()=>setChoice(i)}
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
