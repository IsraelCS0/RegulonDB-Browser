import React from 'react';
import TableList from './table';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const COLUMNS_LIST = [
    {
        Header: '---',
        accessor: `_data`,
        width: "100%"
    },
]

function formatData(regulatoryInteractions = []) {
    let formatIR = []
    regulatoryInteractions.forEach((ri) => {
        formatIR.push({
            _data: ri
        })
    })
    return formatIR
}

function SelectFilter({ value, set_selection, attributes = [] }) {

    const handleChange = (event) => {
        set_selection(attributes.find(a => a.value === event.target.value));
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="filter-select-small">Attribute</InputLabel>
            <Select
                labelId="filter-select-small"
                id="filter-select-small"
                value={value}
                label="Promoter attribute"
                onChange={handleChange}
            >
                {attributes.map((attribute, index) => {
                    return <MenuItem key={"riInteraction_attribute_" + attribute.value + " " + index} value={attribute.value}>{attribute.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export function Extended({ regulatoryInteractions, allCitations }) {
    const riList = React.useMemo(() => { return formatData(regulatoryInteractions) }, [regulatoryInteractions])
    const ATTRIBUTES = [
        {
            value: "regulatorName",
            label: "Regulator Name",
            filter: (str) => { return riList.filter(item => str.test(item._data.regulator.name.toLowerCase())) },
        },
        {
            value: "regulatorType",
            label: "Regulator Type",
            filter: (str) => { return riList.filter(item => str.test(item._data.regulator.type.toLowerCase())) },
        },
        {
            value: "regulatedGeneName",
            label: "Regulated Gene name",
            filter: (str) => { return riList.filter(item => item._data.regulatedGenes.find(gene => str.test(gene.name.toLowerCase()))) },
        },
        {
            value: "regulatedGeneId",
            label: "Regulated Gene ID",
            filter: (str) => { return riList.filter(item => item._data.regulatedGenes.find(gene => str.test(gene._id.toLowerCase()))) },
        },
    ]
    const [_data, set_data] = React.useState(riList);
    const [_selection, set_selection] = React.useState(ATTRIBUTES[0]);

    const _handleUpdate = (event) => {

        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        let filterRi = riList
        if (_selection?.value) {
            filterRi = _selection.filter(str)
        }
        set_data(filterRi)
    }

    const styleFilter = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px"
    }

    return (
        <>
            <div style={styleFilter} >
                <div><p className="p_accent" >Filter by</p></div>
                <div><SelectFilter value={_selection.value} set_selection={set_selection} attributes={ATTRIBUTES} /></div>
                <div><TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label={_selection.label} variant="standard"
                    onChange={_handleUpdate}
                /></div>
            </div>
            <div>
                <TableList columns={COLUMNS_LIST} data={_data} allCitations={allCitations} />
            </div>
        </>
    )
}