import { useMutation } from "@tanstack/react-query"

type ObjectForm = {
  name: string
  address: string
  capacity: number
}

export const useCreateObject = () => {
  return useMutation({
    mutationFn: async (data: ObjectForm) => {
      const res = await fetch("/api/object/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "failed to create object")
      }
    },
  })
}
