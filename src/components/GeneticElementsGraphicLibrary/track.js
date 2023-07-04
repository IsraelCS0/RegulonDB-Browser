import { SVG } from "@svgdotjs/svg.js";
import { validateElements, validateDNA } from './validation'
import { dnaPosition, drawingPriority, verticalPosition } from './sorting'
import { gene_dp, operon_dp, ppgpp_dp, promoter_dp, riboswitch_dp, srna_dp, terminator_dp, tfBindingSite_dp, transcriptionalAttenuator_dp, transnationalAttenuator_dp } from "./features_default_properties";
import DrawDna from "./dna";
import DrawGene from "./gene";
import DrawOperon from "./operon";
import DrawPpgpp from "./ppGpp";
import DrawPromoter from "./promoter";
import DrawRiboswitch from "./riboswitch";
import DrawSrna from "./srna";
import DrawTerminator from "./terminator";
import DrawTfBindingSite from "./tfBindingSite";
import DrawTranscriptionalAttenuator from "./transcriptionalAttenuator";
import DrawTransnationalAttenuator from "./transnationalAttenuator";


class Track {

  constructor(drawPlace) {
    this.drawPlace = drawPlace;
    this.id = drawPlace.id;
    this.canva_id = drawPlace.canva_id;
    this.width = drawPlace.width;
    this.height = drawPlace.height
    this.dna_y = drawPlace.dna_y;
  }

  draw(geneticElements, covered_LeftPosition, covered_RightPosition) {
    //validar objetos
    geneticElements = validateElements(geneticElements);
    if (!geneticElements) {
      return undefined;
    }
    //validar dna
    const dna_obj = validateDNA(geneticElements, covered_LeftPosition, covered_RightPosition);
    //sorting geneticElements by position
    geneticElements = dnaPosition(geneticElements, covered_LeftPosition, covered_RightPosition);
    if (!geneticElements) {
      console.error("error on sorting dnaPositions");
      return undefined;
    }
    //assign draw priority
    geneticElements = drawingPriority(geneticElements);
    if (!geneticElements) {
      console.error("error on drawing priority");
      return undefined;
    }
    let canvas  = undefined
    let dna = undefined
    if(this.width && this.height){
      canvas = this.createCanvas(this.id, this.canva_id, this.width, this.height);
      let y = this.dna_y;
      if (!this.dna_y) {
        y = this.height / 2;
      }
      dna = DrawDna({
        ...dna_obj,
        id: this.id,
        canva: canvas,
        y: y
      })
      geneticElements = verticalPosition(geneticElements,dna).geneticElements;
      if (!geneticElements) {
        console.error("error on assign vertical position");
        return undefined;
      }
    }else{
      let width
      let height
      canvas = this.createCanvas(this.id, this.canva_id, width, height);
    }
    
    //draw geneticElements
    
    
    geneticElements.forEach(object => {
      switch (object.objectType) {
        case gene_dp.objectType:
          DrawGene({...object, id:object._id, dna: dna, canva: canvas})
          break;
        case operon_dp.objectType:
          DrawOperon({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case ppgpp_dp.objectType:
          DrawPpgpp({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case promoter_dp.objectType:
          DrawPromoter({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case riboswitch_dp.objectType:
          DrawRiboswitch({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case srna_dp.objectType:
          DrawSrna({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case terminator_dp.objectType:
          DrawTerminator({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case tfBindingSite_dp.objectType:
          DrawTfBindingSite({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case transcriptionalAttenuator_dp.objectType:
          DrawTranscriptionalAttenuator({...object, id:object._id, dna: dna, canva: canvas})
         break;
        case transnationalAttenuator_dp.objectType:
          DrawTransnationalAttenuator({...object, id:object._id, dna: dna, canva: canvas})
         break;
        default:
          console.error("no objectType")
          return undefined;
      }
    });
  }

  createCanvas(id, canvas_id, width, height) {
    let canvas = undefined
    try {
      const DRAW_PLACE = document.getElementById(id);
      if (!DRAW_PLACE) {
        console.error("no DrawPlace")
        return null
      }
      DRAW_PLACE.innerHTML = "";
      //console.log(height)
      canvas = SVG()
        .addTo(`#${id}`)
        .width(width)
        .height(height)
        .id(canvas_id);
      canvas.rect(width, height).fill("#fff")
    } catch (error) {
      console.error(error)
    }
    return canvas
  }

}

export default Track;