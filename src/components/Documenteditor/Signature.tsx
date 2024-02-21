import React, { useState, useRef, useEffect } from "react"

export default function Signature() {
  const [name, setName] = useState("")
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set the font and draw the text
    ctx.font = '50px "Brush Script MT"' // Use a cursive font
    ctx.textBaseline = "middle" // Center vertically
    ctx.fillText(name, 5, 45) // Center horizontally
  }, [name])

  const handleSave = () => {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL("image/png")
    console.log(dataUrl)
  }

  // First user gets Modal popup when clicking the signature button
  // User fills in their name in the input field for desired signature name
  // User clicks on click to sign button
  // Canvas is initiated and signature is written on the canvas
  //

  return (
    <div>
      <h1>Signature</h1>
      <input
        className="user-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <div>
        <canvas id="sig-canvas" ref={canvasRef}></canvas>
        <button onClick={handleSave}>Save as Image</button>
      </div>
    </div>
  )
}
