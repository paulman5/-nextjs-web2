"use client";

import React from "react";
import { useRef, useState } from "react";
import { useModal } from "@/hooks/Modalhook";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css";
import "../../styles/UI/Documentproperties.css";
import Backarrowicon from "@/lib/icons/UIicons/Backarrowicon";
import Shareicon from "@/lib/icons/UIicons/Shareicon";
import {
  DocumentEditorComponent,
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
  Inject,
  TableDialog,
  TextFormFieldInfo,
  FormField,
} from "@syncfusion/ej2-react-documenteditor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/UI/tooltip";
import Sharemodal from "../../components/Modals/Sharemodal";
import { Share } from "next/font/google";

export default function Documenteditor() {
  const { showModal, openModal, closeModal } = useModal();
  let hostUrl: string ='http://localhost:8081/api/documenteditor/'
  let documenteditor: any;

  function Editor() {
    
    React.useEffect(() => {
      componentDidMount();
      ;
    }, []);

    function created() {
      // load your default document here
      let data =
        '{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false,"breakCode":"NewPage","pageNumberStyle":"Arabic","numberOfColumns":1,"equalWidth":true,"lineBetweenColumns":false,"columns":[]},"blocks":[{"paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"styleName":"Normal","listFormat":{}},"characterFormat":{"baselineAlignment":"Subscript"},"inlines":[{"characterFormat":{"bidi":false},"text":"hello world "}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenHeader":{},"evenFooter":{},"firstPageHeader":{},"firstPageFooter":{}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"#00000000","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false,"fontFamilyAscii":"Calibri","fontFamilyNonFarEast":"Calibri","fontFamilyFarEast":"Calibri"},"paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"bidi":false,"keepLinesTogether":false,"keepWithNext":false,"widowControl":true},"themeFontLanguages":{},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":"Word2013","allowSpaceOfSameStyleInTable":false,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"listFormat":{}},"characterFormat":{},"next":"Normal"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"horizontal":{},"vertical":{}},"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyAscii":"Calibri Light","fontFamilyNonFarEast":"Calibri Light","fontFamilyFarEast":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}';
      // Open the default document
      documenteditor.documentEditor.open(data);
      setTimeout(() => {
        documenteditor.documentEditor.resize();
      }, 500);
    }
    
    function componentDidMount() {
      setTimeout(() => {
        created();
      });
    }
  }

  let container = useRef(null);
  function onSave() {
    container.current.documentEditor.save();
  }

  return (
    <div>
      <div className="flex Document-navigation">
        <div className="flex center justify-center w-16 h-full border-r-2 border-indigo-500 border-solid">
          <button>
            <Backarrowicon />
          </button>
        </div>
        <div className="w-9/12"></div>
        <div className="relative flex w-2/12 gap-9 left-20">
          <button
            onClick={openModal}
            className="relative flex self-center text-center items-center justify-center text-sm bg-newblack text-white h-10 w-28 rounded gap-2 hover:bg-gray-600 transition-all"
          >
            <Shareicon />
            Share
          </button>
          <button className="relative flex self-center text-center items-center justify-center text-sm bg-newgreen text-white h-10 w-28 rounded hover:bg-green-400 transition-all">
            Save Changes
          </button>
        </div>
      </div>
      <div className="relative left-40">
        <DocumentEditorContainerComponent
          id="container"
          ref={(scope) => {
            documenteditor = scope;
          }}
          height={"100vh"}
          width="70vw"
          enableToolbar={true}
          serviceUrl= {hostUrl}
          showPropertiesPane={false}
        >
          <Inject services={[Toolbar]} />
        </DocumentEditorContainerComponent>
      </div>
      {showModal && <Sharemodal closeModal={closeModal} />} 
    </div>
    
  );
}
