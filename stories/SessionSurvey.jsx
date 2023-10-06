import React, {useState, useEffect, createRef} from "react";
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
import {MCQ, MCQMultiple} from "./Mcq";
import {OpenEndedQuestion} from "./OpenEndedQuestion";

const useStyles = makeStyles({
    field: {
        display: 'grid',
        gridRowGap: tokens.spacingVerticalS,
    }
});

export const SessionSurvey = ({session_data, dataCallback, ...props}) => {
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

    let [encapsulatedData, setEncapsulatedData] = useState({
        bullying: [],
        antiBullying: []
    });

    const setBullyingIdxs = (bIdxs) => {
        let encopy = encapsulatedData;
        encopy.bullying = bIdxs;
        setEncapsulatedData(encopy);
        dataCallback(encopy);
    };

    const setAntiBullyingIdxs = (abIdxs) => {
        let encopy = encapsulatedData;
        encopy.antiBullying = abIdxs;
        setEncapsulatedData(encopy);
        dataCallback(encopy);
    };


    return (
        <div className={styles.field}>
            {/*<!-- The first element just shows the entire conversation to the user as context -->*/}
            <Text>Please read the following social media conversation:</Text>
            <HyperDataTable data={flattenedSessionData} highlight_idx={0} noSelection />

            <HyperTableQuestion question="Please select the comments which can be categorized as 'Bullying':"
                                callback={setBullyingIdxs}
                                tableData={flattenedSessionData} highlightIdx={-1} />

            <HyperTableQuestion question="Please select the comments which can be categorized as 'Anti-Bullying':"
                                description="'Anti-Bullying' refers to discourse which aims to reduce or stop the effect
                                of bullying. This consists of directly addressing the bully, as well as trying to mitigate
                                bullying by being defensive/apologetic or addressing the victim of bullying to comfort them."
                                callback={setAntiBullyingIdxs}
                                tableData={flattenedSessionData} highlightIdx={-1} />

            {/* Questions about directionality for each comment */}
            {props.children}
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
            {props.children}
        </div>
    )
}


export const AntiBullyingQuestions = ({sessionData, antiBullyIdxs, dataCallback, ...props}) => {
    const styles = useStyles();

    let abRef = createRef();

    useEffect(()=>{
        // scroll to top of this element when mounted
        abRef.current.scrollIntoView();
    });

    let flattenedSessionData = [];
    flattenedSessionData.push({
        id: 0,
        time: sessionData.time,
        user: sessionData.user,
        content: sessionData.content
    });
    let commentData = sessionData.comments.map((c, i) => {
        return {
            id: i + 1,
            time: c.time,
            user: c.user,
            content: c.content
        }
    });
    let [antiBullyAnswers, setAntiBullyAnswers] = useState({})

    const setABCategory = (choices, i) => {
        let abAnswers = antiBullyAnswers;
        if(_.isUndefined(abAnswers[i])){
            abAnswers[i] = {};
        }
        abAnswers[i]['categories'] = choices;
        setAntiBullyAnswers(abAnswers);
        dataCallback(abAnswers);
    };

    const setABExlaination = (exp, i) => {
        let abAnswers = antiBullyAnswers;
        if (_.isUndefined(abAnswers[i])) {
            abAnswers[i] = {};
        }
        abAnswers[i]['explanation'] = exp;
        setAntiBullyAnswers(abAnswers);
        dataCallback(abAnswers);
    }


    flattenedSessionData = flattenedSessionData.concat(commentData);
    const antiBullyingQuestions = flattenedSessionData.map((c, i) => {
        if (antiBullyIdxs.indexOf(i) != -1){
            return (
                <div key={i}>
                    <Text><h2>Consider the highlighted comment which was marked as "Anti-Bullying":</h2></Text>
                    <HyperDataTable data={flattenedSessionData.slice(0, i+1)} highlight_idx={i} noSelection />
                    <MCQMultiple
                        question="How would you categorize the anti-bullying?"
                        callback={(selected)=>{setABCategory(selected, i);}}
                        choices={[
                            "Comforting. (the anti-bully is trying to reduce the effect of bullying by comforting the victim)",
                            "Defensive. (the anti-bully communicates with the bully in a defensive/apologetic/agreeable manner in order to reduce the toxicity in the discourse.)",
                            "Silencing. (the anti-bully communicates with the bully with the motive to make them stop bullying.)",
                            "Other"
                        ]}
                    />

                    <OpenEndedQuestion
                        question="Why is the comment considered anti-bullying. Explain briefly in 256 characters or less."
                        callback={(exp)=>{setABExlaination(exp, i)}}
                        charLimit={256}
                    />
                </div>
            );
        }else{
            return null;
        }
    });

    let message = (
        <p>{antiBullyIdxs.length === 0?"No Anti-Bullying Comments. Proceed to next step.":""}</p>
    );

    return (
        <div className={styles.field} ref={abRef}>
            {antiBullyingQuestions}
            <br />
            {message}
            <br />
            {props.children}
        </div>
    );
}


export const BullyQuestions = ({session_data, bully_idxs, dataCallback, ...props}) => {
    const styles = useStyles();

    let bRef = createRef();

    useEffect(()=>{
        bRef.current.scrollIntoView();
    });

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

    let [bullyAnswers, setBullyAnswers] = useState({})

    const setExplanation = (exp, i) => {
        let answers = bullyAnswers;
        if (_.isUndefined(answers[i])){
            answers[i] = {};
        }
        answers[i]['explanation'] = exp;
        setBullyAnswers(answers);
        dataCallback(answers);
    }

    let bullyingQuestions = flattenedSessionData.map((c, i) => {
        if (bully_idxs.indexOf(i) != -1){
            return (
                <div key={i}>
                    <Text><h2>Consider the highlighted comment which was marked as "Bullying":</h2></Text>
                    <HyperDataTable data={flattenedSessionData.slice(0, i+1)} highlight_idx={i} noSelection />
                    <OpenEndedQuestion
                        question="Why is the comment considered Bullying? Explain briefly in 256 characters or less."
                        callback={(exp) => {setExplanation(exp, i)}}
                        charLimit={256}
                    />
                </div>
            );
        }else{
            return null;
        }
    });

    let message = (
      <p>{bully_idxs.length === 0?"No Bullying comments selected. Proceed to next step.":""}</p>
    );

    return (
        <div className={styles.field} ref={bRef}>
            {bullyingQuestions}
            <br/>
            {message}
            <br/>
            {props.children}
        </div>
    );
};