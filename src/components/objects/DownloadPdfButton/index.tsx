import { ObjectForm, ObjectItem } from "@/app/api/objects/model"
import { downloadPdfFromObject } from "@/lib/helpers/pdf"
import { Button } from "@mantine/core"
import { FC } from "react"

type Props = {
  objectItem: ObjectItem
}

export const DownloadPdfButton: FC<Props> = ({ objectItem }) => {
  const handleDownload = () => {
    downloadPdfFromObject(objectItem)
  }

  return (
    <Button mt="sm" size="xs" onClick={handleDownload}>
      Скачать PDF
    </Button>
  )
}
