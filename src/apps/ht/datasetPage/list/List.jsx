import React, { useState, useEffect } from 'react'
import { SpinnerCircle } from '../../components/ui-components_old/ui_components'
import { getConfOf } from '../../doc/fetchDOC'
import { Link } from 'react-router-dom'

export function  DatasetTable (){
  return(
      <div>Tabla</div>
  )
}

export default function List({ datasetType, experimentType }) {
  const [_data, set_data] = useState()
  const [_state, set_state] = useState()
  const [_conf, set_conf] = useState()

  let advancedSearch = `${datasetType}[datasetType]`
  let srtDatasetType = datasetType
  switch (datasetType) {
    case "TFBINDING":
      srtDatasetType = " TF Binding Sites"
      if (experimentType) {
        srtDatasetType = ` TF Binding Sites with strategy ${experimentType}`
        advancedSearch = `'${experimentType}'[sourceSerie.strategy] AND TFBINDING[datasetType]`
      }
      break;
    case "TUS":
      srtDatasetType = " Transcription Units"
      break;
    case "TTS":
      srtDatasetType = " Transcription Termination Sites"
      break;
    case "TSS":
      srtDatasetType = " Transcription Start Sites"
      break;
    case "GENE_EXPRESSION":
      srtDatasetType = " Gene Expression"
      break;
    default:
      advancedSearch = undefined
      break;
  }

  let _title = "Dataset list of " + srtDatasetType

  useEffect(() => {
    const COVER = document.getElementById("title-cover-ht")
    if (COVER) {
      const COVER_REACTION = new CustomEvent('coverR', {
        bubbles: true,
        detail: {
          title: _title,
          state: _state,
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
    if (!_data && _state !== "error") {
      try {
        (async () => {
          set_state("loading")
          await fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/jsontable`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            cache: 'default',
            body: JSON.stringify({ advancedSearch: advancedSearch })
          })
            .then((response) => response.json())
            .then(data => {
              set_data(data)
              set_state("done")
            })
            .catch((error) => {
              console.error("fetch_prosses_Services_error: ", error);
              console.warn("advanced search",advancedSearch)
              set_state("error")
            });
        })();
      } catch (error) {
        console.error("prosses_Services_error: ", error);
        set_state("error")
      }

    }
    if (!_conf && _state !== "error") {
      try {
        getConfOf("dataset_page", (conf) => {
          if (conf?.error) {
            console.error(conf.error, conf?.moreInfoError);
          }
          set_conf(conf?.list)
        })
      } catch (error) {
        set_state("error")
      }
    }
  }, [_state, _conf, _data, _title, advancedSearch])

  console.log();
  if (!advancedSearch) {
    return (
      <article>
        <h2>unknow dataset type: {datasetType}</h2>
      </article>
    )
  }

  if (_conf && _data) {
    return (
      <div>
        <article>
          <p>{_conf.description}</p>
          {
            _state === "loading" && <SpinnerCircle />
          }
          {
            _data && <DatasetTable jsonTable={_data} datasetType={datasetType} />
          }
        </article>
        <aside>
          <p className='p_accent'>Related Tools</p>
          <table className='table_content' >
            <thead>
              <tr><th>Query Builder</th></tr>
            </thead>
            <tbody>
              <tr>
              <td>
                <p>Would you like to make more specific queries?</p>
                <Link to={`${window.IN_URL.finder}${datasetType}`} >
                  <button>Query Bulder</button>
                </Link>
              </td>
              </tr>
            </tbody>
          </table>
          <div>
          
          </div>
        </aside>
      </div>
    )
  }

  return <>...</>
}
