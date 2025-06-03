"use client"

import { useGetObjects } from "@/lib/queries/objects/useGetObjects"
import { Loader, Paper, Text } from "@mantine/core"
import { DeleteObjectButton } from "../DeleteObjectsButton"
import { DownloadPdfButton } from "../DownloadPdfButton"

export default function ObjectList() {
  const { data: objects = [], isLoading } = useGetObjects()

  if (isLoading) {
    return <Loader />
  }

  return (
    <Paper shadow="sm" p="md" mb="sm" withBorder>
      {objects.map((item) => (
        <div key={item.id}>
          <Text fw={500}>{item.name}</Text>
          <Text size="sm" c="dimmed">
            {item.address} · {item.capacity} чел.
          </Text>
          <DeleteObjectButton id={item.id} />
          <DownloadPdfButton objectItem={item} />
        </div>
      ))}
    </Paper>
  )
}
