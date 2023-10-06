import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {Survey} from "../../stories/Survey";
import _ from 'lodash';

// import Head from "next/head";



export async function getStaticPaths() {
    // const sessions = require('../../public/4chan_sessions.json');
    // console.log(sessions);
    let ids = _.range(10);
    let paths = ids.map(
        id=>{
            return {params: {'id': `${id}`}};
        }
    );
    // console.log(10)

    return {
        paths: paths,
        fallback: false,
    };
}

export const getStaticProps = async () => {
    // const res = await fetch('https://api.github.com/repos/vercel/next.js');
    // const repo = await res.json();
    return { props: {} };
};

export default function SurveyPage({params}){
    const router = useRouter()
    const basePath = router.basePath || '';
    const css = `
    .quotecomment {
        padding: 7px;
        background: lightgrey;
    }
    
    .quotelink {
        background: lightgrey;
    }
    
    `;

    let innerContent = null;

    // load the survey on component mount
    // useEffect(() => {
    //     innerContent = <Survey style="{}" sessionIdx={router.query.id} />;
    // });


    // const assetPrefix = router.assetPrefix || '';
    return (
        <>
            <style type="text/css" scoped>{css}</style>
            <Survey style="{}" sessionIdx={router.query.id} />
        </>
    );
}