"use client";

import React from "react";
import { useRef, useState } from "react";
import { useModal } from "../../hooks/Modalhook";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css";
import "../../styles/Draftpagestyling/Documenteditor.css";
import "../../styles/UI/Documentproperties.css";
import Backarrowicon from "../../lib/icons/UIicons/Backarrowicon";
import Shareicon from "../../lib/icons/UIicons/Shareicon";
import {
  DocumentEditorComponent,
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
  Inject,
  TableDialog,
  TextFormFieldInfo,
  FormField,
  DocumentEditorContainer,
  Editor,
  EditorHistory,
  ContextMenu,
} from "@syncfusion/ej2-react-documenteditor";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { Edit } from "lucide-react";
import Sharemodal from "../Modals/Sharemodal";
import { Share } from "next/font/google";
import {
  ToolbarComponent,
  ItemDirective,
  ItemsDirective,
} from "@syncfusion/ej2-react-navigations";
// import { TitleBar } from './title-bar';

DocumentEditorContainerComponent;
export default function Documenteditor() {
  DocumentEditorContainer.Inject(Toolbar, Editor, EditorHistory);
  const { showModal, openModal, closeModal } = useModal();
  let documenteditor: any;
  let titleBar;
  let titleBarDiv;
  React.useEffect(() => {
    componentDidMount();
  }, []);

  function created() {
    // load your default document here
    let data = `{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"paragraphFormat":{"afterSpacing":30,"styleName":"Heading 1","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"Adventure Works Cycles"}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"lineSpacing":1.149999976158142,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Calibri"},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"beforeSpacing":12,"afterSpacing":0,"outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"beforeSpacing":2,"afterSpacing":6,"outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}`;

    // Open the default document
    documenteditor.documentEditor.open(data);
    documenteditor.enableToolbar = false;
  }
  function componentDidMount() {
    setTimeout(() => {
      created();
    });

    documenteditor.documentEditor.selectionChange = () => {
      setTimeout(() => {
        onSelectionChange();
      }, 20);
    };
    documenteditor.enableEditorHistory = true;
  }

  function toolbarButtonClick(arg: any) {
    switch (arg.item.id) {
      case "undo":
        documenteditor.documentEditor.editorHistory.undo();
        break;
      case "redo":
        documenteditor.documentEditor.editorHistory.redo();
        break;
      case "bold":
        //Toggles the bold of selected content
        documenteditor.documentEditor.editor.toggleBold();
        break;
      case "italic":
        //Toggles the Italic of selected content
        documenteditor.documentEditor.editor.toggleItalic();
        break;
      case "underline":
        //Toggles the underline of selected content
        documenteditor.documentEditor.editor.toggleUnderline("Single");
        break;
      case "strikethrough":
        //Toggles the strikethrough of selected content
        documenteditor.documentEditor.editor.toggleStrikethrough();
        break;
      case "subscript":
        //Toggles the subscript of selected content
        documenteditor.documentEditor.editor.toggleSubscript();
        break;
      case "superscript":
        //Toggles the superscript of selected content
        documenteditor.documentEditor.editor.toggleSuperscript();
        break;
      case "paragraph":
        documenteditor.documentEditor.editor.toggleTextAlignment();
        break;
      case "bulletlist":
        documenteditor.documentEditor.editor.applyBullet("\uf0b7", "Symbol");
        break;
      case "numberlist":
        documenteditor.documentEditor.editor.applyNumbering("%1)", "UpRoman");
        break;
      case "image":
        documenteditor.documentEditor.editor.toggleImage();
        break;
      case "table":
        documenteditor.documentEditor.editor.insertTable();
        break;
      case "comment":
        documenteditor.documentEditor.editor.insertComment();
        break;
    }
  }
  //To change the font Style of selected content
  function changeFontFamily(args: any): void {
    documenteditor.documentEditor.selection.characterFormat.fontFamily =
      args.value;
    documenteditor.documentEditor.focusIn();
  }
  //To Change the font Size of selected content
  function changeFontSize(args: any): void {
    documenteditor.documentEditor.selection.characterFormat.fontSize =
      args.value;
    documenteditor.documentEditor.focusIn();
  }
  //To Change the font Color of selected content
  function changeFontColor(args: any) {
    documenteditor.documentEditor.selection.characterFormat.fontColor =
      args.currentValue.hex;
    documenteditor.documentEditor.focusIn();
  }

  //Selection change to retrieve formatting
  function onSelectionChange() {
    if (documenteditor.documentEditor.selection) {
      enableDisableFontOptions();
      // #endregion
    }
  }
  function enableDisableFontOptions() {
    var characterformat =
      documenteditor.documentEditor.selection.characterFormat;
    var properties = [
      characterformat.bold,
      characterformat.italic,
      characterformat.underline,
      characterformat.strikethrough,
    ];
    var toggleBtnId = ["bold", "italic", "underline", "strikethrough"];
    for (let i = 0; i < properties.length; i++) {
      changeActiveState(properties[i], toggleBtnId[i]);
    }
  }
  function changeActiveState(property: any, btnId: any) {
    let toggleBtn: any = document.getElementById(btnId);
    if (
      (typeof property == "boolean" && property == true) ||
      (typeof property == "string" && property !== "None")
    )
      toggleBtn.classList.add("e-btn-toggle");
    else {
      if (toggleBtn.classList.contains("e-btn-toggle"))
        toggleBtn.classList.remove("e-btn-toggle");
    }
  }
  let fontStyle: string[] = [
    "Algerian",
    "Arial",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Courier New",
    "Georgia",
    "Impact",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Symbol",
    "Times New Roman",
    "Verdana",
    "Windings",
  ];
  let fontSize: string[] = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "36",
    "48",
    "72",
    "96",
  ];
  function contentTemplate1() {
    return (
      <ColorPickerComponent
        showButtons={true}
        value="#000000"
        change={changeFontColor}
      ></ColorPickerComponent>
    );
  }
  function contentTemplate2() {
    return (
      <ComboBoxComponent
        dataSource={fontStyle}
        change={changeFontFamily}
        index={2}
        allowCustom={true}
        showClearButton={false}
      ></ComboBoxComponent>
    );
  }
  function contentTemplate3() {
    return (
      <ComboBoxComponent
        dataSource={fontSize}
        change={changeFontSize}
        index={2}
        allowCustom={true}
        showClearButton={false}
      ></ComboBoxComponent>
    );
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
        <div className="flex w-2/12 gap-9  mr-10">
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

      <div className="relative left-40 top-5">
        <ToolbarComponent
          id="toolbar"
          clicked={toolbarButtonClick}
          width="70vw"
          className="toolbar-parent"
        >
          <ItemsDirective>
            <ItemDirective id="undo" prefixIcon="e-undo" tooltipText="Undo" />
            <ItemDirective id="redo" prefixIcon="e-redo" tooltipText="Redo" />
            <ItemDirective type="Separator" />
            <ItemDirective template={contentTemplate1} />
            <ItemDirective type="Separator" />
            <ItemDirective template={contentTemplate2} />
            <ItemDirective template={contentTemplate3} />
            <ItemDirective
              id="bold"
              prefixIcon="e-de-ctnr-bold"
              tooltipText="Bold"
            />
            <ItemDirective
              id="italic"
              prefixIcon="e-de-ctnr-italic"
              tooltipText="Italic"
            />
            <ItemDirective
              id="underline"
              prefixIcon="e-de-ctnr-underline"
              tooltipText="Underline"
            />
            <ItemDirective
              id="strikethrough"
              prefixIcon="e-de-ctnr-strikethrough"
              tooltipText="Strikethrough"
            />
            <ItemDirective
              id="subscript"
              prefixIcon="e-de-ctnr-subscript"
              tooltipText="Subscript"
            />
            <ItemDirective
              id="superscript"
              prefixIcon="e-de-ctnr-superscript"
              tooltipText="Superscript"
            />
            <ItemDirective
              id="paragraph"
              prefixIcon="e-paragraph-2"
              tooltipText="Paragraph"
            />
            <ItemDirective
              id="bulletlist"
              prefixIcon="e-list-unordered"
              tooltipText="List"
            />
            <ItemDirective
              id="numberlist"
              prefixIcon="e-list-ordered"
              tooltipText="numberlist"
            />
            <ItemDirective
              id="image"
              prefixIcon="e-image"
              tooltipText="Image"
            />
            <ItemDirective
              id="table"
              prefixIcon="e-table"
              tooltipText="Table"
            />
            <ItemDirective
              id="comment"
              prefixIcon="e-comment-add"
              tooltipText="Comment"
            />
          </ItemsDirective>
        </ToolbarComponent>
        <DocumentEditorContainerComponent
          id="container"
          ref={(scope) => {
            documenteditor = scope;
          }}
          height={"100vh"}
          width="70vw"
          serviceUrl="http://localhost:8081/api/documenteditor/"
          showPropertiesPane={false}
          enableToolbar={false}
        ></DocumentEditorContainerComponent>
      </div>
      {showModal && <Sharemodal closeModal={closeModal} />}
    </div>
  );
}
