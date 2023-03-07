import React from "react";
import {HyperDataTable} from "./HyperDataTable";
import {
    makeStyles,
    Label,
    useId,
    tokens,
    Text
} from "@fluentui/react-components";

const useStyles = makeStyles({
    field: {
        display: 'grid',
        gridRowGap: tokens.spacingVerticalS
    }
});


export const HyperTableQuestion = ({question, description, tableData, highlightIdx, ...props}) => {
    const styles = useStyles();
    const labelId = useId('label')
    const hyperTableId = useId('table')
    const hasDescription = description?true:false;
    return (
        <div className={styles.field}>
            <Label htmlFor={hyperTableId} id={labelId}><h2>{question}</h2></Label>
            <Text>{hasDescription?description:""}</Text>
            <HyperDataTable data={tableData} highlight_idx={highlightIdx} />
        </div>
    )
}
