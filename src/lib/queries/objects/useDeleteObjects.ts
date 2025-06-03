import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getObjectListQueryKey } from "./useGetObjects"

export const useDeleteObject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/objects/${id}`, { method: "DELETE" })

      if (!res.ok) {
        console.log("res: ", res)
        const { error } = await res.json()
        throw new Error(error || "failed to delete object")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getObjectListQueryKey })
    },
  })
}
