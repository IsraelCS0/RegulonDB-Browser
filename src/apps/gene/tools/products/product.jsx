import React from "react";
import { ParagraphCitations } from "../../../../components/citations";
import GeneOntologyTerms from "./geneOntologyTerms";
import Motifs from "./motif";

export default function Product({ product, allCitations }) {
  return (
    <div style={{ marginLeft: "3%" }}>
      <div>
        <h3>{product.name}</h3>
      </div>
      <div style={{ marginLeft: "3%" }}>
        <table className="table_auto table_content">
          <tbody>
            {product?.synonyms > 0 && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Synonyms:</td>
                <td>{product.synonyms.join(", ")}</td>
              </tr>
            )}
            {product?.sequence && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Sequence:</td>
                <td>Fasta and Genbank</td>
              </tr>
            )}
            {product?.molecularWeight && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Molecular Weight:</td>
                <td>{product.molecularWeight}</td>
              </tr>
            )}
            {product?.anticodon && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Anticodon:</td>
                <td>{product.anticodon}</td>
              </tr>
            )}
            {product?.isRegulator && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Is Regulator?:</td>
                <td>{product.isRegulator}</td>
              </tr>
            )}
            {product?.isoelectricPoint && (
              <tr>
                <td style={{ fontWeight: "bold" }}>isoelectricPoint:</td>
                <td>{product.isoelectricPoint}</td>
              </tr>
            )}
            {product.cellularLocations.length > 0 && (
              <tr>
                <td style={{ fontWeight: "bold" }}>Cellular Locations:</td>
                <td>{product.cellularLocations.join(", ")}</td>
              </tr>
            )}

            {product?.note && (
              <>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "bold" }}>
                    Note
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}> show note </td>
                </tr>
              </>
            )}
            {product?.externalCrossReferences.length > 0 && (
              <>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "bold" }}>
                    External Cross References
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div
                      style={{
                        width: "200px",
                        maxHeight: "100px",
                        overflow: "auto",
                      }}
                    >
                      {product.externalCrossReferences.map(
                        (externalCrossReference, index) => {
                          return (
                            <div
                              key={`${externalCrossReference.externalCrossReferenceId}_${index}`}
                              style={{ float: "left", marginRight: "5px" }}
                            >
                              <a
                                href={`${externalCrossReference.url}`}
                                className="p_accent"
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: "12px" }}
                              >
                                {
                                  externalCrossReference.externalCrossReferenceName
                                }
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </td>
                </tr>
              </>
            )}
            {product?.citations.length > 0 && (
              <>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "bold" }}>
                    Citations:
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <ParagraphCitations
                      allCitations={allCitations}
                      citations={product?.citations}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        {product?.geneOntologyTerms && (
          <GeneOntologyTerms
            geneOntologyTerms={product.geneOntologyTerms}
            allCitations={allCitations}
          />
        )}
        {product?.motifs && (<Motifs motifs={product.motifs} />)}
      </div>
    </div>
  );
}
