import React, { useEffect } from 'react';
import { gql } from  "@apollo/client";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

export function query(id_operon) {
    return gql`
    {
        getOperonBy(search: "${id_operon}") {
          data {
            _id
            operon {
              id
              arrangement {
                regulator {
                  id
                  name
                  type
                  function
                }
                promoters {
                  id
                  name
                  bindsSigmaFactor {
                    sigmaFactor_id
                    citations {
                      publication {
                        id
                        authors
                        pmid
                        citation
                        url
                        title
                        year
                      }
                      evidence {
                        id
                        name
                        code
                        type
                      }
                    }
                    sigmaFactor_name
                  }
                  citations {
                    publication {
                      id
                      authors
                      pmid
                      citation
                      url
                      title
                      year
                    }
                    evidence {
                      id
                      name
                      code
                      type
                    }
                  }
                  note
                  boxes {
                    leftEndPosition
                    rightEndPosition
                    sequence
                    type
                  }
                  score
                  sequence
                  synonyms
                  regulatorBindingSites {
                    regulator {
                      _id
                      name
                      function
                    }
                    regulatoryInteractions {
                      _id
                      centerPosition
                      citations {
                        publication {
                          id
                          authors
                          pmid
                          citation
                          url
                          title
                          year
                        }
                        evidence {
                          id
                          name
                          code
                          type
                        }
                      }
                      function
                      note
                      regulatorySite {
                        _id
                        absolutePosition
                        citations {
                          publication {
                            id
                            authors
                            pmid
                            citation
                            url
                            title
                            year
                          }
                          evidence {
                            id
                            name
                            code
                            type
                          }
                        }
                        leftEndPosition
                        length
                        note
                        rightEndPosition
                        sequence
                      }
                      mechanism
                    }
                    function
                  }
                  transcriptionStartSite {
                    leftEndPosition
                    rightEndPosition
                    range
                    type
                  }
                }
              }
            }
          }
          pagination{
            totalResults
          }
        }
      }
    `
}

const GetArragement = ({
    id_operon = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(query(id_operon))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            if (data.getOperonBy.pagination.totalResults === 1) {
                try {
                    resoultsData(data.getOperonBy.data[0].operon)
                    status('done')
                } catch (error) {
                    status('error')
                    console.log(error)
                }
            } else {
                resoultsData({})
                status('not found')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export default GetArragement;