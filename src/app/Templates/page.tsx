"use client"

import React from "react"
import "../../styles/Templatestyling/main.css"
import { useRouter } from "next/navigation"
import Signature from "@/components/Documenteditor/Signature"

export default function Templates() {
  const router = useRouter()

  function handleNewDocumentClick() {
    router.push("/Drafteditor")
  }
  return (
    <div>
      <button className="New-document" onClick={handleNewDocumentClick}>
        Generate new document
      </button>
      <div>
        {" "}
        <Signature />
      </div>
    </div>
  )
}
