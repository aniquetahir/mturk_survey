import React, {useState, useEffect} from "react";
import {Button, FluentProvider, webLightTheme} from "@fluentui/react-components";
import {AntiBullyingQuestions, BullyQuestions, DirectionalitySurvey, SessionSurvey} from "./SessionSurvey";
import {max} from "lodash";

const sessions = require('../public/4chan_sessions.json');

const buttonStyle = {
    width: "200px"
}
export const Survey = ({sessionIdx}) => {
    const currSession = sessions[sessionIdx];
    const pages = [
        0, // Bullying/Anti-Bullying questions
        1, // Directionality Quesitions
        2, // Bully Array
        // 3  // Anti-Bully array
    ];
    const maxPage = max(pages);

    let [pageIdx, setPageIdx] = useState(0);

    let pageStatesObjs = pages.map((p, i) => {
        let [pageState, setPageState] = useState(null);
        return {
            state: pageState,
            setState: setPageState
        }
    });

    const doNextPage = () => {
        setPageIdx((currPage) => currPage + 1 )
    }

    const doPreviousPage = () => {
        setPageIdx( (currPage) => currPage - 1 )
    }

    let displayPrev = pageIdx > 0;
    let displayNext = pageIdx < maxPage;
    let displaySubmit = pageIdx == maxPage;



    let [bullyIdxs, setBullyIdxs] = useState([]);
    let [antiBullyIdxs, setAntiBullyIdxs] = useState([]);
    let [bullyingAnswers, setBullyingAnswers] = useState({})
    let [antiBullyingAnswers, setAntiBullyingAnswers] = useState({})


    let dataCallback = e => {
        setBullyIdxs(e.bullying);
        setAntiBullyIdxs(e.antiBullying);
    };

    const onSubmit = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('inputAssignmentId').value = urlParams.get('assignmentId');

        let submitContent = {
            "sessionId": sessionIdx,
            "bullyIdxs": bullyIdxs,
            "antiBullyIdxs": antiBullyIdxs,
            "bullyingAnswers": bullyingAnswers,
            "antiBullyingAnswers": antiBullyingAnswers
        };

        document.getElementById('inputAnswers').value = JSON.stringify(submitContent);

        document.getElementById('mturk_form').submit();
    }


    // TODO change the link
    const navigationElements = (
        <div className="navigation">
            {displayPrev?<Button style={buttonStyle} onClick={doPreviousPage}>Reset Quiz</Button>:null}
            {displayNext?<Button style={buttonStyle} onClick={doNextPage}>Next</Button>:null}
            {displaySubmit?<Button onClick={onSubmit} style={buttonStyle} appearance="primary">Submit</Button>:null}
            {/*TODO change this*/}
            <form id="mturk_form" method="post" action="https://www.mturk.com/mturk/externalSubmit">
                <input type="hidden" id="inputAnswers" name="mturk_answers" />
                <input type="hidden" id="inputAssignmentId" name="assignmentId" />
            </form>
        </div>
    );

    let pageElements = [
        // === Page 1 ===
        (
            <SessionSurvey
                dataCallback={dataCallback.bind(this)}
                session_data={currSession}>
                {navigationElements}
            </SessionSurvey>
        ),
        // (
        //     <>
        //     {navigationElements}
        //     {/*<DirectionalitySurvey session_data={currSession}>{navigationElements}</DirectionalitySurvey>*/}
        //     </>
        // ),
        (
            <BullyQuestions
                bully_idxs={bullyIdxs}
                session_data={currSession}
                dataCallback={d=>setBullyingAnswers(d)}
            >{navigationElements}</BullyQuestions>
        ),
        (
            <AntiBullyingQuestions
                antiBullyIdxs={antiBullyIdxs}
                sessionData={currSession}
                dataCallback={d=>setAntiBullyingAnswers(d)}
            >{navigationElements}</AntiBullyingQuestions>
        )
    ];

    // let [displayPageElements, setDisplayPageElements] = useState(false);
    // useEffect(()=>{
    //     setDisplayPageElements(true);
    // });

    return (
        <FluentProvider theme={webLightTheme}>
            {pageElements[pageIdx]}
            {/*{displayPageElements?pageElements[pageIdx]:null}*/}
        </FluentProvider>
    );



}