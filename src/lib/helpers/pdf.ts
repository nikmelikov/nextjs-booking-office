import { PDFDocument, StandardFonts } from "pdf-lib"

type ObjectForm = {
  name: string
  address: string
  capacity: number
}
export async function generatePdfFromObject(object: ObjectForm) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const { name, address, capacity } = object

  let y = 750

  const drawLine = (text: string, indent = 50, size = 14) => {
    page.drawText(text, { x: indent, y, size, font })
    y -= size + 6
  }

  drawLine(`Company name: ${name}`)
  drawLine(`Address: ${address}`)
  drawLine(`Capacity: ${capacity}`)
  drawLine("")

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: "application/pdf" })
}

export async function downloadPdfFromObject(object: ObjectForm) {
  const blob = await generatePdfFromObject(object)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `booking_${new Date().getTime()}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
