"use client";

import { useRef, useState, useEffect } from "react";
import { useModal } from "../../hooks/Modalhook";
import { FormFieldSettings as MyFormFieldSettings } from "../Documenteditor/Documenteditorsettings";
import * as Interfaces from "../../lib/interfaces/DocumenteditorInterface";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css";
import "../../styles/Animations/Backarrowanimation.css";
import "../../styles/Draftpagestyling/Documenteditor.css";
import "../../styles/UI/Documentproperties.css";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import { DialogUtility, Dialog } from "@syncfusion/ej2-react-popups";
import Backarrowicon from "../../lib/icons/UIicons/Backarrowicon";
import Shareicon from "../../lib/icons/UIicons/Shareicon";
import Formfieldicon from "@/lib/icons/UIicons/Formfieldicon";
import Formfieldoptionsicon from "@/lib/icons/UIicons/Formfieldoptionsicon";
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
  FormFieldSettings,
} from "@syncfusion/ej2-react-documenteditor";
import {
  DropDownButtonComponent,
  ItemModel,
} from "@syncfusion/ej2-react-splitbuttons";
import Sharemodal from "../Modals/Sharemodal";
import DocumenteditorToolbar from "../Documenteditor/DocumenteditorToolbar";
import Signaturemodal from "../Modals/Signaturemodal";

DocumentEditorContainerComponent;

