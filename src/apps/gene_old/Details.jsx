import React, { useContext, useEffect, useMemo } from "react";
import { DataCONTEXT } from "../../components/webservices/DataProvider";
import { UpdateTitle } from "./components/Title";
import NavigationTabs from "./details/NavigationTabs";
import Citations from "./tools/Citations";
import Description from "./tools/description";
import Products from "./tools/products";
import DrawingTracesTool from "../../components/DrawingTracesTool";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import RelatedDocTools from "./components/relatedTool"

function scrollFunction() {
  if (
    document.body.scrollTop > 124 ||
    document.documentElement.scrollTop > 124
  ) {
    document.getElementById("adjust_view").style.height = '140px';
    //feedbackTool
    document.getElementById("cover_gene_detailsA").style.top = "0";
    //document.getElementById("feedbackTool").style.top = `0px`;
    document.getElementById("cover_gene_detailsA").style.position = "fixed";
    let tabsPosition = document.getElementById(
      "cover_gene_detailsA"
    ).clientHeight;
    document.getElementById(
      "cover_gene_details"
    ).style.top = `${tabsPosition}px`;
    document.getElementById("cover_gene_details").style.position = "fixed";
    document.getElementById("title_cover_data").style.display = "none";
    document.getElementById("cover_gene_UpperButton").style.display = "initial";
    //document.getElementById("feedbackTool").style.display = "initial";
  } else {
    document.getElementById("adjust_view").style.height = '0px';
    //document.getElementById("feedbackTool").style.top = `150px`;
    document.getElementById("cover_gene_UpperButton").style.display = "none";
    let coverPosition = 124 - document.documentElement.scrollTop;
    document.getElementById("cover_gene_detailsA").style.position = "initial";
    document.getElementById("cover_gene_detailsA").style.top =
      coverPosition + "px";
    document.getElementById("cover_gene_details").style.position = "initial";
    document.getElementById("cover_gene_details").style.top =
      coverPosition + "px";
    document.getElementById("title_cover_data").style.display = "initial";
  }
}

let observer = new IntersectionObserver(
  function (entries) {
    let detail = undefined;
    if (entries[0].intersectionRatio >= 0.1) {
      detail = { tab: entries[0].target.className };
    }
    const UPDATE_TABS = document.getElementById("navTab_gene");
    if (UPDATE_TABS && detail) {
      const UPDATE_TABS_REACTION = new CustomEvent("updateGeneTabs", {
        bubbles: true,
        detail: detail,
      });
      UPDATE_TABS.dispatchEvent(UPDATE_TABS_REACTION);
    }
  },
  { threshold: [0.1] }
);

function Details() {
  const { _data } = useContext(DataCONTEXT);
  //console.log("_data", _data);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
    if (document.getElementById("gene_description")) {
      observer.observe(document.getElementById("gene_description"));
    }
    if (document.getElementById("gene_products")) {
      observer.observe(document.getElementById("gene_products"));
    }
    if (document.getElementById("gene_citation")) {
      observer.observe(document.getElementById("gene_citation"));
    }
    return function cleanup() {
      window.onscroll = function () {};
      UpdateTitle({ title: "Gene", geneToken: undefined });
    };
  }, []);

  const geneToken = useMemo(() => {
    let token = {};
    let tabsInfo = {
      description: {
        id: 1,
        name: "Description",
      },
    };
    try {
      let geneData = _data.data[0];
      token.id = geneData._id;
      geneData.gene.name && (token.name = geneData.gene.name);
      geneData.gene.synonyms &&
        (token.synonyms = geneData.gene.synonyms.join(", "));
      if (geneData.gene.leftEndPosition && geneData.gene.rightEndPosition) {
        let row = "->";
        geneData.gene.strand === "reverse" && (row = "<-");
        token.position = `${geneData.gene.leftEndPosition} ${row} ${geneData.gene.rightEndPosition}`;
        token.length = `${
          geneData.gene.rightEndPosition - geneData.gene.leftEndPosition
        }bp`;
      }else{
        geneData.gene.strand && (token.strand = geneData.gene.strand)
        geneData.gene.fragments &&(token.fragments = geneData.gene.fragments)
      }
      if (geneData.products) {
        if (geneData.products.length > 0) {
          tabsInfo.products = {
            id: 3,
            name: `Products (${geneData.products.length})`,
          };
          token.products = geneData.products
            .map((product) => product.name)
            .join(", ");
          token.locations = geneData.products
            .map((product) => product.cellularLocations.join(", "))
            .join(", ");
        } else {
          token.products = "";
          token.locations = "";
          tabsInfo.products = {
            id: 3,
            name: `no products`,
            disabled: true,
          };
        }
      }
      geneData.gene.externalCrossReferences &&
        (token.externalCrossReferences = geneData.gene.externalCrossReferences);
    } catch (error) {
      console.error("Can't create gene token", error);
    }
    tabsInfo.citation = {
      id: 4,
      name: "Citations",
    };
    token.tabsInfo = tabsInfo;
    UpdateTitle({ geneToken: token });
    return token;
  }, [_data]);
  return (
    <div>
      
      <div className="cover_gene" id="cover_gene_details">
      
        <button
          className="iconButton"
          id="cover_gene_UpperButton"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </button>
        
        <NavigationTabs
          tabsInfo={geneToken.tabsInfo}
          tabSelect={"description"}
        />
      </div>
      <div id="adjust_view" style={{height: "0px",}} />
      <DrawingTracesTool
        context="gene"
        height={200}
        id={_data.data[0]._id}
        leftEndPosition={_data.data[0].gene.leftEndPosition}
        rightEndPosition={_data.data[0].gene.rightEndPosition}
        fragments={_data.data[0].gene.fragments}
        strand={_data.data[0].gene.strand}
      />
      <div>
      <article>
        <div id="gene_description" className="description">
          <Description
            gene={_data.data[0].gene}
            regulation={_data.data[0].regulation}
            allCitations={_data.data[0].allCitations}
          />
        </div>
        <br />
        <div id="gene_products" className="products">
          {!geneToken.tabsInfo.products.disabled && (
            <Products
              products={_data.data[0].products}
              allCitations={_data.data[0].allCitations}
            />
          )}
        </div>
        <div id="gene_citation" className="citation">
          <Citations AllCitations={_data.data[0].allCitations} />
        </div>
      </article>
      <aside>
        <RelatedDocTools geneId={_data.data[0]._id}
        leftEndPosition={_data.data[0].gene.leftEndPosition-500}
        rightEndPosition={_data.data[0].gene.rightEndPosition+500} 
        externalReferences={_data.data[0].gene.externalCrossReferences}
        />
      </aside>
      </div>
    </div>
  );
}

export default Details;
 /*
 

 */