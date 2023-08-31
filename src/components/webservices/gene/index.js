import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GET_GENE_BY, query_getMainGeneBySearch } from "./queries";
import { useState } from "react";
import { DataVerifier } from "../../ui-components";

export function useLazyLoadGenesBySearch(genesId = [], genes, setGenes, totalOfElements = -1) {
  const [getGene, { data, loading: geneLoad, error: geneError }] = useLazyQuery(
    query_getMainGeneBySearch
  );
  const inxLimit = 10;
  const [id, setId] = useState();
  const loading = genesId.length > 0;
  let loadState = null
  if(totalOfElements > 0){
    loadState = 100 - (100 / totalOfElements) * genesId.length;
  }
  const [error, setError] = useState();
  let genesData;
  try {
    if (data) {
      if (DataVerifier.isValidArray(data.getGenesBy.data)) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }
  if (DataVerifier.isValidArray(genesId) && loading) {
    if (!id) {
      let _id = [];
      [...Array(inxLimit).keys()].forEach((n) => {
        let __id = genesId.pop();
        if (__id) {
          _id.push(__id);
        }
      });
      if (DataVerifier.isValidArray(_id)) {
        setId(_id);
        getGene({ variables: { search: _id.join(" ") } });
        //console.log("ids:", _id);
      }
    } else {
      if (genesData) {
        setTimeout(() => {
          if (
            !genes.find((gene) => {
              return id.find((_id) => _id === gene._id);
            })
          ) {
            setGenes([...genes, ...genesData]);
          }
          setId(undefined);
        }, 25);
      }
    }
  }
  //console.log(loading);
  return { genes: loading ? [] : genes, loading, error, loadState: loadState };
}

export function useGetGenesBySearch({ search }) {
  const { data, loading, error } = useQuery(query_GET_GENE_BY, {
    variables: { search: search },
  });
  let genesData = [];
  try {
    if (data) {
      if (data.getGenesBy.data) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }
  return { genesData, loading, error };
}

export function useGetGenesBy({
  _id,
  advancedSearch,
  fullMatchOnly = false,
  limit = 1,
  organismName,
  page,
  properties,
  search,
}) {
  if (_id) {
    advancedSearch = `${_id}[_id]`;
  }
  const { data, loading, error } = useQuery(query_GET_GENE_BY, {
    variables: {
      advancedSearch: advancedSearch,
      fullMatchOnly: fullMatchOnly,
      limit: limit,
      organismName: organismName,
      page: page,
      properties: properties,
      search: search,
    },
  });
  let geneData;
  try {
    if (data) {
      if (data.getGenesBy.data[0]) {
        geneData = data.getGenesBy.data[0];
      } else {
        geneData = null;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBy", query_GET_GENE_BY);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBy", query_GET_GENE_BY);
  }
  return { geneData, loading, error, getGenesBy: data?.getGenesBy };
}

/**
 [...Array(inxLimit).keys()].forEach((n) => {
        if (
          genesId[index + n] &&
          !genes.find((gene) => gene._id === genesId[index + n])
        ) {
          _id.push(genesId[index + n]);
        }
      });
      if (DataVerifier.isValidArray(_id)) {
        setId(_id);
        getGene({ variables: { search: _id.join(" ") } });
        console.log("index: " + index, _id);
      }
 */
