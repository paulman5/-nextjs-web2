"use client"

import React from "react"
import { useRef, useState, useEffect } from "react"
import { useModal } from "../../hooks/Modalhook"
import * as Interfaces from "../../components/interfaces/DocumenteditorInterface"
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material3.css"
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css"
import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css"
import "../../styles/Draftpagestyling/Documenteditor.css"
import "../../styles/UI/Documentproperties.css"
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { DialogUtility, Dialog } from "@syncfusion/ej2-react-popups"
import Backarrowicon from "../../lib/icons/UIicons/Backarrowicon"
import Shareicon from "../../lib/icons/UIicons/Shareicon"
import Formfieldicon from "@/lib/icons/UIicons/Formfieldicon"
import Formfieldoptionsicon from "@/lib/icons/UIicons/Formfieldoptionsicon"
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
} from "@syncfusion/ej2-react-documenteditor"
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs"
import {
  DropDownButtonComponent,
  ItemModel,
} from "@syncfusion/ej2-react-splitbuttons"
import { Edit } from "lucide-react"
import Sharemodal from "../Modals/Sharemodal"
import Formfieldmodal from "../Modals/Formfieldmodal"
import { Share } from "next/font/google"
import {
  ToolbarComponent,
  ItemDirective,
  ItemsDirective,
} from "@syncfusion/ej2-react-navigations"
import { Container } from "postcss"
// import { TitleBar } from './title-bar';

DocumentEditorContainerComponent