export default function Documenteditor() {
  DocumentEditorContainer.Inject(Toolbar, Editor, EditorHistory);

  let Formfieldproperties: Interfaces.Formfieldproperties;
  let documenteditor: DocumentEditorContainerComponent;
  let fieldNameListArray: string[] = [];

  const listviewRef = useRef<any>();
  const containerRef = useRef<any>();

  const [selectedListElement, setSelectedListElement] = useState([]);
  const {
    showShareModal,
    showSignatureModal,
    openShareModal,
    openSignatureModal,
    closeModal,
  } = useModal();

  useEffect(() => {
    const handleDragStart = (event) => {
      event.dataTransfer.setData("Text", event.target.innerText);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.target.classList.add("de-drag-target");
      event.target.classList.add("small-width"); // Apply the CSS class to change width

      // Create a new div for the drag image
      const dragImage = document.createElement("div"); // Creating an image so that only the text image is dragged
      dragImage.textContent = event.target.innerText;
      dragImage.style.position = "absolute";
      dragImage.style.top = "-1000px";
      document.body.appendChild(dragImage);
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      let text = event.dataTransfer.getData("Text");
      if (documenteditor && documenteditor.documentEditor) {
        documenteditor.documentEditor.selection.select({
          x: event.offsetX,
          y: event.offsetY,
          extend: false,
        });
      }
      insertField(text);
    };

    const handleDragEnd = (event) => {
      if (event.target.classList.contains("de-drag-target")) {
        event.target.classList.remove("de-drag-target");

        // Remove the drag image div
        let dragImage = document.querySelector(
          'div[style="position: absolute; top: -1000px;"]'
        );
        if (dragImage) {
          document.body.removeChild(dragImage);
        }
      }
    };

    const listviewElement = listviewRef.current;
    const containerElement = containerRef.current;
    console.log("listviewElement:", listviewElement);
    console.log("containerElement:", containerElement);

    if (listviewElement && containerElement) {
      listviewElement.addEventListener("dragstart", handleDragStart);
      containerElement.addEventListener("dragover", handleDragOver);
      containerElement.addEventListener("drop", handleDrop);
      document.addEventListener("dragend", handleDragEnd);
    }
    // Clean up event listeners when component unmounts
    return () => {
      if (listviewElement && containerElement) {
        listviewElement.removeEventListener("dragstart", handleDragStart);
        containerElement.removeEventListener("dragover", handleDragOver);
        containerElement.removeEventListener("drop", handleDrop);
        document.removeEventListener("dragend", handleDragEnd);
      }
    };
  }, []);

  // Template for the formfieldelements that should be drag and droppable
  function FormfieldListElement(data: any): JSX.Element {
    return (
      <div
        className="text-content flex flex-row justify-between"
        draggable="false"
        onClick={() => handleListElementClick(data)}
      >
        <div
          className="relative content-start w-auto left-2 top-1"
          id="listview-text"
          draggable="true"
        >
          {data.text}{" "}
        </div>
        <div className="field-option">
          <Formfieldoptionsicon />
        </div>
      </div>
    );
  }

  // Letting the user click multiple times on a listview element
  const handleListElementClick = (data: any) => {
    insertField(data.text, "text");
  };

  function Created() {
    // load your default document here
    let data = `{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"paragraphFormat":{"afterSpacing":30,"styleName":"Heading 1","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"Adventure Works Cycles"}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"lineSpacing":1.149999976158142,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Calibri"},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"beforeSpacing":12,"afterSpacing":0,"outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"beforeSpacing":2,"afterSpacing":6,"outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}`;

    // Open the default documenteditor
    containerRef.current.documentEditor.open(data);
    containerRef.current.enableToolbar = false;
  }

  const closeFieldDialog = () => {
    containerRef.current.documentEditor.focusIn();
  };

  let insertFieldDialogObj = new Dialog({
    header: "Merge Field",
    content:
      '<div class="dialogContent">' +
      // tslint:disable-next-line:max-line-length
      '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">' +
      "</div>",
    showCloseIcon: true,
    isModal: true,
    width: "auto",
    height: "auto",
    close: closeFieldDialog,
    buttons: [
      {
        click: () => {
          let fieldNameTextBox = document.getElementById(
            "field_text" // Gets the value of the input node insertfieldDialog
          ) as HTMLInputElement;
          let fieldName = fieldNameTextBox.value; // Assigns the input value to fieldName
          let fieldNameList =
            document.getElementById("listview-text")?.innerText;

          if (fieldName !== "" && !fieldNameListArray.includes(fieldName)) {
            // Checks if input value is not null and if input value does not already exist in the fieldNameListArray
            AddField(fieldName, "text");
            if (fieldName) {
              fieldNameListArray.push(fieldName); // if listview-text text value is available put it into the fieldNameListArray
              console.log("ListArray:", fieldNameListArray); // console log to check if listview element is correctly added to the array
            }
          } else {
            console.log(`Field ${fieldName} already exists`); // if listview-text already exist console log it
          }
          insertFieldDialogObj.hide();
          containerRef.current.documentEditor.focusIn();
        },
        buttonModel: {
          content: "Ok",
          cssClass: "e-flat",
          isPrimary: true,
        },
      },
      {
        click: () => {
          insertFieldDialogObj.hide();
          containerRef.current.documentEditor.focusIn();
        },
        buttonModel: {
          content: "Cancel",
          cssClass: "e-flat",
        },
      },
    ],
  });

  const showInsertFielddialog = (container) => {
    if (
      document.getElementById("insert_merge_field") === null ||
      document.getElementById("insert_merge_field") === undefined
    ) {
      let fieldcontainer = document.createElement("div");
      fieldcontainer.id = "insert_merge_field";
      document.body.appendChild(fieldcontainer);
      insertFieldDialogObj.appendTo("#insert_merge_field");
      fieldcontainer.parentElement.style.position = "fixed";
      fieldcontainer.style.width = "auto";
      fieldcontainer.style.height = "auto";
    }
    insertFieldDialogObj.close = () => {
      container.documentEditor.focusIn();
    };
    insertFieldDialogObj.beforeOpen = () => {
      container.documentEditor.focusIn();
    };
    insertFieldDialogObj.show();
    let fieldNameTextBox = document.getElementById(
      "field_text"
    ) as HTMLInputElement; // Input node
    fieldNameTextBox.value = "";
  };

  const AddField = (fieldName: string, fieldtype: string) => {
    let data = {
      text: fieldName,
      category: "text",
      htmlAttributes: { draggable: true },
    };
    if (listviewRef.current) {
      listviewRef.current.addItem([data]); //
    }
  };

  const insertField = (fieldName: string, fieldType: string) => {
    console.log("Inserting field:", fieldName, fieldType);
    containerRef.current.documentEditor.editor.insertFormField("Text"); // Adds the formfield to the documenteditor
    let formFieldsNames =
      containerRef.current.documentEditor.getFormFieldNames();
    for (let i = 0; i < formFieldsNames.length; i++) {
      let textfieldInfo = containerRef.current.documentEditor.getFormFieldInfo(
        formFieldsNames[i]
      );
      if (textfieldInfo.defaultValue == "") {
        textfieldInfo.defaultValue = fieldName;
        containerRef.current.documentEditor.setFormFieldInfo(
          // Sets the info the formfield holds
          formFieldsNames[i],
          textfieldInfo
        );
      }
    }

    // Formfield Names instead of default text
    console.log("Getting Formfield names:", fieldNameListArray);
    console.log(
      "Getting Formfield info:",
      containerRef.current.documentEditor.getFormFieldInfo()
    );
  };

  if (containerRef.current && containerRef.current.documentEditor) {
    containerRef.current.documentEditor.selectionChange = () => {
      setTimeout(() => {
        onSelectionChange();
      }, 20);
    };
    containerRef.current.documentEditor.enableEditorHistory = true;
  }

  // Selection change to retrieve formatting
  function onSelectionChange() {
    if (documenteditor && documenteditor.documentEditor.selection) {
      const paragraphFormat =
        documenteditor.documentEditor.selection.paragraphFormat;
      const alignmentToId = {
        Left: "AlignLeft",
        Right: "AlignRight",
        Center: "AlignCenter",
        Justify: "Justify",
      };
      const toggleBtnId = ["AlignLeft", "AlignCenter", "AlignRight", "Justify"];
      //Remove toggle state.
      toggleBtnId.map((id) => {
        let toggleBtn = document.getElementById(id);
        if (toggleBtn) {
          toggleBtn.classList.remove("e-btn-toggle");
        }
      });
      //Add toggle state based on selection paragraph format.
      const id = alignmentToId[paragraphFormat.textAlignment];
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.classList.add("e-btn-toggle");
        }
      }
    }
  }

  function enableDisableFontOptions() {
    const characterformat =
      documenteditor.documentEditor.selection.characterFormat;
    const properties = [
      characterformat.bold,
      characterformat.italic,
      characterformat.underline,
      characterformat.strikethrough,
    ];
    const toggleBtnId = ["bold", "italic", "underline", "strikethrough"];
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

  return (
    <div>
      <div className="flex Document-navigation">
        <div className="flex center justify-center w-16 h-full border-r-2 border-indigo-500 border-solid">
          <button className="Backarrow">
            <div>
              <Backarrowicon />
            </div>
          </button>
        </div>
        <div className="w-9/12"></div>
        <div className="flex w-2/12 gap-9  mr-10">
          <button
            onClick={openShareModal}
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

      <div className="relative top-5">
        <div>
          <button className="bg-green-500" onClick={openSignatureModal}>
            Click to Sign
          </button>
        </div>
        <div
          className="col-lg-10"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "0px",
          }}
        >
          <DocumenteditorToolbar containerRef={containerRef} />
          <DocumentEditorContainerComponent
            id="container"
            height={"100vh"}
            width="70vw"
            serviceUrl="http://localhost:8081/api/documenteditor/"
            showPropertiesPane={false}
            enableToolbar={false}
            documentEditorSettings={{
              formFieldSettings: MyFormFieldSettings,
            }}
            ref={containerRef}
          ></DocumentEditorContainerComponent>
        </div>
        <div
          className="col-lg-2"
          style={{
            width: "16rem",
            paddingRight: "inherit",
            paddingTop: "0px",
            paddingLeft: "5px",
            height: "100vh",
            backgroundColor: "#e9ebf2",
            borderLeft: "1px solid rgb(238, 238, 238)",
            borderBottom: "1px solid rgb(238, 238, 238)",
          }}
        >
          <h3>
            <hr className="border-slate-300"></hr>
            <label
              style={{
                display: "block",
                margin: "1px",
                paddingTop: "5px",
                fontSize: "20px",
                color: "#0F172A",
                fontWeight: "500",
              }}
            >
              Create Fields
            </label>
          </h3>
          <hr className="border-slate-300"></hr>
          <div style={{ padding: "10px 0 0 30px" }} className="Formfieldbutton">
            <button
              style={{
                backgroundColor: "#0F172A",
                color: "white",
                fontSize: "0.7rem",
                height: "2rem",
                width: "12rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
              onClick={() => showInsertFielddialog(containerRef.current)}
            >
              <Formfieldicon />
              Add Field
            </button>
          </div>
          <hr className="border-slate-300 mt-2"></hr>
          <ListViewComponent
            id="listview"
            template={FormfieldListElement}
            ref={listviewRef}
          />
        </div>
      </div>
      {showShareModal && <Sharemodal closeModal={closeModal} />}
      {showSignatureModal && <Signaturemodal closeModal={closeModal} />}
    </div>
  );
}
