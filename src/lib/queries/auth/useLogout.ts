import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Logout failed")
      }
    },
  })
}