export default function Documenteditor() {
  DocumentEditorContainer.Inject(Toolbar, Editor, EditorHistory)

  let Formfieldproperties: Interfaces.Formfieldproperties

  // Defining settings for the formfield of the documenteditor
  const FormFieldSettings = {
    selectionColor: "#AAFF00",
    shadingColor: "#AAFF00",
  }

  const [showFieldDialog, setShowFieldDialog] = useState(false)
  const [isFormfieldObjClick, setisFormfieldObjClick] = useState(false)
  const [selectedFieldName, setSelectedFieldName] = useState("")
  const { showModal, openModal, closeModal } = useModal()

  const listviewRef = useRef<any>()
  const containerRef = useRef<any>()

  let documenteditor: DocumentEditorContainerComponent
  let fieldNameListArray: string[] = []

  useEffect(() => {
    documenteditor = containerRef.current!
  }, [])

  const onSelect = (args) => {
    let fieldName = args.text
    let fieldtype = args.category
    listview.selectedItems = [] // Clear the selection
    insertField(fieldName, fieldtype)
    setSelectedFieldName(fieldName)
  }

  // Check if the form field already exists
  useEffect(() => {
    if (selectedFieldName) {
      let data = {
        text: selectedFieldName,
        category: "text",
        htmlAttributes: { draggable: true },
      }
      if (listviewRef.current) {
        listviewRef.current.addItem([data])
      }
    }
  }, [selectedFieldName]) // assuming fieldName is a prop or state

  useEffect(() => {
    const handleDragStart = (event) => {
      event.dataTransfer.setData("Text", event.target.innerText)
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.dropEffect = "move"
      event.target.classList.add("de-drag-target")
      event.target.classList.add("small-width") // Apply the CSS class to change width

      // Create a new div for the drag image
      const dragImage = document.createElement("div")
      dragImage.textContent = event.target.innerText
      dragImage.style.position = "absolute"
      dragImage.style.top = "-1000px"
      document.body.appendChild(dragImage)
      event.dataTransfer.setDragImage(dragImage, 0, 0)
    }

    const handleDragOver = (event) => {
      event.preventDefault()
    }

    const handleDrop = (event) => {
      let text = event.dataTransfer.getData("Text")
      if (documenteditor && documenteditor.documentEditor) {
        documenteditor.documentEditor.selection.select({
          x: event.offsetX,
          y: event.offsetY,
          extend: false,
        })
      }
      insertField(text)
    }

    const handleDragEnd = (event) => {
      if (event.target.classList.contains("de-drag-target")) {
        event.target.classList.remove("de-drag-target")

        // Remove the drag image div
        let dragImage = document.querySelector(
          'div[style="position: absolute; top: -1000px;"]'
        )
        if (dragImage) {
          document.body.removeChild(dragImage)
        }
      }
    }

    const listviewElement = listviewRef.current
    const containerElement = containerRef.current
    console.log("listviewElement:", listviewElement)
    console.log("containerElement:", containerElement)

    if (listviewElement && containerElement) {
      listviewElement.addEventListener("dragstart", handleDragStart)
      containerElement.addEventListener("dragover", handleDragOver)
      containerElement.addEventListener("drop", handleDrop)
      document.addEventListener("dragend", handleDragEnd)
    }
    // Clean up event listeners when component unmounts
    return () => {
      listviewElement.removeEventListener("dragstart", handleDragStart)
      containerElement.removeEventListener("dragover", handleDragOver)
      containerElement.removeEventListener("drop", handleDrop)
      document.removeEventListener("dragend", handleDragEnd)
    }
  }, [listviewRef.current, containerRef.current])

  // Defining items model for alignment items
  let items: ItemModel[] = [
    {
      text: "left",
      iconCss: "e-icons e-align-left",
    },
    {
      text: "center",
      iconCss: "e-icons e-align-center",
    },
    {
      text: "right",
      iconCss: "e-icons e-align-right",
    },
    {
      text: "justify",
      iconCss: "e-icons e-justify",
    },
  ]

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
    )
  }

  // Letting the user click multiple times on a listview element
  const handleListElementClick = (data) => {
    insertField(data.text, "text")
    console.log(documenteditor.documentEditor.getFormFieldInfo())
  }

  function Created() {
    // load your default document here
    let data = `{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"paragraphFormat":{"afterSpacing":30,"styleName":"Heading 1","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"Adventure Works Cycles"}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"lineSpacing":1.149999976158142,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Calibri"},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"beforeSpacing":12,"afterSpacing":0,"outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"beforeSpacing":2,"afterSpacing":6,"outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}`

    // Open the default documenteditor
    containerRef.current.documentEditor.open(data)
    containerRef.current.enableToolbar = false
  }

  const closeFieldDialog = () => {
    documenteditor.documentEditor.focusIn()
  }

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
          ) as HTMLInputElement
          let fieldName = fieldNameTextBox.value // Assigns the input value to fieldName
          let fieldNameList =
            document.getElementById("listview-text")?.innerText

          if (fieldName !== "" && !fieldNameListArray.includes(fieldName)) {
            // Checks if input value is not null and if input value already exists in the fieldNameListArray
            AddField(fieldName, "text")
            if (fieldName) {
              fieldNameListArray.push(fieldName) // if listview-text text value is available put it into the fieldNameListArray
              console.log("ListArray:", fieldNameListArray) // console log to check if listview element is correctly added to the array
            }
          } else {
            console.log(`Field ${fieldName} already exists`) // if listview-text already exist console log it
          }
          insertFieldDialogObj.hide()
          documenteditor.documentEditor.focusIn()
        },
        buttonModel: {
          content: "Ok",
          cssClass: "e-flat",
          isPrimary: true,
        },
      },
      {
        click: () => {
          insertFieldDialogObj.hide()
          documenteditor.documentEditor.focusIn()
        },
        buttonModel: {
          content: "Cancel",
          cssClass: "e-flat",
        },
      },
    ],
  })

  const showInsertFielddialog = (container) => {
    let instance = this
    if (
      document.getElementById("insert_merge_field") === null ||
      document.getElementById("insert_merge_field") === undefined
    ) {
      let fieldcontainer = document.createElement("div")
      fieldcontainer.id = "insert_merge_field"
      document.body.appendChild(fieldcontainer)
      insertFieldDialogObj.appendTo("#insert_merge_field")
      fieldcontainer.parentElement.style.position = "fixed"
      fieldcontainer.style.width = "auto"
      fieldcontainer.style.height = "auto"
    }
    insertFieldDialogObj.close = () => {
      container.documentEditor.focusIn()
    }
    insertFieldDialogObj.beforeOpen = () => {
      container.documentEditor.focusIn()
    }
    insertFieldDialogObj.show()
    let fieldNameTextBox = document.getElementById(
      "field_text"
    ) as HTMLInputElement // Input node
    fieldNameTextBox.value = ""
  }

  const AddField = (fieldName: string, fieldtype: string) => {
    let data = {
      text: fieldName,
      category: "text",
      htmlAttributes: { draggable: true },
    }
    if (listviewRef.current) {
      listviewRef.current.addItem([data]) // Getting current listviewinstance
    }
  }

  const insertField = (fieldName, fieldType) => {
    console.log("Inserting field:", fieldName, fieldType) // Add this line
    documenteditor.documentEditor.editor.insertFormField("Text")
    let formFieldsNames = documenteditor.documentEditor.getFormFieldNames()
    for (let i = 0; i < formFieldsNames.length; i++) {
      let textfieldInfo = documenteditor.documentEditor.getFormFieldInfo(
        formFieldsNames[i]
      )
      if (textfieldInfo.defaultValue == "") {
        textfieldInfo.defaultValue = fieldName
        documenteditor.documentEditor.setFormFieldInfo(
          formFieldsNames[i],
          textfieldInfo
        )
      }
    }
    // Formfield Names instead of default text
    console.log("Getting Formfield names:", fieldNameListArray)
    console.log(
      "Getting Formfield info:",
      documenteditor.documentEditor.getFormFieldInfo()
    )
  }

  if (documenteditor && documenteditor.documentEditor) {
    documenteditor.documentEditor.selectionChange = () => {
      setTimeout(() => {
        onSelectionChange()
      }, 20)
    }

    documenteditor.documentEditor.enableEditorHistory = true
  }

  function toolbarButtonClick(arg: any) {
    switch (arg.item.id) {
      case "undo":
        documenteditor.documentEditor.editorHistory.undo()
        break
      case "redo":
        documenteditor.documentEditor.editorHistory.redo()
        break
      case "bold":
        //Toggles the bold of selected content
        documenteditor.documentEditor.editor.toggleBold()
        break
      case "italic":
        //Toggles the Italic of selected content
        documenteditor.documentEditor.editor.toggleItalic()
        break
      case "underline":
        //Toggles the underline of selected content
        documenteditor.documentEditor.editor.toggleUnderline("Single")
        break
      case "strikethrough":
        //Toggles the strikethrough of selected content
        documenteditor.documentEditor.editor.toggleStrikethrough()
        break
      case "subscript":
        //Toggles the subscript of selected content
        documenteditor.documentEditor.editor.toggleSubscript()
        break
      case "superscript":
        //Toggles the superscript of selected content
        documenteditor.documentEditor.editor.toggleSuperscript()
        break
      case "paragraph":
        documenteditor.documentEditor.editor.toggleTextAlignment()
        break
      case "bulletlist":
        documenteditor.documentEditor.editor.applyBullet("\uf0b7", "Symbol")
        break
      case "numberlist":
        documenteditor.documentEditor.editor.applyNumbering("%1)", "UpRoman")
        break
      case "image":
        documenteditor.documentEditor.editor.toggleImage()
        break
      case "table":
        documenteditor.documentEditor.editor.insertTable()
        break
      case "comment":
        documenteditor.documentEditor.editor.insertComment()
        break
    }
  }
  function AlignmentButtonClick(args: any) {
    let text: string = args.item.text
    switch (text) {
      case "left":
        //Toggle the Left alignment for selected or current paragraph
        documenteditor.documentEditor.editor.toggleTextAlignment("Left")
        break
      case "right":
        //Toggle the Right alignment for selected or current paragraph
        documenteditor.documentEditor.editor.toggleTextAlignment("Right")
        break
      case "center":
        //Toggle the Center alignment for selected or current paragraph
        documenteditor.documentEditor.editor.toggleTextAlignment("Center")
        break
      case "justify":
        //Toggle the Justify alignment for selected or current paragraph
        documenteditor.documentEditor.editor.toggleTextAlignment("Justify")
        break
      case "ShowParagraphMark":
        //Show or hide the hidden characters like spaces, tab, paragraph marks, and breaks.
        documenteditor.documentEditorSettings.showHiddenMarks =
          !documenteditor.documentEditorSettings.showHiddenMarks
        break
    }
  }
  function handleButtonClick(arg: any) {
    toolbarButtonClick(arg)
    AlignmentButtonClick(arg)
  }
  //To change the font Style of selected content
  function changeFontFamily(args: any): void {
    documenteditor.documentEditor.selection.characterFormat.fontFamily =
      args.value
    documenteditor.documentEditor.focusIn()
  }
  //To Change the font Size of selected content
  function changeFontSize(args: any): void {
    documenteditor.documentEditor.selection.characterFormat.fontSize =
      args.value
    documenteditor.documentEditor.focusIn()
  }
  //To Change the font Color of selected content
  function changeFontColor(args: any) {
    documenteditor.documentEditor.selection.characterFormat.fontColor =
      args.currentValue.hex
    documenteditor.documentEditor.focusIn()
  }

  // Selection change to retrieve formatting
  function onSelectionChange() {
    if (documenteditor && documenteditor.documentEditor.selection) {
      var paragraphFormat =
        documenteditor.documentEditor.selection.paragraphFormat
      var toggleBtnId = ["AlignLeft", "AlignCenter", "AlignRight", "Justify"]
      //Remove toggle state.
      for (var i = 0; i < toggleBtnId.length; i++) {
        let toggleBtn: HTMLElement = document.getElementById(toggleBtnId[i])
        toggleBtn.classList.remove("e-btn-toggle")
      }
      //Add toggle state based on selection paragraph format.
      if (paragraphFormat.textAlignment === "Left") {
        document.getElementById("AlignLeft").classList.add("e-btn-toggle")
      } else if (paragraphFormat.textAlignment === "Right") {
        document.getElementById("AlignRight").classList.add("e-btn-toggle")
      } else if (paragraphFormat.textAlignment === "Center") {
        document.getElementById("AlignCenter").classList.add("e-btn-toggle")
      } else {
        document.getElementById("Justify").classList.add("e-btn-toggle")
      }
      // #endregion
    }
  }

  function enableDisableFontOptions() {
    var characterformat =
      documenteditor.documentEditor.selection.characterFormat
    var properties = [
      characterformat.bold,
      characterformat.italic,
      characterformat.underline,
      characterformat.strikethrough,
    ]
    var toggleBtnId = ["bold", "italic", "underline", "strikethrough"]
    for (let i = 0; i < properties.length; i++) {
      changeActiveState(properties[i], toggleBtnId[i])
    }
  }

  function changeActiveState(property: any, btnId: any) {
    let toggleBtn: any = document.getElementById(btnId)
    if (
      (typeof property == "boolean" && property == true) ||
      (typeof property == "string" && property !== "None")
    )
      toggleBtn.classList.add("e-btn-toggle")
    else {
      if (toggleBtn.classList.contains("e-btn-toggle"))
        toggleBtn.classList.remove("e-btn-toggle")
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
  ]
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
  ]
  function contentTemplate1() {
    return (
      <ColorPickerComponent
        showButtons={true}
        value="#000000"
        change={changeFontColor}
      ></ColorPickerComponent>
    )
  }
  function contentTemplate2() {
    return (
      <ComboBoxComponent
        className="font-scroll"
        dataSource={fontStyle}
        change={changeFontFamily}
        width={130}
        index={2}
        allowCustom={true}
        showClearButton={false}
      ></ComboBoxComponent>
    )
  }
  function contentTemplate3() {
    return (
      <div className="toolbar-scroll-parent">
        <ComboBoxComponent
          className="toolbar-scroll-child"
          dataSource={fontSize}
          change={changeFontSize}
          width={50}
          index={2}
          allowCustom={true}
          showClearButton={false}
          popupWidth={65}
          popupHeight={300}
        ></ComboBoxComponent>
      </div>
    )
  }
  function contentTemplate4() {
    return (
      <DropDownButtonComponent
        items={items}
        iconCss="e-icons e-paragraph-2"
        select={AlignmentButtonClick}
      ></DropDownButtonComponent>
    )
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

      <div className="relative top-5">
        <div
          className="col-lg-10"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "0px",
          }}
        >
          <ToolbarComponent
            id="toolbar"
            clicked={handleButtonClick}
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
              <ItemDirective type="Separator" />
              <ItemDirective template={contentTemplate4} />
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
            ref={containerRef}
            height={"100vh"}
            width="70vw"
            serviceUrl="http://localhost:8081/api/documenteditor/"
            showPropertiesPane={false}
            enableToolbar={false}
            documentEditorSettings={{ formFieldSettings: FormFieldSettings }}
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
              onClick={() => showInsertFielddialog(documenteditor)}
            >
              <Formfieldicon />
              Add Field
            </button>
          </div>
          <hr className="border-slate-300 mt-2"></hr>
          <ListBoxComponent
            id="listview"
            itemTemplate={FormfieldListElement}
            ref={listviewRef}
            allowDragAndDrop={true}
          />
        </div>
      </div>
      {showModal && <Sharemodal closeModal={closeModal} />}
    </div>
  )
}
