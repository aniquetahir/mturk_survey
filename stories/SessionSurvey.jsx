import React from "react";
import _ from "lodash";
import {
    Text,
    Button,
    makeStyles,
    useId,
    tokens
} from "@fluentui/react-components";
import {HyperDataTable} from "./HyperDataTable";
import {HyperTableQuestion} from "./HyperTableQuestion";
import {MCQ} from "./Mcq";
import {OpenEndedQuestion} from "./OpenEndedQuestion";

const sessions  = require('../public/sessions.json')

const useStyles = makeStyles({
    field: {
        display: 'grid',
        gridRowGap: tokens.spacingVerticalS,
    }
});

export const SessionSurvey = ({session_data, ...props}) => {
    const styles = useStyles();
    let flattenedSessionData = []
    flattenedSessionData.push({
        id: 0,
        time: session_data.time,
        user: session_data.user,
        content: session_data.content
    });
    let commentData = session_data.comments.map((c, i) => {
        return {
            id: i + 1,
            time: c.time,
            user: c.user,
            content: c.content
        }
    });
    flattenedSessionData = flattenedSessionData.concat(commentData);

    return (
        <div className={styles.field}>
            {/*<!-- The first element just shows the entire conversation to the user as context -->*/}
            <Text>Please read the following conversation on instagram:</Text>
            <HyperDataTable data={flattenedSessionData} highlight_idx={0} noSelection />

            <HyperTableQuestion question="Please select the comments which can be categorized as 'Bullying':"
                                tableData={flattenedSessionData} highlightIdx={-1} />

            <HyperTableQuestion question="Please select the comments which can be categorized as 'Anti-Bullying':"
                                description="'Anti-Bullying' refers to discourse which aims to reduce or stop the effect
                                of bullying. This consists of directly addressing the bully, as well as trying to mitigate
                                bullying by being defensive/apologetic or addressing the victim of bullying to comfort them."
                                tableData={flattenedSessionData} highlightIdx={-1} />

            {/* Questions about directionality for each comment */}
            <div className="navigation">
                <Button style={{width: "200px"}}>Previous</Button>
                <Button style={{width: "200px"}}>Next</Button>
            </div>
        </div>
    )
}

export const DirectionalitySurvey = ({session_data, ...props}) => {
    const styles = useStyles();
    let flattenedSessionData = [];
    flattenedSessionData.push({
        id: 0,
        time: session_data.time,
        user: session_data.user,
        content: session_data.content
    });
    let commentData = session_data.comments.map((c, i) => {
        return {
            id: i + 1,
            time: c.time,
            user: c.user,
            content: c.content
        }
    });
    flattenedSessionData = flattenedSessionData.concat(commentData);

    let directionalityQuestions = flattenedSessionData.map((c, i) => {
        if (i==0) {
            return null;
        }
        return (
            <>
                <HyperTableQuestion
                    question="Consider the higlighted comment. Select the other comment which it is targetting."
                    description="A comment may be a reply to another comment. Consider the highlighted comment as the reply.
                     Select the comments which it is replying to (if any)."
                    tableData={flattenedSessionData.slice(0, i+1)}
                    highlightIdx={i}
                />
                <MCQ
                    question="What is the stance towards the targets of the comment?"
                    choices={["Agree", "Disagree", "Neutral"]}
                />
                <MCQ
                    question="What is the sentiment towards the targets of the comment?"
                    choices={["Positive", "Negative", "Neutral"]}
                />
            </>
        );
    })

    return (
        <div className={styles.field}>
            {directionalityQuestions}
            <div className="navigation">
                <Button style={{width: "200px"}}>Previous</Button>
                <Button style={{width: "200px"}}>Next</Button>
            </div>
        </div>
    )
}

export const BullyQuestions = async ({session_data, bully_idxs, ...props}) => {
    const styles = useStyles();
    let flattenedSessionData = [];
    flattenedSessionData.push({
        id: 0,
        time: session_data.time,
        user: session_data.user,
        content: session_data.content
    });
    let commentData = session_data.comments.map((c, i) => {
        return {
            id: i + 1,
            time: c.time,
            user: c.user,
            content: c.content
        }
    });
    flattenedSessionData = flattenedSessionData.concat(commentData);

    let bullyingQuestions = flattenedSessionData.map((c, i) => {
        if (bully_idxs.indexOf(i) != -1){
            return (
                <>
                    <Text><h2>Consider the highlighted comment which was marked as "Bullying":</h2></Text>
                    <HyperDataTable data={flattenedSessionData.slice(0, i+1)} highlight_idx={i} noSelection />
                    <OpenEndedQuestion
                        question="Why is the comment considered Bullying? Explain briefly in 256 characters or less."
                        charLimit={256}
                    />
                </>
            );
        }else{
            return null;
        }
    })

    return (
        <div className={styles.field}>
            {bullyingQuestions}
            <div className="navigation">
                <Button style={{width: "200px"}}>Previous</Button>
                <Button style={{width: "200px"}}>Next</Button>
            </div>
        </div>
    )
}