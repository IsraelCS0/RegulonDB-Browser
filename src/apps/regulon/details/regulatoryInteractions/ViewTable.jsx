import React from 'react';
import FilterTable, { validString, isValidArray } from '../../../../components/filterTable';
import LinealSequence from '../../../../components/sequence/lineal';
import { useMemo } from 'react';

const COLUMNS = [
    {
        Header: 'Regulated Entity',
        accessor: '_name',
        filter: "fuzzyText",
        width: 115
    },
    {
        Header: 'Type',
        accessor: '_type',
        filter: "fuzzyText",
        width: 115
    },
    {
        Header: 'Genes',
        accessor: '_genes',
        filter: "fuzzyText"
    },
    {
        Header: 'Function',
        accessor: '_function',
        filter: "fuzzyText"
    },
    {
        Header: 'Distance to',
        columns: [
            {
                Header: 'Gene',
                accessor: '_distanceGene',
                filter: "fuzzyText"
            },
            {
                Header: 'Promoter',
                accessor: '_distancePromoter',
                filter: "fuzzyText"
            }
        ],
    },
    {
        Header: 'Position',
        columns: [
            {
                Header: 'Left',
                accessor: '_leftPosition',
                filter: "fuzzyText"
            },
            {
                Header: 'Right',
                accessor: '_rightPosition',
                filter: "fuzzyText"
            }
        ],
    },
    {
        Header: 'Sequence',
        accessor: '_sequence',
        filter: "fuzzyText",
        width: 323
    },
    {
        Header: 'Citations',
        accessor: '_citations',
        filter: "fuzzyText"
    }
]

function formatData(regulatoryInteractions = [], allCitations) {
    let data = []
    regulatoryInteractions.forEach((ri,index) => {
        let name = ""
        let type = ""
        if (ri?.regulatedEntity) {
            name = validString(ri.regulatedEntity.name)
            type = validString(ri.regulatedEntity.type)
        }
        let genes = ""
        if (isValidArray(ri?.regulatedGenes)) {
            genes = <div style={{overflow: "auto"}} value={ri?.regulatedGenes.map(gene=>(gene.name)).join(" ")} >
                {
                    ri?.regulatedGenes.map((gene) => {
                        return <a href={"/gene/"+gene._id} style={{marginRight: "3px"}} value={gene.name} >{gene.name}</a>
                    })
                }
            </div>

        }
        let RIfunction = validString(ri.function)
        let distanceGene = ri.distanceToFirstGene
        let distancePromoter = ri.distanceToPromoter
        let leftPosition = ""
        let rightPosition = ""
        let sequence = ""
        if (ri?.regulatoryBindingSites) {
            leftPosition = ri.regulatoryBindingSites.leftEndPosition
            rightPosition = ri.regulatoryBindingSites.rightEndPosition
            sequence = <LinealSequence value={validString(ri?.regulatoryBindingSites.sequence)} id={"sequence_bs_"+ri?.regulatoryBindingSites._id} sequence={validString(ri?.regulatoryBindingSites.sequence)} color />
        }
        /*
        function to set row sizes 
        const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50));

        const getItemSize = index => rowHeights[index]; 
        */
        data.push({
            _name: name,
            _type: type,
            _genes: genes,
            _function: RIfunction,
            _distanceGene: distanceGene,
            _distancePromoter: distancePromoter,
            _leftPosition: leftPosition,
            _rightPosition: rightPosition,
            _sequence: sequence,
            _citations: ""
        })
    })
    return data
}

export function Table({ regulatoryInteractions, allCitations }) {
    const data = useMemo(()=>{
        return formatData(regulatoryInteractions, allCitations)
    },[regulatoryInteractions,allCitations])
    //console.log(regulatoryInteractions);
    
    return <FilterTable columns={COLUMNS} data={data} />
}