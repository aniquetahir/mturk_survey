import React, {useState} from "react";
import {Button, FluentProvider, webLightTheme} from "@fluentui/react-components";
import {AntiBullyingQuestions, BullyQuestions, DirectionalitySurvey, SessionSurvey} from "./SessionSurvey";
import {max} from "lodash";

const sessions = require('../public/sessions.json');

const buttonStyle = {
    width: "200px"
}
export const Survey = ({sessionIdx}) => {
    const currSession = sessions[sessionIdx];
    const pages = [
        0, // Bullying/Anti-Bullying questions
        1, // Directionality Quesitions
        2, // Bully Array
        3  // Anti-Bully array
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

    const navigationElements = (
        <div className="navigation">
            {displayPrev?<Button style={buttonStyle} onClick={doPreviousPage}>Previous</Button>:null}
            {displayNext?<Button style={buttonStyle} onClick={doNextPage}>Next</Button>:null}
            {displaySubmit?<Button style={buttonStyle} appearance="primary">Submit</Button>:null}
        </div>
    );

    let pageElements = [
        // === Page 1 ===
        (
            <SessionSurvey session_data={currSession}>{navigationElements}</SessionSurvey>
        ),
        (
            <DirectionalitySurvey session_data={currSession}>{navigationElements}</DirectionalitySurvey>
        ),
        (
            <BullyQuestions bully_idxs={[1,5,10]} session_data={currSession}>{navigationElements}</BullyQuestions>
        ),
        (
            <AntiBullyingQuestions antiBullyIdxs={[2,8,15]} sessionData={currSession}>{navigationElements}</AntiBullyingQuestions>
        )

    ];

    return (
        <FluentProvider theme={webLightTheme}>
            {pageElements[pageIdx]}
        </FluentProvider>
    );



}