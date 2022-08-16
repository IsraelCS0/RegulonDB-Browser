import { gql } from "apollo-boost";

export const query_GET_PHRASE_OF = gql`query GetPhraseOf($id: [String]){
    getPhraseOf(id: $id){
      _id
      name
      objectType
      propertyPhrases{
        associatedPhrases{
          phrase
          phraseId
          pmid
        }
        associatedProperty{
          name
          value
        }
        position
      }
      sourceId
    }
  }`