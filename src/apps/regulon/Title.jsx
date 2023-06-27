import React, { useState, useEffect } from "react";
import { Cover } from "../../components/ui-components";

const IDTitle = "title_cover_regulonTool";
export {IDTitle}
const eventName = "cover_regulonTool_event";

export function UpdateTitle({ state, title, message, /*regulonToken*/ }) {
  let detail = {};
  if (state) {
    detail.state = state;
  }
  if (title) {
    detail.title = title;
  }
  if (message) {
    detail.message = message;
  }
  /*
  if (regulonToken) {
    detail.regulonToken = regulonToken;
  }
*/
  const COVER = document.getElementById(IDTitle);
  if (COVER) {
    const COVER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    COVER.dispatchEvent(COVER_REACTION);
  }
}

export function Title({ title = "" }){
  const [_state, set_state] = useState();
  //const [regulonToken, set_regulonToken] = useState();
  const [_title, set_title] = useState(title);
  const [_message, set_message] = useState();

  useEffect(() => {
    const cover = document.getElementById(IDTitle);
    if (cover) {
      cover.addEventListener(
        eventName,
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.state) {
            set_state(e.detail.state);
          }
          if (e.detail.title) {
            set_title(e.detail.title);
          }
          if (e.detail.message) {
            set_message(e.detail.message);
          }
          /*
          if (e.detail.regulonToken) {
            set_regulonToken(e.detail.regulonToken);
          }
          */
        },
        false
      );
    }
  }, []);

  return (
    <div id={IDTitle} style={{zIndex: "9999"}} >
      <Cover state={_state} message={_message}>
        <h1 style={{margin: "0px", padding: "10px 0px 10px 0px"}} >{_title}</h1>
      </Cover>
    </div>
  );
  /*
  if (!regulonToken) {
    return (
      <div id={IDTitle} >
        <Cover state={_state} message={_message}>
          <h1>{_title}</h1>
        </Cover>
      </div>
    );
  }
  const {
    id,
    name,
    regulationPositions,
    strand,
    statistics
  } = regulonToken;
  let row = "->";
  strand === "reverse" && (row = "<-");
  //console.log(regulonToken);
  return(
    <div id={IDTitle} >
      <Cover state={_state} message={_message}>
          regulon
          <p style={{fontSize: "10px"}} >{id}</p>
          <h1>{name}</h1>
          
          <p>{`${regulationPositions.leftEndPosition} ${row} ${regulationPositions.rightEndPosition}`}</p>
          <div className="cover_statistics" >
            <div className="stt_box stt_gene">
              <p>Genes</p>
              <p>{statistics?.genes}</p>
            </div>
            <div className="stt_box stt_promoter">
              <p>Promoters</p>
              <p>{statistics?.promoters}</p>
            </div>
            <div className="stt_box stt_tu">
              <p>Transcription Unit</p>
              <p>{statistics?.transcriptionUnits}</p>
            </div>
          </div>
        </Cover>
    </div>
  )
  */
};

export default Title;

