import React, { useContext, useEffect } from "react"
import {
  ToolbarComponent,
  ItemDirective,
  ItemsDirective,
} from "@syncfusion/ej2-react-navigations"
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs"
import {
  DropDownButtonComponent,
  ItemModel,
} from "@syncfusion/ej2-react-splitbuttons"
import {
  items,
  fontSize,
  fontStyle,
} from "../../lib/Documenteditordata/toolbarData"

export default function DocumenteditorToolbar({ containerRef }) {
  useEffect(() => {
    setTimeout(() => {
      console.log("documenteditor initiated", containerRef)
    }, 5000)
  }, [])

  function toolbarButtonClick(arg: any) {
    // Checking if editor is available
    if (containerRef !== null) {
      switch (arg.item.id) {
        case "undo":
          containerRef.current.documentEditor.editorHistory.undo()
          break
        case "redo":
          containerRef.current.documentEditor.editorHistory.redo()
          break
        case "bold":
          //Toggles the bold of selected content
          containerRef.current.documentEditor.editor.toggleBold()
          break
        case "italic":
          //Toggles the Italic of selected content
          containerRef.current.documentEditor.editor.toggleItalic()
          break
        case "underline":
          //Toggles the underline of selected content
          containerRef.current.documentEditor.editor.toggleUnderline("Single")
          break
        case "strikethrough":
          //Toggles the strikethrough of selected content
          containerRef.current.documentEditor.editor.toggleStrikethrough()
          break
        case "subscript":
          //Toggles the subscript of selected content
          containerRef.current.documentEditor.editor.toggleSubscript()
          break
        case "superscript":
          //Toggles the superscript of selected content
          containerRef.current.documentEditor.editor.toggleSuperscript()
          break
        case "paragraph":
          containerRef.current.documentEditor.editor.toggleTextAlignment()
          break
        case "bulletlist":
          containerRef.current.documentEditor.editor.applyBullet(
            "\uf0b7",
            "Symbol"
          )
          break
        case "numberlist":
          containerRef.current.documentEditor.editor.applyNumbering(
            "%1)",
            "UpRoman"
          )
          break
        case "image":
          containerRef.current.documentEditor.editor.insertImage()
          break
        case "table":
          containerRef.current.documentEditor.editor.insertTable()
          break
        case "comment":
          containerRef.current.documentEditor.editor.insertComment()
          break
      }
    }
  }
  function AlignmentButtonClick(args: any) {
    let text: string = args.item.text
    if (containerRef !== null) {
      switch (text) {
        case "left":
          //Toggle the Left alignment for selected or current paragraph
          containerRef.current.documentEditor.editor.toggleTextAlignment("Left")
          break
        case "right":
          //Toggle the Right alignment for selected or current paragraph
          containerRef.current.documentEditor.editor.toggleTextAlignment(
            "Right"
          )
          break
        case "center":
          //Toggle the Center alignment for selected or current paragraph
          containerRef.current.documentEditor.editor.toggleTextAlignment(
            "Center"
          )
          break
        case "justify":
          //Toggle the Justify alignment for selected or current paragraph
          containerRef.current.documentEditor.editor.toggleTextAlignment(
            "Justify"
          )
          break
        case "ShowParagraphMark":
          //Show or hide the hidden characters like spaces, tab, paragraph marks, and breaks.
          containerRef.current.documentEditorSettings.showHiddenMarks =
            !containerRef.current.documentEditorSettings.showHiddenMarks
          break
      }
    }
  }

  function handleButtonClick(arg: any) {
    toolbarButtonClick(arg)
    AlignmentButtonClick(arg)
  }

  //To change the font Style of selected content
  function changeFontFamily(args: any): void {
    if (containerRef !== null) {
      containerRef.current.documentEditor.selection.characterFormat.fontFamily =
        args.value
      containerRef.current.documentEditor.focusIn()
    }
  }
  //To Change the font Size of selected content
  function changeFontSize(args: any): void {
    if (containerRef !== null) {
      containerRef.current.documentEditor.selection.characterFormat.fontSize =
        args.value
      containerRef.current.documentEditor.focusIn()
    }
  }
  //To Change the font Color of selected content
  function changeFontColor(args: any) {
    if (containerRef !== null) {
      containerRef.current.documentEditor.selection.characterFormat.fontColor =
        args.currentValue.hex
      containerRef.current.documentEditor.focusIn()
    }
  }

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
        <ItemDirective id="image" prefixIcon="e-image" tooltipText="Image" />
        <ItemDirective id="table" prefixIcon="e-table" tooltipText="Table" />
        <ItemDirective
          id="comment"
          prefixIcon="e-comment-add"
          tooltipText="Comment"
        />
      </ItemsDirective>
    </ToolbarComponent>
  )
}
