import { useDeleteObject } from "@/lib/queries/objects/useDeleteObjects"
import { Button } from "@mantine/core"
import { FC } from "react"

type Props = {
  id: string
}

export const DeleteObjectButton: FC<Props> = ({ id }) => {
  const { mutateAsync: deleteObject, isPending: isDeleting } = useDeleteObject()

  const handleDelete = (id: string) => {
    deleteObject(id)
  }

  return (
    <Button
      mt="sm"
      size="xs"
      variant="light"
      color="red"
      loading={isDeleting}
      onClick={() => handleDelete(id)}
    >
      Удалить
    </Button>
  )
}
