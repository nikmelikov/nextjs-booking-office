import { useMutation } from "@tanstack/react-query"

export type LoginInput = {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Login failed")
      }
    },
  })
}
