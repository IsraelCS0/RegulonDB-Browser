import { LinealSequence } from "../../../../components/sequence"
import { CitationsNote } from "../../../../components/citations/citations_note";
import { ParagraphCitations,  } from "../../../../components/citations"

function RegulatorBindingSites({ regulatorBindingSites = [], allCitations }) {
    return (
        <div>
            {regulatorBindingSites.map((regulatorBindingSite, index) => {
                let regulator = regulatorBindingSite.regulator
                let regulatoryInteractions = regulatorBindingSite.regulatoryInteractions
                return (
                    <div key={`operon_ri_${index}_${regulator._id}`}>
                        {regulator?._id && (
                            <p className="p_accent" >{`Regulator ${regulator.name} (${regulator.function})`}</p>
                        )}
                        {regulatoryInteractions.length > 0 && (
                            <table>
                                <tbody>
                                    <tr>
                                        <TableRI regulatoryInteractions={regulatoryInteractions} allCitations={allCitations} />
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                )
            })}
        </div>
    );
}

export default RegulatorBindingSites;

function TableRI({ regulatoryInteractions, allCitations }) {
    return (
        <td>
            {
                regulatoryInteractions.map((ri, indx) => {
                    const rs = ri?.regulatorySite;
                    return (
                        <div style={{ marginLeft: "2%" }} key={`tabe_Rinteraction_${ri?._id}_${indx}`}
                            onMouseEnter={() => {
                                let gn = document.getElementById(`${ri?._id}#tu_Canva/s`)
                                if (gn) {
                                    gn.setAttribute("stroke", "#00F");
                                    gn.setAttribute("stroke-width", "2");
                                }
                            }}
                            onMouseLeave={() => {
                                let gn = document.getElementById(`${ri?._id}#tu_Canva/s`)
                                if (gn) {
                                    gn.setAttribute("stroke", "");
                                    gn.setAttribute("stroke-width", "0");
                                }
                            }}
                        >
                            <table className="table_content" >
                                <thead>
                                    <tr>
                                        <th>{`Regulatory Interaction ${ri?.function.toUpperCase()}`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ri?.mechanism
                                            ? <tr><td>{`Mechanism: ${ri?.mechanism}`}</td></tr>
                                            : null
                                    }
                                    <tr>
                                        <td>
                                            {
                                                ri?.regulatorySite
                                                    ? <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                <LinealSequence sequence={rs?.sequence} color={true} height={25} sequenceId={`${rs?._id}-${ri?._id}summaryInfo`}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    {`Center Position: ${ri?.centerPosition}, Absolute Position: ${rs?.absolutePosition}`}
                                                                </td>
                                                            </tr>
                                                            {
                                                                rs?.note
                                                                    ? <tr><td> <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, rs?.note) }} /></td></tr>
                                                                    : null
                                                            }
                                                            {
                                                                rs?.citations
                                                                    ? <tr>
                                                                        <td>
                                                                            <p>Regulatory Site Citations</p>
                                                                            {ParagraphCitations({
                                                                                allCitations: allCitations,
                                                                                citations: rs?.citations
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                    : null
                                                            }
                                                        </tbody>
                                                    </table>
                                                    : null
                                            }
                                        </td></tr>
                                    {
                                        ri?.note
                                            ? <tr><td> <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, ri?.note) }} /></td></tr>
                                            : null
                                    }
                                    {
                                        ri?.citations
                                            ? <tr>
                                                <td>
                                                    <p>Regulatory Interaction Citations</p>
                                                    {ParagraphCitations({
                                                        allCitations: allCitations,
                                                        citations: ri?.citations
                                                    })}
                                                </td>
                                            </tr>
                                            : null
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </td>
    )
}

/**
 * onMouseEnter={() => {
                    let gn = document.getElementById(`draw_${row.id}`);
                    if (gn) {
                      gn.setAttribute("stroke", "#00F");
                      gn.setAttribute("stroke-width", "5");
                    }
                  }}
                  onMouseLeave={() => {
                    let gn = document.getElementById(`draw_${row.id}`);
                    if (gn) {
                      gn.setAttribute("stroke", "");
                      gn.setAttribute("stroke-width", "0");
                    }
                  }}
 */