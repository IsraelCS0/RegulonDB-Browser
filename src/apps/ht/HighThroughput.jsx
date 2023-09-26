import React from 'react'
import { useParams } from "react-router-dom";
import Title from './components/Title';
import Main from './mainPage/Main'
import Dataset from './datasetPage/Dataset';
import Finder from './finderPage/Finder'




export default function HT(params) {
    const datasetType = useParams().datasetType;
    const site = useParams().site;
    const info = useParams().info;
    return <HtParameters datasetType={datasetType} site={site} info={info} />
}

export function HtParameters({datasetType,info,site,isEmbed = false}) {

    if(isEmbed){
        window.IN_URL = {
            main: "/embed/ht",
            finder: "/embed/ht/finder/",
            dataset: "/embed/ht/dataset/",
            isEmbed: isEmbed,
          } 
    }else{
        window.IN_URL = {
            main: "/ht",
            finder: "/ht/finder/",
            dataset: "/ht/dataset/",
            isEmbed: isEmbed,
          } 
    }

    let Page = <Main />

    if(datasetType){
        switch (site) {
            case "finder":
                Page = <Finder datasetType={datasetType} />
                    break;
            case "dataset":
                const query = new URLSearchParams(info);
                Page = <Dataset datasetId={query.get('datasetId')} datasetType={datasetType} experimentType={query.get('experimentType')} />
                    break;
            default:
                Page = <Main />
        }
    }

    return(
        <div>
            <Title />
            {Page}
        </div>
    )
    
}
