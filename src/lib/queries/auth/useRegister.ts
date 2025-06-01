import { useMutation } from "@tanstack/react-query"

export type RegisterInput = {
  email: string
  password: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Registration failed")
      }
    },
  })
}
