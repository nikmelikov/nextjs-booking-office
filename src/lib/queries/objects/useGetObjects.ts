import { useQuery } from "@tanstack/react-query"

type ObjectItem = {
  id: string
  name: string
  address: string
  capacity: number
  created_at: string
}

export const getObjectListQueryKey = ["objects"]
export const useGetObjects = () => {
  return useQuery<ObjectItem[], Error>({
    queryKey: getObjectListQueryKey,
    queryFn: async () => {
      const res = await fetch("/api/objects")
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "failed to fetch objects")
      }
      return res.json()
    },
  })
}
